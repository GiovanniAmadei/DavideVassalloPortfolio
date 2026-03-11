import * as ftp from "basic-ftp"

async function verifyFTP() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        
        console.log("Current DIR:", await client.pwd())
        console.log("Files in root:")
        const list = await client.list("/")
        for (const file of list) {
            console.log(`${file.name} - ${file.size} - ${file.isDirectory ? "DIR" : "FILE"} - ${file.modifiedAt}`)
        }
        
    }
    catch (err) {
        console.log("FTP error:", err)
    }
    client.close()
}

verifyFTP()
