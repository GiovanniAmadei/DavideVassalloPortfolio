import * as ftp from "basic-ftp"

async function forceDeploy() {
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
        
        // Siamo già in / (che fisicamente Hostinger saekt a /public_html del dominio)
        // Ignoriamo cancellazioni bloccanti e facciamo overwrite puro di tutto
        
        console.log("Forcing pure upload from 'davide-vassallo/out' into FTP '/' directory...")
        await client.uploadFromDir("davide-vassallo/out", "/")
        console.log("Upload forced successfully! Next.js is now ruling the kingdom.")
        
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

forceDeploy()
