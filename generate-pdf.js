const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('🚀 Démarrage de la génération du PDF...');

    // Lancer le navigateur
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        const page = await browser.newPage();

        // Chemin vers le fichier HTML
        const htmlPath = path.join(__dirname, 'lettre-motivation.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Charger le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'networkidle0'
        });

        // Attendre que les polices et styles soient chargés
        await page.waitForTimeout(2000);

        // Configuration du PDF
        const pdfOptions = {
            path: 'lettre-motivation-etienne-gaumery.pdf',
            format: 'A4',
            printBackground: true,
            margin: {
                top: '20mm',
                right: '20mm',
                bottom: '20mm',
                left: '20mm'
            },
            preferCSSPageSize: true
        };

        console.log('📄 Génération du PDF en cours...');

        // Générer le PDF
        await page.pdf(pdfOptions);

        console.log('✅ PDF généré avec succès !');
        console.log('📁 Fichier créé : lettre-motivation-etienne-gaumery.pdf');

    } catch (error) {
        console.error('❌ Erreur lors de la génération du PDF:', error);
    } finally {
        await browser.close();
        console.log('🔒 Navigateur fermé');
    }
}

// Exécuter la fonction
generatePDF().catch(console.error);
