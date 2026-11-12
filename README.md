# Code secret

Projet individuel de cours à la HEG Genève : créer un jeu Web solo inspiré du Mastermind, avec l’aide de Codex. Le joueur doit retrouver une combinaison de quatre couleurs en dix essais maximum.

## État actuel

Version initiale sauvegardée `v0.1.0` : première interface jouable du 11 novembre 2026. Le correctif de lancement et le premier retour de test sont conservés dans le commit `641a89c` du 12 novembre 2026. Les adaptations clavier validées et vérifiées sont regroupées dans le commit `a128ef3`, « Améliorer la navigation clavier et documenter les essais », sur `main`. Le jeu est publié sur GitHub Pages depuis le 12 novembre 2026 : [jouer à Code secret](https://davaub.github.io/Mastermind/).

- Disponible : première interface française avec palette nommée, quatre sélecteurs, aperçus de couleurs, validation, compteur, historique, règles dépliables, messages de fin et nouvelle partie ; moteur avec les règles du jeu et 27 tests automatisés.
- Lancement Windows : `lancer-jeu.cmd` cherche Node.js dans Windows, puis utilise le chemin local préparé pour cet ordinateur si nécessaire.
- Retour de prise en main du 12 novembre : l’étudiant confirme le lancement, les propositions incomplètes et valides, la nouvelle partie et la clarté des informations, sans difficulté signalée.
- Retour clavier : les deux adaptations validées sont disponibles en ligne : « Revenir à la proposition », masqué au repos et révélé quand Tabulation l’atteint après les règles, et défilement circulaire des six couleurs avec les flèches, lorsque la liste est fermée. Tabulation reste libre de quitter la page.
- Prévu : essai sur smartphone réel et intégration de l’API commune de test 0.2 après réception du contrat.
- Versions : Git initialisé sur la branche `main`, avec le repère `v0.1.0` pour cette première sauvegarde. Dépôt associé : [Davaub/Mastermind sur GitHub](https://github.com/Davaub/Mastermind).
- Limites : contrôles locaux et sur le site publié dans le navigateur intégré à Codex, sans essai tactile sur appareil réel ni lecteur d’écran. L’API commune 0.2 reste à intégrer.
- Hors périmètre : compte utilisateur, serveur applicatif, paiement, classement en ligne, données personnelles, service d’IA et clé API. PWA et fonctionnement hors ligne restent facultatifs et non prioritaires.

## Utilisation

### Jouer en ligne

Ouvrir [Code secret sur GitHub Pages](https://davaub.github.io/Mastermind/) dans un navigateur, sur ordinateur ou smartphone. Aucun terminal, Node.js ou lanceur local n’est nécessaire pour cette adresse ; une connexion Internet est requise pour charger le jeu. Le fonctionnement tactile sur smartphone réel reste à vérifier.

Publication depuis la branche `main`, dossier principal du dépôt, avec HTTPS imposé. Les prochains envois sur cette branche déclencheront une nouvelle publication ; ils restent soumis à l’accord de l’étudiant. Ce choix utilise directement les fichiers statiques existants, sans ajouter de dépendance ni de procédure de compilation. La prévisualisation locale ci-dessous reste utile pour développer avant d’envoyer une modification.

### Lancer le jeu sur son ordinateur

**Sur cet ordinateur Windows :**

1. Dans l’Explorateur de fichiers, ouvrir le dossier du projet et double-cliquer sur `lancer-jeu.cmd`.
2. Attendre le message `Code secret : http://127.0.0.1:8000`, puis garder la fenêtre ouverte pendant le jeu.
3. Ouvrir [le jeu local](http://127.0.0.1:8000/) dans un navigateur.
4. Pour arrêter, appuyer sur `Ctrl+C` dans cette fenêtre ou la fermer. Au prochain essai, relancer le fichier avant d’ouvrir le lien.

Le contenu du lanceur a été exécuté avec succès par `cmd.exe` avec le chemin de recherche habituel de Windows, depuis un autre dossier. Le 12 novembre, l’étudiant confirme aussi le lancement et l’accès au jeu ; la méthode exacte de lancement n’est pas précisée, donc le double-clic n’est pas confirmé séparément. Aucun logiciel ni réglage Windows n’a été installé ou modifié pour cette correction.

**Si Node.js est déjà accessible dans le terminal :** ouvrir un terminal dans le dossier du projet et exécuter `node serveur.mjs`. Vérifier d’abord avec `node --version` : si la commande n’est pas reconnue, utiliser le lanceur ci-dessus. La version essayée est Node.js 24.22.1 ; aucune bibliothèque supplémentaire n’est nécessaire.

Le lanceur utilise en priorité Node.js trouvé par Windows. Sinon, il lit `.node-local`, qui indique le chemin de la copie fournie avec Codex sur cet ordinateur. Ce fichier est exclu de Git : il n’est pas fourni lors d’un téléchargement du dépôt. Si une mise à jour de Codex supprime cette copie, demander à Codex d’actualiser le chemin, ou installer séparément Node.js pour un lancement indépendant de Codex. L’installation de Node.js reste non effectuée.

L’adresse locale désigne uniquement cet ordinateur, pas un site public. Elle ne fonctionne que pendant l’exécution de la prévisualisation. Le dépôt GitHub sauvegarde les fichiers ; il ne maintient pas cette prévisualisation en marche. L’outil sert seulement les fichiers statiques, sans exécuter les règles du jeu. GitHub Pages sert les mêmes fichiers sans cet outil.

### Jouer et vérifier

Choisir une couleur à chacune des quatre positions numérotées, modifier si nécessaire, puis appuyer sur « Valider la proposition ». Consulter les bien placées et les mal placées dans l’historique pour préparer l’essai suivant. Les choix restent modifiables tant que la proposition n’est pas validée.

Au clavier, utiliser Tabulation pour avancer, Maj+Tab pour revenir et Entrée pour activer une commande. Liste fermée, Bas/Droite passent à la couleur suivante et Haut/Gauche à la précédente, en boucle entre Violet et Rouge. Depuis « Choisir… », Bas/Droite commencent par Rouge, Haut/Gauche par Violet ; ces flèches ne vident pas une position. Les autres commandes du sélecteur, dont Début pour retrouver « Choisir… » dans le navigateur testé, restent disponibles.

« Comment jouer ? » détaille les règles ; « Nouvelle partie » recommence le jeu. Le lien « Revenir à la proposition » est masqué au repos et apparaît lorsque Tabulation l’atteint, après les règles. Entrée place la sélection active sur la position 1 ; si la partie est terminée, le lien mène à « Nouvelle partie ». Une nouvelle Tabulation permet de poursuivre hors du jeu ; le lien se masque dès qu’il n’est plus actif. Recharger la page permet de charger une nouvelle version locale de l’interface et démarre une nouvelle partie.

Pour relancer les tests du moteur dans un terminal où `node --version` fonctionne, exécuter `node --test jeu.test.mjs` depuis le dossier du projet. Commande vérifiée le 11 novembre : 27 tests réussis ; ils n’ont pas été réexécutés pour le correctif de lancement du 12 novembre, qui ne modifie pas le jeu. Node.js exécute ici JavaScript sans navigateur. Pour reprendre le développement, lire ce README, `AGENTS.md`, puis les sources utiles dans `doc/`.

## Règles et sources

Documents locaux lus lors du cadrage :

- [Sujet officiel, édition 2.1](<doc/Projet — Code secret en couleurs, inspiré du Mastermind.pdf>), mis à jour le 28 octobre 2026. Son annexe **Règles communes**, référence `code-couleurs-1.0` (page 4), fait foi.
- [Guide README, version 1.0](<doc/Rédiger un bon README.md — Guide général.pdf>), du 3 novembre 2026.
- [Guide AGENTS, version 1.0](<doc/Créer un bon fichier AGENTS.md — Guide général.pdf>), du 3 novembre 2026.

Le secret comporte quatre couleurs tirées au hasard avec répétitions autorisées ; il reste fixe et caché pendant la partie. Les identifiants exacts, dans l’ordre officiel, sont `rouge`, `bleu`, `vert`, `jaune`, `orange`, `violet`.

Chaque proposition contient exactement quatre couleurs ordonnées, modifiables avant validation. Une proposition invalide est expliquée et refusée sans modifier essais, historique ou indices. Une proposition valide consomme un essai et conserve sa proposition et ses indices dans l’historique. Les bien placées sont comptées d’abord, puis les mal placées parmi les occurrences restantes, sans double comptage ni indication des positions.

Quatre bien placées donnent la victoire, y compris au dixième essai ; dix essais incorrects donnent la défaite. Après la fin, une proposition ne change plus la partie et les résultats restent consultables. « Nouvelle partie » tire un code et réinitialise essais, historique et indices. Un nouveau tirage peut, par hasard, donner la même combinaison : une différence systématique n’est pas une règle officielle.

## Choix de conception et points à confirmer

**Décisions de cadrage :** garder les documents existants, centraliser le suivi dans ce README et réserver `AGENTS.md` aux consignes durables. Cette séparation permet au lecteur de comprendre le projet sans mélanger son état et les instructions de travail de Codex.

**Choix retenu :** HTML pour la structure, CSS pour l’apparence et JavaScript natif pour le comportement, sans dépendance ajoutée. Une application statique contient des fichiers servis au navigateur sans serveur applicatif ; ce choix vise un code simple et un hébergement sur GitHub Pages.

L’interface conserve quatre sélecteurs HTML standard avec les noms des couleurs visibles. Après le retour de l’étudiant, seules les flèches sans touche modificatrice sont personnalisées pour faire boucler les six couleurs quand la liste est fermée. Les autres touches restent gérées par le navigateur. Une palette unique est partagée avec le moteur. À petite largeur, les positions numérotées passent sur deux lignes ; les propositions de l’historique restent ordonnées. Les messages sont annoncés par une zone de statut ; leur lecture par un lecteur d’écran reste à vérifier.

Séparer la logique du jeu des interactions permet de vérifier les règles indépendamment de l’affichage. L’interface et la future API utiliseront le même moteur et la même partie. Une API est ici un ensemble de fonctions permettant au professeur de piloter le jeu pour le tester ; aucun nom, paramètre ou format du contrat 0.2 n’est supposé.

Le calcul retire d’abord les couleurs bien placées, puis cherche les mal placées dans les occurrences restantes, sans modifier les combinaisons originales. L’interface utilise le moteur pour valider les propositions et affiche une explication adaptée lorsqu’une position est vide. Aucune fonction interne du jeu ne constitue l’API officielle 0.2.

`creerPartie` construit un objet interne contenant le secret, le compteur à zéro, un historique vide, aucun indice (`null`) et le statut `en-cours`. `reinitialiserPartie` remplace ces valeurs dans le même objet, afin de conserver une référence commune pour les futurs composants. Le secret de cet objet est réservé au moteur et ne devra pas être transmis à l’affichage du joueur.

Le tirage normal utilise `Math.random`, le générateur fourni par JavaScript. La palette entière reste disponible pour chacune des quatre positions. Les tests peuvent fournir une fonction de tirage contrôlée pour vérifier les cas précis ; ce paramètre interne ne préjuge pas du contrat API 0.2.

`soumettreProposition` calcule les indices avant de modifier la partie. Une entrée invalide déclenche une erreur expliquée ; une entrée valide consomme un essai et conserve une copie de la proposition et des indices. Les copies empêchent une nouvelle saisie de réécrire l’historique. La victoire est vérifiée avant la défaite au dixième essai ; après la fin, toute proposition est refusée sans modifier la partie. Cette fonction est interne et ne constitue pas l’API 0.2.

**Éléments manquants ou ouverts :**

- Contrat API 0.2 et indications du cours, attendus ultérieurement selon l’étudiant : noms et accès aux fonctions, paramètres, réponses, erreurs, démarrage et éventuel moyen officiel d’obtenir une partie reproductible pour les tests. Attendre ces sources avant toute implémentation de l’API.
- Modèle de départ mentionné page 1 du sujet : absent du dossier ; les informations seront communiquées en temps voulu. L’organisation proposée reste provisoire jusqu’à leur réception.
- Retours de l’étudiant reçus : prise en main claire, parcours clavier fonctionnel et adaptations approuvées, y compris le lien masqué hors sélection. Essai tactile sur smartphone réel et vérification avec un lecteur d’écran à effectuer.
- Heure exacte des rendus à consulter sur Cyberlearn ; préparer la version J1 après l’essai mobile.

## Reprise du projet et structure proposée

**Fichiers présents :**

| Fichier | Rôle |
| --- | --- |
| `index.html` | Structure de la page, règles, commandes et zones de résultats. |
| `style.css` | Apparence, lisibilité, adaptation aux petits écrans et repère de sélection au clavier. |
| `interface.js` | Saisie du joueur et affichage à partir du moteur de jeu. |
| `jeu.js` | Règles, palette et état de la partie, sans dépendre de la page. |
| `jeu.test.mjs` | Tests du moteur avec les outils intégrés de Node.js. |
| `serveur.mjs` | Prévisualisation locale limitée aux fichiers du jeu, liée à l’adresse locale de cet ordinateur. Inutile pour l’application publiée. |
| `lancer-jeu.cmd` | Lance la prévisualisation sous Windows depuis le dossier du projet, même si le fichier est exécuté depuis un autre dossier. |
| `.node-local` | Configuration locale du chemin vers Node.js, exclue de Git et à actualiser si ce chemin change. |
| `.gitignore` | Exclusions des secrets, configurations locales, fichiers temporaires et vidéos de capsule de l’historique Git. |
| `README.md`, `AGENTS.md`, `doc/` | Suivi du projet, consignes de collaboration et trois PDF de référence. |

L’interface utilise les fonctions existantes de `jeu.js` et conserve la partie dans son module, sans variable globale ni accès d’API de test ajouté. Un fichier d’adaptation pourra être proposé après réception du contrat 0.2.

## Vérifications

Version testée : première interface jouable du 11 novembre 2026, conservée sous le repère Git `v0.1.0`. Environnement : Windows, Node.js 24.22.1. Commande : `node --test jeu.test.mjs`, depuis la racine du projet. **27 tests réussis, 0 échec : 9 sur le calcul, 7 sur le démarrage et la réinitialisation, 11 sur les propositions et le cycle de partie.** Les tests du moteur ont été relancés avec succès avant la sauvegarde Git. Les cas exacts et leurs attentes sont conservés dans `jeu.test.mjs` ; les tableaux regroupent leurs résultats pour garder le README court.

### Scénarios prioritaires

Les résultats de cette table concernent le moteur, sur la version indiquée ci-dessus. Les contrôles distincts dans le navigateur sont documentés ensuite.

| Test et action | Attendu | Observé | Statut |
| --- | --- | --- | --- |
| 1. Soumettre trois couleurs, avant ou après un essai valide. | Refus expliqué ; compteur, historique et indices précédents inchangés. | Refus et état inchangé dans les deux cas. | Réussi |
| 2. Soumettre quatre couleurs autorisées. | Un seul essai consommé ; proposition et deux indices ajoutés à l’historique. | Compteur à 1, une ligne conservée et indices corrects. | Réussi |
| 3. Secret rouge, rouge, bleu, vert ; proposer quatre rouges. | 2 bien placées, 0 mal placée. | 2 et 0, au calcul et lors de la soumission. | Réussi |
| 4. Neuf propositions incorrectes, puis une incomplète et enfin le secret. | Refus sans effet de l’incomplète ; victoire au dixième essai valide. | État inchangé après refus, puis victoire avec compteur et historique à 10. | Réussi |
| 5. Dix propositions valides incorrectes. | Défaite au dixième essai ; résultats conservés. | Statut perdu, compteur et historique à 10 ; indices conservés. | Réussi |
| 6. Proposer après une victoire et après une défaite. | Aucun changement de l’état, du compteur, de l’historique ou des indices. | Refus expliqué et état inchangé pour des propositions correctes, incorrectes et incomplètes. | Réussi |
| 7. Recommencer en cours de partie, après victoire et après défaite obtenues par soumissions. | Nouveau tirage, zéro essai, historique vide, aucun indice ; possibilité de rejouer. | État réinitialisé dans les trois cas, puis nouvel essai accepté. | Réussi |
| 8. Parcourir le jeu au clavier, à la souris et sur smartphone tactile. | Couleurs nommées ou symbolisées, repère clavier visible, commandes utilisables, indices et historique lisibles sur petit écran. | Contrôles navigateur décrits ci-dessous ; smartphone tactile réel non essayé. | Non effectué sur appareil réel |

### Contrôles complémentaires exécutés

Même version et même environnement ; tous ces groupes ont réussi.

| Comportement | Attendu et observé |
| --- | --- |
| Calcul des indices | Autre exemple officiel : secret rouge, bleu, vert, jaune ; proposition rouge, vert, bleu, orange → 1 bien placée et 2 mal placées. Cas complémentaires conformes : quatre violets exacts → 4/0, aucune couleur commune → 0/0, quatre mal placées avec répétition → 0/4, répétitions excédentaires → 0/2, bien placées exclues du reste → 2/1. |
| Entrées invalides | Huit entrées invalides (type, longueur, couleur inconnue, majuscule, emplacements vides) refusées avec une explication dans le calcul et la soumission ; la soumission conserve l’état précédent. |
| Protection des saisies et de l’historique | Le calcul et la soumission acceptent des listes protégées contre la modification. Modifier la saisie ou les indices retournés ne réécrit pas les résultats conservés ; deux essais restent dans leur ordre avec leurs propres indices. |
| Secret fixe et victoire immédiate | Trois propositions ne modifient pas le secret et ne déclenchent aucun nouveau tirage. Le secret exact donne aussi la victoire au premier essai. |
| Tirage initial | Quatre couleurs autorisées et état initial vide avec le générateur normal. Tirages contrôlés : chacune des six couleurs peut se répéter quatre fois ; ordre rouge, bleu, orange, violet vérifié, y compris aux bornes 0 et juste sous 1. |
| Réinitialisation et indépendance | Même objet conservé ; anciennes listes remplacées sans être modifiées, vérifié aussi sur états simulés. Deux parties ne partagent pas leur secret ni leur historique. Un nouveau code peut être identique au précédent : huit appels de tirage confirmés pour deux codes, dans des listes distinctes. |
| Générateur de test invalide | Quatre valeurs invalides refusées au quatrième tirage ; état précédent conservé sans réinitialisation partielle. |

### Contrôles dans le navigateur

Même version du projet et même date ; navigateur intégré à Codex sous Windows, site local `http://127.0.0.1:8000/`. Ces contrôles ont été réalisés par les commandes visibles de la page ; aucun accès au secret ni dispositif de test ajouté à l’application. Pour préparer la victoire au dixième essai, le code a été déduit des indices affichés, puis des propositions incorrectes ont été faites jusqu’au neuvième essai.

| Contrôle | Attendu | Observé et statut |
| --- | --- | --- |
| Chargement | Interface française utilisable et six couleurs disponibles. | Page chargée, commandes actives, aucune erreur ou alerte JavaScript observée : réussi. |
| Proposition incomplète avant/après un essai valide | Explication, compteur et historique inchangés. | Refus, compteurs à 0 puis 1, historique conservé et focus sur la position vide : réussi. |
| Modification avant validation et essai valide | Derniers choix conservés, un seul essai ajouté, indices visibles. | Modification vert → orange enregistrée, compteur à 1 et une ligne d’historique : réussi. |
| Victoire au dixième | Victoire, dix lignes conservées, saisie bloquée. | Message de victoire en 10 essais, compteur à 10, sélecteurs et bouton désactivés : réussi. Une proposition incomplète au neuvième essai n’a consommé aucun essai. |
| Défaite | Dix propositions incorrectes terminent la partie. | Statut et message de défaite, dix lignes conservées, saisie bloquée : réussi. |
| Nouvelle partie en cours, après victoire et après défaite | Saisie vide, compteur et historique réinitialisés, jeu utilisable. | Compteur à 0, historique vide, quatre choix vides, aperçus « ? » et commandes actives : réussi. |
| Clavier et règles | Sélection, navigation et activation sans souris. | Quatre rouges choisis avec les flèches, navigation avec Tabulation jusqu’à « Valider », validation par Entrée ; contour de focus visible. Règles ouvertes à la souris et refermées par Entrée : réussi. |
| Petits écrans et couleurs nommées | Aucun débordement horizontal, noms et indices lisibles. | Largeurs 320 et 390 pixels contrôlées, avec historique à 390 ; aucun débordement détecté. Sélecteurs et boutons de 44 pixels de haut à 320 pixels : réussi pour ces dimensions simulées. |
| Secret dans l’affichage | Le code ne doit pas être révélé pendant la partie. | Les quatre « ? » restent affichés, y compris en fin de partie : réussi pour l’affichage contrôlé. |
| Prévisualisation locale | Les fichiers du jeu se chargent correctement. | Page, CSS et modules : réponse 200 avec leur type correct ; fichiers non servis comme le README : 404 ; requête d’en-têtes sans contenu : réussie. |

### Premier essai de l’étudiant

**Retour reçu le 12 novembre 2026**, sur la base `v0.1.0` avec le correctif local de lancement, non commité au moment de cet essai. Résultats déclarés par l’étudiant après le parcours proposé, distincts des contrôles exécutés par Codex. Le navigateur, la méthode exacte de lancement et le mode de saisie ne sont pas précisés.

| Comportement | Attendu | Observé selon l’étudiant | Statut |
| --- | --- | --- | --- |
| Lancement et accès au jeu | La prévisualisation démarre et le jeu s’ouvre dans le navigateur. | Fonctionnement confirmé. | Réussi |
| Proposition de trois couleurs | Refus expliqué, sans consommer d’essai. | Fonctionnement conforme au parcours confirmé. | Réussi |
| Proposition de quatre couleurs | Un essai consommé ; proposition et indices affichés dans l’historique. | Fonctionnement conforme au parcours confirmé. | Réussi |
| Nouvelle partie | Compteur, choix et historique réinitialisés. | Fonctionnement conforme au parcours confirmé. | Réussi |

Les informations sont jugées claires et aucune difficulté supplémentaire n’est signalée. Ce retour ne valide pas les autres scénarios, le smartphone réel ou le lecteur d’écran ; aucune nouvelle exécution des 27 tests automatisés n’a été réalisée pour cette mise à jour documentaire.

### Essai au clavier de l’étudiant et analyse

**12 novembre 2026 — version locale `641a89c`.** L’étudiant confirme les quatre points du parcours clavier proposé. Les résultats ci-dessous proviennent de son retour ; le navigateur et le système utilisés pour cet essai ne sont pas précisés. Deux réserves de confort sont conservées, sans les présenter comme des erreurs des règles du jeu.

| Comportement | Attendu | Observé selon l’étudiant | Statut |
| --- | --- | --- | --- |
| Navigation par Tabulation | Atteindre les commandes avec un repère visible. | Navigation appréciée, retour à la position 1 après un essai et lien d’évitement utiles. Sortir de la page après les dernières commandes est toutefois jugé gênant. | Réussi pour la navigation ; réserve ergonomique signalée. |
| Choix des couleurs avec les flèches | Pouvoir choisir les couleurs disponibles. | Les quatre directions fonctionnent. À la dernière couleur, il faut inverser le sens pour revenir, ce qui est jugé peu pratique. | Réussi pour le choix ; réserve ergonomique signalée. |
| Validation avec Entrée | Enregistrer une proposition et afficher son résultat. | Fonctionnement confirmé. | Réussi |
| Nouvelle partie au clavier | Pouvoir réinitialiser la partie avec le clavier. | Fonctionnement confirmé. | Réussi |

**Contrôles complémentaires de Codex, même date et même version**, dans une partie séparée du navigateur intégré sous Windows :

- Depuis la position 1, Tabulation atteint la position 2 ; Maj+Tab revient à la position 1. Après « Nouvelle partie », Tabulation atteint « Comment jouer ? », puis aucun élément interactif de la page ne reste actif. La destination exacte dans les commandes extérieures du navigateur n’a pas été contrôlée.
- Sur la dernière option Violet, les flèches Bas et Droite conservent Violet ; Haut sélectionne Orange. La lettre R sélectionne directement Rouge dans ce navigateur. Le compteur reste à zéro pendant ces changements.
- Le lien « Aller à la proposition » atteint l’ancre `#proposition`. Une proposition de quatre rouges validée avec Entrée consomme un essai, ajoute une ligne d’historique et ramène la sélection active à la position 1.

Ces contrôles, réalisés avant les adaptations, avaient reproduit les comportements et confirmé le parcours décrit. Le code ne redéfinissait alors ni Tabulation ni les flèches des listes standard. Les résultats après adaptation sont documentés dans la section suivante.

**Analyse initiale et choix ensuite validés par l’étudiant :**

1. Conserver la possibilité de quitter le jeu avec le clavier. Une boucle forcée de Tabulation sur toute la page compliquerait l’accès aux commandes extérieures. Le [W3C explique le principe d’absence de piège au clavier](https://www.w3.org/WAI/WCAG22/Understanding/no-keyboard-trap.html) : l’utilisateur doit pouvoir quitter un composant au clavier. Cela ne constitue pas un audit complet de conformité du jeu. La commande « Revenir à la proposition » après les règles a été proposée puis validée pour faciliter le retour volontaire à la position 1.
2. L’arrêt sur Violet était le comportement de la liste standard observé pendant le contrôle, pas une erreur de calcul. Les [sélecteurs HTML sont des contrôles fournis par le navigateur](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/select). Une navigation circulaire Violet → Rouge et Rouge → Violet a été proposée puis validée comme personnalisation. Les vérifications restent nécessaires au clavier, au toucher et avec les aides techniques.

Sources d’accessibilité consultées le 12 novembre 2026. Aucun test automatisé du moteur n’avait été réexécuté pour l’analyse documentaire seule. Ils ont été relancés lors du développement décrit ci-dessous.

### Adaptations clavier réalisées et vérifiées

**12 novembre 2026 — base locale `641a89c`, modifications non commitées au moment des vérifications, puis regroupées dans le commit « Améliorer la navigation clavier et documenter les essais ».** Après validation des deux propositions, ajout du lien après les règles, de son style et de son traitement dans `interface.js`. Les flèches bouclent entre les six couleurs, actualisent l’aperçu et ne consomment aucun essai. Les règles et le moteur du jeu sont inchangés.

Environnement : Windows, navigateur intégré à Codex, prévisualisation locale. **27 tests du moteur réexécutés avec Node.js 24.22.1 : 27 réussis, 0 échec.** Syntaxe de `interface.js` contrôlée avec Node.js. Les contrôles suivants ont été effectués dans une partie de vérification séparée :

| Contrôle | Attendu | Observé et statut |
| --- | --- | --- |
| Boucle sur les quatre positions | Depuis une position vide, Bas sélectionne Rouge ; aux limites, Bas/Droite : Violet → Rouge, Haut/Gauche : Rouge → Violet. | Six passages contrôlés sur chacune des quatre positions, aperçus correspondants ; compteur et historique à zéro : réussi. |
| Parcours complet des couleurs | Respecter l’ordre Rouge, Bleu, Vert, Jaune, Orange, Violet et son inverse, sans passer par « Choisir… ». | Un cycle complet dans chaque sens conforme à l’ordre attendu : réussi. |
| Autres touches | Conserver la sélection par initiale, les touches modificatrices et la navigation entre commandes. | R sélectionne Rouge ; Maj+Bas sur Violet reste sur Violet ; Tab va de la position 1 à 2 et Maj+Tab revient à 1 : réussi pour ces cas. |
| Retour depuis les règles | Le lien est accessible après les règles et ramène à la position 1 sans changer la partie. | Tab depuis les règles atteint le lien ; clic et Entrée ramènent à la position 1, compteur inchangé : réussi. |
| Sortie du jeu | Tabulation après le dernier lien ne doit pas être forcée vers la position 1. | Aucun élément interactif de la page ne reste actif après cette Tabulation : réussi ; destination extérieure non contrôlée. |
| Proposition incomplète | Refus expliqué sans consommer d’essai ni ajouter d’historique. | Position vidée avec Début puis validation : refus, compteur et historique à zéro, sélection active sur la position vide : réussi. |
| Proposition composée avec les flèches | Enregistrer une proposition valide et ses indices une seule fois. | Rouge, Violet, Rouge, Violet enregistré avec compteur à 1, historique ajouté et retour à la position 1 : réussi. |
| Retour après la fin et nouvelle partie | Proposer une commande utilisable après la fin et permettre de recommencer. | Après dix essais incorrects : lien dirigé vers « Nouvelle partie », dix résultats conservés ; après redémarrage, compteur à zéro, historique et choix vides : réussi. |
| Affichage étroit | Le nouveau lien et l’aide doivent rester lisibles sans débordement. | À 320 pixels : aucun débordement horizontal détecté, lien de 44 pixels de haut et retour à la position 1 fonctionnel : réussi pour cette dimension simulée. |

Aucune erreur ou alerte JavaScript observée lors de ces contrôles. **Limites :** la boucle concerne les listes fermées ; lorsque le navigateur expose l’état ouvert, le code laisse le menu natif gérer ses touches. L’ouverture effective de ce menu n’a pas pu être confirmée par les commandes de l’outil de vérification et reste à essayer manuellement. Le smartphone réel, les autres navigateurs et les lecteurs d’écran restent non vérifiés. Le retour par le lien après une défaite a été testé ; après une victoire, il est prévu par le même traitement mais n’a pas été contrôlé séparément dans cette série.

**Harmonisation visuelle du lien, 12 novembre 2026 :** à la demande de l’étudiant, « Revenir à la proposition » reprend l’apparence du lien du haut. Une règle CSS commune définit le fond vert foncé `#234e42`, le texte blanc et les espacements. La taille et la graisse du texte sont également identiques.

Attendu : présentation cohérente, repère clavier visible et retour toujours fonctionnel. Observé dans le navigateur intégré : styles des deux liens identiques pour les couleurs, les espacements, la taille et la graisse du texte ; contour visible après Tabulation ; Entrée ramène à la position 1, compteur et historique inchangés. À 320 pixels de large, le lien mesure 48 pixels de haut et aucun débordement horizontal n’est détecté. **Statut : réussi pour ces contrôles, sur la base `641a89c` avec les adaptations locales non commitées.** Seuls le CSS et cette documentation ont été modifiés pour l’harmonisation ; aucun nouveau test du moteur n’a été exécuté à cette étape visuelle.

**Visibilité à la navigation clavier, 12 novembre 2026 :** après précision de l’étudiant, le lien est masqué visuellement au repos tout en restant dans le parcours de Tabulation. Il reprend son apparence verte et blanche lorsqu’il devient actif. Le changement est limité au CSS et au README ; son action en JavaScript est inchangée.

Attendu : le lien apparaît lorsque Tabulation l’atteint après « Comment jouer ? », puis disparaît quand on le quitte. Observé dans une partie séparée du navigateur intégré sous Windows : découpe visuelle et dimensions de 1 × 1 pixel au repos ; lien visible de 48 pixels de haut avec repère clavier après Tabulation. Entrée ramène à la position 1, avec compteur et historique à zéro ; le lien se masque à nouveau. Tabulation suivante quitte les commandes de la page, tandis que Maj+Tab revient aux règles, sans maintien forcé dans le jeu. Même apparition contrôlée à 320 pixels, sans débordement horizontal détecté. **Statut : réussi pour ces contrôles, base `641a89c` avec modifications locales non commitées.** Les lecteurs d’écran et un appareil tactile réel restent non vérifiés ; aucun nouveau test du moteur n’a été exécuté pour ce changement d’affichage.

### Correction documentée : lancement à la reprise du projet

**12 novembre 2026 — base `v0.1.0`, correctif local non commité au moment du diagnostic.** L’étudiant signale un lien local inaccessible et une commande `node serveur.mjs` non reconnue. Attendu : pouvoir reprendre le jeu avec la procédure du README.

- **Avant : échec reproduit.** Avec le chemin de recherche enregistré dans Windows, `node --version` répond « 'node' n’est pas reconnu ». Aucun service n’écoute sur le port 8000. Le lien inaccessible a été signalé par l’étudiant ; l’absence de prévisualisation en cours a été constatée pendant le diagnostic.
- **Cause :** la copie de Node.js disponible dans l’environnement de Codex n’est pas accessible par son nom dans un terminal Windows ordinaire. Le README du 11 novembre généralisait une vérification faite dans Codex. Par ailleurs, une adresse locale cesse de répondre quand sa prévisualisation est arrêtée.
- **Correction :** ajout de `lancer-jeu.cmd`, préparation du chemin local `.node-local` et exclusion de ce fichier dans `.gitignore`. Le lanceur se place dans le dossier du projet et emploie Node.js de Windows ou le chemin local préparé. Les fichiers du jeu et `serveur.mjs` sont inchangés.

| Contrôle | Attendu | Observé et statut |
| --- | --- | --- |
| Lanceur sans `node` dans le chemin habituel de Windows | La prévisualisation démarre grâce au chemin local, même depuis un autre dossier. | Message de démarrage obtenu depuis le dossier Documents avec le chemin de recherche Windows : réussi. |
| Page et fichiers nécessaires | Chargement de la page, du CSS et des deux modules JavaScript. | Quatre réponses HTTP 200 avec les types attendus ; page française, sélecteurs actifs et compteur à 0 constatés dans le navigateur intégré à Codex : réussi. |
| Second lancement avec Node.js accessible | Message explicite si une prévisualisation utilise déjà le port 8000. | « Le port 8000 est déjà utilisé », code de sortie 1 ; première prévisualisation conservée : réussi. |
| Configuration locale | Le chemin propre à cet ordinateur reste hors de Git. | Exclusion de `.node-local` confirmée par Git : réussi. |
| Reprise par l’étudiant | L’étudiant peut lancer le jeu et y accéder. | Fonctionnement confirmé dans son retour du 12 novembre : réussi selon l’étudiant. Méthode exacte non précisée. |
| Double-clic vérifié séparément et autre ordinateur | Vérifier ces conditions précises de lancement. | Non effectué ; le retour de l’étudiant ne précise pas ces conditions. |

**Limite :** ce correctif permet le lancement sur cet ordinateur avec sa configuration locale. Il ne rend pas la commande `node` disponible dans tous les terminaux et ne transforme pas l’adresse locale en site public. Une mise à jour de Codex peut nécessiter d’actualiser `.node-local`.

### Correction documentée : aperçus gris

Action reproduite à 320 pixels : choisir rouge, bleu, vert et jaune. Attendu : chaque disque doit avoir la même couleur que la pastille correspondante de la palette.

- **Avant correction : échec observé.** Les quatre disques restaient gris, couleur calculée `rgb(233, 236, 227)`, malgré les noms sélectionnés. La pastille rouge était bien `rgb(200, 79, 79)`.
- **Cause et changement :** dans `style.css`, le fond neutre des aperçus était défini après les couleurs et les remplaçait. Les règles des couleurs ont été déplacées après ce fond neutre.
- **Après correction : réussi.** Même action après rechargement : rouge `rgb(200, 79, 79)`, bleu `rgb(71, 124, 184)`, vert `rgb(82, 132, 91)`, jaune `rgb(233, 194, 76)`, identiques à la palette. Un contrôle supplémentaire confirme la correspondance pour les six couleurs et le retour à « ? » après réinitialisation.

**Limites de ces contrôles locaux :** publication non vérifiée dans cette série (voir le contrôle distinct ci-dessous), conformité API, utilisation tactile sur smartphone réel et lecture par lecteur d’écran non vérifiées ; aucune mesure statistique du hasard. Les dimensions simulées ne remplacent pas un essai sur appareil. L’exemple officiel à secret imposé reste vérifié au niveau du moteur, sans secret forcé dans l’interface. Les contrôles navigateur ne constituent pas un audit complet d’accessibilité.

### Première publication GitHub Pages

**12 novembre 2026 — version `a128ef3` sur `main`.** Publication autorisée par l’étudiant depuis le dossier principal. GitHub indique une construction réussie pour ce commit, sans erreur, et HTTPS imposé. Environnement : Windows, navigateur intégré à Codex, [adresse publique du jeu](https://davaub.github.io/Mastermind/). Les contrôles suivants portent sur l’application publiée, sans accès au secret.

| Contrôle | Attendu | Observé et statut |
| --- | --- | --- |
| Chargement public | Page et trois fichiers CSS/JavaScript accessibles avec leurs types corrects. | Quatre réponses HTTP 200 ; contenus identiques aux fichiers locaux du commit `a128ef3`, page française et commandes actives : réussi. |
| Proposition incomplète | Refus expliqué, zéro essai et historique vide. | Trois couleurs sélectionnées : explication affichée, compteur à 0, historique vide et sélection sur la position 4 : réussi. |
| Proposition valide | Un essai et une ligne d’historique avec les deux indices. | Rouge, Bleu, Vert, Jaune validés par Entrée : compteur à 1, une ligne avec les deux indices et retour à la position 1 : réussi. Le calcul n’a pas été contrôlé contre un secret imposé dans cette série. |
| Adaptations clavier | Boucle des couleurs et lien visible seulement lorsqu’il devient actif, sans changer l’historique. | Violet → Rouge avec Bas, Rouge → Violet avec Haut ; lien de 1 × 1 pixel découpé au repos, puis 48 pixels de haut après Tab depuis les règles ; Entrée revient à la position 1, historique à une ligne : réussi. |
| Affichage étroit | Noms, indices et commandes lisibles sans débordement horizontal. | Largeur de fenêtre simulée de 320 pixels avec un essai : contenu de 305 pixels, égal à la largeur disponible hors barre de défilement ; sélecteurs de 44 pixels de haut, noms et indices visibles : réussi pour cette dimension. |
| Nouvelle partie | Compteur à zéro, historique et choix vides. | Ces trois réinitialisations constatées, commandes actives : réussi. |

Aucune erreur ni alerte JavaScript observée pendant ce parcours. Les 27 tests du moteur n’ont pas été relancés pour cette publication sans changement du jeu. Victoire, défaite et répétitions restent couvertes par les essais locaux décrits plus haut ; elles n’ont pas été rejouées dans cette série publique. Smartphone tactile réel, lecteur d’écran, autres navigateurs et API 0.2 : **non effectués**.

Pour chaque vérification future, conserver comportement, attendu, observé, statut (réussi, échoué ou non effectué), date, version, environnement et limites. Pour une correction, garder si possible la preuve du défaut avant et le résultat du même test après. Les contrôles d’API seront ajoutés après réception du contrat officiel.

## Plan de développement proposé

Appliquer à chaque étape : **Cadrer → Confier → Examiner → Vérifier → Documenter**. Les choix importants restent soumis à l’étudiant. Un commit est un point de sauvegarde dans l’historique Git ; un tag est un nom attaché à une version. Proposer des commits aux étapes utiles, sans commit, tag, push ou publication sans accord.

| Étape | Objectif et résultat attendu | Vérifications prévues |
| --- | --- | --- |
| 1. Valider le départ | Obtenir ou clarifier le modèle du cours, valider l’architecture et proposer une première sauvegarde Git. | Comparer le modèle au sujet, examiner les fichiers à conserver et les changements proposés avant toute opération Git. |
| 2. Construire le moteur par petits changements | Commencer par le calcul des indices, puis ajouter tirage, validation et cycle complet de partie. | Exemple officiel des répétitions, exemple des mal placées, puis tests 1 à 7 au niveau du moteur et refus d’une couleur non autorisée. |
| 3. Obtenir une première version jouable | Ajouter composition modifiable, validation, compteur, historique, messages, règles et nouvelle partie. | Reprendre les tests 1 à 7 depuis l’interface, puis le test 8 ; comparer attendu et observé dans le README. |
| 4. Préparer et publier une première version | Relire les fichiers, vérifier l’absence de secrets, conversations et données privées, obtenir l’accord puis publier sur GitHub Pages. | Refaire un parcours sur l’adresse publiée, vérifier les fichiers chargés et un essai sur smartphone ; documenter les liens réels et les limites. |
| 5. Préparer J1 : 20 novembre 2026 au soir | Première version vérifiée, éventuellement incomplète ; liens du dépôt et de l’application, tag `jalon-1` après accord, README avec décision expliquée, premiers attendus, tests, correction réelle avant/après et limites. | Examiner les preuves et la version remise ; confirmer l’heure sur Cyberlearn. Si aucune correction n’est documentée, signaler le manque sans inventer de défaut. Aucune capsule à J1. |
| 6. Aller vers J2 : 18 décembre 2026 au soir | Intégrer le contrat 0.2 reçu, compléter le jeu et la documentation, préparer le tag `final` après accord et la capsule de 4 à 5 minutes avec voix et écran. | Tester les règles et la conformité API sur le site publié, son partage de logique et d’état avec l’interface, noter appareil et résultat mobile ; essayer le jeu d’un camarade et en faire un bref retour. Vérifier liens, preuves de correction et lisibilité de la capsule. |

L’API 0.2 fonctionnelle est obligatoire pour J2. Les remises ont lieu sur Cyberlearn aux heures annoncées sur la plateforme. La capsule J2 reste sur Cyberlearn, jamais dans GitHub public. Les conversations ne font pas partie du dépôt public.

**Sauvegarde de cette étape :** premier commit « Première version jouable de Code secret », repéré par `v0.1.0`, sur `main` dans le dépôt public [Davaub/Mastermind](https://github.com/Davaub/Mastermind), avec l’accord de l’étudiant. L’auteur Git utilise le pseudonyme GitHub et une adresse GitHub masquée. Les fichiers du jeu, les tests, la documentation et les trois PDF de référence ont été examinés avant l’envoi ; les contrôles n’ont détecté ni secret ni adresse personnelle dans ces fichiers. Cette vérification ne remplace pas les contrôles à réaliser pour chaque ajout futur.

**Sauvegarde du 12 novembre :** commit local « Corriger le lancement Windows et documenter les premiers essais », sur `main`, avec l’accord de l’étudiant. Il conserve `lancer-jeu.cmd`, l’exclusion de `.node-local` et le README actualisé. Le chemin local reste exclu de Git ; le repère `v0.1.0` reste attaché à la première version. Aucun nouvel envoi sur GitHub ni nouvelle publication n’est effectué à cette étape.

**Sauvegarde des adaptations clavier, 12 novembre :** commit « Améliorer la navigation clavier et documenter les essais », comprenant `index.html`, `interface.js`, `style.css` et ce README. La sauvegarde et l’envoi sur GitHub de ce commit et du correctif de lancement `641a89c` sont autorisés par l’étudiant. Le chemin `.node-local` reste exclu de Git ; le repère `v0.1.0` conserve sa position d’origine. Les contrôles et limites rapportés ci-dessus correspondent aux essais réalisés avant cette sauvegarde ; aucun nouveau test de jeu n’est annoncé pour la seule opération Git.

**Publication du 12 novembre :** GitHub Pages activé avec l’accord de l’étudiant, depuis `main` et le dossier principal ; première version publique `a128ef3` vérifiée ci-dessus. Seul le README est actualisé dans le dépôt pour documenter cette publication ; les fichiers du jeu et le repère `v0.1.0` sont conservés.

**Prochaine étape proposée :** essayer l’adresse publique sur un smartphone réel et noter l’appareil, le navigateur et les résultats, puis préparer J1. Aucun repère `jalon-1` ou `final` n’a encore été créé.
