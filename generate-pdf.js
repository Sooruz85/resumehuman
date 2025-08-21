const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function generatePDF() {
    console.log('🚀 Démarrage de la génération du PDF...');

    let browser;
    try {
        // Lancer le navigateur avec des options plus compatibles
        browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-accelerated-2d-canvas',
                '--no-first-run',
                '--no-zygote',
                '--disable-gpu'
            ]
        });

        const page = await browser.newPage();

        // Chemin vers le fichier HTML
        const htmlPath = path.join(__dirname, 'lettre-motivation.html');
        const htmlContent = fs.readFileSync(htmlPath, 'utf8');

        // Charger le contenu HTML
        await page.setContent(htmlContent, {
            waitUntil: 'domcontentloaded'
        });

        // Attendre que les polices et styles soient chargés
        await page.waitForTimeout(3000);

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
        console.error('❌ Erreur lors de la génération du PDF:', error.message);
        
        // Essayer une approche alternative avec des options plus simples
        if (browser) {
            try {
                console.log('🔄 Tentative avec des options alternatives...');
                const page = await browser.newPage();
                await page.goto(`file://${path.join(__dirname, 'lettre-motivation.html')}`, {
                    waitUntil: 'networkidle0'
                });
                
                await page.pdf({
                    path: 'lettre-motivation-etienne-gaumery.pdf',
                    format: 'A4',
                    printBackground: true
                });
                
                console.log('✅ PDF généré avec succès (méthode alternative) !');
            } catch (altError) {
                console.error('❌ Échec de la méthode alternative:', altError.message);
            }
        }
    } finally {
        if (browser) {
            await browser.close();
            console.log('🔒 Navigateur fermé');
        }
    }
}

// Exécuter la fonction
generatePDF().catch(console.error);
