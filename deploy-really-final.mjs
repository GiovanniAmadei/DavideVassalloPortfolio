import * as ftp from "basic-ftp"

async function deploy() {
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
        
        // Entriamo in public_html che è la vera docroot e che non può essere cancellata da root
        await client.cd("/public_html")
        console.log("Current dir is now:", await client.pwd())
        
        // Puliamo public_html
        await client.clearWorkingDir()
        console.log("Cleared public_html.")
        
        // Carichiamo la directory out di Next.js
        console.log("Uploading Next.js 'out' directory into public_html...")
        await client.uploadFromDir("davide-vassallo/out")
        console.log("Upload finished successfully into public_html!")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

deploy()
