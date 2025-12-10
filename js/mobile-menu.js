/**
 * MENÚ MÓVIL - NUEVO Y SIMPLE
 * Solo abre y cierra el menú
 */

document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const menu = document.getElementById('mobileMenu');

  // Verificar que los elementos existen
  if (!menuBtn || !menu) {
    return;
  }

  // Función para cerrar el menú
  function closeMenu() {
    menuBtn.classList.remove('active');
    menu.classList.remove('open');
  }

  // Click en el botón
  menuBtn.addEventListener('click', function() {
    // Toggle de las clases
    menuBtn.classList.toggle('active');
    menu.classList.toggle('open');
  });

  // Funcionalidad de acordeón para el submenú de Iluminación
  const dropdownToggle = document.querySelector('.mobile-menu-dropdown-toggle');
  const submenu = document.querySelector('.mobile-menu-submenu');

  if (dropdownToggle && submenu) {
    dropdownToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation(); // Evitar que cierre el menú principal

      // Toggle del acordeón
      dropdownToggle.classList.toggle('active');
      submenu.classList.toggle('open');
    });
  }

  // Cerrar menú al hacer click en un enlace regular (no en el toggle del dropdown)
  const menuLinks = menu.querySelectorAll('.mobile-menu-link:not(.mobile-menu-dropdown-toggle)');
  menuLinks.forEach(function(link) {
    link.addEventListener('click', function() {
      closeMenu();
    });
  });

  // Cerrar menú al hacer click en enlaces del submenú
  if (submenu) {
    const submenuLinks = submenu.querySelectorAll('a');
    submenuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });
  }

  // Cerrar menú al hacer scroll
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    // Solo cerrar si el menú está abierto
    if (menu.classList.contains('open')) {
      // Limpiar timeout anterior si existe
      clearTimeout(scrollTimeout);

      // Cerrar el menú después de un pequeño delay para evitar cierres accidentales
      scrollTimeout = setTimeout(function() {
        closeMenu();
      }, 100);
    }
  });
});
