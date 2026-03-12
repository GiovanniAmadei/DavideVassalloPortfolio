import sharp from 'sharp';
import { readdir } from 'fs/promises';
import { join } from 'path';

const assetsDir = './public/assets';
const maxWidth = 1920;
const quality = 80;

async function optimizeImages() {
    try {
        const files = await readdir(assetsDir);
        const imageFiles = files.filter(f => f.match(/\.(jpg|jpeg|png)$/i));
        
        console.log(`Found ${imageFiles.length} images to optimize...`);
        
        for (const file of imageFiles) {
            const inputPath = join(assetsDir, file);
            const outputPath = join(assetsDir, file);
            
            console.log(`Optimizing ${file}...`);
            
            await sharp(inputPath)
                .resize(maxWidth, null, {
                    withoutEnlargement: true,
                    fit: 'inside'
                })
                .jpeg({ quality, mozjpeg: true })
                .toFile(outputPath + '.tmp');
            
            // Rename temp file to original
            await import('fs/promises').then(fs => 
                fs.rename(outputPath + '.tmp', outputPath)
            );
            
            console.log(`✓ ${file} optimized`);
        }
        
        console.log('\n✓ All images optimized!');
    } catch (error) {
        console.error('Error:', error);
    }
}

optimizeImages();
