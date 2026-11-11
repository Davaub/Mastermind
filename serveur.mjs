// Outil de prévisualisation local. Le jeu publié n’a pas besoin de ce fichier.
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const fichiers = new Map([
  ['/', ['index.html', 'text/html']],
  ['/index.html', ['index.html', 'text/html']],
  ['/style.css', ['style.css', 'text/css']],
  ['/interface.js', ['interface.js', 'text/javascript']],
  ['/jeu.js', ['jeu.js', 'text/javascript']],
]);

const serveur = createServer(async (requete, reponse) => {
  const chemin = new URL(requete.url, 'http://127.0.0.1:8000').pathname;
  const fichier = fichiers.get(chemin);
  if (!fichier || !['GET', 'HEAD'].includes(requete.method)) {
    reponse.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    reponse.end('Page introuvable.');
    return;
  }

  try {
    const contenu = await readFile(new URL(fichier[0], import.meta.url));
    reponse.writeHead(200, {
      'Content-Type': `${fichier[1]}; charset=utf-8`,
      'Cache-Control': 'no-store',
    });
    reponse.end(requete.method === 'HEAD' ? undefined : contenu);
  } catch {
    reponse.writeHead(500, { 'Content-Type': 'text/plain; charset=utf-8' });
    reponse.end('Impossible de lire le fichier demandé.');
  }
});

serveur.on('error', (erreur) => {
  console.error(erreur.code === 'EADDRINUSE'
    ? 'Le port 8000 est déjà utilisé. Arrêtez l’autre prévisualisation avant de recommencer.'
    : `Impossible de démarrer la prévisualisation : ${erreur.message}`);
  process.exitCode = 1;
});
serveur.listen(8000, '127.0.0.1', () => {
  console.log('Code secret : http://127.0.0.1:8000 — Ctrl+C pour arrêter.');
});
