#!/usr/bin/env node
/**
 * REDEIL — GEO Optimization Script
 * Tasks: titles ≤60, H2 GEO questions, internal linking, meta descriptions
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';

const SRC = '/Users/frankoropeza/Desktop/CLIENTES/REDEIL/src/pages';
let totalChanges = 0;

// ── Helpers ──────────────────────────────────────────────────────────────────

function walkDir(dir, ext = '.astro') {
  let results = [];
  for (const f of readdirSync(dir)) {
    const full = join(dir, f);
    if (statSync(full).isDirectory()) results.push(...walkDir(full, ext));
    else if (full.endsWith(ext)) results.push(full);
  }
  return results;
}

function readFile(p) { return readFileSync(p, 'utf-8'); }
function writeFile(p, c) { writeFileSync(p, c, 'utf-8'); }

// ── Zone metadata ────────────────────────────────────────────────────────────

const ZONAS = {
  'atizapan': 'Atizapán',
  'azcapotzalco': 'Azcapotzalco',
  'benito-juarez': 'Benito Juárez',
  'chalco': 'Chalco',
  'coacalco': 'Coacalco',
  'condesa': 'Condesa',
  'coyoacan': 'Coyoacán',
  'cuauhtemoc': 'Cuauhtémoc',
  'cuautitlan-izcalli': 'Cuautitlán Izcalli',
  'del-valle': 'Del Valle',
  'ecatepec': 'Ecatepec',
  'huixquilucan': 'Huixquilucan',
  'interlomas': 'Interlomas',
  'metepec': 'Metepec',
  'miguel-hidalgo': 'Miguel Hidalgo',
  'narvarte': 'Narvarte',
  'naucalpan': 'Naucalpan',
  'nezahualcoyotl': 'Nezahualcóyotl',
  'pedregal': 'Pedregal',
  'polanco': 'Polanco',
  'roma': 'Roma',
  'san-angel': 'San Ángel',
  'santa-fe': 'Santa Fe',
  'satelite': 'Satélite',
  'texcoco': 'Texcoco',
  'tlalnepantla': 'Tlalnepantla',
  'tlalpan': 'Tlalpan',
  'toluca': 'Toluca',
  'tultitlan': 'Tultitlán',
  'xochimilco': 'Xochimilco',
};

// Related zones for internal linking (nearby zones)
const ZONA_NEIGHBORS = {
  'polanco': ['condesa', 'roma', 'miguel-hidalgo'],
  'condesa': ['roma', 'polanco', 'del-valle'],
  'roma': ['condesa', 'del-valle', 'narvarte'],
  'del-valle': ['narvarte', 'roma', 'benito-juarez'],
  'narvarte': ['del-valle', 'benito-juarez', 'coyoacan'],
  'coyoacan': ['tlalpan', 'del-valle', 'benito-juarez'],
  'tlalpan': ['coyoacan', 'xochimilco', 'pedregal'],
  'xochimilco': ['tlalpan', 'chalco', 'coyoacan'],
  'benito-juarez': ['del-valle', 'narvarte', 'coyoacan'],
  'cuauhtemoc': ['roma', 'condesa', 'azcapotzalco'],
  'miguel-hidalgo': ['polanco', 'santa-fe', 'azcapotzalco'],
  'azcapotzalco': ['tlalnepantla', 'naucalpan', 'cuauhtemoc'],
  'santa-fe': ['huixquilucan', 'interlomas', 'miguel-hidalgo'],
  'huixquilucan': ['interlomas', 'santa-fe', 'naucalpan'],
  'interlomas': ['huixquilucan', 'santa-fe', 'satelite'],
  'satelite': ['naucalpan', 'tlalnepantla', 'interlomas'],
  'naucalpan': ['satelite', 'tlalnepantla', 'huixquilucan'],
  'tlalnepantla': ['naucalpan', 'ecatepec', 'tultitlan'],
  'ecatepec': ['tlalnepantla', 'nezahualcoyotl', 'coacalco'],
  'coacalco': ['ecatepec', 'tultitlan', 'cuautitlan-izcalli'],
  'tultitlan': ['coacalco', 'cuautitlan-izcalli', 'ecatepec'],
  'cuautitlan-izcalli': ['tultitlan', 'atizapan', 'coacalco'],
  'atizapan': ['cuautitlan-izcalli', 'satelite', 'naucalpan'],
  'nezahualcoyotl': ['ecatepec', 'chalco', 'texcoco'],
  'chalco': ['nezahualcoyotl', 'texcoco', 'xochimilco'],
  'texcoco': ['chalco', 'nezahualcoyotl', 'ecatepec'],
  'pedregal': ['tlalpan', 'san-angel', 'coyoacan'],
  'san-angel': ['pedregal', 'coyoacan', 'del-valle'],
  'toluca': ['metepec', 'huixquilucan', 'santa-fe'],
  'metepec': ['toluca', 'huixquilucan', 'santa-fe'],
};

// ── Service name extraction ──────────────────────────────────────────────────

function extractServiceName(filePath) {
  // Extract service name from path like /renta-de-iluminacion/guirnaldas/index.astro
  const rel = relative(SRC, filePath);
  const parts = rel.split('/');
  if (parts.length < 2) return null;

  // Map slugs to proper names
  const serviceNames = {
    'guirnaldas': 'guirnaldas de luces',
    'luz-neon': 'luz neón LED',
    'luz-negra': 'luz negra UV',
    'city-color': 'city color LED',
    'sky-tracker': 'sky tracker',
    'cabezas-moviles': 'cabezas móviles',
    'iluminacion-laser': 'iluminación láser',
    'luces-arquitectonicas': 'luces arquitectónicas',
    'cascadas-led': 'cascadas LED',
    'proyector-de-gobos': 'proyector de gobos',
    'city-light': 'city light',
    'seguidor-de-luz': 'seguidor de luz',
    'bocinas-para-bodas': 'bocinas para bodas',
    'bocinas-para-xv-anos': 'bocinas para XV años',
    'bocinas-para-fiestas': 'bocinas para fiestas',
    'audio-para-conferencias': 'audio para conferencias',
    'bolas-disco': 'bolas disco',
    'maquina-de-confeti': 'máquina de confeti',
    'renta-de-podium': 'podium',
    'pantalla-inflable': 'pantalla inflable',
    'maquina-de-humo': 'máquina de humo',
    'maquina-de-burbujas': 'máquina de burbujas',
    'humo-bajo': 'humo bajo',
    'mesas-picnic': 'mesas picnic',
  };

  return serviceNames[parts[1]] || parts[1].replace(/-/g, ' ');
}

// ── TASK 1: Fix titles > 60 chars ────────────────────────────────────────────

function fixTitle(content, filePath) {
  let changed = false;

  // Match title="..." in Base component
  content = content.replace(/title="([^"]+)"/g, (match, title) => {
    if (title.length <= 60) return match;

    let newTitle = title;

    // Pattern: "Renta de X para Eventos en CDMX: Guía Completa 2026 | REDEIL"
    newTitle = newTitle.replace(/para Eventos en CDMX: Guía Completa \d{4}\s*\|\s*REDEIL/, 'para Eventos CDMX | REDEIL');

    // Pattern: "X para Eventos en CDMX | REDEIL" → "X para Eventos CDMX | REDEIL"
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(' en CDMX | REDEIL', ' CDMX | REDEIL');
    }

    // Pattern: "Renta de X para Y para Eventos CDMX | REDEIL" (double para)
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(/Renta de (.+?) para (.+?) para Eventos/, 'Renta de $1 para $2 Eventos');
    }

    // Pattern with "en CDMX y EdoMex"
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(' en CDMX y EdoMex', ' CDMX');
      newTitle = newTitle.replace(' y EdoMex', '');
    }

    // Still too long? Remove "Renta de" at start
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(/^Renta de /, '');
    }

    // Package titles: "Básico — 50 metros — Guirnaldas de Luces en CDMX | REDEIL"
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(/ en CDMX/, '');
    }

    // Remove "— " long dashes to save chars if needed
    if (newTitle.length > 60) {
      newTitle = newTitle.replace(/ — /g, ' · ');
    }

    if (newTitle !== title) {
      changed = true;
      console.log(`  TITLE [${title.length}→${newTitle.length}]: "${title}" → "${newTitle}"`);
      return `title="${newTitle}"`;
    }
    return match;
  });

  return { content, changed };
}

// ── TASK 2: GEO H2 restructure in service pages ─────────────────────────────

function geoServiceH2(content, filePath) {
  const serviceName = extractServiceName(filePath);
  if (!serviceName) return { content, changed: false };

  let changed = false;
  const rel = relative(SRC, filePath);
  const parts = rel.split('/');

  // Is this a service page (not a package page)?
  const isServicePage = parts.length === 3 && parts[2] === 'index.astro' && !parts[1].startsWith('paquete-');
  // Is this a package page?
  const isPackagePage = parts.length === 4 && parts[2].startsWith('paquete-');

  if (isServicePage) {
    // Change H3 "Servicio integral de X" → "¿Qué incluye la renta de X?"
    const servIntegral = new RegExp(`<h3>Servicio integral de ${escapeRegex(serviceName)}</h3>`, 'i');
    if (servIntegral.test(content)) {
      content = content.replace(servIntegral, `<h3>¿Qué incluye la renta de ${serviceName}?</h3>`);
      changed = true;
    }

    // Change H3 "Equipo profesional de X" → "¿Qué equipo usan para X?"
    const equipoProf = new RegExp(`<h3>Equipo profesional de ${escapeRegex(serviceName)}</h3>`, 'i');
    if (equipoProf.test(content)) {
      content = content.replace(equipoProf, `<h3>¿Qué equipo profesional usan para ${serviceName}?</h3>`);
      changed = true;
    }

    // Change H3 "Cobertura en CDMX y Estado de México" → "¿En qué zonas de CDMX dan servicio?"
    if (content.includes('<h3>Cobertura en CDMX y Estado de México</h3>')) {
      content = content.replace(
        '<h3>Cobertura en CDMX y Estado de México</h3>',
        `<h3>¿En qué zonas de CDMX rentan ${serviceName}?</h3>`
      );
      changed = true;
    }
  }

  if (isPackagePage) {
    // Change generic H2 "Renta de X — Paquete Y en CDMX"
    content = content.replace(
      /<h2>Renta de [^<]+ — Paquete [^<]+ en CDMX<\/h2>/,
      (match) => {
        const paqueteName = match.match(/Paquete ([^<]+) en/)?.[1] || '';
        changed = true;
        return `<h2>¿Por qué elegir el paquete ${paqueteName} de ${serviceName}?</h2>`;
      }
    );

    // H2 "Renta de X — Paquete ... en CDMX" as just text
    content = content.replace(
      /(<h2>)Renta de .+ — (.+) en CDMX(<\/h2>)/,
      (match, open, pkg, close) => {
        if (match.includes('¿')) return match; // Already transformed
        changed = true;
        return `${open}¿Por qué elegir ${pkg} de ${serviceName}?${close}`;
      }
    );
  }

  if (changed) console.log(`  GEO H2/H3 updated in: ${rel}`);
  return { content, changed };
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// ── TASK 3: GEO H2 restructure in zone pages ────────────────────────────────

function geoZonaH2(content, filePath) {
  const rel = relative(SRC, filePath);
  if (!rel.startsWith('zonas/') || rel === 'zonas/index.astro') return { content, changed: false };

  const slug = rel.split('/')[1];
  const zonaName = ZONAS[slug];
  if (!zonaName) return { content, changed: false };

  let changed = false;

  // "Servicios de Iluminación y Sonido en X" → "¿Qué servicios de iluminación y sonido ofrecemos en X?"
  const servH2 = `Servicios de Iluminación y Sonido en ${zonaName}`;
  if (content.includes(servH2)) {
    content = content.replace(
      `<h2 class="section__title">${servH2}</h2>`,
      `<h2 class="section__title">¿Qué servicios de iluminación y sonido ofrecemos en ${zonaName}?</h2>`
    );
    changed = true;
  }

  // "Venues y Espacios que Atendemos en X" → "¿En qué venues de X instalamos equipo?"
  const venuesH2 = `Venues y Espacios que Atendemos en ${zonaName}`;
  if (content.includes(venuesH2)) {
    content = content.replace(
      `<h2>${venuesH2}</h2>`,
      `<h2>¿En qué venues de ${zonaName} instalamos equipo?</h2>`
    );
    // Update the paragraph after to answer the question directly
    content = content.replace(
      /(<h2>¿En qué venues de .+ instalamos equipo\?<\/h2>\s*<p>)Nuestro equipo conoce los principales venues/,
      `$1Instalamos equipo profesional en los principales venues`
    );
    changed = true;
  }

  if (changed) console.log(`  GEO ZONA H2 updated: ${slug}`);
  return { content, changed };
}

// ── TASK 4: Internal linking ─────────────────────────────────────────────────

function addInternalLinks(content, filePath) {
  const rel = relative(SRC, filePath);
  let changed = false;

  // ── Zone pages → link to services
  if (rel.startsWith('zonas/') && rel !== 'zonas/index.astro') {
    const slug = rel.split('/')[1];
    const zonaName = ZONAS[slug];
    if (!zonaName) return { content, changed: false };

    const neighbors = ZONA_NEIGHBORS[slug] || [];

    // Check if zona already has a "zonas cercanas" section
    if (!content.includes('zonas-cercanas') && !content.includes('Zonas cercanas') && neighbors.length >= 2) {
      // Add links to nearby zones before the FaqSection
      const zonaLinks = neighbors.slice(0, 3).map(n => {
        const name = ZONAS[n];
        return `        <a href="/zonas/${n}/" class="zona-link">Renta de iluminación en ${name}</a>`;
      }).join('\n');

      const zonaSection = `
  <!-- Zonas cercanas -->
  <section class="section">
    <div class="container">
      <h2 class="section__title">¿Buscas servicio en zonas cercanas a ${zonaName}?</h2>
      <p class="section__subtitle">También cubrimos estas zonas con el mismo nivel de servicio profesional.</p>
      <div class="zonas-cercanas">
${zonaLinks}
      </div>
    </div>
  </section>
`;

      // Insert before FaqSection
      if (content.includes('<FaqSection')) {
        content = content.replace('<FaqSection', zonaSection + '\n  <FaqSection');
        changed = true;
      }
    }
  }

  // ── Service pages → link to zones
  if ((rel.startsWith('renta-de-iluminacion/') || rel.startsWith('renta-de-bocinas/') || rel.startsWith('equipos-para-eventos/'))
      && !rel.includes('paquete-')) {
    const parts = rel.split('/');
    if (parts.length === 3 && parts[2] === 'index.astro') {
      const serviceName = extractServiceName(filePath);

      // Check if already has zone links
      if (!content.includes('zonas-servicio') && !content.includes('/zonas/') && serviceName) {
        const zonesForService = ['polanco', 'condesa', 'santa-fe'];
        const zonaLinks = zonesForService.map(z =>
          `        <a href="/zonas/${z}/" class="zona-link">Renta de ${serviceName} en ${ZONAS[z]}</a>`
        ).join('\n');

        const zonaSection = `
  <!-- Zonas de servicio -->
  <section class="section">
    <div class="container">
      <h2 class="section__title">¿En qué zonas de CDMX ofrecemos ${serviceName}?</h2>
      <p class="section__subtitle">Llevamos ${serviceName} a toda la Ciudad de México y Estado de México. Estas son algunas de nuestras zonas de cobertura.</p>
      <div class="zonas-servicio">
${zonaLinks}
      </div>
      <p style="margin-top: var(--spacing-md); text-align: center;"><a href="/zonas/" style="color: var(--color-accent); font-weight: 600;">Ver todas las zonas de cobertura →</a></p>
    </div>
  </section>
`;
        // Insert before FaqSection
        if (content.includes('<FaqSection')) {
          content = content.replace('<FaqSection', zonaSection + '\n  <FaqSection');
          changed = true;
        }
      }
    }
  }

  if (changed) console.log(`  LINKS added: ${rel}`);
  return { content, changed };
}

// ── Add CSS for new zona links (only if needed) ──────────────────────────────

function addLinkCSS(content, filePath) {
  const rel = relative(SRC, filePath);
  let changed = false;

  if (content.includes('zonas-cercanas') && !content.includes('.zonas-cercanas')) {
    const css = `
  .zonas-cercanas {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-sm);
  }
  .zona-link {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--color-accent);
    font-weight: 600;
    font-size: var(--font-size-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .zona-link:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }`;
    content = content.replace('</style>', css + '\n</style>');
    changed = true;
  }

  if (content.includes('zonas-servicio') && !content.includes('.zonas-servicio')) {
    const css = `
  .zonas-servicio {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-sm);
  }
  .zonas-servicio .zona-link,
  .zona-link {
    display: block;
    padding: var(--spacing-sm) var(--spacing-md);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: var(--color-accent);
    font-weight: 600;
    font-size: var(--font-size-sm);
    transition: border-color 0.2s, box-shadow 0.2s;
  }
  .zona-link:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }`;
    content = content.replace('</style>', css + '\n</style>');
    changed = true;
  }

  return { content, changed };
}

// ── TASK 6: Meta descriptions ────────────────────────────────────────────────

function fixMetaDescription(content, filePath) {
  let changed = false;

  content = content.replace(/description="([^"]+)"/g, (match, desc) => {
    // Check length
    if (desc.length > 155) {
      // Truncate intelligently at sentence boundary
      let newDesc = desc.substring(0, 152);
      const lastPeriod = newDesc.lastIndexOf('.');
      if (lastPeriod > 100) {
        newDesc = newDesc.substring(0, lastPeriod + 1);
      } else {
        newDesc = newDesc.substring(0, 152) + '...';
      }
      console.log(`  DESC [${desc.length}→${newDesc.length}]: truncated in ${relative(SRC, filePath)}`);
      changed = true;
      return `description="${newDesc}"`;
    }
    return match;
  });

  return { content, changed };
}

// ── Main ─────────────────────────────────────────────────────────────────────

const files = walkDir(SRC);
console.log(`\n📄 Found ${files.length} .astro files\n`);

let filesChanged = 0;

for (const filePath of files) {
  const rel = relative(SRC, filePath);
  let content = readFile(filePath);
  let fileChanged = false;

  // Skip blog dynamic route
  if (rel === 'blog/[...slug].astro') continue;

  // Task 1: Fix titles
  let r = fixTitle(content, filePath);
  content = r.content; fileChanged = fileChanged || r.changed;

  // Task 2: GEO H2 in services
  if (rel.startsWith('renta-de-iluminacion/') || rel.startsWith('renta-de-bocinas/') || rel.startsWith('equipos-para-eventos/')) {
    r = geoServiceH2(content, filePath);
    content = r.content; fileChanged = fileChanged || r.changed;
  }

  // Task 3: GEO H2 in zones
  if (rel.startsWith('zonas/')) {
    r = geoZonaH2(content, filePath);
    content = r.content; fileChanged = fileChanged || r.changed;
  }

  // Task 4: Internal linking
  r = addInternalLinks(content, filePath);
  content = r.content; fileChanged = fileChanged || r.changed;

  // Add CSS for links
  r = addLinkCSS(content, filePath);
  content = r.content; fileChanged = fileChanged || r.changed;

  // Task 6: Meta descriptions
  r = fixMetaDescription(content, filePath);
  content = r.content; fileChanged = fileChanged || r.changed;

  if (fileChanged) {
    writeFile(filePath, content);
    filesChanged++;
    totalChanges++;
  }
}

console.log(`\n✅ Modified ${filesChanged} files`);
console.log(`Total changes: ${totalChanges}`);
