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

        // La root "/" del server FTP è GIÀ "/home/.../public_html" come da pannello Hostinger.
        // Puliamo l'intera root dai vecchi file (html, css, js obsoleti, inclusa l'errata sottocartella public_html)
        await client.clearWorkingDir()

        console.log("Cleared real public_html (FTP root). Uploading Next.js 'out' directory...")
        await client.uploadFromDir("davide-vassallo/out")
        console.log("Upload finished successfully!")

    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

deploy()
