#!/usr/bin/env node
/**
 * Add internal links to blog posts
 */
import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = '/Users/frankoropeza/Desktop/CLIENTES/REDEIL/src/content/blog';

// Map blog slug → related service links and zone links
const BLOG_LINKS = {
  'renta-de-bocinas-para-bodas-para-eventos-cdmx': {
    services: [
      { text: 'renta de bocinas para bodas', href: '/renta-de-bocinas/bocinas-para-bodas/' },
      { text: 'renta de humo bajo', href: '/equipos-para-eventos/humo-bajo/' },
      { text: 'renta de guirnaldas de luces', href: '/renta-de-iluminacion/guirnaldas/' },
    ],
    zones: [
      { text: 'renta de iluminación en Polanco', href: '/zonas/polanco/' },
      { text: 'renta de iluminación en Condesa', href: '/zonas/condesa/' },
    ],
  },
  'renta-de-bocinas-para-xv-anos-para-eventos-cdmx': {
    services: [
      { text: 'renta de bocinas para XV años', href: '/renta-de-bocinas/bocinas-para-xv-anos/' },
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
      { text: 'renta de máquina de confeti', href: '/equipos-para-eventos/maquina-de-confeti/' },
    ],
    zones: [
      { text: 'servicio en Ecatepec', href: '/zonas/ecatepec/' },
      { text: 'servicio en Naucalpan', href: '/zonas/naucalpan/' },
    ],
  },
  'renta-de-bocinas-para-fiestas-para-eventos-cdmx': {
    services: [
      { text: 'renta de bocinas para fiestas', href: '/renta-de-bocinas/bocinas-para-fiestas/' },
      { text: 'renta de bolas disco', href: '/equipos-para-eventos/bolas-disco/' },
      { text: 'renta de máquina de humo', href: '/equipos-para-eventos/maquina-de-humo/' },
    ],
    zones: [
      { text: 'servicio en Roma', href: '/zonas/roma/' },
      { text: 'servicio en Del Valle', href: '/zonas/del-valle/' },
    ],
  },
  'renta-de-audio-para-conferencias-para-eventos-cdmx': {
    services: [
      { text: 'renta de audio para conferencias', href: '/renta-de-bocinas/audio-para-conferencias/' },
      { text: 'renta de podium', href: '/equipos-para-eventos/renta-de-podium/' },
      { text: 'renta de pantalla inflable', href: '/equipos-para-eventos/pantalla-inflable/' },
    ],
    zones: [
      { text: 'servicio en Santa Fe', href: '/zonas/santa-fe/' },
      { text: 'servicio en Polanco', href: '/zonas/polanco/' },
    ],
  },
  'audio-profesional-eventos-como-elegir': {
    services: [
      { text: 'renta de bocinas para bodas', href: '/renta-de-bocinas/bocinas-para-bodas/' },
      { text: 'renta de audio para conferencias', href: '/renta-de-bocinas/audio-para-conferencias/' },
      { text: 'renta de bocinas para fiestas', href: '/renta-de-bocinas/bocinas-para-fiestas/' },
    ],
    zones: [
      { text: 'servicio en Miguel Hidalgo', href: '/zonas/miguel-hidalgo/' },
      { text: 'servicio en Benito Juárez', href: '/zonas/benito-juarez/' },
    ],
  },
  'iluminacion-para-bodas-cdmx-guia-completa': {
    services: [
      { text: 'renta de guirnaldas de luces', href: '/renta-de-iluminacion/guirnaldas/' },
      { text: 'renta de luces arquitectónicas', href: '/renta-de-iluminacion/luces-arquitectonicas/' },
      { text: 'renta de humo bajo', href: '/equipos-para-eventos/humo-bajo/' },
      { text: 'renta de proyector de gobos', href: '/renta-de-iluminacion/proyector-de-gobos/' },
    ],
    zones: [
      { text: 'iluminación en Condesa', href: '/zonas/condesa/' },
      { text: 'iluminación en San Ángel', href: '/zonas/san-angel/' },
    ],
  },
  'eventos-corporativos-iluminacion-audio': {
    services: [
      { text: 'renta de audio para conferencias', href: '/renta-de-bocinas/audio-para-conferencias/' },
      { text: 'renta de luces arquitectónicas', href: '/renta-de-iluminacion/luces-arquitectonicas/' },
      { text: 'renta de podium', href: '/equipos-para-eventos/renta-de-podium/' },
    ],
    zones: [
      { text: 'servicio en Santa Fe', href: '/zonas/santa-fe/' },
      { text: 'servicio en Polanco', href: '/zonas/polanco/' },
    ],
  },
  'como-planear-xv-anos-cdmx': {
    services: [
      { text: 'renta de bocinas para XV años', href: '/renta-de-bocinas/bocinas-para-xv-anos/' },
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
      { text: 'renta de bolas disco', href: '/equipos-para-eventos/bolas-disco/' },
    ],
    zones: [
      { text: 'servicio en Tlalnepantla', href: '/zonas/tlalnepantla/' },
      { text: 'servicio en Ecatepec', href: '/zonas/ecatepec/' },
    ],
  },
  'efectos-especiales-para-eventos-tendencias': {
    services: [
      { text: 'renta de máquina de humo', href: '/equipos-para-eventos/maquina-de-humo/' },
      { text: 'renta de máquina de confeti', href: '/equipos-para-eventos/maquina-de-confeti/' },
      { text: 'renta de humo bajo', href: '/equipos-para-eventos/humo-bajo/' },
      { text: 'renta de máquina de burbujas', href: '/equipos-para-eventos/maquina-de-burbujas/' },
    ],
    zones: [
      { text: 'servicio en Coyoacán', href: '/zonas/coyoacan/' },
    ],
  },
  'tendencias-iluminacion-eventos-2025': {
    services: [
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
      { text: 'renta de iluminación láser', href: '/renta-de-iluminacion/iluminacion-laser/' },
      { text: 'renta de cascadas LED', href: '/renta-de-iluminacion/cascadas-led/' },
    ],
    zones: [
      { text: 'iluminación en Polanco', href: '/zonas/polanco/' },
      { text: 'iluminación en Condesa', href: '/zonas/condesa/' },
    ],
  },
  'renta-de-guirnaldas-para-eventos-cdmx': {
    services: [
      { text: 'renta de guirnaldas de luces', href: '/renta-de-iluminacion/guirnaldas/' },
      { text: 'renta de cascadas LED', href: '/renta-de-iluminacion/cascadas-led/' },
    ],
    zones: [
      { text: 'servicio en San Ángel', href: '/zonas/san-angel/' },
      { text: 'servicio en Coyoacán', href: '/zonas/coyoacan/' },
    ],
  },
  'renta-de-cabezas-moviles-para-eventos-cdmx': {
    services: [
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
      { text: 'renta de iluminación láser', href: '/renta-de-iluminacion/iluminacion-laser/' },
    ],
    zones: [
      { text: 'servicio en Roma', href: '/zonas/roma/' },
      { text: 'servicio en Polanco', href: '/zonas/polanco/' },
    ],
  },
  'renta-de-cascadas-led-para-eventos-cdmx': {
    services: [
      { text: 'renta de cascadas LED', href: '/renta-de-iluminacion/cascadas-led/' },
      { text: 'renta de guirnaldas de luces', href: '/renta-de-iluminacion/guirnaldas/' },
    ],
    zones: [
      { text: 'servicio en Del Valle', href: '/zonas/del-valle/' },
    ],
  },
  'renta-de-city-color-para-eventos-cdmx': {
    services: [
      { text: 'renta de city color LED', href: '/renta-de-iluminacion/city-color/' },
      { text: 'renta de sky tracker', href: '/renta-de-iluminacion/sky-tracker/' },
    ],
    zones: [
      { text: 'servicio en Miguel Hidalgo', href: '/zonas/miguel-hidalgo/' },
    ],
  },
  'renta-de-city-light-para-eventos-cdmx': {
    services: [
      { text: 'renta de city light', href: '/renta-de-iluminacion/city-light/' },
      { text: 'renta de luces arquitectónicas', href: '/renta-de-iluminacion/luces-arquitectonicas/' },
    ],
    zones: [
      { text: 'servicio en Narvarte', href: '/zonas/narvarte/' },
    ],
  },
  'renta-de-iluminacion-laser-para-eventos-cdmx': {
    services: [
      { text: 'renta de iluminación láser', href: '/renta-de-iluminacion/iluminacion-laser/' },
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
    ],
    zones: [
      { text: 'servicio en Cuauhtémoc', href: '/zonas/cuauhtemoc/' },
    ],
  },
  'renta-de-luces-arquitectonicas-para-eventos-cdmx': {
    services: [
      { text: 'renta de luces arquitectónicas', href: '/renta-de-iluminacion/luces-arquitectonicas/' },
      { text: 'renta de city color LED', href: '/renta-de-iluminacion/city-color/' },
    ],
    zones: [
      { text: 'servicio en Polanco', href: '/zonas/polanco/' },
    ],
  },
  'renta-de-luz-negra-para-eventos-cdmx': {
    services: [
      { text: 'renta de luz negra UV', href: '/renta-de-iluminacion/luz-negra/' },
      { text: 'renta de luz neón LED', href: '/renta-de-iluminacion/luz-neon/' },
    ],
    zones: [
      { text: 'servicio en Roma', href: '/zonas/roma/' },
    ],
  },
  'renta-de-luz-neon-para-eventos-cdmx': {
    services: [
      { text: 'renta de luz neón LED', href: '/renta-de-iluminacion/luz-neon/' },
      { text: 'renta de luz negra UV', href: '/renta-de-iluminacion/luz-negra/' },
    ],
    zones: [
      { text: 'servicio en Condesa', href: '/zonas/condesa/' },
    ],
  },
  'renta-de-proyector-de-gobos-para-eventos-cdmx': {
    services: [
      { text: 'renta de proyector de gobos', href: '/renta-de-iluminacion/proyector-de-gobos/' },
      { text: 'renta de seguidor de luz', href: '/renta-de-iluminacion/seguidor-de-luz/' },
    ],
    zones: [
      { text: 'servicio en Santa Fe', href: '/zonas/santa-fe/' },
    ],
  },
  'renta-de-seguidor-de-luz-para-eventos-cdmx': {
    services: [
      { text: 'renta de seguidor de luz', href: '/renta-de-iluminacion/seguidor-de-luz/' },
      { text: 'renta de proyector de gobos', href: '/renta-de-iluminacion/proyector-de-gobos/' },
    ],
    zones: [
      { text: 'servicio en Benito Juárez', href: '/zonas/benito-juarez/' },
    ],
  },
  'renta-de-sky-tracker-para-eventos-cdmx': {
    services: [
      { text: 'renta de sky tracker', href: '/renta-de-iluminacion/sky-tracker/' },
      { text: 'renta de city color LED', href: '/renta-de-iluminacion/city-color/' },
    ],
    zones: [
      { text: 'servicio en Interlomas', href: '/zonas/interlomas/' },
    ],
  },
  'renta-de-bolas-disco-para-eventos-cdmx': {
    services: [
      { text: 'renta de bolas disco', href: '/equipos-para-eventos/bolas-disco/' },
      { text: 'renta de cabezas móviles', href: '/renta-de-iluminacion/cabezas-moviles/' },
    ],
    zones: [
      { text: 'servicio en Tlalpan', href: '/zonas/tlalpan/' },
    ],
  },
  'renta-de-maquina-de-burbujas-para-eventos-cdmx': {
    services: [
      { text: 'renta de máquina de burbujas', href: '/equipos-para-eventos/maquina-de-burbujas/' },
      { text: 'renta de humo bajo', href: '/equipos-para-eventos/humo-bajo/' },
    ],
    zones: [
      { text: 'servicio en Xochimilco', href: '/zonas/xochimilco/' },
    ],
  },
  'renta-de-maquina-de-confeti-para-eventos-cdmx': {
    services: [
      { text: 'renta de máquina de confeti', href: '/equipos-para-eventos/maquina-de-confeti/' },
      { text: 'renta de bolas disco', href: '/equipos-para-eventos/bolas-disco/' },
    ],
    zones: [
      { text: 'servicio en Satélite', href: '/zonas/satelite/' },
    ],
  },
  'renta-de-maquina-de-humo-para-eventos-cdmx': {
    services: [
      { text: 'renta de máquina de humo', href: '/equipos-para-eventos/maquina-de-humo/' },
      { text: 'renta de iluminación láser', href: '/renta-de-iluminacion/iluminacion-laser/' },
    ],
    zones: [
      { text: 'servicio en Naucalpan', href: '/zonas/naucalpan/' },
    ],
  },
  'renta-de-humo-bajo-para-eventos-cdmx': {
    services: [
      { text: 'renta de humo bajo', href: '/equipos-para-eventos/humo-bajo/' },
      { text: 'renta de bocinas para bodas', href: '/renta-de-bocinas/bocinas-para-bodas/' },
    ],
    zones: [
      { text: 'servicio en Pedregal', href: '/zonas/pedregal/' },
    ],
  },
  'renta-de-mesas-picnic-para-eventos-cdmx': {
    services: [
      { text: 'renta de mesas picnic', href: '/equipos-para-eventos/mesas-picnic/' },
      { text: 'renta de pantalla inflable', href: '/equipos-para-eventos/pantalla-inflable/' },
    ],
    zones: [
      { text: 'servicio en Huixquilucan', href: '/zonas/huixquilucan/' },
    ],
  },
  'renta-de-pantalla-inflable-para-eventos-cdmx': {
    services: [
      { text: 'renta de pantalla inflable', href: '/equipos-para-eventos/pantalla-inflable/' },
      { text: 'renta de bocinas para fiestas', href: '/renta-de-bocinas/bocinas-para-fiestas/' },
    ],
    zones: [
      { text: 'servicio en Metepec', href: '/zonas/metepec/' },
    ],
  },
  'renta-de-renta-de-podium-para-eventos-cdmx': {
    services: [
      { text: 'renta de podium', href: '/equipos-para-eventos/renta-de-podium/' },
      { text: 'renta de audio para conferencias', href: '/renta-de-bocinas/audio-para-conferencias/' },
    ],
    zones: [
      { text: 'servicio en Santa Fe', href: '/zonas/santa-fe/' },
    ],
  },
};

let count = 0;
for (const file of readdirSync(BLOG_DIR)) {
  if (!file.endsWith('.mdx')) continue;
  const slug = file.replace('.mdx', '');
  const links = BLOG_LINKS[slug];
  if (!links) continue;

  const filePath = join(BLOG_DIR, file);
  let content = readFileSync(filePath, 'utf-8');

  // Check if links section already exists
  if (content.includes('## Servicios relacionados') || content.includes('## Te puede interesar')) continue;

  // Build links section
  let section = '\n## Te puede interesar\n\n';
  for (const s of links.services) {
    section += `- [${s.text.charAt(0).toUpperCase() + s.text.slice(1)}](${s.href}) — cotiza en línea con instalación incluida\n`;
  }
  for (const z of links.zones) {
    section += `- [${z.text.charAt(0).toUpperCase() + z.text.slice(1)}](${z.href}) — cobertura profesional en tu zona\n`;
  }

  content = content.trimEnd() + '\n' + section;
  writeFileSync(filePath, content, 'utf-8');
  count++;
  console.log(`Added links to: ${slug}`);
}

console.log(`\nAdded internal links to ${count} blog posts`);
