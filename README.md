# Keepass - Un coffre-fort numérique pour vos mots de passe

## Introduction

Keepass est un système de sauvegarde de mots de passe en ligne qui offre une sécurité de haut niveau pour vos données sensibles. Chaque compte est considéré comme un **coffre-fort** numérique, garantissant que vos informations sont stockées en toute sécurité et accessibles uniquement par vous.

## Sécurité

Tout le système de sécurité est réalisé côté serveur, ce qui le rend inaccessible pour un utilisateur lambda. Nous utilisons certains des meilleurs stratagèmes de sécurisation des données disponibles aujourd'hui.

### Processus d'authentification

Nous utilisons `bcrypt` pour le hachage des mots de passe et `jwt` (JSON Web Token) pour la gestion des sessions. Cela garantit que même si quelqu'un parvenait à intercepter votre communication, il ne pourrait pas lire ou modifier vos informations.

### Sauvegarde des mots de passe

Les mots de passe sont sauvegardés en utilisant `crypto-js`, une bibliothèque JavaScript de chiffrement standard de l'industrie. Cela signifie que vos mots de passe sont stockés sous une forme cryptée et ne peuvent être lus que si le mot de passe correct est fourni.

### Exportation des données

Les données exportées sont également mises sous forme de texte complètement crypté avec `crypto-js`. Cela signifie que même si quelqu'un parvenait à intercepter vos données exportées, il ne pourrait pas les lire sans la clé de déchiffrement correcte.

## Déploiement

La base de données est une base de données en ligne, il n'y a donc rien à déployer de ce côté. Pour utiliser le projet, suivez ces étapes :

1. Clonez le projet sur votre machine locale.
2. Ouvrez une console dans le répertoire du projet et exécutez `npm i` pour installer les dépendances nécessaires.
3. Ajoutez le fichier `.env` fourni dans le mail à la racine du projet.

Et voilà ! Vous êtes prêt à utiliser Keepass, votre coffre-fort numérique personnel pour vos mots de passe.