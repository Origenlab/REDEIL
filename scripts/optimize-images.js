const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMG_DIR = path.join(__dirname, '../img/img-index');
const OUTPUT_640 = path.join(IMG_DIR, 'optimized');
const OUTPUT_320 = path.join(IMG_DIR, '320w-optimized');

// Crear directorios de salida
if (!fs.existsSync(OUTPUT_640)) fs.mkdirSync(OUTPUT_640, { recursive: true });
if (!fs.existsSync(OUTPUT_320)) fs.mkdirSync(OUTPUT_320, { recursive: true });

// Configuración de compresión AVIF optimizada
const avifOptions = {
  quality: 55,        // Calidad 55 (óptimo para web)
  effort: 9,          // Máximo esfuerzo de compresión
  chromaSubsampling: '4:2:0'  // Subsampling para reducir tamaño
};

async function optimizeImage(inputPath, outputPath, width = null) {
  try {
    let pipeline = sharp(inputPath);

    if (width) {
      pipeline = pipeline.resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    await pipeline
      .avif(avifOptions)
      .toFile(outputPath);

    const inputSize = fs.statSync(inputPath).size;
    const outputSize = fs.statSync(outputPath).size;
    const savings = ((1 - outputSize / inputSize) * 100).toFixed(1);

    console.log(`${path.basename(inputPath)}: ${(inputSize/1024).toFixed(1)}KB -> ${(outputSize/1024).toFixed(1)}KB (${savings}% menos)`);

    return { inputSize, outputSize };
  } catch (err) {
    console.error(`Error procesando ${inputPath}:`, err.message);
    return { inputSize: 0, outputSize: 0 };
  }
}

async function main() {
  const files = fs.readdirSync(IMG_DIR).filter(f => f.endsWith('.avif') && !f.includes('optimized'));

  console.log('=== OPTIMIZANDO IMÁGENES CON SHARP ===\n');
  console.log('--- Versiones 640px (original optimizado) ---');

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of files) {
    const inputPath = path.join(IMG_DIR, file);
    const outputPath640 = path.join(OUTPUT_640, file);

    const result = await optimizeImage(inputPath, outputPath640);
    totalOriginal += result.inputSize;
    totalOptimized += result.outputSize;
  }

  console.log('\n--- Versiones 320px (móvil) ---');

  let total320Original = 0;
  let total320Optimized = 0;

  for (const file of files) {
    const inputPath = path.join(IMG_DIR, file);
    const outputPath320 = path.join(OUTPUT_320, file);

    const result = await optimizeImage(inputPath, outputPath320, 320);
    total320Original += result.inputSize;
    total320Optimized += result.outputSize;
  }

  console.log('\n=== RESUMEN ===');
  console.log(`640px: ${(totalOriginal/1024).toFixed(1)}KB -> ${(totalOptimized/1024).toFixed(1)}KB (${((1-totalOptimized/totalOriginal)*100).toFixed(1)}% menos)`);
  console.log(`320px: ${(total320Original/1024).toFixed(1)}KB -> ${(total320Optimized/1024).toFixed(1)}KB (${((1-total320Optimized/total320Original)*100).toFixed(1)}% menos)`);
  console.log(`\nTotal ahorro: ${((totalOriginal + total320Original - totalOptimized - total320Optimized)/1024).toFixed(1)}KB`);
}

main().catch(console.error);
