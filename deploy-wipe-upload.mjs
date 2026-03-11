import ftp from "basic-ftp";

async function deploy() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: "ftp.davidevassallo.net",
      user: "u432430416.GiovanniAmadevs2",
      password: "Siummone25@",
      secure: false
    });

    // Prefer /public_html when it exists, otherwise use current root.
    const rootList = await client.list();
    const hasPublicHtml = rootList.some(item => item.name === "public_html" && item.isDirectory);
    if (hasPublicHtml) {
      await client.cd("public_html");
    }

    // Wipe current directory.
    const items = await client.list();
    for (const item of items) {
      if (item.name === "." || item.name === "..") continue;
      if (item.isDirectory) {
        await client.removeDir(item.name);
      } else {
        await client.remove(item.name);
      }
    }

    const filesToUpload = [
      "index.html",
      "about.html",
      "contact.html",
      "portfolio.html",
      "project-detail.html",
      "styles.css",
      "script.js",
      ".htaccess"
    ];

    for (const file of filesToUpload) {
      await client.uploadFrom(file, file);
    }

    await client.ensureDir("assets");
    await client.uploadFromDir("assets");

    console.log("Deploy completed.");
  } catch (err) {
    console.error("Deploy error:", err);
  } finally {
    client.close();
  }
}

deploy();
