// Logique interne du jeu : ce module ne définit pas l’API commune du cours.
export const COULEURS = Object.freeze(['rouge', 'bleu', 'vert', 'jaune', 'orange', 'violet']);

function tirerCode(aleatoire) {
  const secret = [];

  for (let position = 0; position < 4; position += 1) {
    const tirage = aleatoire();

    if (!Number.isFinite(tirage) || tirage < 0 || tirage >= 1) {
      throw new RangeError('Un tirage doit être un nombre compris entre 0 inclus et 1 exclu.');
    }

    // La palette reste entière à chaque tirage : les répétitions sont possibles.
    secret.push(COULEURS[Math.floor(tirage * COULEURS.length)]);
  }

  return secret;
}

// L’état est interne au moteur ; le secret ne devra pas être affiché au joueur.
export function creerPartieNonDemarree() {
  return { secret: null, essais: 0, historique: [], indices: null, statut: 'non-demarree' };
}

export function creerPartie(aleatoire = Math.random) {
  const partie = creerPartieNonDemarree();
  reinitialiserPartie(partie, aleatoire);
  return partie;
}

export function reinitialiserPartie(partie, aleatoire = Math.random, secretImpose) {
  // Terminer le tirage avant de remplacer l’état existant.
  if (secretImpose !== undefined) verifierCombinaison(secretImpose);
  const secret = secretImpose === undefined ? tirerCode(aleatoire) : [...secretImpose];

  partie.secret = secret;
  partie.essais = 0;
  partie.historique = [];
  partie.indices = null;
  partie.statut = 'en-cours';
}

// Traitement interne commun à la future interface et à son adaptateur de test.
export function soumettreProposition(partie, proposition) {
  if (partie.statut === 'non-demarree') {
    throw Object.assign(new Error('Démarrez une nouvelle partie avant de proposer des couleurs.'), { code: 'game-not-started' });
  }

  if (partie.statut !== 'en-cours') {
    throw Object.assign(new Error('Cette partie est terminée. Lancez une nouvelle partie.'), { code: 'game-finished' });
  }

  // Une erreur de validation doit survenir avant toute modification de la partie.
  const indices = calculerIndices(partie.secret, proposition);

  partie.essais += 1;
  partie.historique.push({
    proposition: [...proposition],
    indices: { ...indices },
  });
  partie.indices = indices;

  // Tester la victoire d’abord : elle reste possible au dixième essai.
  if (indices.bienPlacees === 4) {
    partie.statut = 'gagnee';
  } else if (partie.essais === 10) {
    partie.statut = 'perdue';
  }

  // Le résultat transmis à l’appelant ne partage pas les indices conservés.
  return { ...indices };
}

export function verifierCombinaison(combinaison) {
  if (!Array.isArray(combinaison)) {
    throw Object.assign(new TypeError('Une combinaison doit être un tableau de quatre couleurs.'), { code: 'invalid-type' });
  }

  // Le contrat contrôle les éléments absents ou non textuels avant la longueur.
  for (let position = 0; position < combinaison.length; position += 1) {
    if (!Object.hasOwn(combinaison, position) || typeof combinaison[position] !== 'string') {
      throw Object.assign(new TypeError('Chaque couleur doit être une chaîne de caractères présente dans le tableau.'), { code: 'invalid-type' });
    }
  }

  if (combinaison.length !== 4) {
    throw Object.assign(new TypeError('Une combinaison doit contenir exactement quatre couleurs.'), { code: 'invalid-length' });
  }

  for (const couleur of combinaison) {
    if (!COULEURS.includes(couleur)) {
      throw Object.assign(new TypeError('Chaque couleur doit être rouge, bleu, vert, jaune, orange ou violet.'), { code: 'invalid-color' });
    }
  }
}

// Renvoie seulement deux nombres, sans révéler les positions concernées.
export function calculerIndices(secret, proposition) {
  verifierCombinaison(secret);
  verifierCombinaison(proposition);

  let bienPlacees = 0;
  let malPlacees = 0;
  const secretRestant = [];
  const propositionRestante = [];

  // Retirer d’abord toutes les correspondances à la bonne position.
  for (let position = 0; position < 4; position += 1) {
    if (secret[position] === proposition[position]) {
      bienPlacees += 1;
    } else {
      secretRestant.push(secret[position]);
      propositionRestante.push(proposition[position]);
    }
  }

  for (const couleur of propositionRestante) {
    const position = secretRestant.indexOf(couleur);

    if (position !== -1) {
      malPlacees += 1;
      // Consommer cette occurrence pour qu’elle ne soit comptée qu’une fois.
      secretRestant.splice(position, 1);
    }
  }

  return { bienPlacees, malPlacees };
}
