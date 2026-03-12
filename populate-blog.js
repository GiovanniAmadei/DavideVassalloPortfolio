import { getCliClient } from 'sanity/cli';
import { createReadStream, existsSync } from 'fs';
import path from 'path';

const client = getCliClient();

const blogPosts = [
  {
    title: "La luce e l'ombra nel ritratto",
    slug: "luce-ombra-ritratto",
    publishedAt: new Date().toISOString(),
    srcPath: "public/assets/DSC_3667-Enhanced-NR.jpg",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Il ritratto non è solo la cattura di un volto, ma la gestione consapevole del contrasto. L'ombra definisce la forma tanto quanto la luce." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "L'importanza del chiaroscuro" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "In studio, ogni centimetro di spostamento del bank cambia la narrazione di un'identità. La sottrazione è la chiave." }]
      }
    ]
  },
  {
    title: "Reportage a Milano: catturare l'istante",
    slug: "reportage-milano-istante",
    publishedAt: new Date(Date.now() - 86400000).toISOString(),
    srcPath: "public/assets/DSC_2620-2.jpg",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Camminare per Milano durante la Fashion Week significa essere sommersi da stimoli visivi. Il segreto è isolare il dettaglio che racconta il tutto." }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Il reportage richiede pazienza e una costante presenza, restando invisibili per non alterare la verità della scena." }]
      }
    ]
  },
  {
    title: "L'estetica del vuoto urbano",
    slug: "estetica-vuoto-urbano",
    publishedAt: new Date(Date.now() - 172800000).toISOString(),
    srcPath: "public/assets/DSC_2852.jpg",
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Gli spazi liminali della città offrono una pace geometrica che spesso ignoriamo. Il silenzio visivo è una forma di resistenza." }]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [{ _type: 'span', text: "Architettura e solitudine" }]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [{ _type: 'span', text: "Documentare le periferie all'alba permette di riscoprire le linee pure dei volumi architettonici senza il rumore della folla." }]
      }
    ]
  }
];

async function uploadImage(srcPath) {
  const fullPath = path.resolve(process.cwd(), srcPath);
  if (!existsSync(fullPath)) {
    console.warn(`[WARN] File non trovato: ${fullPath}`);
    return null;
  }
  
  console.log(`Caricamento immagine: ${fullPath}`);
  try {
    const asset = await client.assets.upload('image', createReadStream(fullPath), {
      filename: path.basename(fullPath)
    });
    return asset._id;
  } catch (err) {
    console.error(`Errore caricamento ${srcPath}:`, err.message);
    return null;
  }
}

async function run() {
  console.log('Popolamento blog su Sanity...');
  
  for (const post of blogPosts) {
    const imageId = await uploadImage(post.srcPath);
    
    const doc = {
      _type: 'post',
      title: post.title,
      slug: {
        _type: 'slug',
        current: post.slug
      },
      publishedAt: post.publishedAt,
      body: post.body
    };
    
    if (imageId) {
      doc.mainImage = {
        _type: 'image',
        asset: { _type: 'reference', _ref: imageId }
      };
    }
    
    try {
      const result = await client.create(doc);
      console.log(`Creato articolo: ${result.title}`);
    } catch (err) {
      console.error(`Errore creazione post ${post.title}:`, err.message);
    }
  }
  
  console.log('Popolamento blog completato!');
}

run().catch(console.error);
