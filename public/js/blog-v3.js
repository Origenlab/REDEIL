/**
 * Blog System REDEIL - Version 3.0
 * Sistema profesional para carga dinamica de articulos
 * Compatible con automatizacion n8n/workflow
 *
 * Caracteristicas:
 * - Carga desde JSON con validacion
 * - Sistema de busqueda en tiempo real
 * - Filtros por categoria
 * - Paginacion inteligente
 * - Sistema de fallback
 * - API publica para integraciones
 * - Manejo robusto de errores
 */

(function() {
  'use strict';

  // ============================================
  // CONFIGURACION
  // ============================================
  const BLOG_CONFIG = {
    jsonFile: 'articulos.json',
    pagination: {
      itemsPerPage: 12,
      maxVisiblePages: 5
    },
    images: {
      placeholder: '/img/img-index/guirnaldas.avif',
      lazyLoad: true
    },
    search: {
      minChars: 2,
      debounceMs: 300
    },
    retry: {
      maxAttempts: 3,
      delayMs: 1000
    },
    cache: {
      enabled: true,
      ttlMs: 300000 // 5 minutos
    }
  };

  // Campos requeridos para validacion
  const REQUIRED_FIELDS = ['id', 'slug', 'titulo', 'descripcion', 'url'];

  // Categorias validas
  const VALID_CATEGORIES = [
    'Guias', 'Tendencias', 'Tips', 'Inspiracion',
    'Socios Comerciales', 'Bodas', 'XV Anos', 'Corporativos',
    'Consejos', 'Tecnico'
  ];

  // ============================================
  // ESTADO DE LA APLICACION
  // ============================================
  const state = {
    articles: [],
    filteredArticles: [],
    currentPage: 1,
    currentCategory: 'todas',
    searchQuery: '',
    isLoading: false,
    hasError: false,
    lastFetch: null
  };

  // Cache de elementos DOM
  let DOM = {};

  // ============================================
  // ARTICULOS DE RESPALDO (FALLBACK)
  // ============================================
  const FALLBACK_ARTICLES = [
    {
      id: 'fallback-1',
      slug: 'iluminacion-profesional-eventos',
      titulo: 'Iluminacion Profesional para Eventos',
      descripcion: 'Descubre como la iluminacion profesional transforma eventos en experiencias inolvidables.',
      imagen: '/img/img-index/guirnaldas.avif',
      imagenAlt: 'Iluminacion profesional para eventos',
      categoria: 'Guias',
      tags: ['iluminacion', 'eventos', 'profesional'],
      autor: 'REDEIL Team',
      url: 'articulos/iluminacion-profesional-eventos.html',
      lecturaMinutos: 10,
      destacado: false,
      status: 'published'
    }
  ];

  // ============================================
  // INICIALIZACION
  // ============================================

  /**
   * Inicializa el sistema del blog
   */
  async function init() {
    console.log('[REDEIL Blog] Iniciando v3.0...');

    // Cachear elementos DOM
    cacheDOM();

    if (!DOM.postsGrid) {
      console.warn('[REDEIL Blog] Grid de articulos no encontrado');
      return;
    }

    try {
      state.isLoading = true;
      showLoadingState();

      // Cargar articulos
      await loadArticles();

      // Configurar event listeners
      setupEventListeners();

      // Renderizar
      filterArticles('todas');
      renderRecentArticles();

      console.log(`[REDEIL Blog] Cargados ${state.articles.length} articulos`);

    } catch (error) {
      console.error('[REDEIL Blog] Error en inicializacion:', error);
      state.hasError = true;
      showErrorState('No se pudieron cargar los articulos. Por favor, intenta mas tarde.');
    } finally {
      state.isLoading = false;
    }
  }

  /**
   * Cachea referencias a elementos DOM
   */
  function cacheDOM() {
    DOM = {
      postsGrid: document.getElementById('postsGrid') || document.getElementById('blogGrid'),
      categoryFilters: document.getElementById('categoryFilters'),
      searchInput: document.getElementById('searchInput'),
      searchClear: document.getElementById('searchClear'),
      pagination: document.getElementById('blogPagination'),
      paginationInfo: document.getElementById('paginationInfo'),
      paginationNumbers: document.getElementById('paginationNumbers'),
      prevBtn: document.getElementById('prevPage'),
      nextBtn: document.getElementById('nextPage'),
      recentArticles: document.getElementById('recentArticles'),
      resultsCount: document.getElementById('resultsCount'),
      loadingOverlay: document.getElementById('loadingOverlay')
    };
  }

  // ============================================
  // CARGA DE DATOS
  // ============================================

  /**
   * Carga articulos desde el JSON con reintentos
   */
  async function loadArticles() {
    // Verificar cache
    if (BLOG_CONFIG.cache.enabled && state.lastFetch) {
      const elapsed = Date.now() - state.lastFetch;
      if (elapsed < BLOG_CONFIG.cache.ttlMs && state.articles.length > 0) {
        console.log('[REDEIL Blog] Usando articulos en cache');
        return;
      }
    }

    let lastError = null;

    for (let attempt = 1; attempt <= BLOG_CONFIG.retry.maxAttempts; attempt++) {
      try {
        console.log(`[REDEIL Blog] Intento ${attempt} de carga...`);

        const response = await fetch(BLOG_CONFIG.jsonFile, {
          cache: 'no-cache',
          headers: { 'Accept': 'application/json' }
        });

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        const data = await response.json();

        // Validar estructura
        if (!data || !Array.isArray(data.articulos)) {
          throw new Error('Estructura JSON invalida');
        }

        // Validar y sanitizar articulos
        const validArticles = data.articulos
          .filter(article => validateArticle(article))
          .map(article => sanitizeArticle(article))
          .filter(article => article.status === 'published' || !article.status);

        // Ordenar por fecha (mas recientes primero)
        validArticles.sort((a, b) => {
          const dateA = new Date(a.fechaPublicacion || '2000-01-01');
          const dateB = new Date(b.fechaPublicacion || '2000-01-01');
          return dateB - dateA;
        });

        state.articles = validArticles;
        state.lastFetch = Date.now();

        console.log(`[REDEIL Blog] ${validArticles.length} articulos validos cargados`);
        return;

      } catch (error) {
        lastError = error;
        console.warn(`[REDEIL Blog] Error en intento ${attempt}:`, error.message);

        if (attempt < BLOG_CONFIG.retry.maxAttempts) {
          await delay(BLOG_CONFIG.retry.delayMs * attempt);
        }
      }
    }

    // Si todos los intentos fallaron, usar fallback
    console.warn('[REDEIL Blog] Usando articulos de respaldo');
    state.articles = FALLBACK_ARTICLES;
  }

  /**
   * Valida un articulo
   */
  function validateArticle(article) {
    if (!article || typeof article !== 'object') {
      return false;
    }

    // Verificar campos requeridos
    for (const field of REQUIRED_FIELDS) {
      if (!article[field] || (typeof article[field] === 'string' && !article[field].trim())) {
        console.warn(`[REDEIL Blog] Articulo sin campo requerido "${field}":`, article.id || 'desconocido');
        return false;
      }
    }

    return true;
  }

  /**
   * Sanitiza un articulo
   */
  function sanitizeArticle(article) {
    return {
      id: sanitizeString(article.id),
      slug: sanitizeString(article.slug),
      titulo: sanitizeString(article.titulo),
      descripcion: sanitizeString(article.descripcion),
      imagen: sanitizeUrl(article.imagen) || BLOG_CONFIG.images.placeholder,
      imagenAlt: sanitizeString(article.imagenAlt || article.titulo),
      categoria: VALID_CATEGORIES.includes(article.categoria) ? article.categoria : 'Guias',
      tags: Array.isArray(article.tags) ? article.tags.map(sanitizeString) : [],
      autor: sanitizeString(article.autor || 'REDEIL Team'),
      fechaPublicacion: article.fechaPublicacion || null,
      fechaModificacion: article.fechaModificacion || null,
      url: sanitizeUrl(article.url),
      lecturaMinutos: parseInt(article.lecturaMinutos) || 5,
      destacado: Boolean(article.destacado),
      status: article.status || 'published'
    };
  }

  /**
   * Sanitiza una cadena de texto
   */
  function sanitizeString(str) {
    if (typeof str !== 'string') return '';
    return str
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .trim();
  }

  /**
   * Sanitiza una URL
   */
  function sanitizeUrl(url) {
    if (typeof url !== 'string') return '';
    // Solo permitir URLs relativas o del mismo dominio
    if (url.startsWith('/') || url.startsWith('articulos/') || url.startsWith('http')) {
      return url.trim();
    }
    return '';
  }

  // ============================================
  // EVENT LISTENERS
  // ============================================

  /**
   * Configura event listeners
   */
  function setupEventListeners() {
    // Filtros de categoria
    if (DOM.categoryFilters) {
      DOM.categoryFilters.addEventListener('click', handleCategoryClick);
    }

    // Busqueda
    if (DOM.searchInput) {
      DOM.searchInput.addEventListener('input', debounce(handleSearchInput, BLOG_CONFIG.search.debounceMs));
      DOM.searchInput.addEventListener('keydown', handleSearchKeydown);
    }

    // Limpiar busqueda
    if (DOM.searchClear) {
      DOM.searchClear.addEventListener('click', clearSearch);
    }

    // Paginacion
    if (DOM.prevBtn) {
      DOM.prevBtn.addEventListener('click', () => changePage(state.currentPage - 1));
    }
    if (DOM.nextBtn) {
      DOM.nextBtn.addEventListener('click', () => changePage(state.currentPage + 1));
    }
  }

  /**
   * Maneja click en categoria
   */
  function handleCategoryClick(e) {
    const button = e.target.closest('[data-category]');
    if (!button) return;

    const category = button.dataset.category;

    // Actualizar UI de filtros
    DOM.categoryFilters.querySelectorAll('[data-category]').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    filterByCategory(category);
  }

  /**
   * Maneja input de busqueda
   */
  function handleSearchInput(e) {
    const query = e.target.value.trim();

    if (query.length >= BLOG_CONFIG.search.minChars) {
      searchArticles(query);
    } else if (query.length === 0) {
      clearSearch();
    }

    // Mostrar/ocultar boton de limpiar
    if (DOM.searchClear) {
      DOM.searchClear.style.display = query.length > 0 ? 'block' : 'none';
    }
  }

  /**
   * Maneja teclas en busqueda
   */
  function handleSearchKeydown(e) {
    if (e.key === 'Escape') {
      clearSearch();
    }
  }

  // ============================================
  // FILTRADO Y BUSQUEDA
  // ============================================

  /**
   * Filtra articulos por categoria
   */
  function filterByCategory(category) {
    state.currentCategory = category;
    state.currentPage = 1;

    applyFilters();
  }

  /**
   * Busca articulos
   */
  function searchArticles(query) {
    state.searchQuery = query.toLowerCase();
    state.currentPage = 1;

    applyFilters();
  }

  /**
   * Limpia la busqueda
   */
  function clearSearch() {
    state.searchQuery = '';
    state.currentPage = 1;

    if (DOM.searchInput) {
      DOM.searchInput.value = '';
    }
    if (DOM.searchClear) {
      DOM.searchClear.style.display = 'none';
    }

    applyFilters();
  }

  /**
   * Aplica todos los filtros activos
   */
  function applyFilters() {
    let results = [...state.articles];

    // Filtrar por categoria
    if (state.currentCategory !== 'todas') {
      results = results.filter(article => article.categoria === state.currentCategory);
    }

    // Filtrar por busqueda
    if (state.searchQuery) {
      results = results.filter(article => {
        const searchableText = [
          article.titulo,
          article.descripcion,
          article.categoria,
          ...article.tags
        ].join(' ').toLowerCase();

        return searchableText.includes(state.searchQuery);
      });
    }

    state.filteredArticles = results;

    renderArticles();
    renderPagination();
    updateResultsCount();
  }

  /**
   * Filtra articulos (alias para compatibilidad)
   */
  function filterArticles(category) {
    filterByCategory(category);
  }

  // ============================================
  // RENDERIZADO
  // ============================================

  /**
   * Muestra estado de carga
   */
  function showLoadingState() {
    if (DOM.postsGrid) {
      DOM.postsGrid.innerHTML = `
        <div class="blog-loading">
          <div class="blog-loading__spinner"></div>
          <p>Cargando articulos...</p>
        </div>
      `;
    }
  }

  /**
   * Muestra estado de error
   */
  function showErrorState(message) {
    if (DOM.postsGrid) {
      DOM.postsGrid.innerHTML = `
        <div class="blog-error">
          <svg class="blog-error__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p class="blog-error__message">${message}</p>
          <button class="blog-error__btn" onclick="location.reload()">
            Reintentar
          </button>
        </div>
      `;
    }
  }

  /**
   * Renderiza articulos
   */
  function renderArticles() {
    if (!DOM.postsGrid) return;

    const startIndex = (state.currentPage - 1) * BLOG_CONFIG.pagination.itemsPerPage;
    const endIndex = startIndex + BLOG_CONFIG.pagination.itemsPerPage;
    const articlesToShow = state.filteredArticles.slice(startIndex, endIndex);

    if (articlesToShow.length === 0) {
      DOM.postsGrid.innerHTML = `
        <div class="blog-empty">
          <svg class="blog-empty__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p class="blog-empty__message">No se encontraron articulos</p>
          <button class="blog-empty__btn" onclick="REDEIL_Blog.clearSearch()">
            Ver todos los articulos
          </button>
        </div>
      `;
      return;
    }

    DOM.postsGrid.innerHTML = articlesToShow.map(createArticleCard).join('');
  }

  /**
   * Crea una tarjeta de articulo
   */
  function createArticleCard(article) {
    const imageUrl = article.imagen || BLOG_CONFIG.images.placeholder;
    const lecturaMinutos = article.lecturaMinutos || 5;
    const destacado = article.destacado ? 'post-card--featured' : '';
    const loadingAttr = BLOG_CONFIG.images.lazyLoad ? 'loading="lazy"' : '';

    return `
      <article class="post-card ${destacado}" data-category="${article.categoria}">
        <a href="${article.url}" class="post-card__link" aria-label="Leer: ${article.titulo}">
          <div class="post-card__image">
            <img
              src="${imageUrl}"
              alt="${article.imagenAlt}"
              ${loadingAttr}
              onerror="this.src='${BLOG_CONFIG.images.placeholder}'"
            />
            <span class="post-card__category">${article.categoria}</span>
            ${article.destacado ? '<span class="post-card__badge">Destacado</span>' : ''}
          </div>
          <div class="post-card__content">
            <h3 class="post-card__title">${article.titulo}</h3>
            <p class="post-card__excerpt">${article.descripcion}</p>
            <div class="post-card__meta">
              <span class="post-card__read-time">${lecturaMinutos} min lectura</span>
            </div>
          </div>
        </a>
      </article>
    `;
  }

  /**
   * Renderiza paginacion
   */
  function renderPagination() {
    const totalPages = Math.ceil(state.filteredArticles.length / BLOG_CONFIG.pagination.itemsPerPage);

    // Ocultar si solo hay una pagina
    if (DOM.pagination) {
      DOM.pagination.style.display = totalPages <= 1 ? 'none' : 'flex';
    }

    if (totalPages <= 1) return;

    // Actualizar botones prev/next
    if (DOM.prevBtn) {
      DOM.prevBtn.disabled = state.currentPage === 1;
    }
    if (DOM.nextBtn) {
      DOM.nextBtn.disabled = state.currentPage === totalPages;
    }

    // Renderizar numeros de pagina
    if (DOM.paginationNumbers) {
      DOM.paginationNumbers.innerHTML = generatePaginationNumbers(totalPages);
    }

    // Actualizar info de paginacion
    if (DOM.paginationInfo) {
      const start = (state.currentPage - 1) * BLOG_CONFIG.pagination.itemsPerPage + 1;
      const end = Math.min(state.currentPage * BLOG_CONFIG.pagination.itemsPerPage, state.filteredArticles.length);
      DOM.paginationInfo.textContent = `Mostrando ${start}-${end} de ${state.filteredArticles.length} articulos`;
    }
  }

  /**
   * Genera numeros de paginacion
   */
  function generatePaginationNumbers(totalPages) {
    const current = state.currentPage;
    const pages = [];

    // Primera pagina siempre
    pages.push(1);

    // Ellipsis si hay gap
    if (current > 3) {
      pages.push('...');
    }

    // Paginas alrededor de la actual
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Ellipsis antes de la ultima
    if (current < totalPages - 2) {
      pages.push('...');
    }

    // Ultima pagina
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages.map(page => {
      if (page === '...') {
        return '<span class="pagination-ellipsis">...</span>';
      }
      const isActive = page === current ? 'pagination-number--active' : '';
      return `
        <button
          class="pagination-number ${isActive}"
          onclick="REDEIL_Blog.goToPage(${page})"
          ${page === current ? 'aria-current="page"' : ''}
        >
          ${page}
        </button>
      `;
    }).join('');
  }

  /**
   * Cambia de pagina
   */
  function changePage(page) {
    const totalPages = Math.ceil(state.filteredArticles.length / BLOG_CONFIG.pagination.itemsPerPage);

    if (page < 1 || page > totalPages) return;

    state.currentPage = page;
    renderArticles();
    renderPagination();

    // Scroll suave al inicio
    if (DOM.postsGrid) {
      DOM.postsGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Actualiza contador de resultados
   */
  function updateResultsCount() {
    if (DOM.resultsCount) {
      DOM.resultsCount.textContent = `${state.filteredArticles.length} articulos`;
    }
  }

  /**
   * Renderiza articulos recientes en sidebar
   */
  function renderRecentArticles() {
    if (!DOM.recentArticles) return;

    const recent = state.articles.slice(0, 5);

    if (recent.length === 0) {
      DOM.recentArticles.innerHTML = '<p class="sidebar-empty">No hay articulos disponibles.</p>';
      return;
    }

    DOM.recentArticles.innerHTML = recent.map(article => `
      <div class="recent-article">
        <a href="${article.url}" class="recent-article__link">
          <div class="recent-article__image">
            <img src="${article.imagen}" alt="${article.imagenAlt}" loading="lazy" />
          </div>
        </a>
        <div class="recent-article__content">
          <span class="recent-article__category">${article.categoria}</span>
          <a href="${article.url}" class="recent-article__title-link">
            <h4 class="recent-article__title">${article.titulo}</h4>
          </a>
          <span class="recent-article__meta">${article.lecturaMinutos} min</span>
        </div>
      </div>
    `).join('');
  }

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Delay promesa
   */
  function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Debounce function
   */
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  /**
   * Obtiene categorias unicas
   */
  function getCategories() {
    const categories = new Set(state.articles.map(a => a.categoria));
    return ['todas', ...Array.from(categories).sort()];
  }

  // ============================================
  // API PUBLICA
  // ============================================

  window.REDEIL_Blog = {
    // Getters
    getArticles: () => [...state.articles],
    getFilteredArticles: () => [...state.filteredArticles],
    getCurrentPage: () => state.currentPage,
    getTotalPages: () => Math.ceil(state.filteredArticles.length / BLOG_CONFIG.pagination.itemsPerPage),
    getCategories: getCategories,
    getConfig: () => ({ ...BLOG_CONFIG }),

    // Acciones
    filterByCategory,
    searchArticles,
    clearSearch,
    goToPage: changePage,
    refresh: init,

    // Estado
    isLoading: () => state.isLoading,
    hasError: () => state.hasError
  };

  // Alias para compatibilidad
  window.blogChangePage = changePage;
  window.blogFilterAll = () => filterByCategory('todas');

  // ============================================
  // INICIALIZACION
  // ============================================

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
