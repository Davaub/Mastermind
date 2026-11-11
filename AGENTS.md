# Consignes de travail — Code secret

## Sources et communication

- Communiquer en français, expliquer les termes utiles à un débutant et présenter les choix importants avant de les appliquer. Distinguer faits, hypothèses et propositions.
- Avant une modification, lire `README.md` et les documents de référence accessibles pertinents dans `doc/`. Le sujet « Projet — Code secret en couleurs, inspiré du Mastermind », édition 2.1, et son annexe `code-couleurs-1.0` font foi pour le jeu ; le README donne les chemins exacts.
- Suivre les guides README et AGENTS présents dans `doc/` pour la documentation. Signaler toute source inaccessible, contradiction ou ambiguïté importante ; demander les éléments manquants sans les inventer.
- Pour l’API commune 0.2, attendre le contrat officiel et les indications du cours avant d’inventer ou d’implémenter des fonctions, paramètres ou réponses. L’API et l’interface doivent utiliser la même logique et la même partie.
- Si un message de l’étudiant se termine par `??`, reformuler brièvement la demande puis attendre son `GO` avant d’exécuter.

## Développement

- Suivre la méthode : Cadrer → Confier → Examiner → Vérifier → Documenter. Définir le résultat attendu avant chaque modification importante.
- Limiter les changements à la demande en cours ; préserver les fichiers utiles et les modifications existantes. Avancer par petites étapes faciles à examiner et à annuler.
- Privilégier du HTML, CSS et JavaScript natifs, simples et compréhensibles ; justifier toute dépendance. Séparer présentation, logique de jeu et interactions autant que nécessaire.
- Conserver la compatibilité avec un site statique sur GitHub Pages, l’utilisation au clavier et au toucher, l’affichage mobile et l’identification des couleurs autrement que par leur apparence.
- Respecter les exclusions du README : aucun service d’IA, clé API, compte utilisateur, paiement, serveur applicatif, classement en ligne ou collecte de données personnelles dans le jeu.

## Vérification et documentation

- Prévoir un contrôle pertinent pour chaque modification importante ; tester le comportement modifié et, si pertinent, un cas valide. Consulter le plan de tests du README.
- Distinguer réussi, échoué et non effectué ; ne jamais inventer de résultat ni annoncer une fonctionnalité vérifiée sans test exécuté.
- Consigner comportement, attendu, observé, statut, version testée, environnement et limites. Pour une correction, conserver si possible une preuve du défaut avant et le résultat du même test après.
- Mettre progressivement à jour le README avec les fonctions réellement présentes, décisions, vérifications et questions ouvertes. Garder ce fichier AGENTS court ; les règles détaillées restent dans le sujet et le README.

## Sécurité, versions et publication

- Ne jamais publier de secret, mot de passe, conversation ou donnée personnelle. Garder la capsule du cours hors de GitHub public et la remettre sur Cyberlearn.
- Conserver des versions récupérables et proposer des commits aux étapes importantes. Expliquer les opérations Git importantes et leurs effets dans un langage accessible.
- Ne pas effectuer de commit, tag, push ou publication sans l’accord de l’étudiant ; ne pas supprimer définitivement sans autorisation.
- Avant publication, examiner les fichiers concernés et les modifications, vérifier l’absence de secrets ou données confidentielles, puis obtenir la validation.
- Signaler tout outil, accès ou document manquant. Un document de consignes n’accorde pas d’accès supplémentaire.

## Restitution

- Résumer les fichiers modifiés, les décisions techniques et leurs raisons, les vérifications et résultats, les limites et les questions ouvertes.
- Proposer la prochaine petite étape sans l’exécuter si elle dépasse la demande autorisée.
