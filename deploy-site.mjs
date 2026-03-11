import FTPClient from 'basic-ftp';
import { createReadStream, statSync } from 'fs';
import { readdir } from 'fs/promises';
import path from 'path';

const FTP_HOST = 'ftp.davidevassallo.net';
const FTP_USER = 'u432430416.GiovanniAmadevs2';
const FTP_PASS = 'Siummone25@';
const FTP_PORT = 21;
const REMOTE_DIR = '/public_html';
const LOCAL_ROOT = '/Users/giovanni/Lavoro/Web/Web/Clienti/DavideVassalloAGGeminiFirst';

// ONLY these files/dirs from the root will be uploaded — nothing else
const ALLOWED_FILES = [
  'index.html',
  'about.html',
  'portfolio.html',
  'project-detail.html',
  'contact.html',
  'script.js',
  'styles.css',
  '.htaccess',
];

const ALLOWED_DIRS = [
  'assets',
];

async function uploadFile(client, localPath, remotePath) {
  console.log(`  ⬆ ${localPath.replace(LOCAL_ROOT, '')} → ${remotePath}`);
  await client.uploadFrom(createReadStream(localPath), remotePath);
}

const client = new FTPClient.Client(60000);
client.ftp.verbose = false;

try {
  console.log('Connessione FTP a davidevassallo.net...');
  await client.access({
    host: FTP_HOST,
    user: FTP_USER,
    password: FTP_PASS,
    port: FTP_PORT,
    secure: false,
  });
  console.log('Connesso!\n');

  // Upload individual key files
  for (const file of ALLOWED_FILES) {
    const localPath = path.join(LOCAL_ROOT, file);
    const remotePath = file;
    try {
      statSync(localPath); // check exists
      await uploadFile(client, localPath, remotePath);
    } catch (e) {
      console.warn(`  ⚠ Skipping ${file}: ${e.message}`);
    }
  }

  // Upload the assets directory recursively
  for (const dir of ALLOWED_DIRS) {
    console.log(`\nCaricamento cartella: ${dir}/`);
    await client.ensureDir(dir);
    await client.cd("/");
    await client.uploadFromDir(path.join(LOCAL_ROOT, dir), dir);
  }

  console.log('\n✅ Deployment completato con successo!');
} catch (err) {
  console.error('❌ Errore:', err);
} finally {
  client.close();
}
