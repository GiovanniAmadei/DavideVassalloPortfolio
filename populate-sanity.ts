import { getCliClient } from 'sanity/cli';
import { createReadStream, existsSync } from 'fs';
import path from 'path';

const client = getCliClient();

// Data directly from script.js
const fotografiaData = [
    { src: 'assets/DSC_3667-Enhanced-NR.jpg', category: 'ritratti', title: 'Studio Luce', description: 'Ritratto in studio con illuminazione controllata', metadata: 'Nikon Z9, 85mm, f/1.8, 1/200s, ISO 100' },
    { src: 'assets/DSC_3643-Enhanced-NR.jpg', category: 'ritratti', title: 'Sguardi', description: 'Ritratto editoriale in luce naturale', metadata: 'Nikon Z9, 50mm, f/1.4, 1/500s, ISO 100' },
    { src: 'assets/DSC_3596-Enhanced-NR-2.jpg', category: 'ritratti', title: 'Espressioni', description: 'Portfolio attoriale', metadata: 'Nikon Z9, 85mm, f/2, 1/250s, ISO 200' },
    { src: 'assets/DSC_3657-Enhanced-NR.jpg', category: 'ritratti', title: 'Presenza', description: 'Ritratto ambientato', metadata: 'Nikon Z9, 50mm, f/1.8, 1/400s, ISO 100' },
    { src: 'assets/DSC_2620-2.jpg', category: 'narrazione', title: 'Milano Fashion Week', description: 'Dietro le quinte della settimana della moda', metadata: 'Leica M11, 35mm, f/2.8, 1/125s, ISO 400' },
    { src: 'assets/DSC_2952-2.jpg', category: 'narrazione', title: 'Oltre il Sipario', description: 'Momenti precedenti allo spettacolo', metadata: 'Nikon Z9, 35mm, f/2, 1/100s, ISO 800' },
    { src: 'assets/DSC_2706-2.jpg', category: 'narrazione', title: 'Momenti', description: 'Eventi aziendali', metadata: 'Leica M11, 35mm, f/2.8, 1/125s, ISO 400' },
    { src: 'assets/DSC_2852.jpg', category: 'narrazione', title: 'Geometrie del Vuoto', description: 'Esplorazione degli spazi architettonici milanesi', metadata: 'Nikon Z9, 24mm, f/8, 1/60s, ISO 200' },
    { src: 'assets/DSC_2965.jpg', category: 'narrazione', title: 'Monolite', description: 'Interazione tra forme pure', metadata: 'Leica M11, 50mm, f/5.6, 1/250s, ISO 100' },
    { src: 'assets/DSC_9738-Enhanced-NR-2.jpg', category: 'narrazione', title: 'Spazi Estesi', description: 'Grandangolare su paesaggio urbano', metadata: 'Nikon Z9, 14mm, f/11, 1/30s, ISO 100' },
    { src: 'assets/DSC_9859-Enhanced-NR.jpg', category: 'narrazione', title: 'Linee e Forma', description: 'Studio di composizione', metadata: 'Leica M11, 50mm, f/8, 1/250s, ISO 200' },
    { src: 'assets/DSC_9983-Enhanced-NR.jpg', category: 'narrazione', title: 'Backstage', description: 'Riprese sul set cinematografico', metadata: 'Nikon Z9, 35mm, f/1.4, 1/125s, ISO 1600' }
];

const videomakingData = [
    { src: 'assets/DSC_2620-2.jpg', category: 'reportage', title: 'Fashion Week BTS', description: 'Dietro le quinte — video per brand fashion', metadata: '2025 • 3 Min • Fashion', logline: 'Uno sguardo rapido ed esclusivo nel backstage della settimana della moda.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_9983-Enhanced-NR.jpg', category: 'reportage', title: 'Set Cinematografico', description: 'Making-of e riprese sul set', metadata: '2024 • 8 Min • BTS', logline: 'Diario di bordo delle estenuanti riprese di un set indipendente.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_2706-2.jpg', category: 'reportage', title: 'Corporate Event', description: 'Video istituzionale per evento aziendale', metadata: '2023 • 2 Min • Corporate', logline: 'Sintesi dinamica dei momenti salienti del convegno annuale.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_9738-Enhanced-NR-2.jpg', category: 'ricerca', title: 'Urban Study', description: 'Documentario sperimentale su spazi urbani', metadata: '2025 • 5 Min • Corto', logline: 'La città che muta sotto la spinta della gentrificazione costante.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_2952-2.jpg', category: 'ricerca', title: 'Teatro', description: 'Riprese teatrali e performative', metadata: '2024 • 12 Min • Performanza', logline: 'La cruda espressione fisica ritratta in assenza della quarta parete.', url: 'project-detail.html', isPreviewCard: true }
];

const regiaData = [
    { src: 'assets/DSC_9738-Enhanced-NR-2.jpg', category: 'ricerca', title: 'Cortometraggio — Confini', description: 'Regia di cortometraggio sperimentale', metadata: '2024 • 15 Min • Sperimentale', logline: 'Una esplorazione visiva della linea sottile tra ordine architettonico e caos umano.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_2965.jpg', category: 'ricerca', title: 'Spot Commerciale', description: 'Direzione artistica per campagna visual', metadata: '2023 • 60 Sec • Commercial', logline: 'Campagna visiva che sfrutta il netto contrasto e le forme pure.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_9983-Enhanced-NR.jpg', category: 'reportage', title: 'Documentario Urbano', description: 'Regia e montaggio di documentario', metadata: '2024 • 25 Min • Documentario', logline: 'Un viaggio negli spazi vuoti e nelle identità disperse della metropoli.', url: 'project-detail.html', isPreviewCard: true },
    { src: 'assets/DSC_3667-Enhanced-NR.jpg', category: 'ritratto', title: 'Music Video', description: 'Regia e direzione della fotografia', metadata: '2023 • 4 Min • Music Video', logline: 'Atmosfere chiaroscure per il nuovo singolo di un artista emergente.', url: 'project-detail.html', isPreviewCard: true }
];

async function uploadImage(srcPath) {
    // Il path reale sarà relativo al progetto vanilla: ../{srcPath}
    const fullPath = path.resolve(process.cwd(), '..', srcPath);
    if (!existsSync(fullPath)) {
        console.warn(`[WARN] File non trovato: ${fullPath}`);
        return null;
    }
    
    console.log(`Caricamento immagine: ${fullPath}`);
    const asset = await client.assets.upload('image', createReadStream(fullPath), {
        filename: path.basename(fullPath)
    });
    return asset._id;
}

async function run() {
    console.log('Inizio migrazione dati verso Sanity...');
    
    // Pulisci i dati esistenti se desiderato (opzionale, ma utile per evitare duplicati)
    // await client.delete({query: '*[_type in ["fotografia", "progettoVideo"]]'});
    
    // FOTOGRAFIA
    let ordineBase = 1;
    for (const item of fotografiaData) {
        let imageId = await uploadImage(item.src);
        
        const doc = {
            _type: 'fotografia',
            title: item.title,
            categoriaString: item.category,
            description: item.description,
            metadata: item.metadata,
            ordine: ordineBase++,
        };
        
        if (imageId) {
            doc.src = {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageId }
            };
        }
        
        await client.create(doc);
        console.log(`Creata: Fotografia -> ${item.title}`);
    }
    
    // VIDEOMAKING & REGIA
    ordineBase = 1;
    const arrayVideo = [...videomakingData.map(d => ({...d, mainTag: 'videomaking'})), ...regiaData.map(d => ({...d, mainTag: 'regia'}))];
    
    for (const item of arrayVideo) {
        let imageId = await uploadImage(item.src);
        
        const doc = {
            _type: 'progettoVideo',
            title: item.title,
            categoriaString: item.category, // e.g. 'reportage', 'ricerca'
            description: item.description,
            metadata: item.metadata,
            logline: item.logline,
            url: item.url,
            isPreviewCard: item.isPreviewCard,
            ordine: ordineBase++,
        };
        
        if (imageId) {
            doc.src = {
                _type: 'image',
                asset: { _type: 'reference', _ref: imageId }
            };
        }
        
        await client.create(doc);
        console.log(`Creto: Progetto Video (${item.mainTag}) -> ${item.title}`);
    }
    
    console.log('Migrazione completata con successo!');
}

run().catch(console.error);
