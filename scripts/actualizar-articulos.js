/**
 * Script para actualizar articulos del blog con mejoras
 * - Footer profesional completo con sucursales
 * - Seccion de interlinking a guirnaldas
 * - 3 imagenes distribuidas dentro del articulo (sin galeria)
 */

const fs = require('fs');
const path = require('path');

const ARTICULOS_DIR = path.join(__dirname, '../blog/articulos');

// Footer profesional completo
const FOOTER_NUEVO = `<footer class="footer"><div class="footer-container"><div class="footer-main"><div class="footer-column footer-company"><div class="footer-logo"><svg class="footer-logo-svg" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg"><text x="0" y="35" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#f5f5f7" letter-spacing="2">REDEIL</text></svg></div><p class="footer-tagline">Produccion Audiovisual para Eventos</p><p class="footer-company-desc">Renta profesional de iluminacion, audio y efectos especiales. Servicio integral con montaje tecnico en CDMX y Estado de Mexico.</p><div class="footer-contact-block"><div class="footer-contact-item"><span class="footer-contact-label">Telefono</span><a href="tel:+525549375172" class="footer-contact-value footer-phone">55 4937 5172</a></div><div class="footer-contact-item"><span class="footer-contact-label">Email</span><a href="mailto:redeil.mx@gmail.com" class="footer-contact-value">redeil.mx@gmail.com</a></div><div class="footer-contact-item"><span class="footer-contact-label">Horario</span><span class="footer-contact-value">Lun - Dom / 8:00 - 23:00</span></div></div><div class="footer-social-block"><span class="footer-social-label">Siguenos</span><div class="footer-social-links"><a href="https://www.facebook.com/profile.php?id=61583385634990" class="social-link" target="_blank" rel="noopener noreferrer">FACEBOOK</a><a href="https://www.instagram.com/redeil.mx/" class="social-link" target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href="https://www.linkedin.com/in/redeilmx/" class="social-link" target="_blank" rel="noopener noreferrer">LINKEDIN</a><a href="https://mx.pinterest.com/redeilmx/" class="social-link" target="_blank" rel="noopener noreferrer">PINTEREST</a></div></div></div><div class="footer-column"><h3 class="footer-column-title">Iluminacion</h3><ul class="footer-links"><li><a href="/renta-de-iluminacion/guirnaldas.html">Guirnaldas</a></li><li><a href="/renta-de-iluminacion/luz-neon.html">Luz Neon</a></li><li><a href="/renta-de-iluminacion/luz-negra.html">Luz Negra</a></li><li><a href="/renta-de-iluminacion/city-color.html">City Color</a></li><li><a href="/renta-de-iluminacion/sky-tracker.html">Sky Tracker</a></li><li><a href="/renta-de-iluminacion/cabezas-moviles.html">Cabezas Moviles</a></li><li><a href="/renta-de-iluminacion/iluminacion-laser.html">Iluminacion Laser</a></li><li><a href="/renta-de-iluminacion/luces-arquitectonicas.html">Luces Arquitectonicas</a></li><li><a href="/renta-de-iluminacion/cascadas-led.html">Cascadas LED</a></li><li><a href="/renta-de-iluminacion/proyector-de-gobos.html">Proyector de Gobos</a></li></ul></div><div class="footer-column"><h3 class="footer-column-title">Audio y Sonido</h3><ul class="footer-links"><li><a href="/renta-de-bocinas/bocinas-para-bodas.html">Bocinas para Bodas</a></li><li><a href="/renta-de-bocinas/bocinas-para-xv-anos.html">Bocinas para XV Anos</a></li><li><a href="/renta-de-bocinas/bocinas-para-fiestas.html">Bocinas para Fiestas</a></li><li><a href="/renta-de-bocinas/audio-para-conferencias.html">Conferencias</a></li></ul><h3 class="footer-column-title" style="margin-top:24px;">Equipos para Eventos</h3><ul class="footer-links"><li><a href="/equipos-para-eventos/bolas-disco.html">Bolas Disco</a></li><li><a href="/equipos-para-eventos/maquina-de-confeti.html">Maquina de Confeti</a></li><li><a href="/equipos-para-eventos/maquina-de-humo.html">Maquina de Humo</a></li><li><a href="/equipos-para-eventos/humo-bajo.html">Humo Bajo</a></li></ul></div><div class="footer-column"><h3 class="footer-column-title">Empresa</h3><ul class="footer-links"><li><a href="/">Inicio</a></li><li><a href="/nosotros.html">Nosotros</a></li><li><a href="/contacto.html">Contacto</a></li><li><a href="/blog/">Blog</a></li><li><a href="/sitemap.html">Mapa del Sitio</a></li><li><a href="/aviso-de-privacidad.html">Aviso de Privacidad</a></li></ul></div></div><div class="footer-branches-section"><h3 class="footer-branches-title">Nuestras Sucursales</h3><div class="footer-branches-grid"><div class="footer-branch"><h4 class="footer-branch-name">Benito Juarez</h4><p class="footer-branch-address">Av. Insurgentes Sur 615 - Piso 6<br>Napoles, Benito Juarez<br>03810 Ciudad de Mexico, CDMX</p></div><div class="footer-branch"><h4 class="footer-branch-name">Polanco</h4><p class="footer-branch-address">Av. Homero 1933 - Piso 3<br>Polanco, Polanco I Secc<br>11510 Ciudad de Mexico, CDMX</p></div><div class="footer-branch"><h4 class="footer-branch-name">Naucalpan</h4><p class="footer-branch-address">Blvd. Manuel Avila Camacho 5<br>Lomas de Sotelo, Piso 10, Torre B<br>53390 Naucalpan, Estado de Mexico</p></div><div class="footer-branch"><h4 class="footer-branch-name">Tlalnepantla</h4><p class="footer-branch-address">Emilio Carranza 17<br>Tlalnepantla Centro<br>54000 Tlalnepantla, Estado de Mexico</p></div></div></div><div class="footer-bottom"><div class="footer-copyright"><p>&copy; 2025 REDEIL. Todos los derechos reservados.</p></div><div class="footer-legal"><a href="/aviso-de-privacidad.html">Aviso de Privacidad</a><span class="footer-divider">|</span><a href="/sitemap.html">Mapa del Sitio</a></div></div></div></footer>`;

// Seccion de interlinking
const INTERLINK_SECTION = `<div class="article-interlink" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:16px;padding:32px;margin:40px 0;border-left:4px solid #f97316;"><h2 style="color:#f5f5f7;margin:0 0 16px 0;font-size:1.5rem;">Conoce Nuestro Catalogo de Guirnaldas</h2><p style="color:#a1a1aa;margin:0 0 20px 0;line-height:1.7;">Descubre nuestra amplia seleccion de <strong style="color:#f97316;">guirnaldas de luces para renta</strong> en CDMX. Contamos con guirnaldas LED, focos Edison vintage, y opciones para todo tipo de eventos. Instalacion profesional incluida.</p><a href="/renta-de-iluminacion/guirnaldas.html" style="display:inline-flex;align-items:center;gap:8px;background:#f97316;color:#fff;padding:14px 28px;border-radius:8px;text-decoration:none;font-weight:600;transition:all 0.3s ease;">Ver Catalogo de Guirnaldas <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg></a></div>`;

// Servicios mejorados
const SERVICIOS_MEJORADOS = `<div class="article-services"><h2 class="article-services__title">Servicios Relacionados</h2><div class="article-services__grid"><a href="/renta-de-iluminacion/guirnaldas.html" class="article-services__item" style="background:#f97316;color:#fff;">Renta de Guirnaldas</a><a href="/renta-de-iluminacion/luz-neon.html" class="article-services__item">Luz Neon LED</a><a href="/renta-de-iluminacion/luz-negra.html" class="article-services__item">Luz Negra UV</a><a href="/renta-de-iluminacion/cabezas-moviles.html" class="article-services__item">Cabezas Moviles</a><a href="/renta-de-iluminacion/city-color.html" class="article-services__item">City Color LED</a><a href="/renta-de-bocinas/bocinas-para-bodas.html" class="article-services__item">Audio para Bodas</a></div></div>`;

// Imagenes disponibles para distribuir en articulos
const IMAGENES_DISPONIBLES = [
  'renta-guirnaldas-decoracion-exterior.webp',
  'renta-guirnaldas-decoracion-iluminada.webp',
  'renta-guirnaldas-decoracion-luminosa.webp',
  'renta-guirnaldas-decoracion-nocturna.webp',
  'renta-guirnaldas-iluminacion-comercial.webp',
  'renta-guirnaldas-iluminacion-decorativa.webp',
  'renta-guirnaldas-iluminacion-eventos.webp',
  'renta-guirnaldas-iluminacion-fiestas.webp',
  'renta-guirnaldas-iluminacion-fondo.webp',
  'renta-guirnaldas-iluminacion-rustica.webp',
  'renta-guirnaldas-iluminacion-terraza.webp',
  'renta-guirnaldas-luces-ambientales.webp',
  'renta-guirnaldas-luces-bodas.webp',
  'renta-guirnaldas-luces-calidas.webp',
  'renta-guirnaldas-luces-decorativas.webp',
  'renta-guirnaldas-luces-festejo.webp',
  'renta-guirnaldas-luces-festivas.webp',
  'renta-guirnaldas-luces-jardin.webp',
  'renta-guirnaldas-luces-led.webp',
  'renta-guirnaldas-luces-navidad.webp',
  'renta-guirnaldas-luces-vintage.webp'
];

function seleccionar3ImagenesAleatorias() {
  const shuffled = [...IMAGENES_DISPONIBLES].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, 3);
}

function generarImagenInline(imagen, titulo, index) {
  return `<figure class="article-inline-image" style="margin:32px 0;text-align:center;"><img src="../img/bodas-guirnaldas/${imagen}" alt="${titulo} - Ejemplo de iluminacion ${index + 1}" style="width:100%;max-width:800px;height:auto;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" loading="lazy" /><figcaption style="color:#a1a1aa;font-size:0.9rem;margin-top:12px;font-style:italic;">Instalacion profesional de guirnaldas por REDEIL</figcaption></figure>`;
}

function procesarArticulo(filePath) {
  let contenido = fs.readFileSync(filePath, 'utf8');
  const fileName = path.basename(filePath);

  // Extraer titulo del articulo
  const tituloMatch = contenido.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const titulo = tituloMatch ? tituloMatch[1] : 'Iluminacion Profesional';

  let cambios = [];

  // 1. Reemplazar footer antiguo por el nuevo
  const footerRegex = /<footer class="footer">[\s\S]*?<\/footer>/;
  if (footerRegex.test(contenido)) {
    contenido = contenido.replace(footerRegex, FOOTER_NUEVO);
    cambios.push('Footer actualizado');
  }

  // 2. Eliminar galerias existentes (article-gallery y gallery)
  const galeriaArticleRegex = /<div class="article-gallery"[\s\S]*?<\/div><\/div>/g;
  if (galeriaArticleRegex.test(contenido)) {
    contenido = contenido.replace(galeriaArticleRegex, '');
    cambios.push('Galeria article-gallery eliminada');
  }

  // Eliminar galeria vieja con class="gallery"
  const galeriaViejaRegex = /<div class="gallery">[\s\S]*?<\/div><\/div><\/div>/g;
  if (galeriaViejaRegex.test(contenido)) {
    contenido = contenido.replace(galeriaViejaRegex, '');
    cambios.push('Galeria vieja eliminada');
  }

  // Eliminar elementos sueltos de gallery__item
  const galleryItemRegex = /<div class="gallery__item">[\s\S]*?<\/div>/g;
  if (galleryItemRegex.test(contenido)) {
    contenido = contenido.replace(galleryItemRegex, '');
    cambios.push('Items de galeria sueltos eliminados');
  }

  // 3. Insertar 3 imagenes distribuidas entre las secciones si no existen
  if (!contenido.includes('article-inline-image')) {
    const imagenes = seleccionar3ImagenesAleatorias();

    // Buscar secciones para insertar imagenes despues de la 2da, 4ta y 6ta seccion
    const seccionRegex = /<\/section>/g;
    let matches = [];
    let match;
    while ((match = seccionRegex.exec(contenido)) !== null) {
      matches.push(match.index + match[0].length);
    }

    // Insertar en posiciones 1, 3, 5 (despues de seccion 2, 4, 6)
    const posiciones = [1, 3, 5];
    let offset = 0;

    posiciones.forEach((pos, idx) => {
      if (matches[pos] && imagenes[idx]) {
        const insertPos = matches[pos] + offset;
        const imgHtml = generarImagenInline(imagenes[idx], titulo, idx);
        contenido = contenido.slice(0, insertPos) + imgHtml + contenido.slice(insertPos);
        offset += imgHtml.length;
      }
    });

    if (offset > 0) {
      cambios.push('3 imagenes distribuidas insertadas');
    }
  }

  // 4. Agregar seccion de interlinking antes de article-services si no existe
  if (!contenido.includes('article-interlink') && contenido.includes('article-services')) {
    contenido = contenido.replace(
      /<div class="article-services">/,
      INTERLINK_SECTION + '<div class="article-services">'
    );
    cambios.push('Interlinking agregado');
  }

  // 5. Mejorar seccion de servicios
  const serviciosRegex = /<div class="article-services">[\s\S]*?<\/div><\/div>/;
  if (serviciosRegex.test(contenido) && !contenido.includes('style="background:#f97316')) {
    contenido = contenido.replace(serviciosRegex, SERVICIOS_MEJORADOS);
    cambios.push('Servicios mejorados');
  }

  // 6. Actualizar texto del boton CTA
  contenido = contenido.replace(
    />Solicitar Cotizacion<\/a>/g,
    '>Solicitar Cotizacion por WhatsApp</a>'
  );

  if (cambios.length > 0) {
    fs.writeFileSync(filePath, contenido, 'utf8');
    console.log(`✅ ${fileName}: ${cambios.join(', ')}`);
    return true;
  } else {
    console.log(`⏭️  ${fileName}: Sin cambios necesarios`);
    return false;
  }
}

// Ejecutar
console.log('='.repeat(60));
console.log('ACTUALIZANDO ARTICULOS DEL BLOG');
console.log('Eliminando galerias, insertando 3 imagenes distribuidas');
console.log('='.repeat(60));

const archivos = fs.readdirSync(ARTICULOS_DIR)
  .filter(f => f.endsWith('.html') && f !== 'index.html');

let actualizados = 0;
let sinCambios = 0;

archivos.forEach(archivo => {
  const filePath = path.join(ARTICULOS_DIR, archivo);
  const actualizado = procesarArticulo(filePath);
  if (actualizado) actualizados++;
  else sinCambios++;
});

console.log('='.repeat(60));
console.log(`RESUMEN: ${actualizados} actualizados, ${sinCambios} sin cambios`);
console.log('='.repeat(60));
