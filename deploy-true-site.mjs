import * as ftp from "basic-ftp"
import { statSync } from 'fs'

async function forceDeployHTML() {
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
        
        console.log("Forcing pure upload of HTML static files...")
        for (const file of rootFiles) {
            try {
                if (statSync(file).isFile()) {
                    await client.uploadFrom(file, file)
                    console.log(`Uploaded ${file}`)
                }
            } catch(e) { console.log(`Skipped ${file}`); }
        }
        
        await client.ensureDir("assets")
        await client.cd("/")
        await client.uploadFromDir("assets", "assets")
        console.log("Uploaded assets directory")
        
        console.log("Upload forced successfully! REAL site is back.")
        
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

forceDeployHTML()
