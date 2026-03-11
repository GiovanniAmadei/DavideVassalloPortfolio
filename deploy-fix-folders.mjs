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
        
        // List root to see if public_html is there
        const rootList = await client.list("/")
        console.log("Root content:", rootList.map(f => f.name))

        // Check if we are already inside a public_html or if it exists in root
        let remoteDir = "/"
        if (rootList.some(f => f.name === "public_html")) {
            remoteDir = "/public_html"
        }

        await client.cd(remoteDir)
        console.log("Current dir is now:", await client.pwd())
        
        const currentList = await client.list()
        console.log("Current dir content:", currentList.map(f => f.name))

        // If there's a nested public_html, we might want to clean it or the root
        // The user says there is a nested one, so let's make sure we are in the right place.
        // If we see another public_html here, it's definitely the nested one.
        
        await client.clearWorkingDir()
        console.log("Cleared current directory.")
        
        console.log("Uploading files from davide-vassallo/out into current directory...")
        await client.uploadFromDir("davide-vassallo/out")
        
        console.log("Upload finished successfully!")
    }
    catch (err) {
        console.log("Deployment error:", err)
    }
    client.close()
}

deploy()
