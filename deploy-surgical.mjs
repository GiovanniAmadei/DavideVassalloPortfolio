import * as ftp from "basic-ftp"
import { statSync } from 'fs'

async function surgicalDeploy() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("Connected to FTP. Initiating surgical strike on Next.js traces...")
        
        const list = await client.list("/")
        for (const f of list) {
            // Elimino tutti i file HTML, TXT, SVG e cartelle generate da Next.js
            if (f.name.endsWith('.txt') || 
                f.name.endsWith('.html') || 
                f.name.endsWith('.ico') || 
                f.name.endsWith('.svg') || 
                f.name.startsWith('_next') ||
                f.name === 'chi-sono' ||
                f.name === 'contatti' ||
                f.name === 'galleria' ||
                f.name === 'lavori' ||
                f.name === 'progetti' ||
                f.name === 'regia' ||
                f.name === '_not-found' ||
                f.name === 'public_html') {
                
                try {
                    if (f.isDirectory) {
                        await client.removeDir(f.name)
                        console.log("Deleted dir:", f.name)
                    } else {
                        await client.remove(f.name)
                        console.log("Deleted file:", f.name)
                    }
                } catch(e) { console.log("Failed to delete", f.name); }
            }
        }
        
        console.log("Cleanup done. Uploading REAL static files...")
        
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
            } catch(e) { console.log(`Skipped ${file}`); }
        }
        
        console.log("Upload forced successfully! Next.js is completely gone.")
        
    }
    catch (err) {
        console.log("Fatal Error:", err)
    }
    client.close()
}

surgicalDeploy()
