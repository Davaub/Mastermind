// Ce module aide à installer le jeu ; il ne lit ni ne modifie la partie.
const guide = document.querySelector('#installer');
const bouton = document.querySelector('#installer-application');
const message = document.querySelector('#etat-installation');
const affichageApplication = window.matchMedia('(display-mode: standalone)');
let invitation = null;

function afficherMessage(texte) {
  message.textContent = texte;
  message.hidden = false;
}

function estInstallee() {
  // Safari sur iPhone expose aussi cette propriété lorsqu’on ouvre l’icône.
  return affichageApplication.matches || window.navigator.standalone === true;
}

function actualiserInstallation() {
  if (!estInstallee()) return;
  invitation = null;
  bouton.hidden = true;
  afficherMessage('Code secret est ouvert comme une application. Bonne partie !');
}

function ouvrirGuide() {
  if (window.location.hash === '#installer') guide.open = true;
}

// Cet événement dépend du navigateur. Les instructions restent disponibles sans lui.
window.addEventListener('beforeinstallprompt', (evenement) => {
  evenement.preventDefault();
  if (estInstallee()) return;
  invitation = evenement;
  bouton.hidden = false;
});

bouton.addEventListener('click', async () => {
  if (!invitation) return;
  const proposition = invitation;
  invitation = null;
  bouton.disabled = true;
  try {
    await proposition.prompt();
    const choix = await proposition.userChoice;
    afficherMessage(choix.outcome === 'accepted'
      ? 'Demande acceptée. Retrouvez Code secret parmi vos applications une fois l’installation terminée.'
      : 'Installation annulée. Vous pouvez continuer à jouer ou utiliser le menu du navigateur plus tard.');
  } catch {
    afficherMessage('L’installation n’a pas pu être proposée. Utilisez les instructions ci-dessous ou continuez dans le navigateur.');
  } finally {
    // Une invitation ne peut servir qu’une fois. Le navigateur pourra en fournir une autre.
    bouton.hidden = invitation === null || estInstallee();
    bouton.disabled = false;
  }
});

window.addEventListener('appinstalled', () => {
  invitation = null;
  bouton.hidden = true;
  afficherMessage('Installation terminée. Vous pouvez ouvrir Code secret depuis sa nouvelle icône.');
});

affichageApplication.addEventListener('change', actualiserInstallation);
window.addEventListener('hashchange', ouvrirGuide);
ouvrirGuide();
actualiserInstallation();
