# Générateur de Lettre de Motivation PDF

Ce projet permet de générer une lettre de motivation professionnelle en PDF à partir d'un fichier HTML, en utilisant Puppeteer.

## Installation

```bash
npm install
```

## Utilisation

Pour générer le PDF de votre lettre de motivation :

```bash
npm run generate
```

Ou directement avec Node.js :

```bash
node generate-pdf.js
```

## Fichiers

- `lettre-motivation.html` - Le contenu HTML de votre lettre
- `generate-pdf.js` - Script pour générer le PDF
- `lettre-motivation-etienne-gaumery.pdf` - PDF généré (créé après exécution)

## Personnalisation

Vous pouvez modifier le contenu de votre lettre en éditant le fichier `lettre-motivation.html`. Le design utilise Tailwind CSS pour un rendu moderne et professionnel.

## Configuration PDF

Le PDF est généré avec les paramètres suivants :
- Format : A4
- Marges : 20mm sur tous les côtés
- Arrière-plan : Inclus
- Qualité : Optimisée pour l'impression
