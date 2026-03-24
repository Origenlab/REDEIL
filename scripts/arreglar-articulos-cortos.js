/**
 * Script para arreglar articulos cortos
 * Inserta 2 imagenes: una despues del intro y otra antes del interlinking
 */

const fs = require('fs');
const path = require('path');

const ARTICULOS_DIR = path.join(__dirname, '../blog/articulos');

const IMAGENES = [
  'renta-guirnaldas-decoracion-exterior.avif',
  'renta-guirnaldas-iluminacion-eventos.avif',
  'renta-guirnaldas-luces-vintage.avif',
  'renta-guirnaldas-iluminacion-rustica.avif',
  'renta-guirnaldas-luces-bodas.avif',
  'renta-guirnaldas-iluminacion-decorativa.avif'
];

let imgIdx = 0;

function generarImagen(titulo, index) {
  const img = IMAGENES[imgIdx % IMAGENES.length];
  imgIdx++;
  return `<figure class="article-inline-image" style="margin:32px 0;text-align:center;"><img src="../img/bodas-guirnaldas/${img}" alt="${titulo} - Ejemplo ${index + 1}" style="width:100%;max-width:800px;height:auto;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" loading="lazy" /><figcaption style="color:#a1a1aa;font-size:0.9rem;margin-top:12px;font-style:italic;">Instalacion profesional de iluminacion por REDEIL</figcaption></figure>`;
}

const ARTICULOS = [
  'focos-edison-bodas-elegancia-vintage.html',
  'luz-negra-uv-fiestas-tematicas-neon.html',
  'secretos-iluminacion-bodas-dreamlike.html',
  'tendencias-produccion-eventos-2025-redeil.html',
  'xv-anos-unforgettable-produccion-completa.html'
];

console.log('='.repeat(60));
console.log('ARREGLANDO ARTICULOS CORTOS');
console.log('='.repeat(60));

ARTICULOS.forEach(archivo => {
  const filePath = path.join(ARTICULOS_DIR, archivo);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${archivo}: No encontrado`);
    return;
  }

  let contenido = fs.readFileSync(filePath, 'utf8');

  const tituloMatch = contenido.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const titulo = tituloMatch ? tituloMatch[1] : 'Iluminacion REDEIL';

  // Eliminar imagenes existentes
  contenido = contenido.replace(/<figure class="article-inline-image"[\s\S]*?<\/figure>/g, '');

  let cambios = [];

  // Insertar imagen 1 despues de </section> si existe
  const sectionEnd = contenido.indexOf('</section>');
  if (sectionEnd !== -1) {
    const insertPos = sectionEnd + '</section>'.length;
    const img1 = generarImagen(titulo, 0);
    contenido = contenido.slice(0, insertPos) + img1 + contenido.slice(insertPos);
    cambios.push('Imagen post-seccion');
  }

  // Insertar imagen 2 antes del article-interlink
  const interlinkPos = contenido.indexOf('<div class="article-interlink"');
  if (interlinkPos !== -1) {
    const img2 = generarImagen(titulo, 1);
    contenido = contenido.slice(0, interlinkPos) + img2 + contenido.slice(interlinkPos);
    cambios.push('Imagen pre-interlink');
  }

  fs.writeFileSync(filePath, contenido, 'utf8');
  console.log(`✅ ${archivo}: ${cambios.join(', ')}`);
});

console.log('='.repeat(60));
console.log('COMPLETADO');
console.log('='.repeat(60));
