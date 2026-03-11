import ftp from 'basic-ftp';
import path from 'path';

async function upload() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });

        console.log("Connessione stabilita. Inizio upload...");

        // File da caricare
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
            console.log(`Caricamento ${file}...`);
            await client.uploadFrom(file, file);
        }

        // Caricamento cartella assets
        console.log("Caricamento cartella assets...");
        await client.ensureDir("assets");
        await client.uploadFromDir("assets");

        console.log("Upload completato con successo!");
    } catch (err) {
        console.error("Errore durante l'upload:", err);
    } finally {
        client.close();
    }
}

upload();
