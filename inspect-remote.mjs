import ftp from 'basic-ftp';

async function inspect() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });

        console.log("--- Root ---");
        const rootList = await client.list();
        console.table(rootList.map(f => ({ name: f.name, type: f.type === 1 ? 'file' : 'dir' })));

        if (rootList.find(f => f.name === 'public_html')) {
            console.log("--- Inside public_html ---");
            await client.cd('public_html');
            const publicHtmlList = await client.list();
            console.table(publicHtmlList.map(f => ({ name: f.name, type: f.type === 1 ? 'file' : 'dir' })));
            
            for (const item of publicHtmlList) {
                if (item.type !== 1 && (item.name === 'public_html' || item.name === 'public')) {
                    console.log(`--- Inside public_html/${item.name} ---`);
                    await client.cd(item.name);
                    const nestedList = await client.list();
                    console.table(nestedList.map(f => ({ name: f.name, type: f.type === 1 ? 'file' : 'dir' })));
                    await client.cd('..');
                }
            }
        }
    } catch (err) {
        console.error("Errore durante l'ispezione:", err);
    } finally {
        client.close();
    }
}

inspect();
