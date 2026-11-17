import test from 'node:test';
import assert from 'node:assert/strict';
import { creerApiTest } from './api-test.js';
import { COULEURS, creerPartieNonDemarree, reinitialiserPartie, soumettreProposition } from './jeu.js';

const reference = ['rouge', 'rouge', 'bleu', 'vert'];
const rouges = ['rouge', 'rouge', 'rouge', 'rouge'];
const bleus = ['bleu', 'bleu', 'bleu', 'bleu'];
const vide = {
  status: 'not-started', attempts: 0, history: [], lastGuess: null, lastResult: null, lastError: null,
};

function preparer() {
  const partie = creerPartieNonDemarree();
  const affichages = [];
  const api = creerApiTest({
    partie,
    demarrerPartie(secret) {
      reinitialiserPartie(partie, Math.random, secret);
      affichages.push({ action: 'demarrage', partie: structuredClone(partie) });
    },
    proposerCouleurs(guess) {
      soumettreProposition(partie, guess);
      affichages.push({ action: 'proposition', partie: structuredClone(partie) });
    },
    afficherRefus(message) { affichages.push({ action: 'refus', message }); },
  });
  return { api, partie, affichages };
}

function sansErreur(state) {
  const { lastError, ...donnees } = state;
  return donnees;
}

test('L’API expose sa version et les lectures synchrones ne démarrent pas la partie', () => {
  const { api, affichages } = preparer();
  assert.equal(api.version, '0.2');
  assert.deepEqual(api.getConfig(), {
    apiVersion: '0.2', rulesVersion: 'code-couleurs-1.0', secretLength: 4,
    maxAttempts: 10, allowDuplicates: true, colors: [...COULEURS],
  });
  assert.deepEqual(api.getState(), vide);
  assert.equal(affichages.length, 0);
});

test('Avant démarrage, game-not-started est prioritaire sur les erreurs de saisie', async () => {
  const { api, affichages } = preparer();
  for (const guess of [null, rouges]) {
    const promesse = api.submitGuess(guess);
    assert.ok(promesse instanceof Promise);
    const state = await promesse;
    assert.deepEqual(sansErreur(state), sansErreur(vide));
    assert.equal(state.lastError.code, 'game-not-started');
    assert.ok(state.lastError.message.length > 0);
  }
  assert.equal(affichages.length, 0);
});

test('Les trois démarrages aléatoires prévus renvoient une promesse et un état remis à zéro', async () => {
  const { api, partie } = preparer();
  for (const appel of [() => api.startGame(), () => api.startGame(undefined), () => api.startGame({})]) {
    const promesse = appel();
    assert.ok(promesse instanceof Promise);
    assert.deepEqual(await promesse, { ...vide, status: 'playing' });
    assert.equal(partie.secret.length, 4);
    assert.ok(partie.secret.every((c) => COULEURS.includes(c)));
    await api.submitGuess(['rouge']);
  }
});

const exemples = [
  ['T01', ['rouge', 'bleu', 'vert', 'jaune'], ['rouge', 'vert', 'bleu', 'orange'], 1, 2],
  ['T02', ['rouge', 'bleu', 'vert', 'jaune'], ['orange', 'violet', 'rouge', 'bleu'], 0, 2],
  ['T03', ['rouge', 'bleu', 'vert', 'jaune'], ['bleu', 'rouge', 'jaune', 'vert'], 0, 4],
  ['T04', ['rouge', 'bleu', 'vert', 'jaune'], ['rouge', 'bleu', 'jaune', 'vert'], 2, 2],
  ['T05', ['rouge', 'bleu', 'vert', 'jaune'], ['rouge', 'bleu', 'vert', 'jaune'], 4, 0],
  ['T06', reference, rouges, 2, 0],
  ['T07', reference, ['rouge', 'bleu', 'rouge', 'vert'], 2, 2],
  ['T08', reference, reference, 4, 0],
  ['T09', reference, ['rouge', 'bleu', 'rouge', 'rouge'], 1, 2],
];

for (const [nom, secret, guess, wellPlaced, misplaced] of exemples) {
  test(`Contrat 0.2 ${nom} : indices, état, historique et action d’affichage`, async () => {
    const { api, affichages } = preparer();
    await api.startGame({ secret });
    const state = await api.submitGuess(guess);
    const result = { wellPlaced, misplaced };
    assert.deepEqual(state, {
      status: wellPlaced === 4 ? 'won' : 'playing', attempts: 1,
      history: [{ guess, result }], lastGuess: guess, lastResult: result, lastError: null,
    });
    assert.deepEqual(api.getState(), state);
    assert.equal(affichages.length, 2);
    assert.equal(affichages[1].partie.essais, state.attempts);
    assert.deepEqual(affichages[1].partie.historique[0].proposition, guess);
  });
}

test('Les refus de saisie respectent la priorité type, longueur, couleur sans changer les données', async () => {
  const { api, affichages } = preparer();
  await api.startGame({ secret: reference });
  await api.submitGuess(rouges);
  const avant = sansErreur(api.getState());
  const cas = [
    [null, 'invalid-type'], ['rouge', 'invalid-type'], [['rouge', null], 'invalid-type'],
    [new Array(4), 'invalid-type'], [['rouge', undefined, 'bleu', 'vert'], 'invalid-type'],
    [[], 'invalid-length'], [['rose'], 'invalid-length'], [['rouge'], 'invalid-length'],
    [['rouge', 'bleu', 'vert', 'jaune', 'orange'], 'invalid-length'],
    [['rouge', 'rouge', 'bleu', 'Violet'], 'invalid-color'],
    [['rouge', 'rouge', 'bleu', 'violet '], 'invalid-color'],
    [['rouge', 'rouge', 'bleu', 'purple'], 'invalid-color'],
  ];
  for (const [guess, code] of cas) {
    const state = await api.submitGuess(guess);
    assert.equal(state.lastError.code, code);
    assert.ok(state.lastError.message.length > 0);
    assert.deepEqual(sansErreur(state), avant);
    assert.equal(affichages.at(-1).action, 'refus');
  }
  assert.equal((await api.submitGuess(bleus)).lastError, null);
});

test('Un démarrage invalide rejette sans toucher l’état, l’erreur précédente ou l’affichage', async () => {
  const { api, affichages } = preparer();
  const cas = [
    [null, 'invalid-options'], [[], 'invalid-options'], [3, 'invalid-options'],
    [new Date(), 'invalid-options'], [{ inconnu: 1, secret: null }, 'invalid-options'],
    [{ [Symbol('inconnu')]: true }, 'invalid-options'],
    [{ secret: undefined }, 'invalid-type'], [{ secret: null }, 'invalid-type'],
    [{ secret: ['rouge', null] }, 'invalid-type'], [{ secret: new Array(4) }, 'invalid-type'],
    [{ secret: ['rouge'] }, 'invalid-length'],
    [{ secret: ['rouge', 'bleu', 'vert', 'rose'] }, 'invalid-color'],
  ];
  for (const phase of ['not-started', 'playing', 'won', 'lost']) {
    if (phase !== 'not-started') await api.startGame({ secret: rouges });
    if (phase === 'playing') await api.submitGuess(bleus);
    if (phase === 'won') await api.submitGuess(rouges);
    if (phase === 'lost') for (let i = 0; i < 10; i += 1) await api.submitGuess(bleus);
    await api.submitGuess(null);
    const avant = api.getState();
    const nombreAffichages = affichages.length;
    for (const [options, code] of cas) {
      await assert.rejects(api.startGame(options), (erreur) => (
        erreur instanceof Error && erreur.code === code && erreur.message.length > 0
      ));
      assert.deepEqual(api.getState(), avant);
      assert.equal(affichages.length, nombreAffichages);
    }
  }
});

test('Un refus au neuvième essai laisse possible la victoire au dixième, puis les propositions sont bloquées', async () => {
  const { api, affichages } = preparer();
  await api.startGame({ secret: rouges });
  for (let i = 0; i < 9; i += 1) await api.submitGuess(bleus);
  assert.equal((await api.submitGuess(['rouge'])).attempts, 9);
  const victoire = await api.submitGuess(rouges);
  assert.equal(victoire.status, 'won');
  assert.equal(victoire.attempts, 10);
  assert.equal(victoire.history.length, 10);
  assert.equal(victoire.lastError, null);
  const nombreAffichages = affichages.length;
  const apres = await api.submitGuess(null);
  assert.equal(apres.lastError.code, 'game-finished');
  assert.deepEqual(sansErreur(apres), sansErreur(victoire));
  assert.equal(affichages.length, nombreAffichages);
  assert.deepEqual(await api.startGame({ secret: reference }), { ...vide, status: 'playing' });
});

test('La défaite à dix essais est conservée après un refus, puis le redémarrage permet de rejouer', async () => {
  const { api } = preparer();
  await api.startGame({ secret: rouges });
  for (let i = 0; i < 10; i += 1) await api.submitGuess(bleus);
  const defaite = api.getState();
  assert.equal(defaite.status, 'lost');
  assert.equal(defaite.attempts, 10);
  assert.equal(defaite.history.length, 10);
  assert.deepEqual(defaite.lastResult, { wellPlaced: 0, misplaced: 0 });
  const apres = await api.submitGuess(rouges);
  assert.equal(apres.lastError.code, 'game-finished');
  assert.deepEqual(sansErreur(apres), sansErreur(defaite));
  assert.deepEqual(await api.startGame(), { ...vide, status: 'playing' });
  assert.equal((await api.submitGuess(bleus)).attempts, 1);
});

test('Les entrées et tous les objets retournés peuvent être modifiés sans changer le jeu', async () => {
  const { api, affichages } = preparer();
  const secret = [...reference];
  const demarrage = api.startGame({ secret });
  secret.fill('orange');
  await demarrage;
  const guess = [...rouges];
  const proposition = api.submitGuess(guess);
  guess.fill('orange');
  const state = await proposition;
  assert.deepEqual(state.lastResult, { wellPlaced: 2, misplaced: 0 });
  const avant = api.getState();
  state.history[0].guess.fill('orange');
  state.history[0].result.wellPlaced = 99;
  state.lastGuess.fill('orange');
  state.lastResult.misplaced = 99;
  state.history.push({});
  state.status = 'lost';
  const config = api.getConfig();
  config.colors.fill('rose');
  assert.deepEqual(api.getState(), avant);
  assert.deepEqual(api.getConfig().colors, COULEURS);
  await api.submitGuess(null);
  const erreurAvant = api.getState();
  const lecture = api.getState();
  lecture.lastError.code = 'change';
  const nombreAffichages = affichages.length;
  api.getConfig();
  assert.deepEqual(api.getState(), erreurAvant);
  assert.equal(affichages.length, nombreAffichages);
  assert.deepEqual(JSON.parse(JSON.stringify(erreurAvant)), erreurAvant);
  assert.ok(!('secret' in erreurAvant) && !('solution' in erreurAvant));
});

test('Les exceptions inattendues se propagent au lieu de devenir un refus de saisie', async () => {
  const panne = new Error('Panne simulée pour vérifier la propagation');
  const api = creerApiTest({
    partie: creerPartieNonDemarree(),
    demarrerPartie() { throw panne; },
    proposerCouleurs() { throw panne; },
    afficherRefus() { assert.fail('Une panne ne doit pas être affichée comme un refus.'); },
  });
  await assert.rejects(api.startGame(), (erreur) => erreur === panne);
  await assert.rejects(api.submitGuess(rouges), (erreur) => erreur === panne);
  assert.deepEqual(api.getState(), vide);
});
