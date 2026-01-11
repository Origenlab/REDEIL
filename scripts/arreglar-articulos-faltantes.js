/**
 * Script para arreglar articulos faltantes
 * Inserta imagenes de forma flexible basandose en las secciones disponibles
 */

const fs = require('fs');
const path = require('path');

const ARTICULOS_DIR = path.join(__dirname, '../blog/articulos');

const IMAGENES = [
  'renta-guirnaldas-decoracion-exterior.webp',
  'renta-guirnaldas-decoracion-iluminada.webp',
  'renta-guirnaldas-decoracion-luminosa.webp',
  'renta-guirnaldas-decoracion-nocturna.webp',
  'renta-guirnaldas-iluminacion-comercial.webp',
  'renta-guirnaldas-iluminacion-decorativa.webp',
  'renta-guirnaldas-iluminacion-eventos.webp',
  'renta-guirnaldas-iluminacion-fiestas.webp'
];

const FOOTER_NUEVO = `<footer class="footer"><div class="footer-container"><div class="footer-main"><div class="footer-column footer-company"><div class="footer-logo"><svg class="footer-logo-svg" viewBox="0 0 200 50" xmlns="http://www.w3.org/2000/svg"><text x="0" y="35" font-family="Arial, Helvetica, sans-serif" font-size="40" font-weight="700" fill="#f5f5f7" letter-spacing="2">REDEIL</text></svg></div><p class="footer-tagline">Produccion Audiovisual para Eventos</p><p class="footer-company-desc">Renta profesional de iluminacion, audio y efectos especiales. Servicio integral con montaje tecnico en CDMX y Estado de Mexico.</p><div class="footer-contact-block"><div class="footer-contact-item"><span class="footer-contact-label">Telefono</span><a href="tel:+525549375172" class="footer-contact-value footer-phone">55 4937 5172</a></div><div class="footer-contact-item"><span class="footer-contact-label">Email</span><a href="mailto:redeil.mx@gmail.com" class="footer-contact-value">redeil.mx@gmail.com</a></div><div class="footer-contact-item"><span class="footer-contact-label">Horario</span><span class="footer-contact-value">Lun - Dom / 8:00 - 23:00</span></div></div><div class="footer-social-block"><span class="footer-social-label">Siguenos</span><div class="footer-social-links"><a href="https://www.facebook.com/profile.php?id=61583385634990" class="social-link" target="_blank" rel="noopener noreferrer">FACEBOOK</a><a href="https://www.instagram.com/redeil.mx/" class="social-link" target="_blank" rel="noopener noreferrer">INSTAGRAM</a><a href="https://www.linkedin.com/in/redeilmx/" class="social-link" target="_blank" rel="noopener noreferrer">LINKEDIN</a><a href="https://mx.pinterest.com/redeilmx/" class="social-link" target="_blank" rel="noopener noreferrer">PINTEREST</a></div></div></div><div class="footer-column"><h3 class="footer-column-title">Iluminacion</h3><ul class="footer-links"><li><a href="/renta-de-iluminacion/guirnaldas.html">Guirnaldas</a></li><li><a href="/renta-de-iluminacion/luz-neon.html">Luz Neon</a></li><li><a href="/renta-de-iluminacion/luz-negra.html">Luz Negra</a></li><li><a href="/renta-de-iluminacion/city-color.html">City Color</a></li><li><a href="/renta-de-iluminacion/sky-tracker.html">Sky Tracker</a></li><li><a href="/renta-de-iluminacion/cabezas-moviles.html">Cabezas Moviles</a></li><li><a href="/renta-de-iluminacion/iluminacion-laser.html">Iluminacion Laser</a></li><li><a href="/renta-de-iluminacion/luces-arquitectonicas.html">Luces Arquitectonicas</a></li><li><a href="/renta-de-iluminacion/cascadas-led.html">Cascadas LED</a></li><li><a href="/renta-de-iluminacion/proyector-de-gobos.html">Proyector de Gobos</a></li></ul></div><div class="footer-column"><h3 class="footer-column-title">Audio y Sonido</h3><ul class="footer-links"><li><a href="/renta-de-bocinas/bocinas-para-bodas.html">Bocinas para Bodas</a></li><li><a href="/renta-de-bocinas/bocinas-para-xv-anos.html">Bocinas para XV Anos</a></li><li><a href="/renta-de-bocinas/bocinas-para-fiestas.html">Bocinas para Fiestas</a></li><li><a href="/renta-de-bocinas/audio-para-conferencias.html">Conferencias</a></li></ul><h3 class="footer-column-title" style="margin-top:24px;">Equipos para Eventos</h3><ul class="footer-links"><li><a href="/equipos-para-eventos/bolas-disco.html">Bolas Disco</a></li><li><a href="/equipos-para-eventos/maquina-de-confeti.html">Maquina de Confeti</a></li><li><a href="/equipos-para-eventos/maquina-de-humo.html">Maquina de Humo</a></li><li><a href="/equipos-para-eventos/humo-bajo.html">Humo Bajo</a></li></ul></div><div class="footer-column"><h3 class="footer-column-title">Empresa</h3><ul class="footer-links"><li><a href="/">Inicio</a></li><li><a href="/nosotros.html">Nosotros</a></li><li><a href="/contacto.html">Contacto</a></li><li><a href="/blog/">Blog</a></li><li><a href="/sitemap.html">Mapa del Sitio</a></li><li><a href="/aviso-de-privacidad.html">Aviso de Privacidad</a></li></ul></div></div><div class="footer-branches-section"><h3 class="footer-branches-title">Nuestras Sucursales</h3><div class="footer-branches-grid"><div class="footer-branch"><h4 class="footer-branch-name">Benito Juarez</h4><p class="footer-branch-address">Av. Insurgentes Sur 615 - Piso 6<br>Napoles, Benito Juarez<br>03810 Ciudad de Mexico, CDMX</p></div><div class="footer-branch"><h4 class="footer-branch-name">Polanco</h4><p class="footer-branch-address">Av. Homero 1933 - Piso 3<br>Polanco, Polanco I Secc<br>11510 Ciudad de Mexico, CDMX</p></div><div class="footer-branch"><h4 class="footer-branch-name">Naucalpan</h4><p class="footer-branch-address">Blvd. Manuel Avila Camacho 5<br>Lomas de Sotelo, Piso 10, Torre B<br>53390 Naucalpan, Estado de Mexico</p></div><div class="footer-branch"><h4 class="footer-branch-name">Tlalnepantla</h4><p class="footer-branch-address">Emilio Carranza 17<br>Tlalnepantla Centro<br>54000 Tlalnepantla, Estado de Mexico</p></div></div></div><div class="footer-bottom"><div class="footer-copyright"><p>&copy; 2025 REDEIL. Todos los derechos reservados.</p></div><div class="footer-legal"><a href="/aviso-de-privacidad.html">Aviso de Privacidad</a><span class="footer-divider">|</span><a href="/sitemap.html">Mapa del Sitio</a></div></div></div></footer>`;

const SERVICIOS_MEJORADOS = `<div class="article-services"><h2 class="article-services__title">Servicios Relacionados</h2><div class="article-services__grid"><a href="/renta-de-iluminacion/guirnaldas.html" class="article-services__item" style="background:#f97316;color:#fff;">Renta de Guirnaldas</a><a href="/renta-de-iluminacion/luz-neon.html" class="article-services__item">Luz Neon LED</a><a href="/renta-de-iluminacion/luz-negra.html" class="article-services__item">Luz Negra UV</a><a href="/renta-de-iluminacion/cabezas-moviles.html" class="article-services__item">Cabezas Moviles</a><a href="/renta-de-iluminacion/city-color.html" class="article-services__item">City Color LED</a><a href="/renta-de-bocinas/bocinas-para-bodas.html" class="article-services__item">Audio para Bodas</a></div></div>`;

let imgIdx = 0;

function generarImagen(titulo, index) {
  const img = IMAGENES[imgIdx % IMAGENES.length];
  imgIdx++;
  return `<figure class="article-inline-image" style="margin:32px 0;text-align:center;"><img src="../img/bodas-guirnaldas/${img}" alt="${titulo} - Ejemplo de iluminacion ${index + 1}" style="width:100%;max-width:800px;height:auto;border-radius:12px;box-shadow:0 8px 32px rgba(0,0,0,0.3);" loading="lazy" /><figcaption style="color:#a1a1aa;font-size:0.9rem;margin-top:12px;font-style:italic;">Instalacion profesional por REDEIL</figcaption></figure>`;
}

const ARTICULOS_FALTANTES = [
  'focos-edison-bodas-elegancia-vintage.html',
  'luz-negra-uv-fiestas-tematicas-neon.html',
  'secretos-iluminacion-bodas-dreamlike.html',
  'tendencias-produccion-eventos-2025-redeil.html',
  'xv-anos-unforgettable-produccion-completa.html'
];

console.log('='.repeat(60));
console.log('ARREGLANDO ARTICULOS FALTANTES');
console.log('='.repeat(60));

ARTICULOS_FALTANTES.forEach(archivo => {
  const filePath = path.join(ARTICULOS_DIR, archivo);

  if (!fs.existsSync(filePath)) {
    console.log(`❌ ${archivo}: No encontrado`);
    return;
  }

  let contenido = fs.readFileSync(filePath, 'utf8');

  const tituloMatch = contenido.match(/<h1[^>]*>([^<]+)<\/h1>/);
  const titulo = tituloMatch ? tituloMatch[1] : 'Iluminacion';

  let cambios = [];

  // Footer
  if (!contenido.includes('footer-branches-section')) {
    contenido = contenido.replace(/<footer class="footer">[\s\S]*?<\/footer>/, FOOTER_NUEVO);
    cambios.push('Footer');
  }

  // Servicios
  if (!contenido.includes('style="background:#f97316')) {
    contenido = contenido.replace(/<div class="article-services">[\s\S]*?<\/div><\/div>/, SERVICIOS_MEJORADOS);
    cambios.push('Servicios');
  }

  // Imagenes - insertar despues de cada </section> encontrado, hasta 3 imagenes
  if (!contenido.includes('article-inline-image')) {
    // Encontrar todas las posiciones de </section>
    const secciones = [];
    let idx = 0;
    while ((idx = contenido.indexOf('</section>', idx)) !== -1) {
      secciones.push(idx + '</section>'.length);
      idx += 10;
    }

    // Insertar despues de la 1ra, 2da y 3ra seccion si existen
    const posiciones = [0, 1, 2].filter(p => secciones[p]);

    let offset = 0;
    posiciones.forEach((pos, i) => {
      const insertPos = secciones[pos] + offset;
      const imgHtml = generarImagen(titulo, i);
      contenido = contenido.slice(0, insertPos) + imgHtml + contenido.slice(insertPos);
      offset += imgHtml.length;
    });

    if (posiciones.length > 0) {
      cambios.push(`${posiciones.length} imagenes`);
    }
  }

  fs.writeFileSync(filePath, contenido, 'utf8');
  console.log(`✅ ${archivo}: ${cambios.join(', ') || 'Ya actualizado'}`);
});

console.log('='.repeat(60));
console.log('COMPLETADO');
console.log('='.repeat(60));
