import * as ftp from "basic-ftp"

async function finalRedemptionDeploy() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("Connected. Clearing the accursed old HTML ruins from Hostinger root...")
        
        // Cancelliamo la zozzeria statica vecchia (il sito a tre bande)
        const oldGarbage = [
            "index.html",
            "about.html",
            "portfolio.html",
            "contact.html",
            "project-detail.html",
            "styles.css",
            "script.js",
            "assets"
        ];
        
        for (const file of oldGarbage) {
            try {
                if (file === "assets") {
                    await client.removeDir(file)
                } else {
                    await client.remove(file)
                }
                console.log("Purged old garbage:", file)
            } catch(e) { /* ignore */ }
        }
        
        console.log("Uploading the GLORIOUS NEXT.JS 'out' BUILD directly to root...")
        await client.uploadFromDir("davide-vassallo/out", "/")
        
        console.log("Upload of Next.js completed! Redemption is near.")
    }
    catch (err) {
        console.log("Redemption failed:", err)
    }
    client.close()
}

finalRedemptionDeploy()
