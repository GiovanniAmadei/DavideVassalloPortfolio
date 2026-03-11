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
        
        // 1. Puliamo la ROOT (dove c'erano i vecchi file statici sparsi)
        console.log("Cleaning ROOT directory...")
        await client.cd("/")
        const rootFiles = await client.list()
        for (const file of rootFiles) {
            if (file.name === "public_html") continue // Non tocchiamo la cartella di sistema
            if (file.isDirectory) {
                await client.removeDir(file.name)
            } else {
                await client.remove(file.name)
            }
        }

        // 2. Entriamo in public_html ed eliminiamo TUTTO (incluso eventuali sottocartelle public_html)
        console.log("Cleaning /public_html directory...")
        await client.cd("/public_html")
        await client.clearWorkingDir()
        
        // 3. Carichiamo i file di Next.js direttamente dentro /public_html
        console.log("Uploading Next.js 'out' directory into /public_html...")
        await client.uploadFromDir("davide-vassallo/out")
        
        console.log("Upload finished successfully directly into /public_html!")
    }
    catch (err) {
        console.log("Deployment error:", err)
    }
    client.close()
}

deploy()
