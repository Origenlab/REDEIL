# Guia de Integracion n8n - Blog REDEIL

## Resumen

Esta guia describe como automatizar la creacion de articulos del blog usando n8n workflows.

---

## Estructura de Archivos

```
blog/
├── articulos.json          # Base de datos de articulos
├── articulos/
│   ├── _plantilla-n8n.html # Plantilla para nuevos articulos
│   └── [slug].html         # Articulos generados
└── N8N-INTEGRACION.md      # Esta documentacion
```

---

## Estructura del JSON (articulos.json)

### Campos Requeridos

```json
{
  "id": "mi-nuevo-articulo",
  "slug": "mi-nuevo-articulo",
  "titulo": "Titulo del Articulo Completo",
  "descripcion": "Meta description para SEO (max 160 caracteres)",
  "imagen": "../img/img-index/imagen.webp",
  "imagenAlt": "Descripcion alternativa de la imagen",
  "categoria": "Guias",
  "tags": ["tag1", "tag2", "tag3"],
  "autor": "REDEIL Team",
  "fechaPublicacion": "2025-12-15",
  "fechaModificacion": "2025-12-15",
  "url": "articulos/mi-nuevo-articulo.html",
  "lecturaMinutos": 10,
  "destacado": false,
  "status": "published"
}
```

### Categorias Disponibles

- `Guias` - Tutoriales y guias paso a paso
- `Tendencias` - Novedades y tendencias del sector
- `Tips` - Consejos rapidos y practicos
- `Inspiracion` - Ideas y casos de exito
- `Socios Comerciales` - Articulos de partners

### Estados (status)

- `published` - Articulo visible en el blog
- `draft` - Articulo oculto (no se muestra)

---

## Workflow n8n Recomendado

### Paso 1: Trigger

Opciones de trigger:
- **Webhook** - Recibir datos de un formulario o API externa
- **Schedule** - Publicar articulos programados
- **Manual** - Activacion manual

### Paso 2: Generar Contenido

Usar nodo de AI (OpenAI, Claude, etc.) para generar:
- Titulo SEO optimizado
- Meta description
- Contenido HTML del articulo
- Tags relevantes

### Paso 3: Procesar Imagen

1. Descargar o generar imagen
2. Optimizar (WebP, max 1200x630px)
3. Subir a `/blog/img/[categoria]/`

### Paso 4: Crear Archivo HTML

Usar nodo **HTTP Request** o **FTP** para:
1. Leer plantilla `_plantilla-n8n.html`
2. Reemplazar variables `{{VARIABLE}}`
3. Guardar como `articulos/[slug].html`

### Paso 5: Actualizar articulos.json

1. Leer JSON actual
2. Agregar nuevo articulo al inicio del array
3. Actualizar `lastUpdated` y `totalArticles`
4. Guardar JSON

### Paso 6: Deploy (Opcional)

- Git commit y push automatico
- FTP upload
- Webhook a hosting

---

## Variables de la Plantilla

| Variable | Descripcion | Ejemplo |
|----------|-------------|---------|
| `{{SLUG}}` | URL amigable | `mi-articulo-seo` |
| `{{TITULO}}` | Titulo principal | `Mi Articulo de SEO` |
| `{{TITULO_SEO}}` | Titulo para title tag (max 60) | `Mi Articulo SEO` |
| `{{DESCRIPCION}}` | Meta description (max 160) | `Descripcion del articulo...` |
| `{{DESCRIPCION_CORTA}}` | Extracto (max 120) | `Resumen breve...` |
| `{{IMAGEN_PRINCIPAL}}` | Ruta imagen | `../img/seo/imagen.webp` |
| `{{IMAGEN_ALT}}` | Alt text imagen | `Descripcion imagen` |
| `{{CATEGORIA}}` | Categoria | `Guias` |
| `{{TAGS}}` | Tags separados por coma | `seo, marketing, web` |
| `{{AUTOR}}` | Nombre autor | `REDEIL Team` |
| `{{FECHA_PUBLICACION}}` | Fecha ISO (solo meta/schema) | `2025-12-15` |
| `{{LECTURA_MINUTOS}}` | Tiempo lectura | `10` |
| `{{CONTENIDO_HTML}}` | Contenido completo | `<section>...</section>` |
| `{{TOC_HTML}}` | Tabla de contenidos | `<nav>...</nav>` |
| `{{FAQ_HTML}}` | Preguntas frecuentes | `<div>...</div>` |
| `{{RELACIONADOS_HTML}}` | Articulos relacionados | `<div>...</div>` |
| `{{INTRO_TEXTO}}` | Parrafo introductorio | `Este articulo explica...` |
| `{{CTA_TITULO}}` | Titulo del CTA | `¿Necesitas ayuda?` |
| `{{CTA_DESCRIPCION}}` | Descripcion CTA | `Contactanos hoy...` |
| `{{WORD_COUNT}}` | Conteo de palabras | `1500` |
| `{{TOC_NAV_HTML}}` | Links tabla contenidos | `<ul>...</ul>` |

---

## Ejemplo de Contenido HTML

### Estructura de Seccion

```html
<section id="seccion-1" class="article-section">
    <h2>Titulo de la Seccion</h2>
    <p>Contenido del parrafo con <strong>texto importante</strong>.</p>

    <h3>Subseccion 1.1</h3>
    <p>Mas contenido aqui.</p>

    <ul>
        <li>Punto 1</li>
        <li>Punto 2</li>
        <li>Punto 3</li>
    </ul>
</section>
```

### Tabla de Contenidos

```html
<nav class="article-toc">
    <h2 class="article-toc__title">Contenido</h2>
    <ul class="article-toc__list">
        <li><a href="#seccion-1">Titulo Seccion 1</a></li>
        <li><a href="#seccion-2">Titulo Seccion 2</a></li>
        <li><a href="#faq">Preguntas Frecuentes</a></li>
    </ul>
</nav>
```

### FAQ Section

```html
<section id="faq" class="article-section">
    <h2>Preguntas Frecuentes</h2>
    <div class="article-faq">
        <details class="article-faq__item">
            <summary class="article-faq__question">¿Pregunta 1?</summary>
            <div class="article-faq__answer">
                <p>Respuesta a la pregunta 1.</p>
            </div>
        </details>
        <details class="article-faq__item">
            <summary class="article-faq__question">¿Pregunta 2?</summary>
            <div class="article-faq__answer">
                <p>Respuesta a la pregunta 2.</p>
            </div>
        </details>
    </div>
</section>
```

### Galeria de Imagenes

```html
<div class="gallery">
    <div class="gallery__item">
        <img src="../../renta-de-iluminacion/img-guirnaldas/imagen-1.webp"
             alt="Descripcion imagen 1"
             class="gallery__image"
             loading="lazy" />
    </div>
    <div class="gallery__item">
        <img src="../../renta-de-iluminacion/img-guirnaldas/imagen-2.webp"
             alt="Descripcion imagen 2"
             class="gallery__image"
             loading="lazy" />
    </div>
</div>
```

---

## Ejemplo de Nodo n8n (Code)

```javascript
// Generar fecha legible
const fecha = new Date($json.fechaPublicacion);
const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
               'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
const fechaLegible = `${fecha.getDate()} de ${meses[fecha.getMonth()]}, ${fecha.getFullYear()}`;

// Generar slug desde titulo
const slug = $json.titulo
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Calcular tiempo de lectura (200 palabras por minuto)
const wordCount = $json.contenido.split(/\s+/).length;
const lecturaMinutos = Math.ceil(wordCount / 200);

return {
    slug,
    fechaLegible,
    lecturaMinutos,
    wordCount,
    ...$json
};
```

---

## API JavaScript Disponible

El blog expone una API global para integraciones:

```javascript
// Obtener todos los articulos
REDEIL_Blog.getArticles();

// Obtener articulos filtrados actuales
REDEIL_Blog.getFilteredArticles();

// Pagina actual
REDEIL_Blog.getCurrentPage();

// Total de paginas
REDEIL_Blog.getTotalPages();

// Filtrar por categoria
REDEIL_Blog.filterByCategory('Guias');

// Ir a pagina especifica
REDEIL_Blog.goToPage(2);

// Refrescar datos
REDEIL_Blog.refresh();
```

---

## Checklist Pre-Publicacion

- [ ] Slug unico (no duplicado en articulos.json)
- [ ] Titulo < 60 caracteres
- [ ] Descripcion 120-160 caracteres
- [ ] Imagen optimizada (WebP, < 200KB)
- [ ] Alt text descriptivo
- [ ] Categoria valida
- [ ] Al menos 3 tags relevantes
- [ ] Contenido > 800 palabras
- [ ] Links internos incluidos
- [ ] FAQ section (minimo 3 preguntas)
- [ ] CTA con link a WhatsApp

---

## Estructura de Carpetas de Imagenes

```
blog/img/
├── bodas-guirnaldas/     # Articulos de guirnaldas para bodas
├── iluminacion-neon/     # Articulos de luz neon
├── eventos-corporativos/ # Articulos corporativos
└── general/              # Imagenes generales
```

---

## Notas Importantes

1. **Orden de articulos**: Los articulos se muestran por fecha de publicacion (mas recientes primero)

2. **Fechas NO visibles**: Las fechas no se muestran en los articulos ni en las tarjetas del blog. Solo se usan internamente para ordenamiento y en metadatos SEO (Schema.org)

3. **Articulos destacados**: Solo marcar 3-4 articulos como `destacado: true`

3. **Cache**: El navegador cachea el JSON. Para forzar actualizacion, agregar timestamp: `articulos.json?v=timestamp`

4. **SEO**: Cada articulo genera automaticamente Schema.org BlogPosting y BreadcrumbList

5. **Imagenes**: Usar formato WebP, dimension 1200x630px para optima visualizacion en redes sociales

---

## Soporte

Para dudas sobre la integracion, contactar al equipo de desarrollo.
