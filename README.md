# Générateur VCF et QR Code

Application web moderne pour créer des cartes de visite numériques au format VCF et générer des QR codes pour un partage instantané.

## 🚀 Fonctionnalités

- **Génération de fichiers VCF** : Créez des cartes de visite numériques au format vCard 3.0
- **Génération de QR Codes** : Transformez vos contacts en QR codes scannables
- **Interface intuitive** : Formulaire simple avec validation des champs
- **Téléchargements faciles** : Téléchargez vos fichiers VCF et QR codes en un clic
- **Design moderne** : Interface responsive avec Tailwind CSS et shadcn/ui
- **100% client-side** : Aucune donnée n'est envoyée à un serveur

## 📋 Champs du formulaire

### Champs obligatoires
- Nom complet
- Téléphone
- Email

### Champs optionnels
- Entreprise
- Titre du poste
- Site web
- Adresse
- Notes

## 🛠️ Technologies utilisées

- **React 19** - Framework UI moderne
- **TypeScript** - Typage statique
- **Vite** - Build tool ultra-rapide
- **Tailwind CSS 4** - Framework CSS utility-first
- **shadcn/ui** - Composants UI élégants et accessibles
- **QRCode.js** - Génération de QR codes
- **Wouter** - Routage léger pour React

## 📦 Installation locale

```bash
# Cloner le repository
git clone https://github.com/BOZYILDIZ/vcf-qr-code.git
cd vcf-qr-code

# Installer les dépendances
pnpm install

# Lancer le serveur de développement
pnpm run dev
```

Le site sera accessible sur `http://localhost:3000`

## 🚀 Déploiement sur Vercel

### Méthode 1 : Via l'interface Vercel (Recommandé)

1. Connectez-vous sur [vercel.com](https://vercel.com)
2. Cliquez sur "Add New Project"
3. Importez votre repository GitHub `BOZYILDIZ/vcf-qr-code`
4. Vercel détectera automatiquement la configuration
5. Cliquez sur "Deploy"

**C'est tout !** Vercel utilisera automatiquement le fichier `vercel.json` pour la configuration.

### Méthode 2 : Via Vercel CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter à Vercel
vercel login

# Déployer
vercel

# Déployer en production
vercel --prod
```

## 🔧 Configuration Vercel

Le projet inclut un fichier `vercel.json` pré-configuré avec :
- Build command optimisée
- Répertoire de sortie correct (`client/dist`)
- Rewrites pour le routage SPA
- Support complet de React Router

## 📁 Structure du projet

```
vcf-qr-code/
├── client/                 # Application React
│   ├── src/
│   │   ├── components/    # Composants UI réutilisables
│   │   ├── pages/         # Pages de l'application
│   │   ├── lib/           # Utilitaires (génération VCF)
│   │   └── App.tsx        # Composant principal
│   ├── public/            # Assets statiques
│   └── dist/              # Build de production (généré)
├── vercel.json            # Configuration Vercel
└── package.json           # Dépendances du projet
```

## 🌐 Build de production

```bash
# Compiler le projet
pnpm run build

# Les fichiers optimisés seront dans client/dist/
```

## 📝 Scripts disponibles

- `pnpm run dev` - Démarre le serveur de développement
- `pnpm run build` - Compile le projet pour la production
- `pnpm run preview` - Prévisualise le build de production localement
- `pnpm run lint` - Vérifie le code avec ESLint

## 🎨 Personnalisation

Les couleurs et le thème peuvent être modifiés dans `client/src/index.css`. Le projet utilise des variables CSS pour une personnalisation facile.

## 📄 Licence

MIT License - Libre d'utilisation pour vos projets personnels et commerciaux.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.

---

Développé avec ❤️ par BOZYILDIZ
