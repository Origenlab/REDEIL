/**
 * REDEIL - Sistema de Tracking de Conversiones
 * Integrado con Rybbit Analytics
 * v1.0.0
 */

(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    debug: false,
    trackClicks: true,
    trackForms: true,
    trackScroll: true,
    scrollThresholds: [25, 50, 75, 100]
  };

  // Utilidad para log en modo debug
  function log(message, data) {
    if (CONFIG.debug) {
      console.log('[REDEIL Tracking]', message, data || '');
    }
  }

  // Verificar si Rybbit está disponible
  function isRybbitAvailable() {
    return typeof window.rybbit !== 'undefined' && typeof window.rybbit.event === 'function';
  }

  // Enviar evento a Rybbit
  function trackEvent(eventName, eventData) {
    if (isRybbitAvailable()) {
      window.rybbit.event(eventName, eventData);
      log('Evento enviado:', { eventName, eventData });
    } else {
      log('Rybbit no disponible, evento no enviado:', eventName);
    }
  }

  // Obtener información de la página actual
  function getPageInfo() {
    const path = window.location.pathname;
    let pageType = 'other';
    let category = '';

    if (path === '/' || path === '/index.html') {
      pageType = 'home';
    } else if (path.includes('/blog/')) {
      pageType = 'blog';
      category = 'blog';
    } else if (path.includes('/renta-de-iluminacion/')) {
      pageType = 'service';
      category = 'iluminacion';
    } else if (path.includes('/renta-de-bocinas/')) {
      pageType = 'service';
      category = 'audio';
    } else if (path.includes('/equipos-para-eventos/')) {
      pageType = 'service';
      category = 'equipos';
    } else if (path.includes('/contacto')) {
      pageType = 'contact';
    }

    return { pageType, category, path };
  }

  // Tracking de clicks en WhatsApp
  function trackWhatsAppClicks() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href*="wa.me"], a[href*="whatsapp"]');
      if (link) {
        const pageInfo = getPageInfo();
        trackEvent('whatsapp_click', {
          source: pageInfo.path,
          category: pageInfo.category,
          position: link.classList.contains('wa-float') ? 'floating' :
                   link.closest('.header') ? 'header' :
                   link.closest('.footer') ? 'footer' :
                   link.closest('.cta') ? 'cta' : 'content'
        });
      }
    });
    log('WhatsApp tracking inicializado');
  }

  // Tracking de clicks en teléfono
  function trackPhoneClicks() {
    document.addEventListener('click', function(e) {
      const link = e.target.closest('a[href^="tel:"]');
      if (link) {
        const pageInfo = getPageInfo();
        trackEvent('phone_click', {
          source: pageInfo.path,
          category: pageInfo.category
        });
      }
    });
    log('Phone tracking inicializado');
  }

  // Tracking de clicks en CTAs principales
  function trackCTAClicks() {
    document.addEventListener('click', function(e) {
      const cta = e.target.closest('.cta__button, .article-cta__button, .cta-dark__button, .contact__whatsapp-btn, .btn-primary');
      if (cta) {
        const pageInfo = getPageInfo();
        const ctaText = cta.textContent.trim().substring(0, 50);
        trackEvent('cta_click', {
          source: pageInfo.path,
          category: pageInfo.category,
          cta_text: ctaText,
          cta_type: cta.classList.contains('contact__whatsapp-btn') ? 'whatsapp' : 'general'
        });
      }
    });
    log('CTA tracking inicializado');
  }

  // Tracking de clicks en servicios/productos
  function trackServiceClicks() {
    document.addEventListener('click', function(e) {
      const serviceLink = e.target.closest('.lighting__link, .audio__link, .equipment__link');
      if (serviceLink) {
        const serviceName = serviceLink.querySelector('.lighting__btn, .audio__btn, .equipment__btn');
        const pageInfo = getPageInfo();
        trackEvent('service_click', {
          service: serviceName ? serviceName.textContent.trim() : 'unknown',
          source: pageInfo.path,
          category: pageInfo.category
        });
      }
    });
    log('Service tracking inicializado');
  }

  // Tracking de envío de formularios
  function trackFormSubmissions() {
    document.addEventListener('submit', function(e) {
      const form = e.target;
      if (form.tagName === 'FORM') {
        const pageInfo = getPageInfo();
        const formId = form.id || form.name || 'unknown_form';

        // Obtener servicios seleccionados si existen checkboxes
        const selectedServices = [];
        form.querySelectorAll('input[type="checkbox"]:checked').forEach(function(cb) {
          if (cb.name && cb.name !== 'privacidad') {
            selectedServices.push(cb.value || cb.name);
          }
        });

        trackEvent('form_submit', {
          form_id: formId,
          source: pageInfo.path,
          category: pageInfo.category,
          services_selected: selectedServices.join(', ') || 'none'
        });
      }
    });
    log('Form tracking inicializado');
  }

  // Tracking de scroll depth
  function trackScrollDepth() {
    let trackedThresholds = [];
    let ticking = false;

    function calculateScrollPercentage() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      return Math.round((scrollTop / docHeight) * 100);
    }

    function checkScrollThresholds() {
      const scrollPercent = calculateScrollPercentage();
      const pageInfo = getPageInfo();

      CONFIG.scrollThresholds.forEach(function(threshold) {
        if (scrollPercent >= threshold && !trackedThresholds.includes(threshold)) {
          trackedThresholds.push(threshold);
          trackEvent('scroll_depth', {
            depth: threshold,
            source: pageInfo.path,
            page_type: pageInfo.pageType
          });
        }
      });
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        window.requestAnimationFrame(function() {
          checkScrollThresholds();
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });

    log('Scroll tracking inicializado');
  }

  // Tracking de artículos del blog (lectura)
  function trackArticleRead() {
    const pageInfo = getPageInfo();
    if (pageInfo.pageType !== 'blog') return;

    let readTimer = null;
    let hasTrackedRead = false;

    // Considerar artículo "leído" después de 60 segundos en la página
    readTimer = setTimeout(function() {
      if (!hasTrackedRead) {
        hasTrackedRead = true;
        const articleTitle = document.querySelector('.article-header__title, h1');
        trackEvent('article_read', {
          title: articleTitle ? articleTitle.textContent.trim().substring(0, 100) : 'unknown',
          source: pageInfo.path
        });
      }
    }, 60000);

    // Cancelar timer si el usuario sale antes
    window.addEventListener('beforeunload', function() {
      if (readTimer) clearTimeout(readTimer);
    });

    log('Article read tracking inicializado');
  }

  // Tracking de tiempo en página
  function trackTimeOnPage() {
    const startTime = Date.now();
    const pageInfo = getPageInfo();

    window.addEventListener('beforeunload', function() {
      const timeSpent = Math.round((Date.now() - startTime) / 1000);

      // Solo trackear si pasó más de 10 segundos
      if (timeSpent > 10) {
        trackEvent('time_on_page', {
          seconds: timeSpent,
          source: pageInfo.path,
          page_type: pageInfo.pageType
        });
      }
    });

    log('Time on page tracking inicializado');
  }

  // Tracking de clicks en enlaces del blog
  function trackBlogNavigation() {
    document.addEventListener('click', function(e) {
      const blogLink = e.target.closest('.blog-card__link, .article-content a');
      if (blogLink) {
        const pageInfo = getPageInfo();
        const linkText = blogLink.textContent.trim().substring(0, 50);
        const linkHref = blogLink.getAttribute('href') || '';

        trackEvent('blog_link_click', {
          text: linkText,
          href: linkHref,
          source: pageInfo.path,
          is_internal: linkHref.startsWith('/') || linkHref.includes('redeil.com')
        });
      }
    });
    log('Blog navigation tracking inicializado');
  }

  // Tracking de clicks en galería
  function trackGalleryClicks() {
    document.addEventListener('click', function(e) {
      const galleryItem = e.target.closest('.gallery__item, .article-gallery__item');
      if (galleryItem) {
        const pageInfo = getPageInfo();
        const image = galleryItem.querySelector('img');
        trackEvent('gallery_click', {
          image_alt: image ? image.alt.substring(0, 50) : 'unknown',
          source: pageInfo.path
        });
      }
    });
    log('Gallery tracking inicializado');
  }

  // Inicializar todos los trackers
  function init() {
    // Esperar a que Rybbit esté disponible
    let attempts = 0;
    const maxAttempts = 10;

    function tryInit() {
      attempts++;

      if (isRybbitAvailable() || attempts >= maxAttempts) {
        if (!isRybbitAvailable()) {
          log('Rybbit no encontrado después de ' + attempts + ' intentos');
        }

        // Inicializar trackers
        if (CONFIG.trackClicks) {
          trackWhatsAppClicks();
          trackPhoneClicks();
          trackCTAClicks();
          trackServiceClicks();
          trackBlogNavigation();
          trackGalleryClicks();
        }

        if (CONFIG.trackForms) {
          trackFormSubmissions();
        }

        if (CONFIG.trackScroll) {
          trackScrollDepth();
        }

        trackArticleRead();
        trackTimeOnPage();

        log('REDEIL Tracking inicializado completamente');
      } else {
        setTimeout(tryInit, 500);
      }
    }

    // Iniciar cuando el DOM esté listo
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', tryInit);
    } else {
      tryInit();
    }
  }

  // Exponer API pública
  window.REDEILTracking = {
    init: init,
    trackEvent: trackEvent,
    setDebug: function(value) {
      CONFIG.debug = !!value;
      log('Debug mode:', CONFIG.debug);
    }
  };

  // Auto-inicializar
  init();

})();
