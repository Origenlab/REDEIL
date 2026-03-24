/**
 * Migrate blog posts from src/pages/blog to src/content/blog as MDX
 */
import { readFileSync, writeFileSync, readdirSync, statSync, rmSync } from 'fs';
import { join } from 'path';

const ROOT = new URL('..', import.meta.url).pathname;
const PAGES_BLOG = join(ROOT, 'src/pages/blog');
const CONTENT_BLOG = join(ROOT, 'src/content/blog');

// Get all blog post directories (exclude index.astro and [...slug].astro)
const dirs = readdirSync(PAGES_BLOG).filter(d => {
  const full = join(PAGES_BLOG, d);
  return statSync(full).isDirectory();
});

console.log(`Found ${dirs.length} blog post directories to migrate.\n`);

// Metadata from the blog index (needed for category mapping)
const categoryMap = {
  'renta-de-guirnaldas-para-eventos-cdmx': 'iluminacion',
  'renta-de-luz-neon-para-eventos-cdmx': 'iluminacion',
  'renta-de-luz-negra-para-eventos-cdmx': 'iluminacion',
  'renta-de-city-color-para-eventos-cdmx': 'iluminacion',
  'renta-de-sky-tracker-para-eventos-cdmx': 'iluminacion',
  'renta-de-cabezas-moviles-para-eventos-cdmx': 'iluminacion',
  'renta-de-iluminacion-laser-para-eventos-cdmx': 'iluminacion',
  'renta-de-luces-arquitectonicas-para-eventos-cdmx': 'iluminacion',
  'renta-de-cascadas-led-para-eventos-cdmx': 'iluminacion',
  'renta-de-proyector-de-gobos-para-eventos-cdmx': 'iluminacion',
  'renta-de-city-light-para-eventos-cdmx': 'iluminacion',
  'renta-de-seguidor-de-luz-para-eventos-cdmx': 'iluminacion',
  'iluminacion-para-bodas-cdmx-guia-completa': 'iluminacion',
  'tendencias-iluminacion-eventos-2025': 'iluminacion',
  'renta-de-bocinas-para-bodas-para-eventos-cdmx': 'audio',
  'renta-de-bocinas-para-xv-anos-para-eventos-cdmx': 'audio',
  'renta-de-bocinas-para-fiestas-para-eventos-cdmx': 'audio',
  'renta-de-audio-para-conferencias-para-eventos-cdmx': 'audio',
  'audio-profesional-eventos-como-elegir': 'audio',
  'renta-de-bolas-disco-para-eventos-cdmx': 'equipos',
  'renta-de-maquina-de-confeti-para-eventos-cdmx': 'equipos',
  'renta-de-renta-de-podium-para-eventos-cdmx': 'equipos',
  'renta-de-pantalla-inflable-para-eventos-cdmx': 'equipos',
  'renta-de-maquina-de-humo-para-eventos-cdmx': 'equipos',
  'renta-de-maquina-de-burbujas-para-eventos-cdmx': 'equipos',
  'renta-de-humo-bajo-para-eventos-cdmx': 'equipos',
  'renta-de-mesas-picnic-para-eventos-cdmx': 'equipos',
  'efectos-especiales-para-eventos-tendencias': 'equipos',
  'como-planear-xv-anos-cdmx': 'eventos',
  'eventos-corporativos-iluminacion-audio': 'eventos',
};

function extractFromAstro(content) {
  // Extract headline from structured data
  const headlineMatch = content.match(/headline:\s*'([^']+)'/);
  const headline = headlineMatch ? headlineMatch[1] : '';

  // Extract description
  const descMatch = content.match(/description:\s*'([^']+)'/);
  // Also try double quotes
  const descMatch2 = content.match(/description="([^"]+)"/);
  const description = descMatch ? descMatch[1] : (descMatch2 ? descMatch2[1] : '');

  // Extract date
  const dateMatch = content.match(/datePublished:\s*'([^']+)'/);
  const date = dateMatch ? dateMatch[1] : '2025-03-15';

  // Extract category from span
  const catMatch = content.match(/blog-article__category[^>]*>([^<]+)</);
  const categoryDisplay = catMatch ? catMatch[1].trim() : 'General';

  // Extract body content between blog-article__content div
  const bodyMatch = content.match(/<div class="blog-article__content">([\s\S]*?)<\/div>\s*\n\s*<div class="blog-article__cta">/);
  let body = bodyMatch ? bodyMatch[1].trim() : '';

  return { headline, description, date, categoryDisplay, body };
}

function htmlToMarkdown(html) {
  let md = html;

  // Remove leading/trailing whitespace per line
  md = md.replace(/^\s+/gm, '');

  // Convert headings
  md = md.replace(/<h2>([^<]+)<\/h2>/g, '\n## $1\n');
  md = md.replace(/<h3>([^<]+)<\/h3>/g, '\n### $1\n');

  // Convert strong
  md = md.replace(/<strong>([^<]+)<\/strong>/g, '**$1**');

  // Convert links
  md = md.replace(/<a\s+href="([^"]+)"[^>]*>([^<]+)<\/a>/g, '[$2]($1)');

  // Convert list items
  md = md.replace(/<li>(.+?)<\/li>/g, '- $1');

  // Remove ul/ol tags
  md = md.replace(/<\/?ul>/g, '');
  md = md.replace(/<\/?ol>/g, '');

  // Convert paragraphs
  md = md.replace(/<p>(.+?)<\/p>/gs, '$1\n');

  // Clean up multiple newlines
  md = md.replace(/\n{3,}/g, '\n\n');

  return md.trim();
}

function generateFaqs(slug, headline, body) {
  // Product name from headline
  const productMatch = headline.match(/Renta de (.+?) para Eventos/i);
  const product = productMatch ? productMatch[1] : '';

  // Generate relevant FAQs based on content type
  if (slug.startsWith('renta-de-') && product) {
    return [
      { question: `¿Cuánto cuesta rentar ${product.toLowerCase()} en CDMX?`, answer: `Los precios de renta de ${product.toLowerCase()} en CDMX varían según el paquete, duración y ubicación. En REDEIL todos los precios incluyen transporte, instalación, operación y desmontaje.` },
      { question: `¿Qué incluye la renta de ${product.toLowerCase()}?`, answer: `La renta incluye el equipo profesional, transporte al venue, instalación, configuración, operación por técnicos durante el evento y desmontaje al finalizar.` },
      { question: `¿Con cuánta anticipación debo reservar ${product.toLowerCase()}?`, answer: `Recomendamos reservar con 4 a 6 semanas de anticipación, especialmente en temporada alta (noviembre a febrero) cuando la demanda es más alta.` },
      { question: `¿Cubren eventos fuera de CDMX?`, answer: `Sí, cubrimos CDMX y Estado de México. Para ubicaciones como Cuernavaca o Valle de Bravo el costo adicional es mínimo y se informa antes de confirmar.` },
    ];
  }

  // Editorial posts - custom FAQs
  switch (slug) {
    case 'iluminacion-para-bodas-cdmx-guia-completa':
      return [
        { question: '¿Cuánto cuesta la iluminación para una boda en CDMX?', answer: 'Los precios varían según el tipo de iluminación. Guirnaldas LED desde $3,500 MXN, uplighting desde $3,000 MXN, cabezas móviles desde $4,000 MXN y humo bajo desde $3,500 MXN. Todos incluyen instalación y operación.' },
        { question: '¿Qué tipo de iluminación es mejor para bodas en jardín?', answer: 'Las guirnaldas LED con focos Edison son las más solicitadas para bodas en jardín. Crean un ambiente cálido y romántico que funciona tanto para la cena como para la fiesta.' },
        { question: '¿Se puede cambiar la iluminación durante la boda?', answer: 'Sí, diseñamos escenas diferentes para cada momento: ceremonia, cocktail, cena, fiesta y vals. Cada momento tiene su propia iluminación programada.' },
        { question: '¿Con cuánta anticipación debo reservar iluminación para mi boda?', answer: 'Recomendamos reservar con al menos 6 semanas de anticipación, especialmente en temporada alta (noviembre a febrero).' },
      ];
    case 'audio-profesional-eventos-como-elegir':
      return [
        { question: '¿Cómo elijo el sistema de audio correcto para mi evento?', answer: 'Depende de tres factores: el tamaño del espacio, el tipo de evento y el número de invitados. En REDEIL dimensionamos cada sistema según las características acústicas del espacio.' },
        { question: '¿Cuánto cuesta rentar audio profesional en CDMX?', answer: 'Los paquetes empiezan desde $2,500 MXN para fiestas pequeñas y llegan hasta $25,000 MXN para congresos con traducción simultánea. Incluyen transporte, instalación y operación.' },
        { question: '¿Qué marcas de audio profesional manejan?', answer: 'Trabajamos con JBL Professional, QSC, Shure y Allen & Heath, marcas reconocidas mundialmente por su calidad y confiabilidad.' },
        { question: '¿El audio para bodas es diferente al de eventos corporativos?', answer: 'Sí. Las bodas necesitan un sistema versátil que cubra ceremonia y fiesta. Los eventos corporativos priorizan claridad del habla con micrófonos de solapa y bocinas de línea.' },
      ];
    case 'efectos-especiales-para-eventos-tendencias':
      return [
        { question: '¿Cuánto cuesta el humo bajo para un vals?', answer: 'El humo bajo para un vals inicia desde $3,500 MXN e incluye el equipo, hielo seco profesional, operación y desmontaje.' },
        { question: '¿Los efectos especiales son seguros para interiores?', answer: 'Sí, todos nuestros efectos son operados por técnicos certificados con equipos profesionales. Coordinamos con el venue para garantizar seguridad.' },
        { question: '¿Se pueden combinar varios efectos especiales?', answer: 'Sí, la clave es asignar cada efecto a un momento específico: humo bajo para el vals, confeti para el brindis, burbujas para sorprender y humo con luces para la fiesta.' },
      ];
    case 'como-planear-xv-anos-cdmx':
      return [
        { question: '¿Qué audio necesito para unos XV años?', answer: 'Las quinceañeras necesitan potencia para el baile y claridad para los momentos solemnes del vals. Nuestros paquetes incluyen sistemas que manejan ambos escenarios.' },
        { question: '¿Cuánto cuesta el audio y luces para XV años en CDMX?', answer: 'Depende del tamaño del evento y los servicios. Los paquetes de audio empiezan desde $2,500 MXN y la iluminación desde $3,000 MXN.' },
        { question: '¿Incluyen operación durante todo el evento?', answer: 'Sí, todos nuestros paquetes incluyen transporte, instalación, operación por técnicos profesionales y desmontaje.' },
      ];
    case 'eventos-corporativos-iluminacion-audio':
      return [
        { question: '¿Qué audio necesito para una conferencia corporativa?', answer: 'Las conferencias requieren micrófonos de solapa de alta calidad, bocinas de línea para cobertura uniforme y la opción de grabar o transmitir en vivo.' },
        { question: '¿Cubren eventos corporativos grandes en CDMX?', answer: 'Sí, tenemos paquetes desde fiestas en casa hasta congresos con traducción simultánea y grabación profesional para hasta 500+ personas.' },
        { question: '¿Hacen pruebas de sonido antes del evento?', answer: 'Siempre realizamos pruebas de sonido antes de que lleguen los invitados para ajustar niveles y ecualización según el espacio.' },
      ];
    case 'tendencias-iluminacion-eventos-2025':
      return [
        { question: '¿Cuáles son las tendencias de iluminación para eventos en 2025?', answer: 'Las principales tendencias son LED RGBW+UV, iluminación inalámbrica con batería, pixel mapping, sostenibilidad con LED de bajo consumo y estética neón retro.' },
        { question: '¿Qué es el pixel mapping en iluminación?', answer: 'El pixel mapping permite controlar cada LED individualmente para crear efectos visuales dinámicos como olas de color, texto animado y patrones en movimiento.' },
        { question: '¿Las luces LED inalámbricas duran todo el evento?', answer: 'Sí, las baterías de última generación duran entre 8 y 12 horas, más que suficiente para cualquier evento. Se controlan vía WiFi o DMX inalámbrico.' },
      ];
    default:
      return [
        { question: '¿Cubren eventos en toda la CDMX?', answer: 'Sí, cubrimos CDMX y Estado de México con todos nuestros servicios de renta de equipo profesional para eventos.' },
        { question: '¿Qué incluye el servicio de renta?', answer: 'Todos los servicios incluyen transporte, instalación, operación por técnicos profesionales y desmontaje al finalizar el evento.' },
        { question: '¿Con cuánta anticipación debo reservar?', answer: 'Recomendamos reservar con 4 a 6 semanas de anticipación, especialmente en temporada alta de noviembre a febrero.' },
      ];
  }
}

function generateTags(slug, category) {
  const baseTags = ['eventos CDMX'];

  if (slug.startsWith('renta-de-')) {
    const productMatch = slug.match(/renta-de-(.+?)-para-eventos/);
    if (productMatch) {
      baseTags.push(`renta de ${productMatch[1].replace(/-/g, ' ')}`);
    }
  }

  switch (category) {
    case 'iluminacion': baseTags.push('iluminación', 'luces para eventos'); break;
    case 'audio': baseTags.push('audio profesional', 'bocinas'); break;
    case 'equipos': baseTags.push('equipos para eventos', 'efectos especiales'); break;
    case 'eventos': baseTags.push('organización de eventos', 'planeación'); break;
  }

  return baseTags;
}

function shortenTitle(title) {
  // Remove " | REDEIL" suffix if present
  let t = title.replace(/\s*\|\s*REDEIL$/, '');

  if (t.length <= 60) return t;

  // Try removing ": Guía Completa 2026"
  t = t.replace(/:\s*Guía Completa\s*\d{4}/, '');
  if (t.length <= 60) return t;

  // Try removing "para Eventos en CDMX" → "CDMX"
  t = t.replace(/para Eventos en CDMX/, 'CDMX');
  if (t.length <= 60) return t;

  // Try removing "para un Evento Inolvidable"
  t = t.replace(/para un Evento Inolvidable/, '');
  if (t.length <= 60) return t;

  // Truncate to 57 + "..."
  return t.substring(0, 57) + '...';
}

for (const slug of dirs) {
  const filePath = join(PAGES_BLOG, slug, 'index.astro');
  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch {
    console.warn(`  ⚠ Could not read ${filePath}, skipping.`);
    continue;
  }

  const { headline, description, date, categoryDisplay, body } = extractFromAstro(content);
  const category = categoryMap[slug] || 'eventos';
  const markdown = htmlToMarkdown(body);
  const faqs = generateFaqs(slug, headline, body);
  const tags = generateTags(slug, category);
  const title = shortenTitle(headline);
  const readTime = `${Math.max(3, Math.ceil(markdown.split(/\s+/).length / 200))} min`;

  // Build FAQs YAML
  const faqsYaml = faqs.map(f =>
    `  - question: "${f.question}"\n    answer: "${f.answer}"`
  ).join('\n');

  const tagsYaml = tags.map(t => `"${t}"`).join(', ');

  const mdxContent = `---
title: "${title}"
description: "${description}"
publishDate: "${date}"
category: "${category}"
tags: [${tagsYaml}]
readTime: "${readTime}"
faqs:
${faqsYaml}
---

${markdown}
`;

  const outPath = join(CONTENT_BLOG, `${slug}.mdx`);
  writeFileSync(outPath, mdxContent, 'utf-8');
  console.log(`✓ ${slug}.mdx (${title.length} chars title)`);

  // Remove original directory
  rmSync(join(PAGES_BLOG, slug), { recursive: true, force: true });
}

console.log(`\nDone! Migrated ${dirs.length} posts.`);
