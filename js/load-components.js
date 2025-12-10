/**
 * REDEIL - Sistema de Carga de Componentes Reutilizables
 * Carga automáticamente el header y footer desde archivos externos
 * Author: REDEIL Dev Team
 * Version: 1.0
 */

// Función para cargar componentes HTML externos
async function loadComponent(elementId, filePath) {
  try {
    // Agregar timestamp para evitar cache
    const cacheBuster = `?v=${Date.now()}`;
    const response = await fetch(filePath + cacheBuster, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Error al cargar ${filePath}: ${response.status}`);
    }

    const html = await response.text();
    const element = document.getElementById(elementId);

    if (element) {
      element.innerHTML = html;
      console.log(`✓ Componente cargado: ${filePath}`);

      // Si es el header, inicializar el menú móvil después de cargar
      if (elementId === 'header-placeholder') {
        initializeMobileMenu();
      }
    } else {
      console.warn(`⚠ Elemento con ID "${elementId}" no encontrado en la página`);
    }
  } catch (error) {
    console.error(`✗ Error al cargar componente:`, error);
    // Mostrar mensaje de error en el placeholder
    const element = document.getElementById(elementId);
    if (element) {
      element.innerHTML = `<!-- Error al cargar ${filePath} -->`;
    }
  }
}

// Función para inicializar el menú móvil (después de cargar el header)
function initializeMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;

  if (!mobileMenuBtn || !mobileMenu) {
    console.warn('⚠ Elementos del menú móvil no encontrados');
    return;
  }

  // Toggle del menú móvil principal
  mobileMenuBtn.addEventListener('click', function() {
    const isActive = mobileMenu.classList.toggle('active');
    this.classList.toggle('active');

    // Prevenir scroll del body cuando el menú está abierto
    if (isActive) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = '';
    }
  });

  // Manejar dropdowns en el menú móvil
  const dropdownToggles = document.querySelectorAll('.mobile-menu-dropdown-toggle');

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.preventDefault();

      const parent = this.parentElement;
      const submenu = parent.querySelector('.mobile-menu-submenu');
      const isActive = toggle.classList.contains('active');

      // Cerrar otros dropdowns abiertos (opcional - comentar si quieres múltiples abiertos)
      dropdownToggles.forEach(otherToggle => {
        if (otherToggle !== toggle) {
          otherToggle.classList.remove('active');
          const otherSubmenu = otherToggle.parentElement.querySelector('.mobile-menu-submenu');
          if (otherSubmenu) {
            otherSubmenu.classList.remove('open');
          }
        }
      });

      // Toggle del dropdown actual
      toggle.classList.toggle('active');
      if (submenu) {
        submenu.classList.toggle('open');
      }
    });
  });

  // Cerrar menú al hacer click fuera de él
  document.addEventListener('click', function(e) {
    if (mobileMenu.classList.contains('active')) {
      const isClickInsideMenu = mobileMenu.contains(e.target);
      const isClickOnButton = mobileMenuBtn.contains(e.target);

      if (!isClickInsideMenu && !isClickOnButton) {
        mobileMenu.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
        body.style.overflow = '';
      }
    }
  });

  // Cerrar menú al cambiar el tamaño de la ventana a desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024 && mobileMenu.classList.contains('active')) {
      mobileMenu.classList.remove('active');
      mobileMenuBtn.classList.remove('active');
      body.style.overflow = '';
    }
  });

  console.log('✓ Menú móvil inicializado correctamente');
}

// Función principal que se ejecuta cuando el DOM está listo
function initializeComponents() {
  console.log('🚀 Inicializando componentes REDEIL...');

  // Las rutas son absolutas (empiezan con /) para que funcionen desde cualquier ubicación
  const headerPath = '/components/header-nav.html';
  const breadcrumbsPath = '/components/breadcrumbs.html';
  const footerPath = '/components/footer.html';

  // Cargar header, breadcrumbs y footer en paralelo
  Promise.all([
    loadComponent('header-placeholder', headerPath),
    loadComponent('breadcrumbs-placeholder', breadcrumbsPath),
    loadComponent('footer-placeholder', footerPath)
  ]).then(() => {
    console.log('✓ Todos los componentes cargados exitosamente');
    // Cargar el script de breadcrumbs después de que el HTML esté cargado
    loadBreadcrumbsScript();
  }).catch(error => {
    console.error('✗ Error al cargar componentes:', error);
  });
}

// Función para cargar el script de breadcrumbs
function loadBreadcrumbsScript() {
  const script = document.createElement('script');
  script.src = '/js/breadcrumbs.js?v=' + Date.now();
  script.async = true;
  document.body.appendChild(script);
}

// Ejecutar cuando el DOM esté completamente cargado
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeComponents);
} else {
  // El DOM ya está cargado
  initializeComponents();
}

// Exportar funciones para uso en otros scripts si es necesario
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    loadComponent,
    initializeMobileMenu,
    initializeComponents
  };
}
