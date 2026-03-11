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
        const list = await client.list("/public_html")
        console.log(list.map(f => f.name))
    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

check()
