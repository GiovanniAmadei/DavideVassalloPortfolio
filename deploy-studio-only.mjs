import ftp from "basic-ftp";

async function deployStudio() {
  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    await client.access({
      host: "ftp.davidevassallo.net",
      user: "u432430416.GiovanniAmadevs2",
      password: "Siummone25@",
      secure: false
    });

    const rootList = await client.list();
    const hasPublicHtml = rootList.some(item => item.name === "public_html" && item.isDirectory);
    if (hasPublicHtml) {
      await client.cd("public_html");
    }

    // Refresh _next assets for the Studio build
    try {
      await client.removeDir("_next");
    } catch (_) {
      // ignore if not present
    }
    await client.ensureDir("_next");
    await client.uploadFromDir("davide-vassallo/out/_next");
    await client.cd("..");

    // Refresh studio route
    try {
      await client.removeDir("studio");
    } catch (_) {
      // ignore if not present
    }
    await client.ensureDir("studio");
    await client.uploadFromDir("davide-vassallo/out/studio");
    await client.cd("..");

    // Upload flat studio entry files
    await client.uploadFrom("davide-vassallo/out/studio.html", "studio.html");
    await client.uploadFrom("davide-vassallo/out/studio.txt", "studio.txt");

    console.log("Studio upload completed.");
  } catch (err) {
    console.error("Studio deploy error:", err);
  } finally {
    client.close();
  }
}

deployStudio();
