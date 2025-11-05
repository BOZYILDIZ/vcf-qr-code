# TODO - Générateur VCF et QR Code

## Fonctionnalités principales

- [x] Créer un formulaire de saisie avec les champs suivants:
  - [x] Nom complet (requis)
  - [x] Entreprise (optionnel)
  - [x] Téléphone (requis)
  - [x] Email (requis)
  - [x] Adresse (optionnel)
  - [x] Site web (optionnel)
  - [x] Titre du poste (optionnel)
  - [x] Notes (optionnel)

- [x] Implémenter la génération de fichier VCF à partir du formulaire
- [x] Ajouter un bouton "Générer VCF" pour créer le fichier
- [x] Permettre le téléchargement du fichier VCF généré

- [x] Créer une section pour générer un QR code
- [x] Permettre l'upload ou l'utilisation du fichier VCF généré
- [x] Générer et afficher le QR code à partir du fichier VCF
- [x] Permettre le téléchargement du QR code généré

## Design et UX

- [x] Choisir un style de design moderne et professionnel
- [x] Créer une interface responsive (mobile, tablette, desktop)
- [x] Ajouter des validations de formulaire appropriées
- [x] Implémenter des messages de feedback utilisateur (succès, erreurs)

## Déploiement

- [x] Créer le fichier de configuration vercel.json
- [x] Ajouter les instructions de déploiement dans le README

## Bugs

- [x] Corriger l'erreur de déploiement Vercel (outputDirectory incorrect)

## Nouvelles fonctionnalités

- [x] Ajouter un sélecteur de couleur pour le QR code
- [x] Ajouter un sélecteur de couleur pour le fond du QR code
- [x] Ajouter une option pour rendre le fond transparent

## Restructuration Vercel

- [x] Simplifier la structure du projet (supprimer le dossier server inutile)
- [x] Adapter le script de build pour Vercel
- [x] Corriger le fichier index.html pour supprimer les variables d'environnement inutiles
- [x] Mettre à jour vercel.json avec la bonne configuration

## Nouvelle fonctionnalité - QR Code depuis URL

- [x] Ajouter un troisième onglet pour générer des QR codes depuis une URL
- [x] Créer un champ de saisie pour l'URL
- [x] Permettre la génération et le téléchargement du QR code depuis l'URL
- [x] Réutiliser les options de personnalisation des couleurs
