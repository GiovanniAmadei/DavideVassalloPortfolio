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
        
        // La root FTP è già public_html
        console.log("Current dir is:", await client.pwd())
        
        // Puliamo la root
        await client.clearWorkingDir()
        console.log("Cleared root directory.")
        
        // Carichiamo la directory out aggiornata
        console.log("Uploading 'out' directory...")
        await client.uploadFromDir("out")
        console.log("Upload finished successfully!")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

deploy()
