/**
 * Script para arreglar articulos con estructura simple
 * Inserta 3 imagenes distribuidas basandose en parrafos </p>
 */

const fs = require('fs');
const path = require('path');

const ARTICULOS_DIR = path.join(__dirname, '../blog/articulos');

const IMAGENES = [
  'renta-guirnaldas-decoracion-exterior.webp',
  'renta-guirnaldas-iluminacion-eventos.webp',
  'renta-guirnaldas-luces-vintage.webp',
  'renta-guirnaldas-iluminacion-rustica.webp',
  'renta-guirnaldas-luces-bodas.webp',
  'renta-guirnaldas-iluminacion-decorativa.webp'
];

let imgIdx = 0;

function generarImagen(titulo, index) {
  const img = IMAGENES[imgIdx % IMAGENES.length];
  imgIdx++;
  return `<figure class="article-inline-image" style="margin:32px 0;text-align:center;"><img src="../img/bodas-guirnaldas/${img}" alt="${titulo} - Ejemplo ${index + 1}" style="width:100%;max-width:800px;height:auto;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" loading="lazy" /><figcaption style="color:#a1a1aa;font-size:0.9rem;margin-top:12px;font-style:italic;">Instalacion profesional por REDEIL</figcaption></figure>`;
}

const ARTICULOS = [
  'focos-edison-bodas-elegancia-vintage.html',
  'luz-negra-uv-fiestas-tematicas-neon.html',
  'secretos-iluminacion-bodas-dreamlike.html',
  'tendencias-produccion-eventos-2025-redeil.html',
  'xv-anos-unforgettable-produccion-completa.html'
];

console.log('='.repeat(60));
console.log('ARREGLANDO ARTICULOS CON ESTRUCTURA SIMPLE');
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

  // Eliminar imagenes existentes primero
  contenido = contenido.replace(/<figure class="article-inline-image"[\s\S]*?<\/figure>/g, '');

  // Encontrar todas las posiciones de </p> dentro del article-content o article-layout__content
  const contentMatch = contenido.match(/<div class="article-layout__content">([\s\S]*?)<\/div>\s*<aside/);

  if (!contentMatch) {
    console.log(`⚠️  ${archivo}: Estructura no reconocida`);
    return;
  }

  const contentStart = contenido.indexOf(contentMatch[0]);
  const contentArea = contentMatch[1];

  // Encontrar posiciones de </p> en el area de contenido
  const parrafos = [];
  let idx = 0;
  while ((idx = contentArea.indexOf('</p>', idx)) !== -1) {
    parrafos.push(idx + '</p>'.length);
    idx += 4;
  }

  console.log(`   ${archivo}: ${parrafos.length} parrafos encontrados`);

  if (parrafos.length < 3) {
    console.log(`⚠️  ${archivo}: Muy pocos parrafos (${parrafos.length})`);
    return;
  }

  // Elegir posiciones para insertar (despues de parrafo 2, 4, 6 o distribuidos si hay menos)
  let posiciones;
  if (parrafos.length >= 7) {
    posiciones = [1, 3, 5]; // despues de p2, p4, p6
  } else if (parrafos.length >= 5) {
    posiciones = [1, 2, 3]; // despues de p2, p3, p4
  } else {
    posiciones = [0, 1, 2]; // despues de p1, p2, p3
  }

  // Construir nuevo contenido con imagenes
  let nuevoContent = contentArea;
  let offset = 0;

  posiciones.forEach((pos, i) => {
    if (parrafos[pos]) {
      const insertPos = parrafos[pos] + offset;
      const imgHtml = generarImagen(titulo, i);
      nuevoContent = nuevoContent.slice(0, insertPos) + imgHtml + nuevoContent.slice(insertPos);
      offset += imgHtml.length;
    }
  });

  // Reemplazar en el contenido original
  contenido = contenido.replace(contentArea, nuevoContent);

  fs.writeFileSync(filePath, contenido, 'utf8');
  console.log(`✅ ${archivo}: 3 imagenes insertadas`);
});

console.log('='.repeat(60));
console.log('COMPLETADO');
console.log('='.repeat(60));
