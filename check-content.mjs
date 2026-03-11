import ftp from 'basic-ftp';
import fs from 'fs';

async function checkIndex() {
    const client = new ftp.Client();
    client.ftp.verbose = true;
    try {
        await client.access({
            host: "ftp.davidevassallo.net",
            user: "u432430416.GiovanniAmadevs2",
            password: "Siummone25@",
            secure: false
        });

        console.log("--- Reading remote index.html ---");
        await client.cd('public_html');
        await client.downloadTo('remote-index-check.html', 'index.html');
        
        const remoteContent = fs.readFileSync('remote-index-check.html', 'utf8');
        console.log("Remote index snippet:", remoteContent.substring(0, 500));

        const localContent = fs.readFileSync('index.html', 'utf8');
        console.log("Local index snippet:", localContent.substring(0, 500));

        if (remoteContent === localContent) {
            console.log("MATCH: Remote index is identical to local index.");
        } else {
            console.log("MISMATCH: Remote index is DIFFERENT from local index.");
        }

    } catch (err) {
        console.error("Error:", err);
    } finally {
        client.close();
    }
}

checkIndex();
