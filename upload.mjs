import * as ftp from "basic-ftp"

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
        console.log("Cleared public_html, uploading out directory...")
        await client.uploadFromDir("out")
        console.log("Upload finished!")
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

upload()
