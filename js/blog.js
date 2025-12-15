/**
 * Blog System - REDEIL
 * Sistema optimizado para cargar articulos dinamicamente desde articulos.json
 * Compatible con automatizacion n8n
 * Version: 2.0
 */

(function() {
  'use strict';

  // Configuracion
  const CONFIG = {
    jsonPath: 'articulos.json',
    articlesPerPage: 9,
    placeholderImage: '../img/img-index/placeholder-blog.webp',
    dateLocale: 'es-MX',
    dateOptions: { year: 'numeric', month: 'long', day: 'numeric' }
  };

  // Estado de la aplicacion
  const state = {
    allArticles: [],
    filteredArticles: [],
    currentPage: 1,
    currentCategory: 'todas',
    isLoading: false
  };

  // Cache de elementos del DOM
  let elements = null;

  /**
   * Inicializa referencias a elementos del DOM
   */
  function initElements() {
    elements = {
      blogGrid: document.getElementById('blogGrid'),
      filters: document.querySelectorAll('.blog-filter'),
      pagination: document.getElementById('blogPagination'),
      paginationNumbers: document.getElementById('paginationNumbers'),
      prevBtn: document.getElementById('prevPage'),
      nextBtn: document.getElementById('nextPage'),
      recentArticles: document.getElementById('recentArticles')
    };
  }

  /**
   * Inicializa el sistema del blog
   */
  async function init() {
    initElements();

    if (!elements.blogGrid) {
      console.warn('Blog grid element not found');
      return;
    }

    try {
      state.isLoading = true;
      showLoadingState();
      await loadArticles();
      setupEventListeners();
      filterArticles('todas');
      renderRecentArticles();
    } catch (error) {
      console.error('Error initializing blog:', error);
      showError('Error al cargar los articulos. Por favor, intenta mas tarde.');
    } finally {
      state.isLoading = false;
    }
  }

  /**
   * Muestra estado de carga
   */
  function showLoadingState() {
    if (elements.blogGrid) {
      elements.blogGrid.innerHTML = `
        <div class="blog-loading">
          <div class="blog-loading__spinner"></div>
          <p>Cargando articulos...</p>
        </div>
      `;
    }
  }

  /**
   * Carga los articulos desde el JSON
   */
  async function loadArticles() {
    const response = await fetch(CONFIG.jsonPath);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Filtrar solo articulos publicados
    state.allArticles = (data.articulos || []).filter(
      article => article.status === 'published' || !article.status
    );

    // Ordenar por fecha de publicacion (mas recientes primero)
    state.allArticles.sort((a, b) => {
      const dateA = new Date(a.fechaPublicacion || '2000-01-01');
      const dateB = new Date(b.fechaPublicacion || '2000-01-01');
      return dateB - dateA;
    });
  }

  /**
   * Configura los event listeners
   */
  function setupEventListeners() {
    // Filtros de categoria
    elements.filters.forEach(filter => {
      filter.addEventListener('click', handleFilterClick);
    });

    // Botones de paginacion
    if (elements.prevBtn) {
      elements.prevBtn.addEventListener('click', handlePrevPage);
    }

    if (elements.nextBtn) {
      elements.nextBtn.addEventListener('click', handleNextPage);
    }
  }

  /**
   * Maneja click en filtro
   */
  function handleFilterClick(e) {
    const category = e.target.dataset.category;

    // Actualizar UI de filtros
    elements.filters.forEach(f => f.classList.remove('blog-filter--active'));
    e.target.classList.add('blog-filter--active');

    // Filtrar articulos
    filterArticles(category);
  }

  /**
   * Maneja click en pagina anterior
   */
  function handlePrevPage() {
    if (state.currentPage > 1) {
      changePage(state.currentPage - 1);
    }
  }

  /**
   * Maneja click en pagina siguiente
   */
  function handleNextPage() {
    const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);
    if (state.currentPage < totalPages) {
      changePage(state.currentPage + 1);
    }
  }

  /**
   * Filtra articulos por categoria
   */
  function filterArticles(category) {
    state.currentCategory = category;
    state.currentPage = 1;

    if (category === 'todas') {
      state.filteredArticles = [...state.allArticles];
    } else {
      state.filteredArticles = state.allArticles.filter(
        article => article.categoria === category
      );
    }

    renderArticles();
    renderPagination();
  }

  /**
   * Cambia de pagina
   */
  function changePage(page) {
    state.currentPage = page;
    renderArticles();
    renderPagination();

    // Scroll suave al inicio de la grid
    if (elements.blogGrid) {
      elements.blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  /**
   * Renderiza los articulos en la grid
   */
  function renderArticles() {
    const start = (state.currentPage - 1) * CONFIG.articlesPerPage;
    const end = start + CONFIG.articlesPerPage;
    const articlesToShow = state.filteredArticles.slice(start, end);

    if (articlesToShow.length === 0) {
      elements.blogGrid.innerHTML = `
        <div class="blog-empty">
          <p>No se encontraron articulos en esta categoria.</p>
          <button class="blog-empty__btn" onclick="window.blogFilterAll()">Ver todos los articulos</button>
        </div>
      `;
      return;
    }

    elements.blogGrid.innerHTML = articlesToShow.map(createArticleCard).join('');
  }

  /**
   * Crea una tarjeta de articulo con estructura optimizada
   */
  function createArticleCard(article) {
    const imageUrl = article.imagen || CONFIG.placeholderImage;
    const imageAlt = article.imagenAlt || article.titulo;
    const lecturaMinutos = article.lecturaMinutos || '5';
    const autor = article.autor || 'REDEIL Team';
    const fecha = formatDate(article.fechaPublicacion);
    const categoria = article.categoria || 'General';
    const destacado = article.destacado ? 'blog-card--featured' : '';
    const tags = article.tags ? article.tags.slice(0, 3).join(', ') : '';

    return `
      <a href="${article.url}" class="blog-card__link" aria-label="Leer: ${article.titulo}">
        <article class="blog-card ${destacado}" data-category="${categoria}">
          <div class="blog-card__image">
            <img
              src="${imageUrl}"
              alt="${imageAlt}"
              loading="lazy"
              width="400"
              height="250"
              onerror="this.src='${CONFIG.placeholderImage}'"
            />
            <span class="blog-card__category">${categoria}</span>
            ${article.destacado ? '<span class="blog-card__badge">Destacado</span>' : ''}
          </div>
          <div class="blog-card__content">
            <h3 class="blog-card__title">${article.titulo}</h3>
            <p class="blog-card__excerpt">${article.descripcion}</p>
            <div class="blog-card__meta">
              <div class="blog-card__meta-left">
                <span class="blog-card__author">${autor}</span>
                <span class="blog-card__date">${fecha}</span>
              </div>
              <span class="blog-card__read-time">${lecturaMinutos} min</span>
            </div>
            ${tags ? `<div class="blog-card__tags">${tags}</div>` : ''}
          </div>
        </article>
      </a>
    `;
  }

  /**
   * Renderiza la paginacion
   */
  function renderPagination() {
    const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);

    // Ocultar paginacion si solo hay una pagina o menos
    if (totalPages <= 1) {
      if (elements.pagination) {
        elements.pagination.style.display = 'none';
      }
      return;
    }

    if (elements.pagination) {
      elements.pagination.style.display = 'flex';
    }

    // Actualizar botones prev/next
    if (elements.prevBtn) {
      elements.prevBtn.disabled = state.currentPage === 1;
    }
    if (elements.nextBtn) {
      elements.nextBtn.disabled = state.currentPage === totalPages;
    }

    // Renderizar numeros de pagina
    if (elements.paginationNumbers) {
      elements.paginationNumbers.innerHTML = generatePaginationNumbers(totalPages);
    }
  }

  /**
   * Genera los numeros de paginacion con logica inteligente
   */
  function generatePaginationNumbers(totalPages) {
    const current = state.currentPage;
    const pages = [];

    // Siempre mostrar primera pagina
    pages.push(1);

    // Mostrar puntos suspensivos si hay gap
    if (current > 3) {
      pages.push('...');
    }

    // Paginas alrededor de la actual
    for (let i = Math.max(2, current - 1); i <= Math.min(totalPages - 1, current + 1); i++) {
      if (!pages.includes(i)) {
        pages.push(i);
      }
    }

    // Puntos suspensivos antes de la ultima
    if (current < totalPages - 2) {
      pages.push('...');
    }

    // Siempre mostrar ultima pagina si hay mas de 1
    if (totalPages > 1 && !pages.includes(totalPages)) {
      pages.push(totalPages);
    }

    return pages.map(page => {
      if (page === '...') {
        return '<span class="pagination-ellipsis">...</span>';
      }
      return `
        <button
          class="pagination-number ${page === current ? 'pagination-number--active' : ''}"
          onclick="window.blogChangePage(${page})"
          aria-label="Ir a pagina ${page}"
          ${page === current ? 'aria-current="page"' : ''}
        >
          ${page}
        </button>
      `;
    }).join('');
  }

  /**
   * Formatea la fecha al formato legible
   */
  function formatDate(dateString) {
    if (!dateString) return '';

    try {
      const date = new Date(dateString + 'T00:00:00');
      return date.toLocaleDateString(CONFIG.dateLocale, CONFIG.dateOptions);
    } catch (e) {
      return dateString;
    }
  }

  /**
   * Muestra un mensaje de error
   */
  function showError(message) {
    if (elements.blogGrid) {
      elements.blogGrid.innerHTML = `
        <div class="blog-error">
          <p>${message}</p>
          <button class="blog-error__btn" onclick="location.reload()">Reintentar</button>
        </div>
      `;
    }
  }

  /**
   * Renderiza articulos recientes en el sidebar
   */
  function renderRecentArticles() {
    if (!elements.recentArticles) return;

    // Obtener los 5 articulos mas recientes
    const recentArticles = state.allArticles.slice(0, 5);

    if (recentArticles.length === 0) {
      elements.recentArticles.innerHTML = '<p class="sidebar-empty">No hay articulos disponibles.</p>';
      return;
    }

    elements.recentArticles.innerHTML = recentArticles.map(article => {
      const imageUrl = article.imagen || CONFIG.placeholderImage;
      const lecturaMinutos = article.lecturaMinutos || '5';

      return `
        <div class="recent-article">
          <a href="${article.url}" class="recent-article__link">
            <div class="recent-article__image">
              <img src="${imageUrl}" alt="${article.imagenAlt || article.titulo}" loading="lazy" />
            </div>
          </a>
          <div class="recent-article__content">
            <span class="recent-article__category">${article.categoria}</span>
            <a href="${article.url}" class="recent-article__title-link">
              <h4 class="recent-article__title">${article.titulo}</h4>
            </a>
            <span class="recent-article__meta">${lecturaMinutos} min lectura</span>
          </div>
        </div>
      `;
    }).join('');
  }

  /**
   * Filtra todos los articulos (para boton "Ver todos")
   */
  function filterAll() {
    const allFilter = document.querySelector('.blog-filter[data-category="todas"]');
    if (allFilter) {
      allFilter.click();
    }
  }

  // Exponer funciones globalmente para interaccion HTML
  window.blogChangePage = changePage;
  window.blogFilterAll = filterAll;

  // API publica para n8n o integraciones externas
  window.REDEIL_Blog = {
    getArticles: () => [...state.allArticles],
    getFilteredArticles: () => [...state.filteredArticles],
    getCurrentPage: () => state.currentPage,
    getTotalPages: () => Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage),
    filterByCategory: filterArticles,
    goToPage: changePage,
    refresh: init
  };

  // Inicializar cuando el DOM este listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
