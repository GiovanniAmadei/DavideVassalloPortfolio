import * as ftp from "basic-ftp"
import { readFileSync, statSync } from 'fs'
import { join } from 'path'

async function upload() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("Connected to FTP server.")

        await client.ensureDir("/public_html")
        await client.clearWorkingDir()
        console.log("Cleared public_html, uploading root static files...")

        // Carico i file chiave e la cartella assets (ignoro env, node_modules e progetti nestati)
        const rootFiles = [
            'index.html',
            'about.html',
            'contact.html',
            'portfolio.html',
            'project-detail.html',
            'styles.css',
            'script.js',
            '.htaccess'
        ];

        for (const file of rootFiles) {
            try {
                if (statSync(file).isFile()) {
                    await client.uploadFrom(file, file)
                    console.log(`Uploaded ${file}`)
                }
            } catch (e) { /* ignore missing */ }
        }

        // Upload assets dir
        await client.ensureDir("assets")
        await client.uploadFromDir("assets", "assets")
        console.log("Uploaded assets directory")

        console.log("Upload finished!")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

upload()
