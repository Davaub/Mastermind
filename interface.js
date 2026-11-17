import { COULEURS, creerPartie, creerPartieNonDemarree, reinitialiserPartie, soumettreProposition } from './jeu.js';
import { creerApiTest } from './api-test.js';

const modeTest = new URLSearchParams(window.location.search).get('test') === '1';
const partie = modeTest ? creerPartieNonDemarree() : creerPartie();
const formulaire = document.querySelector('#proposition');
const champs = document.querySelector('#champs-proposition');
const selecteurs = [...formulaire.querySelectorAll('select')];
const apercus = [...formulaire.querySelectorAll('.apercu')];
const valider = document.querySelector('#valider');
const nouvellePartie = document.querySelector('#nouvelle-partie');
const compteur = document.querySelector('#compteur');
const etat = document.querySelector('#etat');
const message = document.querySelector('#message');
const historique = document.querySelector('#historique');
const historiqueVide = document.querySelector('#historique-vide');
const revenirProposition = document.querySelector('#revenir-proposition');
let navigationClavier = false;

// Suivre l’action réelle plutôt que le type d’appareil : un téléphone peut avoir un clavier.
document.addEventListener('keydown', () => { navigationClavier = true; });
document.addEventListener('pointerdown', () => { navigationClavier = false; });

function focaliserAuClavier(selecteur) {
  // Sur écran tactile, activer une liste peut ouvrir son menu sans choix volontaire.
  if (navigationClavier) selecteur?.focus();
}

function nomCouleur(couleur) {
  return couleur[0].toUpperCase() + couleur.slice(1);
}

function pastille(couleur) {
  const element = document.createElement('span');
  element.className = 'pastille';
  element.dataset.couleur = couleur;
  element.setAttribute('aria-hidden', 'true');
  return element;
}

// Palette et choix proviennent de la même liste que le moteur.
for (const couleur of COULEURS) {
  const element = document.createElement('li');
  element.append(pastille(couleur), nomCouleur(couleur));
  document.querySelector('#couleurs').append(element);

  for (const selecteur of selecteurs) {
    const option = document.createElement('option');
    option.value = couleur;
    option.textContent = nomCouleur(couleur);
    selecteur.append(option);
  }
}

function afficherMessage(texte, type = 'information') {
  message.textContent = texte;
  message.dataset.type = type;
}

function afficherApercus() {
  selecteurs.forEach((selecteur, position) => {
    apercus[position].dataset.couleur = selecteur.value;
    apercus[position].textContent = selecteur.value ? '' : '?';
    selecteur.removeAttribute('aria-invalid');
  });
}

function afficherHistorique() {
  historique.replaceChildren();
  historiqueVide.hidden = partie.historique.length > 0;

  partie.historique.forEach((essai, position) => {
    const ligne = document.createElement('li');
    ligne.className = 'ligne-essai';
    const numero = document.createElement('p');
    numero.className = 'numero-essai';
    numero.textContent = `Essai ${position + 1}`;

    const combinaison = document.createElement('ol');
    combinaison.className = 'combinaison';
    combinaison.setAttribute('aria-label', `Proposition de l’essai ${position + 1}`);
    for (const couleur of essai.proposition) {
      const jeton = document.createElement('li');
      jeton.className = 'jeton';
      jeton.append(pastille(couleur), nomCouleur(couleur));
      combinaison.append(jeton);
    }

    const indices = document.createElement('p');
    indices.className = 'indices';
    for (const [nombre, libelle] of [
      [essai.indices.bienPlacees, 'bien placée'],
      [essai.indices.malPlacees, 'mal placée'],
    ]) {
      const indication = document.createElement('span');
      const valeur = document.createElement('strong');
      valeur.textContent = String(nombre);
      indication.append(valeur, ` ${libelle}${nombre > 1 ? 's' : ''}`);
      indices.append(indication);
    }

    ligne.append(numero, combinaison, indices);
    historique.append(ligne);
  });
}

function afficherPartie() {
  const saisieIndisponible = partie.statut !== 'en-cours';
  compteur.textContent = String(partie.essais);
  champs.disabled = saisieIndisponible;
  valider.disabled = saisieIndisponible;
  etat.textContent = { 'non-demarree': 'À démarrer', 'en-cours': 'En cours', gagnee: 'Gagnée', perdue: 'Perdue' }[partie.statut];
  etat.dataset.statut = partie.statut;
  afficherHistorique();
}

// Ces actions mettent à jour la même partie et son écran, quelle que soit leur origine.
// Les déplacements du focus restent dans les interactions du joueur.
function demarrerPartie(secretImpose) {
  reinitialiserPartie(partie, Math.random, secretImpose);
  formulaire.reset();
  afficherApercus();
  afficherPartie();
  afficherMessage('Nouvelle partie : à vous de trouver le code !');
}

function proposerCouleurs(proposition) {
  const indices = soumettreProposition(partie, proposition);
  afficherPartie();
  if (partie.statut === 'gagnee') {
    afficherMessage(`Bravo ! Vous avez trouvé le code en ${partie.essais} essai${partie.essais > 1 ? 's' : ''}.`, 'victoire');
  } else if (partie.statut === 'perdue') {
    afficherMessage('Partie perdue : les dix essais sont utilisés. Lancez une nouvelle partie pour réessayer.');
  } else {
    afficherMessage(`Essai ${partie.essais} enregistré. Consultez les indices et ajustez votre proposition.`);
  }
  return indices;
}

formulaire.addEventListener('change', afficherApercus);

for (const selecteur of selecteurs) {
  selecteur.addEventListener('keydown', (evenement) => {
    const sens = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[evenement.key];
    if (!sens || evenement.defaultPrevented || evenement.isComposing
      || evenement.altKey || evenement.ctrlKey || evenement.metaKey || evenement.shiftKey
      || selecteur.matches(':disabled')) return;

    // Quand le menu natif est ouvert, conserver ses commandes habituelles.
    if (CSS.supports('selector(:open)') && selecteur.matches(':open')) return;

    evenement.preventDefault();
    const position = COULEURS.indexOf(selecteur.value);
    const suivante = position < 0
      ? (sens === 1 ? 0 : COULEURS.length - 1)
      : (position + sens + COULEURS.length) % COULEURS.length;
    selecteur.value = COULEURS[suivante];
    selecteur.dispatchEvent(new Event('change', { bubbles: true }));
  });
}

revenirProposition.addEventListener('click', (evenement) => {
  evenement.preventDefault();
  // Après la fin, la nouvelle partie est la prochaine commande utilisable.
  if (partie.statut === 'en-cours') selecteurs[0].focus();
  else nouvellePartie.focus();
});

// Les boutons et les appels externes emploient les mêmes commandes et la même erreur courante.
const commandes = creerApiTest({
  partie, demarrerPartie, proposerCouleurs,
  afficherRefus: (texte) => afficherMessage(texte, 'erreur'),
});

formulaire.addEventListener('submit', async (evenement) => {
  evenement.preventDefault();
  const resultat = await commandes.submitGuess(selecteurs.map((selecteur) => selecteur.value));
  if (resultat.lastError) {
    const incomplets = selecteurs.filter((selecteur) => !selecteur.value);
    afficherMessage(
      incomplets.length && partie.statut === 'en-cours'
        ? 'Complétez les quatre positions avant de valider votre proposition.'
        : resultat.lastError.message,
      'erreur',
    );
    for (const selecteur of incomplets) selecteur.setAttribute('aria-invalid', 'true');
    focaliserAuClavier(incomplets[0]);
    return;
  }

  if (partie.statut !== 'en-cours') {
    nouvellePartie.focus();
  } else {
    focaliserAuClavier(selecteurs[0]);
  }
});

nouvellePartie.addEventListener('click', async () => {
  await commandes.startGame();
  focaliserAuClavier(selecteurs[0]);
});

afficherPartie();
nouvellePartie.disabled = false;
afficherMessage(modeTest
  ? 'Mode test : activez « Nouvelle partie » pour commencer.'
  : 'Composez votre première proposition.');

// Publier l’objet seulement après l’initialisation complète de la page.
if (modeTest) window.codeSecretTest = commandes;
