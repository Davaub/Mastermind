# Code secret

Code secret est un jeu de déduction pour une personne, inspiré du Mastermind. Il faut retrouver quatre couleurs en dix essais maximum. Ce projet individuel est réalisé à la HEG Genève avec l’aide de Codex pour le développement, les vérifications et la documentation.

**[Jouer en ligne](https://davaub.github.io/Mastermind/)** · **[Consulter le dépôt GitHub](https://github.com/Davaub/Mastermind)**

## État actuel — 25 novembre 2026

Le jeu est publié sur GitHub Pages. Il comprend la saisie des propositions, les indices, l’historique, les règles et la nouvelle partie. L’API commune 0.2, qui permet de tester le jeu avec des instructions JavaScript, est intégrée à la même partie que l’interface visible.

Les parcours décrits ci-dessous ont réussi en local et sur le site public, notamment sur iPhone 16 avec Safari et sur Windows avec Firefox. **L’essai de Code secret par un camarade sera organisé plus tard**, avant la remise de J2 ; aucun résultat de cet essai n’est encore disponible.

Le jeu fonctionne sans compte, serveur applicatif ni collecte de données personnelles. Il n’intègre aucun paiement, classement en ligne, service d’IA ou clé API.

**Installation comme application Web (PWA) :** les fichiers du projet comprennent le nom « Code secret », une icône personnalisée, un guide et un QR code. Les contrôles locaux sont décrits plus bas ; l’installation réelle sur les appareils reste à vérifier sur le site publié. Le fonctionnement hors ligne et la gestion des mises à jour en arrière-plan ne sont pas développés.

## Jouer

Choisir une couleur dans chacun des quatre emplacements, modifier les choix si nécessaire, puis appuyer sur **« Valider la proposition »**. L’historique conserve les propositions et leurs indices. **« Nouvelle partie »** permet de recommencer.

### Règles

- Le secret contient quatre couleurs parmi `rouge`, `bleu`, `vert`, `jaune`, `orange` et `violet`. Les répétitions sont autorisées ; l’ordre compte. Le secret reste fixe et caché pendant la partie.
- Une proposition doit contenir exactement quatre couleurs autorisées. Un refus est expliqué et ne change ni le compteur, ni l’historique, ni les indices précédents. Une proposition valide consomme un essai.
- Les indices indiquent le nombre de couleurs **bien placées**, puis celui des couleurs **présentes mais mal placées**. Les positions concernées ne sont pas révélées. Chaque occurrence est comptée une seule fois, en commençant par les bien placées.
- Quatre couleurs bien placées donnent la victoire, y compris au dixième essai. Dix propositions incorrectes donnent la défaite. Après la fin, les propositions ne changent plus la partie et les résultats restent consultables.
- Une nouvelle partie effectue un nouveau tirage et remet les choix, le compteur, l’historique et les indices à zéro. Le hasard peut produire à nouveau le même secret.

**Exemple officiel :** pour le secret rouge, rouge, bleu, vert, proposer quatre rouges donne **2 bien placées et 0 mal placée**. Les deux rouges du secret sont déjà comptés aux deux premières positions ; il n’en reste aucun pour les deux autres rouges proposés.

### Clavier et écran tactile

Les couleurs sont accompagnées de leur nom. "Tab" passe à la commande suivante, "Maj+Tab" revient en arrière et "Entrée" active un bouton ou un lien. Dans une liste fermée, "Bas/Droite" avance d’une couleur et "Haut/Gauche" recule. Le parcours boucle entre Violet et Rouge ; depuis un emplacement vide, il commence par Rouge en avançant ou Violet en reculant.

Après une validation au clavier, la sélection revient au premier emplacement si la partie continue, ou au premier emplacement vide si la proposition est incomplète. Une nouvelle partie lancée au clavier revient aussi au premier emplacement. Avec la souris ou le toucher, le joueur choisit lui-même la liste à modifier.

Les liens « Aller à la proposition » en haut et « Revenir à la proposition » après les règles apparaissent lorsqu’ils sont atteints au clavier. Le retour rejoint la saisie ou, après la fin, le bouton « Nouvelle partie ». "Tab" reste libre de quitter la page.

## Installer le jeu et le partager

Une PWA est une application Web que les navigateurs compatibles peuvent ajouter à l’écran d’accueil ou aux applications de l’ordinateur. Elle garde ici le nom **Code secret**, avec une icône de quatre pastilles colorées sur fond vert foncé, validée par l’étudiant.

Le lien « Installer le jeu sur mon appareil », en haut de la page, ouvre les instructions. Sur iPhone, elles indiquent d’utiliser Safari, puis **Partager → Sur l’écran d’accueil → Ajouter**, avec « Ouvrir comme app web » activé si cette option apparaît. Sur ordinateur ou Android, utiliser Chrome ou Edge et leur commande d’installation. Safari récent sur Mac propose « Ajouter au Dock ».

Un bouton « Installer Code secret » apparaît lorsque le navigateur fournit une invitation d’installation. Sa présence dépend du navigateur, de ses conditions d’utilisation et d’une éventuelle installation déjà réalisée. Les instructions restent accessibles quand ce bouton n’apparaît pas. Le jeu conserve son accès habituel dans le navigateur.

Le [QR code en PNG](images/qr-code.png) et sa [version SVG pour l’impression](images/qr-code.svg) pointent vers **[le jeu public et son guide d’installation](https://davaub.github.io/Mastermind/#installer)**. Scanner le code avec l’appareil photo du téléphone, puis ouvrir le lien proposé. Pour examiner le guide en local, lancer les fichiers du projet et suivre le lien d’installation.

Une connexion Internet reste nécessaire pour ouvrir l’application publiée. Les parties ne sont pas sauvegardées entre deux ouvertures ou rechargements. L’installation ne donne pas accès à l’API de test par défaut : celle-ci reste réservée à `?test=1`.

## Lancer les fichiers sur son ordinateur

Pour simplement jouer, le lien public suffit. Le lancement local sert à essayer les fichiers du projet avant leur publication.

1. Sous Windows, ouvrir le dossier du projet et lancer `lancer-jeu.cmd`.
2. Garder la fenêtre ouverte et ouvrir [le jeu local](http://127.0.0.1:8000/).
3. Fermer la fenêtre ou utiliser Ctrl+C pour arrêter. Il faudra relancer le fichier pour réutiliser cette adresse.

L’adresse `127.0.0.1` désigne cet ordinateur : elle ne fonctionne que pendant le lancement local et ne permet pas d’ouvrir le jeu depuis un téléphone. Le site public reste accessible indépendamment de cette fenêtre.

Le lanceur a besoin de **Node.js**, un outil qui exécute JavaScript hors du navigateur. Si `node --version` fonctionne dans un terminal ouvert à la racine du projet, `node serveur.mjs` permet aussi de démarrer. Aucune bibliothèque supplémentaire n’est nécessaire ; le lancement a été vérifié avec Node.js 24.22.3.

Sur l’ordinateur de l’étudiant, le lanceur peut utiliser Node.js fourni avec Codex grâce au fichier `.node-local`. Ce fichier contient un chemin propre à la machine, reste hors de Git et peut nécessiter une actualisation après une mise à jour de Codex. Il n’accompagne pas un téléchargement du dépôt. L’installation indépendante de Node.js n’a pas été vérifiée.

## Choix de conception avec Codex

**Une application simple à reprendre.** Il y un fichier HTML qui structure la page, un fichier CSS qui définit son apparence et un fichier JavaScript qui gère le jeu. Ces technologies fonctionnent directement dans le navigateur, sans dépendance ajoutée, et conviennent à GitHub Pages. Le moteur, qui applique les règles et conserve la partie, est séparé de l’affichage pour pouvoir tester les règles sans cliquer dans la page.

**Une seule partie pour l’interface et l’API.** Le calcul des indices reste dans `jeu.js`. Le fichier `api-test.js` adapte les actions communes au format imposé par le cours ; les boutons passent par les mêmes commandes. Un essai envoyé par l’API apparaît donc à l’écran, et une action à l’écran se retrouve dans l’état lu par l’API.

**Des adaptations guidées par les essais de l’étudiant.** Avec le clavier, lors du choix des couleurs, il fallait initialement inverser les flèches après la dernière couleur ; le parcours forme désormais une boucle. Pour faciliter le retour après l’historique et les règles, un lien de retour a été ajouté, visible au clavier. La possibilité de quitter le jeu avec "Tab" est conservée pour éviter d’y bloquer le joueur. Enfin, le retour automatique vers une couleur est réservé au clavier : le toucher pour valdider une proposition avait provoqué l’ouverture involontaire d’une liste sur iPhone, comme expliqué dans les corrections.

**Une installation simple, sans gestion du hors-ligne.** Le fichier `manifest.webmanifest` décrit le nom, les icônes et l’ouverture dans une fenêtre d’application. Ses chemins relatifs conservent le sous-dossier `/Mastermind/` sur GitHub Pages. Le module `installation.js` gère uniquement le guide et l’invitation fournie par le navigateur ; il ne lit ni ne modifie la partie. Aucun gestionnaire de cache (« service worker ») n’est ajouté, car il n’est pas nécessaire à cette installation et le hors-ligne reste facultatif. Le QR code et les icônes sont des fichiers du projet, sans service externe appelé par le jeu.

## Utiliser l’API commune 0.2

Ouvrir le [mode test public](https://davaub.github.io/Mastermind/?test=1), ou le [mode test local](http://127.0.0.1:8000/?test=1) après lancement. La partie attend alors son démarrage. Sans `test=1`, le jeu démarre normalement et `window.codeSecretTest` n’est pas exposé.

La console JavaScript du navigateur (Crl+Maj+K), permet d’envoyer des instructions à la page :

```js
const api = window.codeSecretTest;
api.getConfig();
await api.startGame({ secret: ['rouge', 'rouge', 'bleu', 'vert'] });
await api.submitGuess(['rouge', 'rouge', 'rouge', 'rouge']);
api.getState();
```

Cet exemple a donné un essai, **2 bien placées et 0 mal placée**, dans l’API et à l’écran.
`await` attend la fin d’une action ;
`getConfig()` lit les règles fixes ;
`getState()` lit la partie ;
`startGame()` sans secret lance un tirage aléatoire.
Le secret imposé sert aux tests et n’est pas renvoyé dans les résultats. Les états `not-started`, `playing`, `won` et `lost` signifient respectivement « à démarrer », « en cours », « gagnée » et « perdue ».

Un refus de proposition renseigne `lastError` sans consommer d’essai. Un démarrage invalide signale une erreur et conserve la partie, l’erreur précédente et l’affichage. Les formats et codes détaillés sont définis dans le contrat officiel cité plus bas.

## Vérifications et preuves

Les résultats ci-dessous distinguent les tests de Codex des retours de l’étudiant. Les identifiants courts comme `e0a9b55` permettent de retrouver une version dans Git. Les fichiers de logique `jeu.js`, `interface.js`, `api-test.js` et leurs deux fichiers de tests sont inchangés depuis cette version. L’ajout local de l’installation modifie la page, ses styles et le serveur de prévisualisation, avec des fichiers supplémentaires. La référence des essais publics du 21 novembre reste `fe19d1e`. Dans les tableaux, « 2/0 » signifie deux couleurs bien placées et aucune mal placée.

### Préparation de l’installation — 25 novembre 2026

**Version :** fichiers locaux modifiés à partir de `1881dff`, avant sauvegarde et publication. **Environnement :** Windows, Node.js 24.22.3 et Edge 158.0.4370.33 sans interface visible, avec un profil de test séparé.

Le site public a répondu HTTP 200 mais ne liait encore ni manifeste ni icône dédiée. Les ajouts locaux ont ensuite fait l’objet de **14 contrôles dans Edge**, tous réussis. Les **47 tests automatiques du moteur et de l’API ont aussi été relancés et ont réussi, sans échec**.

| Contrôle | Attendu | Observé et statut |
| --- | --- | --- |
| Manifeste, icônes et chemins de lancement. | Nom et dimensions corrects, ouverture en mode application, chemins compatibles avec `/Mastermind/`. | Manifeste lu sans erreur et aucun obstacle à l’installation signalé par Edge en local. Icônes PNG de 192, 512 et 180 pixels vérifiées. **Réussi pour ces contrôles techniques.** |
| Invitation d’installation et guide. | Confirmation, annulation ou erreur expliquées ; le guide et la partie restent utilisables. | Les événements simulés ont donné les messages attendus sans modifier la partie. Guide ouvert par le lien et par `#installer`, également consultable sans JavaScript. **Réussi ; aucune installation système effectuée.** |
| Affichage et clavier. | Guide lisible sans débordement horizontal ; flèches et lien de retour conservés. | Contrôles réussis à 320, 390 et 1280 pixels ; captures du guide examinées. **Réussi sur ordinateur, pas sur téléphone réel à cette étape.** |
| QR code. | Ouvrir l’adresse publique avec `#installer`. | Décodage correct du PNG à trois tailles et du QR affiché dans les captures à 390 et 1280 pixels. **Réussi par décodage logiciel ; appareil photo du téléphone non essayé.** |
| Jeu, API et serveur local. | Refus sans essai, proposition valide cohérente avec l’API, nouveaux fichiers servis et fichiers privés refusés. | Trois couleurs refusées ; quatre rouges contre rouge, rouge, bleu, vert donnent 2 bien placées et 0 mal placée au premier essai. Les treize fichiers publics et la page racine se chargent ; les fichiers privés restent inaccessibles. **Réussi.** |
| Installation réelle sur les appareils. | Scanner, installer, retrouver le nom et l’icône puis jouer depuis l’application. | **Non effectué** sur iPhone, Android ou ordinateur. Les contrôles techniques ci-dessus ne remplacent pas cet essai réel. |

**Après publication :** sur iPhone 16 avec Safari, scanner le QR code, suivre le guide, vérifier le nom et l’icône, ouvrir l’application et essayer une proposition incomplète, une valide et une nouvelle partie. Sur ordinateur, vérifier les mêmes points après installation avec Edge ou Chrome. Noter les versions des navigateurs, les résultats et les éventuelles différences avant de conclure sur l’installation réelle.

### Tests automatiques et contrôles de Codex

Le **17 novembre 2026**, sous Windows avec Node.js 24.22.3, les **47 tests automatiques ont réussi sans échec** : 29 pour le moteur et 18 pour l’API. Pour les relancer depuis la racine du projet, avec Node.js accessible :

```text
node --test --test-reporter=spec jeu.test.mjs api-test.test.mjs
```

Les cas détaillés, leurs données et leurs résultats attendus restent dans [jeu.test.mjs](jeu.test.mjs) et [api-test.test.mjs](api-test.test.mjs).

| Comportement vérifié | Attendu | Observé |
| --- | --- | --- |
| Proposition incomplète ou interdite, avant/après un essai valide. | Refus sans modifier compteur, historique ou indices. | Données conservées. **Réussi.** |
| Proposition valide et couleurs répétées. | Un essai ajouté ; quatre rouges contre rouge, rouge, bleu, vert donnent 2/0. | Compteur, historique et indices conformes. **Réussi.** |
| Victoire au dixième essai, défaite à dix essais et proposition après la fin. | Victoire prioritaire au dixième ; défaite après dix erreurs ; partie ensuite inchangée. | États et historiques attendus. **Réussi.** |
| Nouvelle partie en cours de jeu, après victoire ou défaite. | Nouveau tirage, remise à zéro et possibilité de rejouer. | Réinitialisation et essai suivant conformes. **Réussi.** |
| Contrat API, dont les neuf exemples officiels T01 à T09. | Bons indices, états et codes de refus ; priorité des erreurs respectée. | Résultats attendus obtenus. **Réussi.** |
| Démarrage invalide et protection des données. | Refus sans changement ; modifier une entrée ou une réponse ne réécrit pas la partie ; aucun secret dans l’état renvoyé. | Conservation et indépendance des données constatées. **Réussi.** |

**17 contrôles locaux dans le navigateur intégré de Codex ont aussi réussi**, avec les fichiers chargés sous `/Mastermind/`. Ils comparaient l’API et l’écran : neuf exemples officiels, compteur, historique, indices, fins de partie, refus, redémarrages et actions des boutons. Le rechargement rétablissait l’attente en mode test ; l’API était absente sans `test=1`, notamment avec `test=0`. Aucun avertissement ou message d’erreur du jeu n’a été relevé pendant ces parcours.

Pour les versions précédentes, **27 tests avaient réussi sur `c43d997` le 12 novembre** avec Node.js 24.22.1, puis **29 pendant la préparation du mode test le 17 novembre**. Les premiers essais dans le navigateur, sur `v0.1.0`, couvraient déjà la victoire au dixième essai et la défaite. Les affichages simulés à 320 et 390 pixels de large ne nécessitaient pas de défilement horizontal ; les commandes mesuraient 44 pixels de haut. La boucle des flèches et le lien de retour ont ensuite été contrôlés ; ce lien mesurait 48 pixels de haut. Une simulation sur ordinateur ne remplace pas un essai sur téléphone.

Le **21 novembre**, les cinq fichiers du jeu publié ont répondu HTTP 200, avec le type attendu et un contenu identique à `cdb1b49`. Codex n’a pas pu exécuter le parcours Firefox public, son outil ayant bloqué ce contrôle. Les essais fonctionnels publics ci-dessous ont été réalisés par l’étudiant.

### Essais réalisés par l’étudiant

Ces essais servent à vérifier le jeu dans des conditions réelles, en complément des tests automatiques. Les résultats ci-dessous reprennent les retours de l’étudiant : ils n’ont pas été rejoués par Codex lors de leur rédaction. Les versions exactes de Windows, Firefox, iOS et Safari n’ont pas été précisées.

#### Premiers essais et utilisation au clavier — 12 novembre

Sur `v0.1.0` avec le correctif de lancement, l’étudiant a confirmé quatre points : ouvrir le jeu, obtenir un refus expliqué avec seulement trois couleurs sans consommer d’essai, enregistrer une proposition complète avec ses indices, puis remettre la partie à zéro. Il a trouvé les informations claires. Le navigateur et la méthode exacte de lancement ne sont pas connus pour ce premier parcours.

Le parcours clavier, sur `641a89c`, vérifiait ensuite le passage entre les commandes avec Tabulation, le choix des couleurs avec les flèches, la validation avec Entrée et la nouvelle partie. L’étudiant a confirmé leur fonctionnement, mais signalé deux gênes : Tabulation finissait par quitter le jeu, et les flèches s’arrêtaient à la dernière couleur. Ces observations ont conduit au lien de retour et au parcours des couleurs en boucle, expliqués dans les choix de conception.

**Bilan :** les actions principales ont fonctionné ; les deux remarques ont donné lieu à des adaptations. Ce retour initial ne constitue pas à lui seul une vérification de ces adaptations.

#### API et boutons du jeu en local — 17 et 21 novembre

Les essais ont eu lieu sur **Windows avec Firefox**, à `http://127.0.0.1:8000/?test=1`. L’objectif était de vérifier que les instructions envoyées à l’API et les actions effectuées avec les boutons concernent bien la même partie.

Le 17 novembre, l’étudiant a confirmé les **huit étapes de découverte de l’API**, depuis l’ouverture du mode test et de la console jusqu’à la nouvelle partie. La configuration devait indiquer quatre couleurs, dix essais et les répétitions autorisées. Avec le secret imposé rouge, rouge, bleu, vert, proposer quatre rouges devait donner deux bien placées et aucune mal placée au premier essai. Une proposition de trois couleurs devait ensuite être refusée sans ajouter d’essai ; le secret exact devait donner la victoire au deuxième. Tous ces résultats ont été confirmés, ainsi que la remise à zéro par « Nouvelle partie ». L’essai concernait les fichiers locaux intégrant l’API, à partir de `f8600ed`, avant leur sauvegarde.

Le 21 novembre, un parcours complémentaire de **cinq étapes**, sur `e0a9b55`, utilisait les listes et les boutons après un démarrage par l’API avec le même secret :

1. Le démarrage devait afficher une partie en cours, sans essai ni historique.
2. Valider trois couleurs devait afficher un refus, conserver zéro essai et renseigner `lastError`, qui décrit la dernière erreur dans l’API.
3. Valider quatre rouges devait ajouter un essai avec deux bien placées et aucune mal placée.
4. Valider le secret exact devait donner la victoire au deuxième essai, conserver les deux propositions, désactiver la validation et effacer l’erreur précédente.
5. « Nouvelle partie » devait rétablir une partie en cours, zéro essai, un historique vide et `lastError: null`, c’est-à-dire aucune erreur.

**Résultat observé : réussi selon l’étudiant**, sans différence entre l’écran, les données lues avec `getState()` et les résultats attendus. Ces essais locaux ne vérifiaient pas encore le site public.

#### Jeu publié sur iPhone 16 avec Safari — 21 novembre

Sur le **site public**, référence `fe19d1e`, les cinq étapes portaient sur l’utilisation tactile et la lisibilité :

- Ouvrir le jeu, identifier les couleurs grâce à leur nom et accéder aux règles.
- Valider trois couleurs : le refus devait être expliqué, avec zéro essai et aucun historique ajouté.
- Compléter les quatre emplacements et modifier un choix avant de valider : la proposition enregistrée devait correspondre aux choix et ajouter un essai avec ses indices.
- Consulter les propositions précédentes et leurs indices sans perdre les résultats déjà obtenus.
- Lancer une nouvelle partie : les choix et l’historique devaient être effacés et le compteur remis à zéro, avec la possibilité de rejouer.

Le parcours vérifiait également qu’un toucher sur « Valider la proposition » ou « Nouvelle partie » n’ouvrait plus involontairement une liste de couleurs, après le problème rencontré lors des premiers essais sur Safari.

**Résultat observé : les cinq étapes ont réussi sans difficulté selon l’étudiant.** Cet essai concernait l’interface tactile ; il ne comprenait ni appels directs à l’API, ni victoire au dixième essai, ni défaite après dix essais sur téléphone.

#### API sur le site public avec Firefox — 21 novembre

Sur **Windows avec Firefox**, référence `fe19d1e`, le parcours de **sept étapes** devait vérifier le mode test et la correspondance entre les réponses de l’API et le jeu affiché :

1. Sur l’adresse normale, l’API devait être absente : `typeof window.codeSecretTest` devait renvoyer `"undefined"`.
2. Avec `?test=1`, elle devait annoncer la version 0.2, une combinaison de quatre couleurs parmi six, dix essais et les répétitions autorisées. La partie devait attendre son démarrage, sans historique ni erreur.
3. Imposer rouge, rouge, bleu, vert devait démarrer une partie à zéro essai, avec le secret masqué à l’écran.
4. Proposer rouge, bleu, rouge, vert devait donner **deux bien placées et deux mal placées**, un essai et une entrée d’historique, dans l’API comme à l’écran.
5. Proposer trois couleurs devait donner `invalid-length`, qui signale un mauvais nombre de couleurs, avec une explication et sans changer le compteur, l’historique ou les indices précédents.
6. Proposer le secret exact devait donner la victoire au deuxième essai et désactiver la validation. Envoyer ensuite `null` devait donner `game-finished`, qui signale une partie terminée, sans modifier la victoire ni les deux essais.
7. Cliquer sur « Nouvelle partie », puis valider quatre couleurs à l’écran devait être visible dans l’API : d’abord une partie remise à zéro, puis un essai avec les mêmes couleurs et indices qu’à l’écran.

**Résultat observé : les sept étapes ont réussi selon l’étudiant, sans différence constatée.** Ce parcours a été complété par les scénarios de fin de partie ci-dessous.

#### Victoire au dixième essai et défaite sur le site public — 21 novembre

L’étudiant a réalisé les **huit étapes complémentaires** sur Windows avec Firefox, en mode test public, référence `fe19d1e`. Un secret connu de quatre rouges permettait de préparer les situations sans dépendre du hasard.

**Victoire au dernier essai.** Neuf propositions de quatre bleus devaient laisser la partie en cours, avec neuf essais et neuf résultats à zéro bien placée et zéro mal placée. Une proposition d’un seul rouge devait être refusée avec `invalid-length`, sans consommer le dernier essai. Proposer ensuite quatre rouges devait donner la victoire au dixième essai, avec dix propositions conservées et la validation désactivée.

**Défaite et nouvelle partie.** Après redémarrage avec le même secret, dix propositions de quatre bleus devaient donner une défaite et dix résultats à zéro bien placée et zéro mal placée. Proposer ensuite le bon code devait donner `game-finished`, sans changer la défaite ni les dix essais. Enfin, « Nouvelle partie » devait rétablir une partie en cours, zéro essai, un historique vide et aucune erreur.

**Résultat observé : les huit étapes ont réussi selon l’étudiant, sans différence constatée dans l’API ou à l’écran.** Ces scénarios n’ont pas été rejoués sur iPhone.

#### Lien de retour après une victoire — 17 novembre

Sur le site public, depuis un ordinateur avec Firefox, l’étudiant a utilisé Tabulation pour atteindre « Revenir à la proposition » après une victoire. Le résultat attendu était de rejoindre le bouton « Nouvelle partie », puis de pouvoir recommencer.

**Résultat observé : réussi selon l’étudiant.** Le lien l’a conduit à ce bouton et il a pu commencer une nouvelle partie. Le système de l’ordinateur et la version exacte du jeu n’ont pas été précisés.

### Corrections : avant et après

**Lancement sous Windows.** Le 12 novembre, `node --version` n’était pas reconnu et le serveur local était arrêté. Le README décrivait un lancement uniquement vérifié dans Codex. L’ajout de `lancer-jeu.cmd`, avec un chemin local de secours, a permis le redémarrage depuis un autre dossier ; l’étudiant a confirmé la reprise. Un second lancement signalait le port 8000 occupé sans arrêter le premier serveur. Correctif : `641a89c`.

Le 21 novembre, `.node-local` désignait à nouveau un chemin devenu absent après une mise à jour de Codex. Son actualisation a permis le lancement avec Node.js 24.22.3 et le chargement des cinq ressources ; l’étudiant a confirmé le redémarrage et son parcours local. Le double-clic n’a pas été isolé comme test, ni le lancement sur un autre ordinateur.

**Aperçus des couleurs gris.** Le 11 novembre, dans une fenêtre de 320 pixels de large, choisir rouge, bleu, vert et jaune laissait quatre disques gris : `rgb(233,236,227)` au lieu des couleurs choisies. Les règles CSS des couleurs ont été déplacées après celle du fond neutre. Le même essai a ensuite donné les bonnes couleurs, dont `rgb(200,79,79)` pour le rouge. Les six couleurs et le retour au point d’interrogation après réinitialisation ont été contrôlés. **Réussi ; correction incluse dans `v0.1.0`.**

**Ouverture involontaire d’une liste sur Safari.** Sur iPhone 16 avec Safari, toucher « Valider la proposition » ou « Nouvelle partie » ouvrait une liste de couleurs sur `6f39809`. Le retour systématique vers le premier emplacement a été retenu comme cause probable, sans reproduction du menu iOS par Codex. Le correctif `a299db8` réserve ce retour au clavier. Les contrôles sur ordinateur ont confirmé le maintien sur le bouton après un clic et le retour au clavier ; l’étudiant a ensuite confirmé la résolution sur iPhone, sur `c43d997`. **Réussi selon son retour**, puis recontrôlé dans le parcours tactile du 21 novembre.

Le [README complet avant cette synthèse, conservé dans Git sur `8187893`](https://github.com/Davaub/Mastermind/blob/81878935cfa76441bf6d361ce94f4a1b0ec98716/README.md) garde les anciens parcours détaillés, les mesures et les repères de versions. Ce lien vise une version fixe : les détails restent consultables même après la présente révision.

### Limites et vérifications restantes

Les résultats valent pour les scénarios et environnements décrits. Ils ne constituent ni une garantie d’absence de défaut, ni un examen complet de l’accessibilité. Les autres téléphones et les lecteurs d’écran n’ont pas été essayés. L’ouverture des menus natifs n’a pas pu être confirmée avec l’outil de Codex. Les tests du tirage vérifient les couleurs possibles et les réinitialisations, sans étude statistique du hasard.

**Consigne précisée par le professeur, selon le retour de l’étudiant du 21 novembre 2026 :** un camarade doit tester Code secret afin de recueillir ses remarques et d’améliorer le jeu. Cette précision remplace, pour ce projet, la formulation du sujet PDF sur l’essai du jeu d’un camarade.

**Non effectué :** essai de Code secret par un camarade, prévu plus tard. Il faudra noter la date, la version du jeu, l’appareil, le navigateur, les actions essayées et les remarques recueillies. Le README présentera ensuite les améliorations retenues ou les raisons de conserver certains comportements. Aucun résultat ni changement à la suite de cet essai n’est encore à annoncer.

## Reprendre le projet et préparer J2

| Fichier | Rôle |
| --- | --- |
| `index.html`, `style.css` | Contenu et apparence de la page. |
| `jeu.js` | Règles, état de la partie et calcul des indices. |
| `interface.js`, `api-test.js` | Interactions et affichage ; adaptation au contrat de test commun. |
| `manifest.webmanifest`, `installation.js`, `images/` | Description de l’application installable, guide et bouton d’installation, icônes et QR code. |
| `jeu.test.mjs`, `api-test.test.mjs` | Tests automatiques des règles et de l’API avec le moteur réel. |
| `serveur.mjs`, `lancer-jeu.cmd` | Prévisualisation locale ; seuls les fichiers du jeu sont servis. |
| `AGENTS.md`, `doc/`, `.gitignore` | Consignes, sources et exclusions des fichiers privés ou propres à la machine. |

La méthode reste **Cadrer → Confier → Examiner → Vérifier → Documenter**. Lire les consignes et les sources avant de modifier. L’étudiant garde les décisions importantes ; Codex prépare les changements et les vérifications possibles, puis distingue ses résultats des essais de l’étudiant.

Le travail se poursuit directement dans `main`, qui fournit aussi le site public. L’ancienne branche `codex/jalon-2` a été supprimée le 21 novembre après vérification de son intégration. Le [tag `jalon-1`](https://github.com/Davaub/Mastermind/tree/jalon-1) conserve la version de J1 et reste inchangé. Aucun commit, tag, envoi ou publication ne doit être effectué sans accord de l’étudiant.

**J1 : échéance du 20 novembre 2026 au soir.** Le repère `jalon-1` et le document `jalon1_aubert.docx` ont été préparés. Le dépôt effectif sur Cyberlearn n’est pas confirmé ici ; aucune vidéo n’était demandée pour J1.

**J2 : échéance du 18 décembre 2026 au soir.** Le jeu, l’API et les essais décrits sont réalisés. Il reste à :

1. Faire tester Code secret par un camarade au moment choisi, puis consigner ses remarques et les suites données pour améliorer le jeu.
2. Relire la documentation et vérifier les éventuelles modifications suivantes.
3. Après validation, créer le tag `final` et vérifier la version publiée correspondante.
4. Préparer `jalon2_aubert.docx` avec les liens et le tag, puis une capsule personnelle de 4 à 5 minutes montrant le jeu, un test ou une correction et un choix expliqué. Les remettre sur Cyberlearn ; garder la vidéo et les conversations hors du dépôt public.

L’heure exacte de remise est à vérifier sur Cyberlearn. Le modèle de départ du cours n’a pas été fourni. Aucun outil de test enseignant n’est destiné à être distribué aux étudiants ; les vérifications du projet ne dépendent pas de sa réception.

## Sources

- [Sujet officiel, édition 2.1](<doc/Projet — Code secret en couleurs, inspiré du Mastermind.pdf>) : annexe `code-couleurs-1.0`, page 4, pour les règles ; page 2 pour les jalons.
- [API commune de test 0.2, édition Google 1.5](<doc/API commune de test — Code secret en couleurs.pdf>) : contrat des fonctions et des résultats, disponible dans le projet depuis le 17 novembre.
- [Guide README, version 1.0](<doc/Rédiger un bon README.md — Guide général.pdf>).
- [Guide AGENTS, version 1.0](<doc/Créer un bon fichier AGENTS.md — Guide général.pdf>).
- Pour l’installation, références techniques consultées le 25 novembre 2026 : [critères de Chrome (web.dev)](https://web.dev/articles/install-criteria), [guide PWA de MDN](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Making_PWAs_installable) et [ajout à l’écran d’accueil sur iPhone (Apple)](https://support.apple.com/guide/iphone/bookmark-a-website-iph42ab2f3a7/ios).
