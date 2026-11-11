# Code secret

Projet individuel de cours à la HEG Genève : créer un jeu Web solo inspiré du Mastermind, avec l’aide de Codex. Le joueur doit retrouver une combinaison de quatre couleurs en dix essais maximum.

## État actuel

Version `v0.1.0` : première interface jouable du 11 novembre 2026.

- Disponible : première interface française avec palette nommée, quatre sélecteurs, aperçus de couleurs, validation, compteur, historique, règles dépliables, messages de fin et nouvelle partie ; moteur avec les règles du jeu et 27 tests automatisés.
- Prévu : publication sur GitHub Pages, essai sur smartphone réel et intégration de l’API commune de test 0.2 après réception du contrat.
- Versions : Git initialisé sur la branche `main`, avec le repère `v0.1.0` pour cette première sauvegarde. Dépôt associé : [Davaub/Mastermind sur GitHub](https://github.com/Davaub/Mastermind).
- Limites : contrôles dans le navigateur intégré à Codex, sans essai tactile sur appareil réel ni lecteur d’écran. Le site n’est pas encore publié sur GitHub Pages.
- Hors périmètre : compte utilisateur, serveur applicatif, paiement, classement en ligne, données personnelles, service d’IA et clé API. PWA et fonctionnement hors ligne restent facultatifs et non prioritaires.

## Utilisation

### Lancer le jeu sur son ordinateur

Prérequis : Node.js disponible ; version 24.22.1 utilisée sous Windows pour les vérifications. Aucune bibliothèque supplémentaire à installer. L’installation de Node.js sur une autre machine n’a pas été vérifiée.

1. Ouvrir un terminal dans le dossier du projet.
2. Exécuter `node serveur.mjs` et garder le terminal ouvert.
3. Ouvrir [le jeu local](http://127.0.0.1:8000/) dans un navigateur.
4. Pour arrêter la prévisualisation, appuyer sur `Ctrl+C` dans le terminal.

Cette procédure a été essayée : la page et ses fichiers se chargent correctement. L’adresse désigne uniquement cet ordinateur, pas un site public. L’outil de prévisualisation sert les fichiers statiques ; aucune règle du jeu ne s’exécute sur ce serveur. GitHub Pages pourra servir les mêmes fichiers sans cet outil.

### Jouer et vérifier

Choisir une couleur à chacune des quatre positions numérotées, modifier si nécessaire, puis appuyer sur « Valider la proposition ». Consulter les bien placées et les mal placées dans l’historique pour préparer l’essai suivant. Les choix restent modifiables tant que la proposition n’est pas validée. Au clavier, utiliser Tabulation pour se déplacer, les flèches dans les sélecteurs et Entrée pour activer un bouton. « Comment jouer ? » détaille les règles ; « Nouvelle partie » recommence le jeu.

Pour relancer les tests du moteur, exécuter `node --test jeu.test.mjs` depuis le dossier du projet. Commande vérifiée : 27 tests réussis. Node.js exécute ici JavaScript sans navigateur. Pour reprendre le développement, lire ce README, `AGENTS.md`, puis les sources utiles dans `doc/`.

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

L’interface utilise quatre sélecteurs standard plutôt qu’une commande personnalisée : les noms des couleurs restent visibles et le navigateur fournit les commandes clavier. Une palette unique est partagée avec le moteur. À petite largeur, les positions numérotées passent sur deux lignes ; les propositions de l’historique restent ordonnées. Les messages sont annoncés par une zone de statut ; leur lecture par un lecteur d’écran reste à vérifier.

Séparer la logique du jeu des interactions permet de vérifier les règles indépendamment de l’affichage. L’interface et la future API utiliseront le même moteur et la même partie. Une API est ici un ensemble de fonctions permettant au professeur de piloter le jeu pour le tester ; aucun nom, paramètre ou format du contrat 0.2 n’est supposé.

Le calcul retire d’abord les couleurs bien placées, puis cherche les mal placées dans les occurrences restantes, sans modifier les combinaisons originales. L’interface utilise le moteur pour valider les propositions et affiche une explication adaptée lorsqu’une position est vide. Aucune fonction interne du jeu ne constitue l’API officielle 0.2.

`creerPartie` construit un objet interne contenant le secret, le compteur à zéro, un historique vide, aucun indice (`null`) et le statut `en-cours`. `reinitialiserPartie` remplace ces valeurs dans le même objet, afin de conserver une référence commune pour les futurs composants. Le secret de cet objet est réservé au moteur et ne devra pas être transmis à l’affichage du joueur.

Le tirage normal utilise `Math.random`, le générateur fourni par JavaScript. La palette entière reste disponible pour chacune des quatre positions. Les tests peuvent fournir une fonction de tirage contrôlée pour vérifier les cas précis ; ce paramètre interne ne préjuge pas du contrat API 0.2.

`soumettreProposition` calcule les indices avant de modifier la partie. Une entrée invalide déclenche une erreur expliquée ; une entrée valide consomme un essai et conserve une copie de la proposition et des indices. Les copies empêchent une nouvelle saisie de réécrire l’historique. La victoire est vérifiée avant la défaite au dixième essai ; après la fin, toute proposition est refusée sans modifier la partie. Cette fonction est interne et ne constitue pas l’API 0.2.

**Éléments manquants ou ouverts :**

- Contrat API 0.2 et indications du cours, attendus ultérieurement selon l’étudiant : noms et accès aux fonctions, paramètres, réponses, erreurs, démarrage et éventuel moyen officiel d’obtenir une partie reproductible pour les tests. Attendre ces sources avant toute implémentation de l’API.
- Modèle de départ mentionné page 1 du sujet : absent du dossier ; les informations seront communiquées en temps voulu. L’organisation proposée reste provisoire jusqu’à leur réception.
- Retour de l’étudiant sur cette première interface ; essai tactile sur smartphone réel et vérification avec un lecteur d’écran à effectuer.
- Publication du site sur GitHub Pages à préparer après validation ; heure exacte des rendus à consulter sur Cyberlearn.

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

### Correction documentée : aperçus gris

Action reproduite à 320 pixels : choisir rouge, bleu, vert et jaune. Attendu : chaque disque doit avoir la même couleur que la pastille correspondante de la palette.

- **Avant correction : échec observé.** Les quatre disques restaient gris, couleur calculée `rgb(233, 236, 227)`, malgré les noms sélectionnés. La pastille rouge était bien `rgb(200, 79, 79)`.
- **Cause et changement :** dans `style.css`, le fond neutre des aperçus était défini après les couleurs et les remplaçait. Les règles des couleurs ont été déplacées après ce fond neutre.
- **Après correction : réussi.** Même action après rechargement : rouge `rgb(200, 79, 79)`, bleu `rgb(71, 124, 184)`, vert `rgb(82, 132, 91)`, jaune `rgb(233, 194, 76)`, identiques à la palette. Un contrôle supplémentaire confirme la correspondance pour les six couleurs et le retour à « ? » après réinitialisation.

**Limites :** aucune publication, conformité API, utilisation tactile sur smartphone réel ou lecture par lecteur d’écran vérifiée ; aucune mesure statistique du hasard. Les dimensions simulées ne remplacent pas un essai sur appareil. L’exemple officiel à secret imposé reste vérifié au niveau du moteur, sans secret forcé dans l’interface. Les contrôles navigateur ne constituent pas un audit complet d’accessibilité.

Pour chaque vérification future, conserver comportement, attendu, observé, statut (réussi, échoué ou non effectué), date, version, environnement et limites. Pour une correction, garder si possible la preuve du défaut avant et le résultat du même test après. Les contrôles d’API et de l’application publiée seront ajoutés lorsqu’ils seront réalisables.

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

**Prochaine étape :** l’étudiant essaie le jeu et relève ses observations. La mise en ligne du site avec GitHub Pages nécessitera une validation distincte ; elle n’est pas incluse dans cette sauvegarde du code.
