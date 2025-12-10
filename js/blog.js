/**
 * Blog System - REDEIL
 * Sistema para cargar y mostrar artículos dinámicamente desde articulos.json
 */

(function() {
  'use strict';

  // Configuración
  const CONFIG = {
    jsonPath: 'articulos.json',
    articlesPerPage: 9,
    placeholderImage: 'img/blog-placeholder.jpg'
  };

  // Estado de la aplicación
  const state = {
    allArticles: [],
    filteredArticles: [],
    currentPage: 1,
    currentCategory: 'todas'
  };

  // Elementos del DOM
  const elements = {
    blogGrid: document.getElementById('blogGrid'),
    filters: document.querySelectorAll('.blog-filter'),
    pagination: document.getElementById('blogPagination'),
    paginationNumbers: document.getElementById('paginationNumbers'),
    prevBtn: document.getElementById('prevPage'),
    nextBtn: document.getElementById('nextPage')
  };

  /**
   * Inicializa el sistema del blog
   */
  async function init() {
    try {
      await loadArticles();
      setupEventListeners();
      filterArticles('todas');
      renderRecentArticles();
    } catch (error) {
      showError('Error al cargar los artículos. Por favor, intenta más tarde.');
    }
  }

  /**
   * Carga los artículos desde el JSON
   */
  async function loadArticles() {
    try {
      const response = await fetch(CONFIG.jsonPath);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      state.allArticles = data.articulos || [];

      // Los artículos se muestran en el orden que aparecen en el JSON
      // (sin ordenamiento por fecha)
    } catch (error) {
      throw error;
    }
  }

  /**
   * Configura los event listeners
   */
  function setupEventListeners() {
    // Filtros de categoría
    elements.filters.forEach(filter => {
      filter.addEventListener('click', function() {
        const category = this.dataset.category;

        // Actualizar UI de filtros
        elements.filters.forEach(f => f.classList.remove('blog-filter--active'));
        this.classList.add('blog-filter--active');

        // Filtrar artículos
        filterArticles(category);
      });
    });

    // Botones de paginación
    if (elements.prevBtn) {
      elements.prevBtn.addEventListener('click', () => {
        if (state.currentPage > 1) {
          changePage(state.currentPage - 1);
        }
      });
    }

    if (elements.nextBtn) {
      elements.nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);
        if (state.currentPage < totalPages) {
          changePage(state.currentPage + 1);
        }
      });
    }
  }

  /**
   * Filtra artículos por categoría
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
   * Cambia de página
   */
  function changePage(page) {
    state.currentPage = page;
    renderArticles();
    renderPagination();

    // Scroll suave al inicio de la grid
    elements.blogGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  /**
   * Renderiza los artículos en la grid
   */
  function renderArticles() {
    const start = (state.currentPage - 1) * CONFIG.articlesPerPage;
    const end = start + CONFIG.articlesPerPage;
    const articlesToShow = state.filteredArticles.slice(start, end);

    if (articlesToShow.length === 0) {
      elements.blogGrid.innerHTML = `
        <div class="blog-loading">
          <p>No se encontraron artículos en esta categoría.</p>
        </div>
      `;
      return;
    }

    elements.blogGrid.innerHTML = articlesToShow.map(article => createArticleCard(article)).join('');
  }

  /**
   * Crea una tarjeta de artículo
   */
  function createArticleCard(article) {
    const imageUrl = article.imagen || CONFIG.placeholderImage;
    const lecturaMinutos = article.lecturaMinutos || '5';
    const autor = article.autor || 'REDEIL Team';

    return `
      <a href="${article.url}" class="blog-card__link">
        <article class="blog-card">
          <div class="blog-card__image">
            <img
              src="${imageUrl}"
              alt="${article.titulo}"
              loading="lazy"
              onerror="this.src='${CONFIG.placeholderImage}'"
            />
            <span class="blog-card__category">${article.categoria}</span>
          </div>
          <div class="blog-card__content">
            <h3 class="blog-card__title">${article.titulo}</h3>
            <p class="blog-card__excerpt">${article.descripcion}</p>
            <div class="blog-card__meta">
              <span class="blog-card__date">${autor}</span>
              <span class="blog-card__read-time">${lecturaMinutos} min lectura</span>
            </div>
          </div>
        </article>
      </a>
    `;
  }

  /**
   * Renderiza la paginación
   */
  function renderPagination() {
    const totalPages = Math.ceil(state.filteredArticles.length / CONFIG.articlesPerPage);

    // Ocultar paginación si solo hay una página o menos
    if (totalPages <= 1) {
      elements.pagination.style.display = 'none';
      return;
    }

    elements.pagination.style.display = 'flex';

    // Actualizar botones prev/next
    if (elements.prevBtn) {
      elements.prevBtn.disabled = state.currentPage === 1;
    }
    if (elements.nextBtn) {
      elements.nextBtn.disabled = state.currentPage === totalPages;
    }

    // Renderizar números de página
    if (elements.paginationNumbers) {
      elements.paginationNumbers.innerHTML = Array.from(
        { length: totalPages },
        (_, i) => i + 1
      ).map(pageNum => `
        <button
          class="pagination-number ${pageNum === state.currentPage ? 'pagination-number--active' : ''}"
          onclick="window.blogChangePage(${pageNum})"
        >
          ${pageNum}
        </button>
      `).join('');
    }
  }

  /**
   * Formatea la fecha
   */
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('es-MX', options);
  }

  /**
   * Muestra un mensaje de error
   */
  function showError(message) {
    if (elements.blogGrid) {
      elements.blogGrid.innerHTML = `
        <div class="blog-loading">
          <p style="color: #d32f2f;">${message}</p>
        </div>
      `;
    }
  }

  /**
   * Renderiza artículos recientes en el sidebar
   */
  function renderRecentArticles() {
    const recentContainer = document.getElementById('recentArticles');
    if (!recentContainer) return;

    // Obtener los 5 artículos más recientes
    const recentArticles = state.allArticles.slice(0, 5);

    if (recentArticles.length === 0) {
      recentContainer.innerHTML = '<p style="color: #86868b; font-size: 0.875rem;">No hay artículos disponibles.</p>';
      return;
    }

    recentContainer.innerHTML = recentArticles.map(article => {
      const imageUrl = article.imagen || CONFIG.placeholderImage;
      const lecturaMinutos = article.lecturaMinutos || '5';

      return `
        <div class="recent-article">
          <a href="${article.url}">
            <div class="recent-article__image">
              <img src="${imageUrl}" alt="${article.titulo}" loading="lazy" />
            </div>
          </a>
          <div class="recent-article__content">
            <span class="recent-article__category">${article.categoria}</span>
            <a href="${article.url}">
              <h4 class="recent-article__title">${article.titulo}</h4>
            </a>
            <span class="recent-article__date">${lecturaMinutos} min lectura</span>
          </div>
        </div>
      `;
    }).join('');
  }

  // Exponer función changePage globalmente para los botones de paginación
  window.blogChangePage = changePage;

  // Inicializar cuando el DOM esté listo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
