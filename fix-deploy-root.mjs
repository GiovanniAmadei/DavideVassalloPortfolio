import ftp from 'basic-ftp';
import fs from 'fs';

async function finalDeploy() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });

        console.log("Connesso. Directory attuale:", await client.pwd());
        
        // Verifica se siamo già in public_html (alcuni utenti FTP sono limitati a quella cartella)
        const list = await client.list();
        const hasPublicHtml = list.some(f => f.name === 'public_html' && f.type !== 1);

        if (hasPublicHtml) {
            console.log("Entro in public_html...");
            await client.cd("public_html");
        } else {
            console.log("public_html non trovata, assumo di essere già nella root del sito.");
        }

        const filesToUpload = [
            'index.html',
            'about.html',
            'contact.html',
            'portfolio.html',
            'project-detail.html',
            'styles.css',
            'script.js',
            '.htaccess'
        ];

        for (const file of filesToUpload) {
            if (fs.existsSync(file)) {
                console.log(`Upload di ${file}...`);
                await client.uploadFrom(file, file);
            }
        }

        console.log("Upload cartella assets...");
        await client.ensureDir("assets");
        await client.uploadFromDir("assets");

        console.log("DEPLOY COMPLETATO CON SUCCESSO NELLA ROOT.");
    } catch (err) {
        console.error("ERRORE:", err);
    } finally {
        client.close();
    }
}

finalDeploy();
