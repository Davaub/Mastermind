import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculerIndices,
  creerPartie,
  reinitialiserPartie,
  soumettreProposition,
} from './jeu.js';

function creerPartieDeReference() {
  const tirages = [0, 0, 1 / 6, 2 / 6];
  let position = 0;
  return creerPartie(() => tirages[position++]);
}

test('Une proposition de trois couleurs est refusée sans modifier la partie', () => {
  const partie = creerPartieDeReference();
  const avant = structuredClone(partie);

  assert.throws(
    () => soumettreProposition(partie, ['rouge', 'bleu', 'vert']),
    { name: 'TypeError', message: /exactement quatre couleurs/ },
  );
  assert.deepEqual(partie, avant);
});

test('Les entrées invalides préservent les essais, l’historique et les indices précédents', () => {
  const partie = creerPartieDeReference();
  soumettreProposition(partie, ['rouge', 'rouge', 'rouge', 'rouge']);
  const avant = structuredClone(partie);
  const invalides = [
    null,
    'rouge',
    [],
    ['rouge', 'bleu', 'vert'],
    ['rouge', 'bleu', 'vert', 'jaune', 'orange'],
    ['rouge', 'bleu', 'vert', 'rose'],
    ['Rouge', 'bleu', 'vert', 'jaune'],
    new Array(4),
  ];

  for (const proposition of invalides) {
    assert.throws(() => soumettreProposition(partie, proposition), {
      name: 'TypeError',
      message: /quatre couleurs|Chaque couleur/,
    });
    assert.deepEqual(partie, avant);
  }
});

test('Une proposition valide consomme un essai et enregistre les indices attendus', () => {
  const partie = creerPartieDeReference();
  const indices = soumettreProposition(partie, ['rouge', 'rouge', 'rouge', 'rouge']);

  assert.deepEqual(indices, { bienPlacees: 2, malPlacees: 0 });
  assert.equal(partie.essais, 1);
  assert.equal(partie.statut, 'en-cours');
  assert.deepEqual(partie.indices, indices);
  assert.deepEqual(partie.historique, [{
    proposition: ['rouge', 'rouge', 'rouge', 'rouge'],
    indices: { bienPlacees: 2, malPlacees: 0 },
  }]);
});

test('Les essais successifs conservent leur ordre, leur proposition et leurs propres indices', () => {
  const partie = creerPartieDeReference();
  const proposition = ['rouge', 'rouge', 'rouge', 'rouge'];
  const retour = soumettreProposition(partie, proposition);

  // La saisie suivante et le résultat retourné ne doivent pas réécrire le passé.
  proposition.fill('violet');
  retour.bienPlacees = 99;
  assert.deepEqual(partie.indices, { bienPlacees: 2, malPlacees: 0 });
  soumettreProposition(partie, proposition);

  assert.equal(partie.essais, 2);
  assert.deepEqual(partie.historique, [
    {
      proposition: ['rouge', 'rouge', 'rouge', 'rouge'],
      indices: { bienPlacees: 2, malPlacees: 0 },
    },
    {
      proposition: ['violet', 'violet', 'violet', 'violet'],
      indices: { bienPlacees: 0, malPlacees: 0 },
    },
  ]);
  assert.deepEqual(partie.indices, { bienPlacees: 0, malPlacees: 0 });
  assert.notStrictEqual(partie.indices, partie.historique[1].indices);
});

test('La soumission accepte une saisie protégée sans la modifier', () => {
  const partie = creerPartieDeReference();
  const proposition = Object.freeze(['bleu', 'vert', 'rouge', 'rouge']);

  assert.deepEqual(soumettreProposition(partie, proposition), {
    bienPlacees: 0,
    malPlacees: 4,
  });
  assert.deepEqual(proposition, ['bleu', 'vert', 'rouge', 'rouge']);
});

test('Soumettre des propositions ne retire pas le secret et ne le modifie pas', () => {
  let appels = 0;
  const partie = creerPartie(() => {
    appels += 1;
    return 0;
  });
  const secret = partie.secret;

  for (let essai = 0; essai < 3; essai += 1) {
    soumettreProposition(partie, ['bleu', 'vert', 'jaune', 'violet']);
  }

  assert.equal(appels, 4);
  assert.strictEqual(partie.secret, secret);
  assert.deepEqual(partie.secret, ['rouge', 'rouge', 'rouge', 'rouge']);
});

test('Une proposition entièrement correcte gagne dès le premier essai', () => {
  const partie = creerPartieDeReference();

  assert.deepEqual(soumettreProposition(partie, ['rouge', 'rouge', 'bleu', 'vert']), {
    bienPlacees: 4,
    malPlacees: 0,
  });
  assert.equal(partie.statut, 'gagnee');
  assert.equal(partie.essais, 1);
  assert.equal(partie.historique.length, 1);
});

test('Une entrée invalide au neuvième essai laisse possible la victoire au dixième', () => {
  const partie = creerPartieDeReference();
  for (let essai = 0; essai < 9; essai += 1) {
    soumettreProposition(partie, ['violet', 'violet', 'violet', 'violet']);
  }
  assert.equal(partie.statut, 'en-cours');
  const avant = structuredClone(partie);

  assert.throws(() => soumettreProposition(partie, ['rouge', 'rouge', 'bleu']), TypeError);
  assert.deepEqual(partie, avant);
  soumettreProposition(partie, ['rouge', 'rouge', 'bleu', 'vert']);

  assert.equal(partie.statut, 'gagnee');
  assert.equal(partie.essais, 10);
  assert.equal(partie.historique.length, 10);
  assert.deepEqual(partie.historique[9].indices, { bienPlacees: 4, malPlacees: 0 });
});

test('Dix propositions incorrectes provoquent la défaite', () => {
  const partie = creerPartieDeReference();

  for (let essai = 0; essai < 10; essai += 1) {
    soumettreProposition(partie, ['violet', 'violet', 'violet', 'violet']);
    assert.equal(partie.statut, essai < 9 ? 'en-cours' : 'perdue');
  }

  assert.equal(partie.essais, 10);
  assert.equal(partie.historique.length, 10);
  assert.deepEqual(partie.indices, { bienPlacees: 0, malPlacees: 0 });
});

test('Après victoire ou défaite, aucune nouvelle proposition ne modifie la partie', () => {
  for (const issue of ['gagnee', 'perdue']) {
    const partie = creerPartieDeReference();
    if (issue === 'gagnee') {
      soumettreProposition(partie, ['rouge', 'rouge', 'bleu', 'vert']);
    } else {
      for (let essai = 0; essai < 10; essai += 1) {
        soumettreProposition(partie, ['violet', 'violet', 'violet', 'violet']);
      }
    }
    const avant = structuredClone(partie);

    for (const proposition of [
      ['rouge', 'rouge', 'bleu', 'vert'],
      ['violet', 'violet', 'violet', 'violet'],
      ['rouge'],
    ]) {
      assert.throws(() => soumettreProposition(partie, proposition), /partie est terminée/);
      assert.deepEqual(partie, avant);
    }
  }
});

test('Le redémarrage après des essais réels permet de rejouer en cours, après victoire et après défaite', () => {
  for (const issue of ['en-cours', 'gagnee', 'perdue']) {
    const partie = creerPartieDeReference();
    if (issue === 'gagnee') {
      soumettreProposition(partie, ['rouge', 'rouge', 'bleu', 'vert']);
    } else {
      const essais = issue === 'perdue' ? 10 : 1;
      for (let essai = 0; essai < essais; essai += 1) {
        soumettreProposition(partie, ['violet', 'violet', 'violet', 'violet']);
      }
    }
    assert.equal(partie.statut, issue);

    reinitialiserPartie(partie, () => 0.99);

    assert.deepEqual(partie, {
      secret: ['violet', 'violet', 'violet', 'violet'],
      essais: 0,
      historique: [],
      indices: null,
      statut: 'en-cours',
    });
    soumettreProposition(partie, ['rouge', 'rouge', 'rouge', 'rouge']);
    assert.equal(partie.essais, 1);
    assert.equal(partie.historique.length, 1);
    assert.deepEqual(partie.indices, { bienPlacees: 0, malPlacees: 0 });
    assert.equal(partie.statut, 'en-cours');
  }
});

test('Une partie démarre avec quatre couleurs autorisées et un état vide', () => {
  const partie = creerPartie();
  const couleurs = ['rouge', 'bleu', 'vert', 'jaune', 'orange', 'violet'];

  assert.equal(partie.secret.length, 4);
  assert.ok(partie.secret.every((couleur) => couleurs.includes(couleur)));
  assert.equal(partie.essais, 0);
  assert.deepEqual(partie.historique, []);
  assert.equal(partie.indices, null);
  assert.equal(partie.statut, 'en-cours');
});

test('Chacune des six couleurs peut être tirée et répétée quatre fois', () => {
  const couleurs = ['rouge', 'bleu', 'vert', 'jaune', 'orange', 'violet'];

  for (let index = 0; index < couleurs.length; index += 1) {
    const partie = creerPartie(() => (index + 0.5) / 6);
    assert.deepEqual(partie.secret, Array(4).fill(couleurs[index]));
  }
});

test('Quatre tirages distincts produisent un code ordonné, y compris aux bornes', () => {
  const tirages = [0, 1 / 6, 4 / 6, 1 - Number.EPSILON];
  let appels = 0;
  const partie = creerPartie(() => tirages[appels++]);

  assert.equal(appels, 4);
  assert.deepEqual(partie.secret, ['rouge', 'bleu', 'orange', 'violet']);
});

test('Le redémarrage réinitialise le même objet après différents états simulés', () => {
  for (const statut of ['en-cours', 'gagnee', 'perdue']) {
    const partie = creerPartie(() => 0);
    const reference = partie;
    const ancienSecret = partie.secret;
    partie.essais = 10;
    partie.historique.push({
      proposition: ['rouge', 'rouge', 'rouge', 'rouge'],
      indices: { bienPlacees: 4, malPlacees: 0 },
    });
    const ancienHistorique = partie.historique;
    partie.indices = { bienPlacees: 4, malPlacees: 0 };
    partie.statut = statut;

    reinitialiserPartie(partie, () => 0.99);

    assert.strictEqual(partie, reference);
    assert.deepEqual(partie, {
      secret: ['violet', 'violet', 'violet', 'violet'],
      essais: 0,
      historique: [],
      indices: null,
      statut: 'en-cours',
    });
    assert.notStrictEqual(partie.secret, ancienSecret);
    assert.notStrictEqual(partie.historique, ancienHistorique);
    assert.deepEqual(ancienSecret, ['rouge', 'rouge', 'rouge', 'rouge']);
    assert.equal(ancienHistorique.length, 1);
  }
});

test('Un redémarrage effectue un nouveau tirage même si le code obtenu est identique', () => {
  let appels = 0;
  const aleatoire = () => {
    appels += 1;
    return 0;
  };
  const partie = creerPartie(aleatoire);
  const ancienSecret = partie.secret;

  reinitialiserPartie(partie, aleatoire);

  assert.equal(appels, 8);
  assert.deepEqual(partie.secret, ancienSecret);
  assert.notStrictEqual(partie.secret, ancienSecret);
});

test('Deux parties ne partagent ni leur code ni leur historique', () => {
  const premiere = creerPartie(() => 0);
  const seconde = creerPartie(() => 0);

  premiere.secret[0] = 'bleu';
  premiere.essais = 1;
  premiere.historique.push({ proposition: ['bleu', 'bleu', 'bleu', 'bleu'] });

  assert.deepEqual(seconde.secret, ['rouge', 'rouge', 'rouge', 'rouge']);
  assert.equal(seconde.essais, 0);
  assert.deepEqual(seconde.historique, []);
});

test('Un tirage invalide est refusé sans réinitialiser la partie existante', () => {
  const partie = creerPartie(() => 0);
  partie.essais = 2;
  const avant = structuredClone(partie);

  for (const valeur of [-0.1, 1, NaN, undefined]) {
    let appels = 0;
    // Échouer au quatrième tirage pour vérifier l’absence de réinitialisation partielle.
    const aleatoire = () => (++appels < 4 ? 0.99 : valeur);

    assert.throws(() => reinitialiserPartie(partie, aleatoire), RangeError);
    assert.deepEqual(partie, avant);
  }
});

const exemples = [
  {
    nom: 'Exemple officiel : couleurs répétées sans double comptage',
    secret: ['rouge', 'rouge', 'bleu', 'vert'],
    proposition: ['rouge', 'rouge', 'rouge', 'rouge'],
    attendu: { bienPlacees: 2, malPlacees: 0 },
  },
  {
    nom: 'Exemple officiel : une bien placée et deux mal placées',
    secret: ['rouge', 'bleu', 'vert', 'jaune'],
    proposition: ['rouge', 'vert', 'bleu', 'orange'],
    attendu: { bienPlacees: 1, malPlacees: 2 },
  },
  {
    nom: 'Quatre couleurs identiques correctement placées',
    secret: ['violet', 'violet', 'violet', 'violet'],
    proposition: ['violet', 'violet', 'violet', 'violet'],
    attendu: { bienPlacees: 4, malPlacees: 0 },
  },
  {
    nom: 'Aucune couleur commune',
    secret: ['rouge', 'bleu', 'rouge', 'bleu'],
    proposition: ['orange', 'violet', 'jaune', 'vert'],
    attendu: { bienPlacees: 0, malPlacees: 0 },
  },
  {
    nom: 'Quatre mal placées avec une couleur répétée',
    secret: ['rouge', 'rouge', 'bleu', 'vert'],
    proposition: ['bleu', 'vert', 'rouge', 'rouge'],
    attendu: { bienPlacees: 0, malPlacees: 4 },
  },
  {
    nom: 'Les répétitions excédentaires ne créent pas de mal placées',
    secret: ['rouge', 'bleu', 'bleu', 'vert'],
    proposition: ['bleu', 'rouge', 'rouge', 'rouge'],
    attendu: { bienPlacees: 0, malPlacees: 2 },
  },
  {
    nom: 'Les bien placées sont exclues du calcul des mal placées',
    secret: ['rouge', 'bleu', 'rouge', 'vert'],
    proposition: ['rouge', 'rouge', 'rouge', 'bleu'],
    attendu: { bienPlacees: 2, malPlacees: 1 },
  },
];

for (const { nom, secret, proposition, attendu } of exemples) {
  test(nom, () => {
    assert.deepEqual(calculerIndices(secret, proposition), attendu);
  });
}

test('Le calcul laisse le secret et la proposition inchangés', () => {
  const secret = Object.freeze(['rouge', 'rouge', 'bleu', 'vert']);
  const proposition = Object.freeze(['bleu', 'vert', 'rouge', 'rouge']);

  assert.deepEqual(calculerIndices(secret, proposition), {
    bienPlacees: 0,
    malPlacees: 4,
  });
  assert.deepEqual(secret, ['rouge', 'rouge', 'bleu', 'vert']);
  assert.deepEqual(proposition, ['bleu', 'vert', 'rouge', 'rouge']);
});

test('Le calcul refuse les combinaisons invalides avec une explication', () => {
  const valide = ['rouge', 'bleu', 'vert', 'jaune'];
  const invalides = [
    null,
    'rouge',
    [],
    ['rouge', 'bleu', 'vert'],
    ['rouge', 'bleu', 'vert', 'jaune', 'orange'],
    ['rouge', 'bleu', 'vert', 'rose'],
    ['Rouge', 'bleu', 'vert', 'jaune'],
    new Array(4),
  ];

  for (const invalide of invalides) {
    assert.throws(() => calculerIndices(valide, invalide), {
      name: 'TypeError',
      message: /quatre couleurs|Chaque couleur/,
    });
    assert.throws(() => calculerIndices(invalide, valide), {
      name: 'TypeError',
      message: /quatre couleurs|Chaque couleur/,
    });
  }
});
