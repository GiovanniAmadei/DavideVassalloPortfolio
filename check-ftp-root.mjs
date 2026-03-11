import * as ftp from "basic-ftp"

async function check() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("--- ROOT / ---")
        const root = await client.list("/")
        console.log(root.map(f => f.name + (f.isDirectory ? "/" : "")))

        console.log("--- CURRENT DIR . ---")
        const pwd = await client.list(".")
        console.log(pwd.map(f => f.name + (f.isDirectory ? "/" : "")))

    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

check()
