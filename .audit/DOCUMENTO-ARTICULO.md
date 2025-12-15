# GUIA COMPLETA PARA CREAR ARTICULOS DEL BLOG REDEIL

## Resumen Ejecutivo

Este documento contiene las instrucciones completas para crear articulos del blog REDEIL, tanto manualmente como mediante automatizacion con n8n. Incluye la estructura HTML, campos JSON requeridos, SEO Schema markup y variables para workflows automatizados.

**Version:** 2.0
**Ultima actualizacion:** Diciembre 2025
**Compatible con:** n8n Workflow REDEIL Blog v1.0

---

## PARTE 1: ESTRUCTURA DE ARCHIVOS

### 1.1 Ubicacion de Archivos

```
/blog/
├── index.html              # Pagina principal del blog (NO MODIFICAR MANUALMENTE)
├── articulos.json          # Base de datos de articulos (MODIFICAR/AUTOMATIZAR)
├── img/                    # Imagenes generadas por n8n
│   └── [slug]-hero-[timestamp].webp
├── articulos/
│   ├── _plantilla-n8n.html # Plantilla para automatizacion
│   └── [slug].html         # Articulos publicados
└── N8N-INTEGRACION.md      # Documentacion tecnica n8n
```

### 1.2 Nomenclatura del Archivo HTML

- **Formato**: `palabras-clave-separadas-por-guiones.html`
- **Ejemplo**: `guirnaldas-luces-bodas-cdmx.html`
- **Reglas**:
  - Solo letras minusculas
  - Sin acentos ni caracteres especiales (ñ -> n, á -> a)
  - Guiones medios (-) para separar palabras
  - Maximo 5-7 palabras
  - Debe coincidir con el campo `slug` del JSON

---

## PARTE 2: ESTRUCTURA DEL articulos.json

### 2.1 Estructura Completa del JSON

```json
{
  "lastUpdated": "2025-12-15T00:00:00.000Z",
  "totalArticles": 15,
  "categories": ["Guias", "Tendencias", "Tips", "Inspiracion", "Socios Comerciales"],
  "articulos": [
    {
      "id": "slug-del-articulo",
      "slug": "slug-del-articulo",
      "titulo": "Titulo Completo del Articulo para Display",
      "descripcion": "Meta description SEO optimizada de 150-160 caracteres con keywords principales.",
      "imagen": "img/slug-del-articulo-hero-1702656000000.webp",
      "imagenAlt": "Descripcion alternativa de la imagen para accesibilidad y SEO",
      "categoria": "Guias",
      "tags": ["keyword1", "keyword2", "keyword3", "keyword4", "keyword5"],
      "autor": "REDEIL Team",
      "fechaPublicacion": "2025-12-15",
      "fechaModificacion": "2025-12-15",
      "url": "articulos/slug-del-articulo.html",
      "lecturaMinutos": 10,
      "destacado": false,
      "status": "published"
    }
  ]
}
```

### 2.2 Campos Explicados

| Campo | Tipo | Requerido | Descripcion |
|-------|------|-----------|-------------|
| `id` | string | Si | Identificador unico, igual que slug |
| `slug` | string | Si | URL amigable del articulo |
| `titulo` | string | Si | Titulo completo (60-80 caracteres) |
| `descripcion` | string | Si | Meta description (150-160 caracteres) |
| `imagen` | string | Si | Ruta relativa desde /blog/ |
| `imagenAlt` | string | Si | Alt text descriptivo (80-125 caracteres) |
| `categoria` | string | Si | Una de las categorias definidas |
| `tags` | array | Si | 3-5 keywords relevantes |
| `autor` | string | Si | Generalmente "REDEIL Team" |
| `fechaPublicacion` | string | Si | Formato ISO: YYYY-MM-DD |
| `fechaModificacion` | string | Si | Formato ISO: YYYY-MM-DD |
| `url` | string | Si | Ruta relativa al HTML |
| `lecturaMinutos` | number | Si | Tiempo estimado (8-15 min tipico) |
| `destacado` | boolean | No | true para articulos destacados |
| `status` | string | Si | "published" o "draft" |

### 2.3 Categorias Disponibles

| Categoria | Uso |
|-----------|-----|
| `Guias` | Tutoriales, guias paso a paso, articulos educativos |
| `Tendencias` | Novedades, tendencias del mercado, innovaciones |
| `Tips` | Consejos rapidos, recomendaciones practicas |
| `Inspiracion` | Ideas, ejemplos, casos de exito |
| `Socios Comerciales` | Articulos sobre partners y colaboradores |

### 2.4 Orden de Articulos

**IMPORTANTE:** Los articulos se ordenan automaticamente por `fechaPublicacion` (mas recientes primero). El campo `destacado: true` hace que aparezcan con estilo especial.

---

## PARTE 3: TEMPLATE HTML COMPLETO

### 3.1 Template con Variables n8n

```html
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <!-- SEO Principal -->
    <title>{{TITULO_SEO}} | REDEIL</title>
    <meta name="description" content="{{DESCRIPCION}}" />
    <meta name="keywords" content="{{TAGS}}" />
    <meta name="author" content="{{AUTOR}}" />
    <link rel="canonical" href="https://redeil.com/blog/articulos/{{SLUG}}.html" />

    <!-- Open Graph -->
    <meta property="og:title" content="{{TITULO_SEO}} | REDEIL" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://redeil.com/blog/articulos/{{SLUG}}.html" />
    <meta property="og:image" content="https://redeil.com/blog/{{IMAGEN_PRINCIPAL}}" />
    <meta property="og:description" content="{{DESCRIPCION}}" />
    <meta property="og:site_name" content="REDEIL - Renta de Equipo para Eventos" />
    <meta property="article:published_time" content="{{FECHA_PUBLICACION}}T00:00:00-06:00" />
    <meta property="article:author" content="{{AUTOR}}" />
    <meta property="article:section" content="{{CATEGORIA}}" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="{{TITULO_SEO}} | REDEIL" />
    <meta name="twitter:description" content="{{DESCRIPCION}}" />
    <meta name="twitter:image" content="https://redeil.com/blog/{{IMAGEN_PRINCIPAL}}" />

    <!-- Favicon -->
    <link rel="icon" href="../../favicon.ico" sizes="any" />
    <link rel="icon" href="../../icon.svg" type="image/svg+xml" />
    <link rel="apple-touch-icon" href="../../icon.png" />
    <link rel="manifest" href="../../site.webmanifest" />
    <meta name="theme-color" content="#1a365d" />

    <!-- Robots -->
    <meta name="robots" content="index, follow" />
    <meta name="googlebot" content="index, follow, max-snippet:-1, max-image-preview:large" />

    <!-- CSS -->
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="../../css/mobile-menu.css" />
    <link rel="stylesheet" href="../../css/blog-article.min.css" />

    <!-- Schema.org JSON-LD: BlogPosting -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://redeil.com/blog/articulos/{{SLUG}}.html"
        },
        "headline": "{{TITULO}}",
        "description": "{{DESCRIPCION}}",
        "image": {
            "@type": "ImageObject",
            "url": "https://redeil.com/blog/{{IMAGEN_PRINCIPAL}}",
            "width": 1200,
            "height": 630
        },
        "author": {
            "@type": "Organization",
            "name": "REDEIL",
            "url": "https://redeil.com"
        },
        "publisher": {
            "@type": "Organization",
            "name": "REDEIL",
            "logo": {
                "@type": "ImageObject",
                "url": "https://redeil.com/img/redeil.webp",
                "width": 200,
                "height": 77
            }
        },
        "datePublished": "{{FECHA_PUBLICACION}}",
        "dateModified": "{{FECHA_MODIFICACION}}",
        "articleSection": "{{CATEGORIA}}",
        "keywords": "{{TAGS}}",
        "wordCount": {{WORD_COUNT}},
        "timeRequired": "PT{{LECTURA_MINUTOS}}M",
        "inLanguage": "es-MX"
    }
    </script>

    <!-- Schema.org JSON-LD: BreadcrumbList -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Inicio", "item": "https://redeil.com"},
            {"@type": "ListItem", "position": 2, "name": "Blog", "item": "https://redeil.com/blog/"},
            {"@type": "ListItem", "position": 3, "name": "{{TITULO_BREADCRUMB}}", "item": "https://redeil.com/blog/articulos/{{SLUG}}.html"}
        ]
    }
    </script>

    <!-- Schema.org JSON-LD: FAQPage (si hay FAQ) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {{FAQ_SCHEMA_ITEMS}}
        ]
    }
    </script>
</head>

<body>
    <!-- Header -->
    <div id="header-placeholder"></div>
    <div id="breadcrumbs-placeholder"></div>

    <!-- Article Hero Section -->
    <section class="article-hero">
        <div class="container">
            <div class="article-hero__meta">
                <span class="article-hero__category">{{CATEGORIA}}</span>
                <time class="article-hero__date" datetime="{{FECHA_PUBLICACION}}">{{FECHA_LEGIBLE}}</time>
                <span class="article-hero__read-time">{{LECTURA_MINUTOS}} min de lectura</span>
            </div>
            <h1 class="article-hero__title">{{TITULO}}</h1>
            <p class="article-hero__subtitle">{{SUBTITULO}}</p>
        </div>
    </section>

    <!-- Article Content with Sidebar -->
    <article class="article-layout">
        <div class="container">
            <div class="article-layout__wrapper">

                <!-- Main Content -->
                <div class="article-layout__content">

                    <!-- Featured Image -->
                    <div class="article-featured-image">
                        <img src="{{IMAGEN_PRINCIPAL}}" alt="{{IMAGEN_ALT}}" loading="eager" width="1200" height="630" />
                    </div>

                    <!-- Introduction -->
                    <div class="article-intro">
                        <p>{{INTRO_PARRAFO_1}}</p>
                        <p>{{INTRO_PARRAFO_2}}</p>
                    </div>

                    <!-- Table of Contents (in content) -->
                    <nav class="article-toc">
                        <h2 class="article-toc__title">Contenido</h2>
                        <ul class="article-toc__list">
                            {{TOC_ITEMS}}
                        </ul>
                    </nav>

                    <!-- Content Sections -->
                    {{SECCIONES_HTML}}

                    <!-- FAQ Section -->
                    <section id="faq" class="article-section">
                        <h2>Preguntas Frecuentes</h2>
                        <div class="article-faq">
                            {{FAQ_HTML}}
                        </div>
                    </section>

                    <!-- CTA -->
                    <div class="article-cta">
                        <h3>{{CTA_TITULO}}</h3>
                        <p>{{CTA_PARRAFO_1}}</p>
                        <p>{{CTA_PARRAFO_2}}</p>
                        <a href="https://wa.me/525549375172?text={{WHATSAPP_MSG}}" class="btn btn--primary" target="_blank" rel="noopener">Solicitar Cotizacion por WhatsApp</a>
                    </div>

                    <!-- Related Articles -->
                    <div class="article-related">
                        <h3 class="article-related__title">Articulos Relacionados</h3>
                        <div class="article-related__grid">
                            {{RELACIONADOS_HTML}}
                        </div>
                    </div>

                </div>

                <!-- Sidebar -->
                <aside class="article-layout__sidebar">

                    <!-- Sticky TOC -->
                    <div class="sidebar-toc">
                        <h3 class="sidebar-toc__title">En Este Articulo</h3>
                        <nav class="sidebar-toc__nav">
                            <ul>
                                {{SIDEBAR_TOC_ITEMS}}
                            </ul>
                        </nav>
                    </div>

                    <!-- Servicios de Iluminacion -->
                    <div class="sidebar-widget">
                        <h3 class="sidebar-widget__title">Iluminacion</h3>
                        <ul class="sidebar-widget__list">
                            <li><a href="../../renta-de-iluminacion/guirnaldas.html">Guirnaldas de Luces</a></li>
                            <li><a href="../../renta-de-iluminacion/luz-neon.html">Luz Neon LED</a></li>
                            <li><a href="../../renta-de-iluminacion/luz-negra.html">Luz Negra UV</a></li>
                            <li><a href="../../renta-de-iluminacion/city-color.html">City Color LED</a></li>
                            <li><a href="../../renta-de-iluminacion/sky-tracker.html">Sky Tracker</a></li>
                            <li><a href="../../renta-de-iluminacion/cabezas-moviles.html">Cabezas Moviles</a></li>
                            <li><a href="../../renta-de-iluminacion/iluminacion-laser.html">Iluminacion Laser</a></li>
                            <li><a href="../../renta-de-iluminacion/luces-arquitectonicas.html">Luces Arquitectonicas</a></li>
                            <li><a href="../../renta-de-iluminacion/cascadas-led.html">Cascadas LED</a></li>
                        </ul>
                    </div>

                    <!-- Audio Profesional -->
                    <div class="sidebar-widget">
                        <h3 class="sidebar-widget__title">Audio Profesional</h3>
                        <ul class="sidebar-widget__list">
                            <li><a href="../../renta-de-bocinas/bocinas-para-bodas.html">Audio para Bodas</a></li>
                            <li><a href="../../renta-de-bocinas/bocinas-para-xv-anos.html">Audio para XV Anos</a></li>
                            <li><a href="../../renta-de-bocinas/audio-para-conferencias.html">Audio Conferencias</a></li>
                            <li><a href="../../renta-de-bocinas/bocinas-para-fiestas.html">Audio para Fiestas</a></li>
                        </ul>
                    </div>

                    <!-- Contacto -->
                    <div class="sidebar-widget sidebar-contact">
                        <h3 class="sidebar-widget__title">Contactanos</h3>
                        <div class="sidebar-contact__info">
                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Telefono</div>
                                    <div class="sidebar-contact__value">
                                        <a href="tel:+525549375172">55 4937 5172</a>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Email</div>
                                    <div class="sidebar-contact__value">
                                        <a href="mailto:contacto@redeil.com">contacto@redeil.com</a>
                                    </div>
                                </div>
                            </div>
                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Cobertura</div>
                                    <div class="sidebar-contact__value">CDMX y Estado de Mexico</div>
                                </div>
                            </div>
                        </div>
                        <div class="sidebar-contact__cta">
                            <a href="../../contacto.html" class="sidebar-contact__button">Solicitar Cotizacion</a>
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    </article>

    <!-- Footer -->
    <div id="footer-placeholder"></div>
    <script src="/js/load-components.js"></script>
    <script src="../../js/app.min.js" defer></script>
</body>
</html>
```

---

## PARTE 4: VARIABLES PARA AUTOMATIZACION N8N

### 4.1 Lista Completa de Variables

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `{{SLUG}}` | URL amigable | `guirnaldas-luces-bodas-cdmx` |
| `{{TITULO}}` | Titulo principal H1 | `Guirnaldas de Luces para Bodas` |
| `{{TITULO_SEO}}` | Titulo para title tag (max 60) | `Guirnaldas para Bodas CDMX` |
| `{{TITULO_BREADCRUMB}}` | Titulo corto para breadcrumb | `Guirnaldas Bodas` |
| `{{DESCRIPCION}}` | Meta description (150-160 chars) | `Renta de guirnaldas...` |
| `{{SUBTITULO}}` | Tagline bajo el H1 | `Crea ambientes magicos...` |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen hero | `img/guirnaldas-hero.webp` |
| `{{IMAGEN_ALT}}` | Alt text imagen | `Guirnaldas de luces...` |
| `{{CATEGORIA}}` | Categoria del articulo | `Guias` |
| `{{TAGS}}` | Keywords separadas por coma | `guirnaldas, bodas, luces` |
| `{{AUTOR}}` | Nombre autor | `REDEIL Team` |
| `{{FECHA_PUBLICACION}}` | Fecha ISO | `2025-12-15` |
| `{{FECHA_MODIFICACION}}` | Fecha ISO | `2025-12-15` |
| `{{FECHA_LEGIBLE}}` | Fecha formateada | `15 de Diciembre, 2025` |
| `{{LECTURA_MINUTOS}}` | Tiempo lectura | `10` |
| `{{WORD_COUNT}}` | Conteo palabras | `1500` |
| `{{INTRO_PARRAFO_1}}` | Primer parrafo intro | `<strong>Las guirnaldas...` |
| `{{INTRO_PARRAFO_2}}` | Segundo parrafo intro | `En REDEIL contamos...` |
| `{{SECCIONES_HTML}}` | Contenido secciones | `<section>...</section>` |
| `{{TOC_ITEMS}}` | Items tabla contenidos | `<li><a href="#s1">...` |
| `{{SIDEBAR_TOC_ITEMS}}` | Items TOC sidebar | `<li><a href="#s1">...` |
| `{{FAQ_HTML}}` | HTML de preguntas | `<details>...</details>` |
| `{{FAQ_SCHEMA_ITEMS}}` | JSON-LD FAQ | `{"@type":"Question"...` |
| `{{CTA_TITULO}}` | Titulo del CTA | `¿Listo para tu Boda?` |
| `{{CTA_PARRAFO_1}}` | Descripcion CTA | `Cotiza sin compromiso...` |
| `{{CTA_PARRAFO_2}}` | Servicios incluidos | `<strong>Incluye:</strong>...` |
| `{{WHATSAPP_MSG}}` | Mensaje WhatsApp encoded | `Hola%20me%20interesa...` |
| `{{RELACIONADOS_HTML}}` | Cards relacionados | `<a class="article...` |

### 4.2 Estructura de una Seccion

```html
<section id="seccion-1" class="article-section">
    <h2>{{SECCION_1_H2}}</h2>
    <p>{{SECCION_1_INTRO}}</p>

    <h3>{{SECCION_1_H3_1}}</h3>
    <p>{{SECCION_1_CONTENIDO_1}}</p>

    <div class="info-box">
        <h4>{{INFO_BOX_TITULO}}</h4>
        <p>{{INFO_BOX_CONTENIDO}}</p>
    </div>
</section>
```

### 4.3 Estructura FAQ

```html
<!-- HTML -->
<details class="article-faq__item">
    <summary class="article-faq__question">{{PREGUNTA}}</summary>
    <div class="article-faq__answer">
        <p>{{RESPUESTA}}</p>
    </div>
</details>

<!-- Schema JSON-LD -->
{
    "@type": "Question",
    "name": "{{PREGUNTA}}",
    "acceptedAnswer": {
        "@type": "Answer",
        "text": "{{RESPUESTA}}"
    }
}
```

---

## PARTE 5: ELEMENTOS DE CONTENIDO

### 5.1 Info Box (Consejo/Tip)

```html
<div class="info-box">
    <h4>Tip de Experto</h4>
    <p>Contenido del consejo profesional.</p>
</div>
```

### 5.2 Warning Box (Advertencia)

```html
<div class="warning-box">
    <h4>Importante</h4>
    <p>Contenido de advertencia o nota importante.</p>
</div>
```

### 5.3 Imagen en Contenido

```html
<div class="article-image-wrapper">
    <img src="../../img/img-index/[imagen].webp" alt="[Descripcion]" loading="lazy" width="800" height="500" />
    <figcaption>[Caption opcional]</figcaption>
</div>
```

### 5.4 Lista con Iconos

```html
<ul class="feature-list">
    <li><strong>Caracteristica 1:</strong> Descripcion</li>
    <li><strong>Caracteristica 2:</strong> Descripcion</li>
    <li><strong>Caracteristica 3:</strong> Descripcion</li>
</ul>
```

### 5.5 Galeria de Imagenes

```html
<div class="gallery">
    <div class="gallery__item">
        <img src="[imagen1].webp" alt="[Alt 1]" loading="lazy" />
    </div>
    <div class="gallery__item">
        <img src="[imagen2].webp" alt="[Alt 2]" loading="lazy" />
    </div>
</div>
```

---

## PARTE 6: IMAGENES DISPONIBLES

### 6.1 Ubicacion

- **Imagenes existentes:** `/img/img-index/`
- **Imagenes generadas n8n:** `/blog/img/`

### 6.2 Imagenes Existentes

| Archivo | Uso Recomendado |
|---------|-----------------|
| `luz-neon.webp` | Articulos de neon, LED RGBW |
| `city-color.webp` | Iluminacion arquitectonica |
| `luz-negra.webp` | Fiestas UV, neon parties |
| `iluminacion-arquitectonica.webp` | Uplighting |
| `cabezas-moviles.webp` | Efectos dinamicos |
| `conferencias.webp` | Eventos corporativos |
| `bocinas-para-bodas.webp` | Audio bodas |
| `bocinas-para-xv-anos.webp` | Audio XV anos |
| `bocinas-para-fiestas.webp` | Audio fiestas |
| `guirnaldas.webp` | Decoracion vintage |
| `cascadas-led.webp` | Tendencias LED |
| `city-light.webp` | Inspiracion romantica |

### 6.3 Formato de Rutas

| Desde | Formato |
|-------|---------|
| Articulos HTML | `../../img/img-index/[imagen].webp` |
| articulos.json | `../img/img-index/[imagen].webp` |
| Imagenes n8n | `img/[slug]-hero-[timestamp].webp` |

---

## PARTE 7: GUIA SEO

### 7.1 Estructura de Contenido Optima

1. **Introduccion** (150-200 palabras)
   - Keyword principal en negritas
   - Mencionar REDEIL
   - Mencionar zona de servicio

2. **Seccion 1** - Concepto Principal
   - H2 con keyword
   - 2-3 H3 subsecciones

3. **Seccion 2** - Beneficios/Ventajas
   - Info box con dato tecnico

4. **Seccion 3** - Aplicaciones
   - Tipos de eventos
   - Zonas premium CDMX

5. **Seccion 4** - Recomendaciones
   - Consejos de experto

6. **Seccion 5** - Presupuesto/CTA
   - Warning box transparencia

7. **FAQ** - 5-6 preguntas frecuentes

### 7.2 Keywords Geograficas

```
Polanco, Santa Fe, Interlomas, Lomas de Chapultepec,
Bosques de las Lomas, Condesa, Roma, Pedregal,
Coyoacan, Del Valle, Narvarte, Satelite, Tecamachalco
```

### 7.3 Densidad de Keywords

- Keyword principal: 8-12 veces
- Keywords secundarias: 4-6 veces cada una
- Primera mencion en negritas
- Distribucion natural

---

## PARTE 8: CHECKLIST

### 8.1 Antes de Crear

- [ ] Definir tema y keywords
- [ ] Elegir categoria
- [ ] Definir slug (URL-friendly)
- [ ] Seleccionar/generar imagen

### 8.2 Crear HTML

- [ ] Crear archivo en `/blog/articulos/[slug].html`
- [ ] Title tag (max 60 chars)
- [ ] Meta description (150-160 chars)
- [ ] Canonical URL correcta
- [ ] Open Graph completo
- [ ] Schema BlogPosting
- [ ] Schema BreadcrumbList
- [ ] Schema FAQPage
- [ ] H1 con keyword
- [ ] Imagen hero con alt
- [ ] 5+ secciones H2
- [ ] TOC funcional
- [ ] FAQ (5-6 preguntas)
- [ ] CTA con WhatsApp
- [ ] Articulos relacionados

### 8.3 Registrar en JSON

- [ ] Todos los campos requeridos
- [ ] slug = id = nombre archivo
- [ ] fechaPublicacion actual
- [ ] status: "published"
- [ ] Validar sintaxis JSON

### 8.4 Verificacion

- [ ] Articulo carga correctamente
- [ ] Aparece en listado blog
- [ ] Links funcionan
- [ ] Schema valido (Google Rich Results Test)
- [ ] Responsive en movil

---

## PARTE 9: WORKFLOW N8N

### 9.1 Flujo Automatizado

```
Trigger (Schedule/Manual)
       ↓
Selector de Tema (30 temas)
       ↓
Constructor Prompt
       ↓
ChatGPT API (GPT-4o)
       ↓
Validar Respuesta JSON
       ↓
FAL.ai (Generar imagen)
       ↓
Descargar Imagen
       ↓
GitHub: Subir imagen
       ↓
Generar HTML Articulo
       ↓
GitHub: Subir HTML
       ↓
Actualizar articulos.json
       ↓
Telegram: Notificacion
```

### 9.2 Archivos del Workflow

```
/REDEIL-TOOLS/
├── n8n-workflow-redeil-blog-v1.0.json
└── (otros workflows)
```

### 9.3 Credenciales Requeridas

- OpenAI API Key
- FAL.ai API Key
- GitHub Personal Access Token
- Telegram Bot Token

---

## PARTE 10: ERRORES COMUNES

### 10.1 HTML

- Tags sin cerrar
- Rutas de imagen incorrectas
- IDs duplicados
- Canonical URL mal formada
- Scripts faltantes

### 10.2 JSON

- Falta de comas
- Comillas incorrectas
- slug !== nombre archivo
- Ruta imagen incorrecta
- status no definido

### 10.3 SEO

- Title > 60 caracteres
- Description > 160 caracteres
- Sin Schema markup
- Sin Open Graph
- Keywords no en negritas

---

## PARTE 11: EJEMPLO COMPLETO

### 11.1 Entrada articulos.json

```json
{
  "id": "guirnaldas-luces-bodas-cdmx",
  "slug": "guirnaldas-luces-bodas-cdmx",
  "titulo": "Guirnaldas de Luces para Bodas: Crea Ambientes Magicos en CDMX",
  "descripcion": "Renta de guirnaldas de luces para bodas en CDMX. Crea ambientes romanticos con iluminacion profesional. Entrega e instalacion incluida.",
  "imagen": "img/guirnaldas-luces-bodas-cdmx-hero-1702656000000.webp",
  "imagenAlt": "Guirnaldas de luces en boda al aire libre CDMX iluminacion romantica",
  "categoria": "Guias",
  "tags": ["guirnaldas", "bodas", "luces", "CDMX", "iluminacion"],
  "autor": "REDEIL Team",
  "fechaPublicacion": "2025-12-15",
  "fechaModificacion": "2025-12-15",
  "url": "articulos/guirnaldas-luces-bodas-cdmx.html",
  "lecturaMinutos": 10,
  "destacado": true,
  "status": "published"
}
```

---

*Documento version 2.0 - Compatible con n8n Workflow REDEIL Blog v1.0*
*Ultima actualizacion: Diciembre 2025*
