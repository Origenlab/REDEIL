/**
 * REDEIL - Sistema de Breadcrumbs Dinámicos
 * Genera automáticamente las migas de pan basándose en la URL actual
 * Author: REDEIL Dev Team
 * Version: 1.0
 */

(function() {
  'use strict';

  // Mapeo de nombres amigables para las rutas
  const pathNames = {
    '': 'Inicio',
    'renta-de-iluminacion': 'Renta de Iluminación',
    'renta-de-bocinas': 'Renta de Bocinas',
    'equipos-para-eventos': 'Equipos para Eventos',
    'blog': 'Blog',
    'articulos': 'Artículos',
    'nosotros': 'Nosotros',
    'contacto': 'Contacto',
    'aviso-de-privacidad': 'Aviso de Privacidad',
    'sitemap': 'Mapa del Sitio',
    // Páginas de iluminación
    'iluminacion': 'Iluminación',
    'guirnaldas': 'Guirnaldas de Luces',
    'cascadas-led': 'Cascadas LED',
    'luz-neon': 'Luz Neón',
    'luz-negra': 'Luz Negra',
    'city-color': 'City Color',
    'city-light': 'City Light',
    'cabezas-moviles': 'Cabezas Móviles',
    'iluminacion-laser': 'Iluminación Láser',
    'luces-arquitectonicas': 'Luces Arquitectónicas',
    'proyector-de-gobos': 'Proyector de Gobos',
    'seguidor-de-luz': 'Seguidor de Luz',
    'sky-tracker': 'Sky Tracker',
    // Páginas de audio
    'bocinas': 'Bocinas',
    'bocinas-para-bodas': 'Bocinas para Bodas',
    'bocinas-para-xv-anos': 'Bocinas para XV Años',
    'bocinas-para-fiestas': 'Bocinas para Fiestas',
    'audio-para-conferencias': 'Audio para Conferencias',
    'sonido': 'Sonido',
    // Páginas de equipos
    'equipos-para-eventos': 'Equipos para Eventos',
    'renta-de-podium': 'Renta de Podium',
    'bolas-disco': 'Bolas Disco',
    'maquina-de-confeti': 'Máquina de Confeti',
    'maquina-de-humo': 'Máquina de Humo',
    'maquina-de-burbujas': 'Máquina de Burbujas',
    'humo-bajo': 'Humo Bajo',
    'pantalla-inflable': 'Pantalla Inflable',
    'mesas-picnic': 'Mesas Picnic'
  };

  // Icono SVG de casa para inicio
  const homeIcon = `<svg class="breadcrumbs-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
    <polyline points="9 22 9 12 15 12 15 22"></polyline>
  </svg>`;

  // Separador chevron
  const separator = `<span class="breadcrumbs-separator" aria-hidden="true">›</span>`;

  function generateBreadcrumbs() {
    const breadcrumbsList = document.getElementById('breadcrumbs-list');

    if (!breadcrumbsList) {
      console.warn('Breadcrumbs: No se encontró el elemento #breadcrumbs-list');
      return;
    }

    // Obtener la ruta actual
    const path = window.location.pathname;

    // Si estamos en la página principal, ocultar breadcrumbs
    if (path === '/' || path === '/index.html') {
      const breadcrumbsNav = document.querySelector('.breadcrumbs');
      if (breadcrumbsNav) {
        breadcrumbsNav.style.display = 'none';
      }
      return;
    }

    // Dividir la ruta en segmentos
    const segments = path.split('/').filter(segment => segment !== '');

    // Construir los breadcrumbs
    let breadcrumbsHTML = '';
    let currentPath = '';

    // Agregar enlace de inicio
    breadcrumbsHTML += `
      <li class="breadcrumbs-item">
        <a href="/" class="breadcrumbs-link">
          ${homeIcon}
          <span>Inicio</span>
        </a>
      </li>`;

    // Agregar cada segmento de la ruta
    segments.forEach((segment, index) => {
      const isLast = index === segments.length - 1;

      // Remover extensión .html si existe
      const cleanSegment = segment.replace('.html', '');

      // Obtener nombre amigable
      const displayName = pathNames[cleanSegment] || formatSegmentName(cleanSegment);

      // Construir la ruta acumulativa
      currentPath += '/' + segment;

      if (isLast) {
        // Último elemento (página actual) - sin enlace
        breadcrumbsHTML += `
          ${separator}
          <li class="breadcrumbs-item">
            <span class="breadcrumbs-current" aria-current="page">${displayName}</span>
          </li>`;
      } else {
        // Elementos intermedios - con enlace
        // Si es un directorio, agregar index.html o la página principal
        let href = currentPath;
        if (!segment.includes('.html')) {
          // Es un directorio, buscar página principal
          const mainPages = {
            'renta-de-iluminacion': '/renta-de-iluminacion/iluminacion.html',
            'renta-de-bocinas': '/renta-de-bocinas/bocinas.html',
            'equipos-para-eventos': '/equipos-para-eventos/equipos-para-eventos.html',
            'blog': '/blog/'
          };
          href = mainPages[cleanSegment] || currentPath + '/';
        }

        breadcrumbsHTML += `
          ${separator}
          <li class="breadcrumbs-item">
            <a href="${href}" class="breadcrumbs-link">${displayName}</a>
          </li>`;
      }
    });

    breadcrumbsList.innerHTML = breadcrumbsHTML;
    console.log('✓ Breadcrumbs generados correctamente');
  }

  // Función auxiliar para formatear nombres de segmentos
  function formatSegmentName(segment) {
    return segment
      .replace(/-/g, ' ')
      .replace(/\b\w/g, char => char.toUpperCase());
  }

  // Ejecutar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', generateBreadcrumbs);
  } else {
    generateBreadcrumbs();
  }
})();
