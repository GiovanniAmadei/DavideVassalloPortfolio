import * as ftp from "basic-ftp"

async function check() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        const list = await client.list("/public_html")
        console.log("Files in public_html via davidevassallo.net:");
        console.log(list.map(f => f.name))

        const root = await client.list("/")
        console.log("Files in root via davidevassallo.net:");
        console.log(root.map(f => f.name))
    }
    catch (err) {
        console.log("Error connecting to FTP davidevassallo.net:", err)
    }
    client.close()
}

check()
