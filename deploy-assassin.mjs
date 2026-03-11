import * as ftp from "basic-ftp"

async function deleteAndUpload() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("Connected to FTP. Direct DELE commands.")
        
        const filesToKill = [
            "index.html",
            "404.html",
            "chi-sono.html",
            "contatti.html",
            "galleria.html",
            "lavori.html",
            "regia.html",
            "progetti.html",
            "_not-found.html"
        ];
        
        for (const f of filesToKill) {
            try {
                await client.remove(f)
                console.log("SUCCESSFULLY DESTROYED:", f)
            } catch (err) {
                console.log("Could not destroy", f, "maybe already gone.")
            }
        }

        console.log("Uploading pure HTML directly...")
        await client.uploadFrom("index.html", "index.html")
        console.log("Uploaded REAL index.html")
    }
    catch (err) {
        console.log("Fatal Error:", err)
    }
    client.close()
}

deleteAndUpload()
