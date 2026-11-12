# Code secret

Code secret est un jeu de déduction pour une personne, inspiré du Mastermind. Le joueur doit retrouver une combinaison de quatre couleurs en dix essais maximum.

Ce projet individuel est réalisé à la HEG Genève avec l’aide de Codex pour le développement, les vérifications et la documentation.

**[Jouer à Code secret](https://davaub.github.io/Mastermind/)** · **[Consulter le dépôt GitHub](https://github.com/Davaub/Mastermind)**

## Découvrir le jeu

Le jeu est publié depuis le 12 novembre 2026. L’interface est entièrement en français : elle permet de composer une proposition, de consulter les essais précédents et leurs indices, de lire les règles et de commencer une nouvelle partie.

Les couleurs portent un nom pour rester identifiables autrement que par leur apparence. Des essais ont été réalisés au clavier sur ordinateur, puis par l’étudiant sur un iPhone 16 avec Safari. Ces vérifications et leurs limites sont présentées plus bas.

Le jeu ne demande aucun compte et ne collecte aucune donnée personnelle. Il n’intègre ni paiement, ni classement en ligne, ni service d’intelligence artificielle, ni clé API. Le fonctionnement hors ligne, l’installation comme application Web et les mises à jour automatiques restent facultatifs et ne sont pas prioritaires.

## Jouer et lancer le projet

### Jouer en ligne

Ouvrir [le jeu publié](https://davaub.github.io/Mastermind/) dans un navigateur. Une connexion Internet est nécessaire pour charger la page, mais aucun logiciel supplémentaire ni terminal n’est nécessaire.

Choisir une couleur pour chacun des quatre emplacements, puis appuyer sur **« Valider la proposition »**. Les choix restent modifiables avant la validation. L’historique affiche ensuite la proposition et les deux indices obtenus. Le bouton **« Nouvelle partie »** permet de recommencer.

Au clavier, Tabulation avance entre les commandes et Maj+Tab revient en arrière. Entrée active un bouton ou un lien. Lorsqu’une liste de couleurs est fermée, les flèches Bas et Droite passent à la couleur suivante ; Haut et Gauche reviennent à la précédente. Le parcours boucle entre Violet et Rouge. Depuis un emplacement vide, Bas et Droite commencent par Rouge, tandis que Haut et Gauche commencent par Violet.

Tant que la partie continue, valider au clavier ramène automatiquement au premier emplacement pour faciliter l’essai suivant. Une proposition incomplète validée au clavier conduit plutôt au premier emplacement vide. Après une nouvelle partie lancée au clavier, le premier emplacement est également sélectionné. Avec la souris ou l’écran tactile, le joueur choisit lui-même l’emplacement à modifier.

Le lien « Revenir à la proposition », placé après les règles, apparaît lorsqu’il est atteint avec Tabulation. Il permet de revenir au premier emplacement ou, si la partie est terminée, au bouton « Nouvelle partie ». La navigation reste libre de quitter la page.

### Lancer une version locale sous Windows

La version locale permet d’essayer les fichiers présents sur l’ordinateur avant de les envoyer sur GitHub. Elle sert au développement ; pour simplement jouer, le lien public suffit.

1. Ouvrir le dossier du projet et double-cliquer sur `lancer-jeu.cmd`.
2. Garder la fenêtre ouverte et ouvrir [le jeu local](http://127.0.0.1:8000/).
3. Pour arrêter, fermer cette fenêtre ou appuyer sur Ctrl+C. Il faudra relancer le fichier pour rejouer à cette adresse.

L’adresse locale désigne cet ordinateur. Elle fonctionne seulement tant que la fenêtre de lancement reste ouverte. Le lien GitHub Pages, lui, reste accessible sans lancer quoi que ce soit sur l’ordinateur.

**Si Node.js est disponible dans le terminal.** Node.js est l’outil qui exécute JavaScript en dehors du navigateur. Pour démarrer la prévisualisation autrement, ouvrir un terminal dans le dossier principal du projet. Vérifier d’abord que `node --version` affiche une version, puis exécuter `node serveur.mjs`. La version essayée est Node.js 24.22.1 ; aucune bibliothèque supplémentaire n’est nécessaire.

**Si la commande Node.js n’est pas reconnue.** Sur cet ordinateur, `lancer-jeu.cmd` peut utiliser la copie de Node.js fournie avec Codex. Le fichier `.node-local` indique où la trouver. Ce chemin dépend de la machine : il n’est pas envoyé sur GitHub et n’accompagne pas un téléchargement du dépôt.

Si le lanceur ne trouve plus Node.js après une mise à jour de Codex, ce chemin devra être actualisé. L’installation de Node.js comme logiciel indépendant n’a pas été effectuée.

## Comprendre les règles

Le programme tire quatre couleurs parmi `rouge`, `bleu`, `vert`, `jaune`, `orange` et `violet`. Une couleur peut être répétée. La combinaison reste fixe et cachée pendant toute la partie.

Chaque proposition doit contenir exactement quatre couleurs autorisées, dans l’ordre choisi. Une proposition invalide est refusée avec une explication. Elle ne consomme aucun essai et ne modifie ni l’historique ni les indices précédents. Une proposition valide consomme un seul essai.

Les indices donnent deux nombres. Le premier indique combien de couleurs sont **bien placées**, c’est-à-dire de la bonne couleur et au bon emplacement. Le second indique combien de couleurs sont **mal placées** : elles sont présentes dans le secret, mais ailleurs.

Une même couleur peut apparaître plusieurs fois, mais chaque exemplaire ne doit servir qu’une seule fois au calcul. Le programme commence par compter les couleurs bien placées. Il cherche ensuite les mal placées parmi les couleurs qui n’ont pas encore été comptées.

Par exemple, avec le secret **rouge, rouge, bleu, vert**, proposer **rouge, rouge, rouge, rouge** donne **deux bien placées et aucune mal placée**. Les deux rouges du secret correspondent déjà aux deux premiers emplacements. Il n’en reste donc aucun pour compter les deux autres rouges comme mal placés.

Le jeu affiche uniquement ces deux nombres ; il ne désigne pas les emplacements auxquels ils correspondent.

Le joueur gagne avec quatre couleurs bien placées, y compris au dixième essai. Sinon, dix propositions incorrectes terminent la partie. Les propositions suivantes sont sans effet et les résultats restent consultables. Une nouvelle partie efface les choix, le compteur, l’historique et les indices. Le nouveau tirage peut, par hasard, produire le même code.

Les documents de référence sont conservés dans `doc/` :

- [Sujet officiel, édition 2.1](<doc/Projet — Code secret en couleurs, inspiré du Mastermind.pdf>) : l’annexe `code-couleurs-1.0`, page 4, fait foi pour les règles. La page 2 présente les jalons.
- [Guide README, version 1.0](<doc/Rédiger un bon README.md — Guide général.pdf>).
- [Guide AGENTS, version 1.0](<doc/Créer un bon fichier AGENTS.md — Guide général.pdf>).

## Comprendre les choix de conception

HTML structure la page, CSS définit son apparence et JavaScript gère son comportement. Ces technologies fonctionnent directement dans le navigateur, sans dépendance ajoutée, et conviennent à GitHub Pages.

Le **moteur du jeu** est la partie du programme qui choisit le secret, conserve les propositions, compte les essais et calcule les indices. L’**interface** correspond à ce que le joueur voit et utilise : les quatre emplacements, les boutons et les résultats affichés. Séparer ces deux rôles permet de vérifier les règles sans devoir cliquer dans la page.

L’API commune 0.2 sera un moyen pour le professeur de démarrer une partie, d’envoyer des propositions et de consulter les résultats depuis des fonctions de test. Ces fonctions devront agir sur la partie utilisée par l’interface, avec le même secret, le même compteur et le même historique. Le professeur pourra ainsi tester le jeu réellement utilisé à l’écran.

Cette API n’est pas encore développée. Le contrat officiel, qui précisera les fonctions à fournir et leur utilisation, reste attendu.

Deux remarques de l’étudiant ont conduit à améliorer l’utilisation du jeu au clavier.

La première concernait le choix des couleurs. Au départ, lorsque Violet, la dernière couleur de la liste, était sélectionné, appuyer encore sur la flèche Bas ne changeait plus rien. Il fallait utiliser la flèche Haut pour revenir aux autres couleurs. Le parcours a été modifié pour former une boucle : depuis Violet, la flèche Bas passe à Rouge ; depuis Rouge, la flèche Haut passe à Violet. Le joueur peut ainsi continuer dans le même sens.

La deuxième remarque concernait Tabulation, qui permet de passer d’une commande à la suivante. Après la dernière commande du jeu, appuyer encore sur cette touche faisait sortir de la zone du jeu. Pour faciliter le retour à la saisie, un lien « Revenir à la proposition » a été ajouté après les règles. Il apparaît lorsqu’on l’atteint au clavier. Appuyer sur Entrée conduit au premier emplacement ou, si la partie est terminée, au bouton « Nouvelle partie ».

La possibilité de quitter le jeu avec Tabulation a été conservée. Cela permet à une personne utilisant uniquement le clavier d’accéder aussi aux éléments extérieurs au jeu. C’est le sens du [principe d’absence de piège au clavier du W3C](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) : une personne doit pouvoir sortir d’un élément au clavier, sans y rester bloquée.

Le retour automatique vers le premier emplacement facilite la préparation de l’essai suivant au clavier : le joueur peut directement changer une couleur avec les flèches. Ce déplacement est réservé aux actions au clavier. Avec la souris ou l’écran tactile, le joueur choisit lui-même la liste de couleurs à ouvrir.

## Consulter les vérifications

Les résultats suivants proviennent des tests et des essais déjà réalisés. La présente réécriture ne constitue pas une nouvelle exécution du jeu.

### Tests des règles du jeu

Le 12 novembre 2026, les tests ont été relancés sous Windows avec Node.js 24.22.1 sur `c43d997`. Les **27 tests ont réussi, sans échec** : neuf sur les indices, sept sur le démarrage et la réinitialisation, onze sur les propositions et le déroulement de la partie.

Pour les relancer depuis la racine du projet, utiliser `node --test --test-reporter=spec jeu.test.mjs`. Les cas détaillés sont conservés dans [jeu.test.mjs](jeu.test.mjs).

| Comportement vérifié | Résultat attendu | Résultat observé et statut |
| --- | --- | --- |
| 1. Proposer seulement trois couleurs, avant ou après un essai valide. | Le refus est expliqué et la partie reste inchangée. | L’état a été conservé dans les deux cas. **Réussi.** |
| 2. Proposer quatre couleurs autorisées. | Un essai est consommé ; la proposition et ses indices sont conservés. | Le compteur est passé à 1 et une entrée correcte a été ajoutée. **Réussi.** |
| 3. Proposer quatre rouges pour le secret rouge, rouge, bleu, vert. | Obtenir deux bien placées et aucune mal placée. | Les deux nombres obtenus sont 2 et 0. **Réussi.** |
| 4. Trouver le secret au dixième essai, après un refus intermédiaire. | Le refus ne consomme rien et le dixième essai donne la victoire. | Le compteur est resté inchangé après le refus, puis la victoire a été obtenue à 10. **Réussi.** |
| 5. Faire dix propositions incorrectes. | La partie est perdue et les résultats sont conservés. | La défaite et dix entrées d’historique ont été constatées. **Réussi.** |
| 6. Proposer après une victoire ou une défaite. | La partie ne change plus. | Les propositions ont été refusées sans changer compteur, historique ou indices. **Réussi.** |
| 7. Recommencer en cours de partie, après victoire et après défaite. | Un nouveau tirage est effectué ; la partie est réinitialisée et rejouable. | La réinitialisation et l’essai suivant ont fonctionné dans les trois cas. **Réussi.** |
| 8. Jouer au clavier et au toucher, avec des indices lisibles. | Les commandes et les résultats restent utilisables. | Les essais sur ordinateur et iPhone sont décrits ci-dessous. Ils ne font pas partie des tests du moteur. |

L’autre exemple officiel a également réussi : pour le secret rouge, bleu, vert, jaune et la proposition rouge, vert, bleu, orange, le résultat obtenu est une bien placée et deux mal placées.

Le fichier contient aussi des tests complémentaires. Ils vérifient notamment que :

- Une proposition contenant une couleur interdite ou trop peu de couleurs est refusée, et une couleur répétée trop souvent ne donne pas d’indice supplémentaire.
- Modifier les couleurs préparées pour un prochain essai ne réécrit pas les résultats déjà conservés dans l’historique.
- Le secret reste identique pendant la partie, et une proposition correcte dès le premier essai donne la victoire.
- Chacune des six couleurs peut être tirée, y compris la première et la dernière de la liste. Une nouvelle partie effectue un nouveau tirage, même si le code obtenu est identique.
- Deux parties conservent chacune leur secret et leur historique : modifier l’une ne change pas l’autre.

Pour contrôler certains cas, les tests remplacent le tirage au hasard par une fonction dont le résultat est connu à l’avance. Un test lui fait produire une valeur impossible. Il vérifie alors que la nouvelle partie est refusée et que l’ancienne reste entièrement intacte. Cela évite qu’un problème de tirage efface seulement une partie des données.

### Essais dans le navigateur et contrôle de la publication

Sur la première version, le 11 novembre, Codex a contrôlé les propositions invalides et valides, la modification d’un choix avant validation, la victoire au dixième essai, la défaite, le blocage des commandes et les réinitialisations. Ces essais ont réussi dans le navigateur intégré sous Windows. Le secret avait été déduit des indices pour préparer la victoire, sans accès interne à la combinaison cachée.

**Lisibilité et utilisation au clavier.** Codex a vérifié que les règles pouvaient être ouvertes, que les commandes étaient utilisables et que le secret restait masqué, même après la fin de la partie.

Pour imiter un petit écran, la fenêtre du navigateur a été réduite à des largeurs de 320 et 390 pixels. Le pixel est une unité de mesure de l’affichage. Le contenu ne dépassait pas sur les côtés : aucun défilement horizontal n’était nécessaire. Les listes de couleurs et les boutons mesuraient 44 pixels de haut. Ces mesures décrivent les essais effectués sur ordinateur ; elles ne constituent pas à elles seules une vérification sur téléphone.

**Adaptations de la navigation.** Le 12 novembre, les quatre emplacements ont été essayés avec les flèches dans les deux sens. Le passage de Violet à Rouge et de Rouge à Violet a fonctionné. Tabulation et Maj+Tab permettaient de changer de commande ; la lettre R sélectionnait Rouge, tandis que Maj+Bas sur Violet conservait Violet.

Le lien de retour était masqué au repos, puis visible lorsqu’il était atteint au clavier. Il mesurait finalement 48 pixels de haut, y compris dans une fenêtre de 320 pixels de large. Il permettait de revenir à la proposition ou de rejoindre « Nouvelle partie » après une défaite. Ces essais ont réussi.

**Fonctionnement sur le site public.** Après publication, Codex a vérifié les propositions incomplètes, les propositions valides et les nouvelles parties directement sur le site. Les refus n’ajoutaient pas d’essai ; les propositions valides étaient enregistrées ; une nouvelle partie remettait les choix, le compteur et l’historique à zéro.

Après la correction pour le toucher, un clic sur un bouton n’activait plus une liste de couleurs. Au clavier, le retour automatique restait utilisable, même après avoir alterné entre clavier et souris. Codex n’a relevé aucun message d’erreur ou d’avertissement provenant du code du jeu pendant ces parcours.

**Chargement des fichiers publiés.** Lors de la préparation de J1, Codex a comparé les quatre fichiers nécessaires au jeu en ligne avec ceux du projet local : la page HTML, la feuille de style CSS et les deux fichiers JavaScript. Leurs contenus étaient identiques. Chaque fichier se chargeait avec une réponse HTTP 200, qui signifie que la demande avait réussi. Le navigateur recevait aussi chaque fichier avec le type de contenu attendu.

Le dépôt GitHub était public et la publication avait réussi. GitHub Pages utilisait les fichiers du dossier principal dans la branche `main`. L’accès au jeu imposait HTTPS, c’est-à-dire une connexion chiffrée entre le navigateur et le site.

**Versions concernées :** premiers essais sur `v0.1.0` ; adaptations testées sur `641a89c`, puis sauvegardées dans `a128ef3` ; parcours publics sur `a128ef3` puis `a299db8`. La version `c43d997` conserve le même jeu avec une documentation actualisée.

### Essais réalisés par l’étudiant

Les observations ci-dessous proviennent des essais réalisés par l’étudiant le 12 novembre 2026. Elles sont distinguées des contrôles effectués par Codex.

#### Première prise en main du jeu

Le premier parcours servait à vérifier que le jeu pouvait être ouvert et que ses commandes principales étaient compréhensibles. L’étudiant a confirmé les quatre points proposés :

- Le jeu s’ouvrait dans le navigateur après le lancement de la prévisualisation.
- Avec seulement trois couleurs choisies, la validation affichait une explication et ne consommait aucun essai.
- Avec quatre couleurs choisies, la validation ajoutait un essai au compteur et enregistrait la proposition avec ses indices dans l’historique.
- Le bouton « Nouvelle partie » remettait le compteur à zéro et effaçait les choix et l’historique.

L’étudiant a jugé les informations claires et n’a pas signalé de difficulté lors de ce premier parcours. Le navigateur utilisé et la manière exacte de lancer le jeu n’ont pas été précisés.

#### Utilisation au clavier

Un deuxième parcours portait sur la possibilité de jouer sans souris : atteindre les commandes avec Tabulation, choisir les couleurs avec les flèches, valider avec Entrée et recommencer une partie. L’étudiant a confirmé le fonctionnement de ces actions.

Il a aussi signalé deux gênes. En poursuivant avec Tabulation après la dernière commande, il quittait la zone du jeu. Par ailleurs, lorsqu’il arrivait à la dernière couleur d’une liste, il devait inverser le sens des flèches pour revenir aux autres couleurs.

Ces remarques ont conduit à ajouter le lien « Revenir à la proposition » et à faire suivre Violet par Rouge lorsque le joueur continue avec la flèche Bas. Les choix retenus sont expliqués dans la section sur la conception ; les contrôles des adaptations figurent dans les essais de Codex.

#### Utilisation sur iPhone avec Safari

L’étudiant a ensuite ouvert le site public sur un **iPhone 16 avec Safari**. Il a confirmé que l’accès au jeu, le refus d’une proposition de trois couleurs, la validation d’une proposition complète et la nouvelle partie fonctionnaient. Il a aussi confirmé que les règles, les couleurs et les commandes étaient lisibles et utilisables sur le téléphone.

Une gêne supplémentaire est apparue : après un toucher sur « Valider la proposition » ou « Nouvelle partie », une liste de couleurs s’ouvrait automatiquement, alors qu’il n’avait pas touché un emplacement de couleur.

Après la correction décrite dans « Safari ouvrait une liste après un bouton », l’étudiant a refait l’essai sur son iPhone. Il a confirmé que le problème était résolu dans Safari. Les versions exactes d’iOS et de Safari ne sont pas connues.

**Repères des versions testées :** la première prise en main concernait `v0.1.0` avec le correctif de lancement ; le parcours clavier concernait `641a89c`. L’ouverture involontaire sur iPhone a été signalée sur `6f39809`, puis le fonctionnement du correctif a été confirmé sur `c43d997`.

## Comprendre les corrections

### Le jeu ne redémarrait pas dans Windows

**Problème constaté.** Le 12 novembre, la commande `node --version` n’était pas reconnue dans un terminal Windows ordinaire et la prévisualisation était arrêtée. Le README avait généralisé un lancement testé dans l’environnement de Codex.

**Modification réalisée.** Le fichier `lancer-jeu.cmd` a été ajouté pour trouver Node.js dans Windows ou grâce au chemin local exclu de Git.

**Résultat.** Le lancement a réussi depuis un autre dossier avec le chemin de recherche habituel de Windows ; les quatre fichiers du jeu se chargeaient. Un second lancement sur le port occupé a affiché « port 8000 déjà utilisé » et s’est terminé avec le code 1, sans arrêter le premier. L’étudiant a confirmé la reprise. Le double-clic n’a pas été vérifié isolément, ni le lancement sur un autre ordinateur. Le correctif est conservé dans `641a89c`, après `v0.1.0`.

### Les aperçus des couleurs restaient gris

**Problème constaté.** Sur un écran simulé de 320 pixels, choisir rouge, bleu, vert et jaune laissait les quatre disques gris. Leur couleur mesurée était `rgb(233,236,227)`, alors que la pastille rouge de la palette était `rgb(200,79,79)`.

**Modification réalisée.** Dans le CSS, les règles des couleurs ont été placées après celle du fond neutre, qui les remplaçait auparavant.

**Résultat.** Le même essai a produit des disques correspondant à la palette. Les valeurs relevées étaient `200,79,79` pour le rouge, `71,124,184` pour le bleu, `82,132,91` pour le vert et `233,194,76` pour le jaune. Les six couleurs et le retour au point d’interrogation après réinitialisation ont été vérifiés. Le contrôle a réussi ; le correctif est inclus dans `v0.1.0`, du 11 novembre.

### Safari ouvrait une liste après un bouton

**Problème constaté.** Sur iPhone, appuyer sur « Valider la proposition » ou « Nouvelle partie » ouvrait une liste sans choix volontaire. Codex a constaté le retour systématique vers le premier emplacement, sans reproduire le menu propre à iOS. Ce déplacement a été retenu comme explication probable.

**Modification réalisée.** Le jeu distingue désormais une action au clavier d’une action avec la souris ou le toucher. Le retour automatique vers une couleur est réservé au clavier.

**Résultat.** Les contrôles locaux et publics ont confirmé le maintien sur le bouton après un clic, le retour utile au clavier et le refus sans essai consommé d’une proposition incomplète. L’étudiant a ensuite confirmé la correction sur iPhone avec Safari. Le problème avait été signalé sur `6f39809`, corrigé dans `a299db8` et confirmé sur `c43d997`, le 12 novembre.

## Reprendre le développement

Les fichiers restent séparés selon leur rôle :

- `index.html` structure la page et `style.css` définit son apparence.
- `jeu.js` contient les règles et l’état de la partie. `interface.js` gère les interactions et l’affichage.
- `jeu.test.mjs` conserve les tests du moteur.
- `serveur.mjs` et `lancer-jeu.cmd` servent uniquement à la prévisualisation locale. Celle-ci limite les fichiers accessibles ; le refus du README avec une réponse 404 a été vérifié, ainsi que les requêtes HEAD, qui demandent les informations du fichier sans son contenu.
- `AGENTS.md` contient les consignes de travail. `doc/` conserve les trois sources. `.gitignore` exclut notamment `.node-local` et les fichiers privés.

Pour reprendre, lire README, AGENTS et les sources pertinentes. La méthode est **Cadrer → Confier → Examiner → Vérifier → Documenter**. L’accord de l’étudiant est nécessaire avant toute sauvegarde Git, création de tag, envoi ou publication. Les versions sauvegardées sont dans l’[historique Git](https://github.com/Davaub/Mastermind/commits/main/).

### Limites et informations attendues

**Les documents manquants du cours.** Le contrat API 0.2, les indications associées et le modèle de départ ne sont pas encore disponibles. Le contrat devra préciser les fonctions attendues, les informations à leur transmettre, les résultats qu’elles doivent renvoyer et le traitement des erreurs. Il reste aussi à préciser s’il prévoit un moyen de refaire plusieurs fois un essai avec un secret connu. Aucun format n’est supposé avant réception de ce document.

**Les appareils et les aides à la lecture.** Les essais sur téléphone concernent uniquement l’iPhone 16 avec Safari de l’étudiant. Les autres appareils mobiles n’ont pas été essayés. Le jeu n’a pas non plus été contrôlé avec un lecteur d’écran, un logiciel qui restitue oralement le contenu de la page. Aucun examen complet de son accessibilité n’a été réalisé.

**Les actions qui restent à vérifier.** Dans le navigateur utilisé par Codex, l’outil de contrôle n’a pas permis de confirmer l’ouverture de la liste de couleurs affichée par le navigateur. Le lien de retour a été essayé après une défaite, mais pas séparément après une victoire. Ces points ne sont donc pas présentés comme vérifiés.

**Les limites des essais sur le hasard.** Les tests montrent que les couleurs autorisées peuvent être tirées. Ils ne mesurent pas la fréquence de chaque combinaison sur un grand nombre de parties ; aucune étude statistique du hasard n’a été réalisée.

**Les essais avec un secret connu.** Pour vérifier certains résultats précis, les tests utilisent une combinaison secrète choisie à l’avance. Ils comparent ainsi les indices calculés avec ceux attendus. Ces essais sont réalisés directement sur les fonctions du moteur, sans passer par les boutons de la page.

### Prochaines échéances

**J1 est prévu le 20 novembre 2026 au soir.** Les liens, les règles, les choix, les tests, les corrections avant/après et les limites sont documentés. La version retenue pour ce rendu est désignée par le tag `jalon-1`, un repère qui permet de retrouver exactement les fichiers remis. La sauvegarde et l’envoi de cette version sur GitHub sont autorisés par l’étudiant. La remise sur Cyberlearn reste à effectuer ; aucune vidéo n’est demandée pour J1.

**J2 est prévu le 18 décembre 2026 au soir.** Il faudra intégrer et vérifier l’API 0.2 obligatoire sur le même jeu publié, actualiser la documentation, essayer le jeu d’un camarade et en faire un bref retour. Le tag `final` sera préparé après accord. Une capsule de quatre à cinq minutes montrera l’écran avec les explications orales de l’étudiant ; elle sera déposée sur Cyberlearn, jamais dans GitHub public. Les conversations et les données confidentielles restent hors du dépôt.

L’heure exacte et les modalités de remise sur Cyberlearn n’ont pas été vérifiées ici. Le repère `jalon-1` conserve la documentation validée et le code du jeu déjà publié sous `c43d997`. Seul le README a été modifié pour cette sauvegarde ; aucun test supplémentaire du jeu n’a été exécuté à cette occasion. Le repère `final` reste à créer après validation pour J2.
