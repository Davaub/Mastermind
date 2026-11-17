import { COULEURS, verifierCombinaison } from './jeu.js';

// Adaptation du contrat 0.2 : aucune seconde partie ni second calcul des indices.
export function creerApiTest({ partie, demarrerPartie, proposerCouleurs, afficherRefus }) {
  let derniereErreur = null;
  const refusPrevus = new Set([
    'game-not-started', 'game-finished', 'invalid-type', 'invalid-length', 'invalid-color',
  ]);

  function getConfig() {
    return {
      apiVersion: '0.2', rulesVersion: 'code-couleurs-1.0',
      secretLength: 4, maxAttempts: 10, allowDuplicates: true, colors: [...COULEURS],
    };
  }

  function getState() {
    const history = partie.historique.map((essai) => ({
      guess: [...essai.proposition],
      result: { wellPlaced: essai.indices.bienPlacees, misplaced: essai.indices.malPlacees },
    }));
    const dernier = history.at(-1);
    // Reconstruire les objets évite de transmettre le secret ou des références internes.
    return {
      status: { 'non-demarree': 'not-started', 'en-cours': 'playing', gagnee: 'won', perdue: 'lost' }[partie.statut],
      attempts: partie.essais,
      history,
      lastGuess: dernier ? [...dernier.guess] : null,
      lastResult: dernier ? { ...dernier.result } : null,
      lastError: derniereErreur ? { ...derniereErreur } : null,
    };
  }

  async function startGame(options = {}) {
    // Tout valider avant l’action commune pour conserver l’écran et l’erreur en cas de refus.
    if (options === null || typeof options !== 'object'
      || ![Object.prototype, null].includes(Object.getPrototypeOf(options))
      || Reflect.ownKeys(options).some((cle) => cle !== 'secret')) {
      throw Object.assign(new Error('Les options doivent être un objet contenant uniquement, si nécessaire, un secret.'), { code: 'invalid-options' });
    }
    let secret;
    if (Object.hasOwn(options, 'secret')) {
      verifierCombinaison(options.secret);
      secret = [...options.secret];
    }
    demarrerPartie(secret);
    derniereErreur = null;
    return getState();
  }

  async function submitGuess(guess) {
    // Seuls les refus du moteur sont convertis en lastError. Une panne d’affichage se propage.
    try {
      proposerCouleurs(guess);
    } catch (erreur) {
      if (!refusPrevus.has(erreur.code)) throw erreur;
      derniereErreur = { code: erreur.code, message: erreur.message };
      if (partie.statut === 'en-cours') afficherRefus(derniereErreur.message);
      return getState();
    }
    derniereErreur = null;
    return getState();
  }

  return { version: '0.2', getConfig, startGame, submitGuess, getState };
}
