import ftp from 'basic-ftp';

async function checkPath() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });

        console.log("--- Directory Corrente ---");
        console.log(await client.pwd());
        
        console.log("--- Contenuto Root ---");
        const list = await client.list();
        console.table(list.map(f => ({ name: f.name, type: f.type === 1 ? 'file' : 'dir', size: f.size })));

        if (list.find(f => f.name === 'public_html')) {
            console.log("--- Contenuto public_html ---");
            await client.cd('public_html');
            const subList = await client.list();
            console.table(subList.map(f => ({ name: f.name, type: f.type === 1 ? 'file' : 'dir', size: f.size })));
        }

    } catch (err) {
        console.error("Errore:", err);
    } finally {
        client.close();
    }
}

checkPath();
