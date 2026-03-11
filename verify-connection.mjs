import ftp from 'basic-ftp';

async function verify() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });
        console.log("Connessione FTP riuscita!");
        const list = await client.list();
        console.log("Contenuto directory remota:", list.map(f => f.name));
    } catch (err) {
        console.error("Errore di connessione FTP:", err);
    } finally {
        client.close();
    }
}

verify();
