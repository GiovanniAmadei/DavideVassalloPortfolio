import * as ftp from "basic-ftp"

async function findRoot() {
    const client = new ftp.Client()
    try {
        await client.access({
            host: "82.25.102.89",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        })
        console.log("Connected. Searching for index.html ...")
        
        async function searchDir(path) {
            try {
                const list = await client.list(path)
                for (const file of list) {
                    if (file.name === '.' || file.name === '..') continue
                    const fullPath = path === '/' ? '/' + file.name : path + '/' + file.name
                    if (file.isDirectory) {
                        if (fullPath !== '/public_html' && fullPath !== '/domains') {
                             await searchDir(fullPath)
                        }
                    } else if (file.name === 'index.html' || file.name === 'styles.css') {
                        console.log("FOUND:", fullPath, file.size, file.modifiedAt)
                    }
                }
            } catch (e) { }
        }
        
        await searchDir("/")
        
        console.log("Also specifically checking /domains ...")
        try {
            const dom = await client.list("/domains")
            console.log("/domains contents:", dom.map(f=>f.name))
        } catch(e) {}

    }
    catch (err) {
        console.log(err)
    }
    client.close()
}

findRoot()
