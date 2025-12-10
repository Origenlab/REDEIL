# GUIA COMPLETA PARA CREAR ARTICULOS DEL BLOG REDEIL

## Resumen Ejecutivo

Este documento contiene las instrucciones completas y detalladas para crear un nuevo articulo del blog de REDEIL. Sigue cada paso de forma secuencial para garantizar la correcta integracion del articulo en el sistema.

---

## PARTE 1: ESTRUCTURA DE ARCHIVOS

### 1.1 Ubicacion de Archivos

```
/blog/
├── index.html              # Pagina principal del blog (NO MODIFICAR)
├── articulos.json          # Base de datos de articulos (MODIFICAR)
└── articulos/
    └── [nombre-del-articulo].html  # Archivo HTML del articulo (CREAR)
```

### 1.2 Nomenclatura del Archivo HTML

- **Formato**: `palabras-clave-separadas-por-guiones.html`
- **Ejemplo**: `canones-led-rgbw-efectos-neon-cdmx.html`
- **Reglas**:
  - Solo letras minusculas
  - Sin acentos ni caracteres especiales
  - Guiones medios (-) para separar palabras
  - Maximo 6-8 palabras
  - Incluir palabras clave SEO principales

---

## PARTE 2: ESTRUCTURA DEL ARCHIVO HTML

### 2.1 Template Completo del Articulo

```html
<!DOCTYPE html>
<html lang="es-MX">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>[TITULO SEO - max 60 caracteres] | REDEIL</title>
    <meta name="description" content="[META DESCRIPCION - max 155 caracteres con palabras clave]" />
    <link rel="canonical" href="https://redeil.com/blog/articulos/[nombre-archivo].html" />
    <link rel="stylesheet" href="../../css/style.css" />
    <link rel="stylesheet" href="../../css/mobile-menu.css" />
    <link rel="stylesheet" href="../../css/blog-article.css" />
</head>
<body>
    <div id="header-placeholder"></div>
    <div id="breadcrumbs-placeholder"></div>

    <!-- Article Hero Section -->
    <section class="article-hero">
        <div class="container">
            <h1 class="article-hero__title">[TITULO PRINCIPAL H1]</h1>
            <p class="article-hero__subtitle">[SUBTITULO DESCRIPTIVO]</p>
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
                        <img src="../../img/img-index/[imagen].webp" alt="[Alt text descriptivo]" loading="eager" />
                    </div>

                    <!-- Introduction -->
                    <div class="article-intro">
                        <p>[PARRAFO INTRODUCTORIO - 150-200 palabras con keywords en negritas usando <strong>]</p>
                    </div>

                    <!-- Content Sections -->
                    <!-- SECCION 1 -->
                    <section id="[id-seccion-1]" class="article-section">
                        <h2>[Titulo Seccion 1]</h2>
                        <p>[Contenido...]</p>

                        <h3>[Subtitulo 1.1]</h3>
                        <p>[Contenido...]</p>

                        <h4>[Sub-subtitulo 1.1.1]</h4>
                        <p>[Contenido...]</p>
                    </section>

                    <!-- SECCION 2 -->
                    <section id="[id-seccion-2]" class="article-section">
                        <h2>[Titulo Seccion 2]</h2>
                        <p>[Contenido...]</p>

                        <!-- Imagen dentro del contenido -->
                        <div class="article-image-wrapper">
                            <img src="../../img/img-index/[imagen].webp" alt="[Alt text]" loading="lazy" />
                        </div>

                        <h3>[Subtitulo 2.1]</h3>
                        <p>[Contenido...]</p>
                    </section>

                    <!-- SECCION 3 -->
                    <section id="[id-seccion-3]" class="article-section">
                        <h2>[Titulo Seccion 3]</h2>
                        <p>[Contenido...]</p>

                        <!-- Info Box -->
                        <div class="info-box">
                            <h4>[Icono] [Titulo del Info Box]</h4>
                            <p>[Contenido del info box]</p>
                        </div>
                    </section>

                    <!-- SECCION 4 -->
                    <section id="[id-seccion-4]" class="article-section">
                        <h2>[Titulo Seccion 4]</h2>
                        <p>[Contenido...]</p>

                        <!-- Warning Box -->
                        <div class="warning-box">
                            <h4>[Icono] [Titulo del Warning Box]</h4>
                            <p>[Contenido del warning box]</p>
                        </div>
                    </section>

                    <!-- SECCION 5 -->
                    <section id="[id-seccion-5]" class="article-section">
                        <h2>[Titulo Seccion 5]</h2>
                        <p>[Contenido...]</p>
                    </section>

                    <!-- CTA -->
                    <div class="article-cta">
                        <h3>[Titulo CTA]</h3>
                        <p>[Descripcion CTA]</p>
                        <a href="../../contacto.html">[Texto del Boton]</a>
                    </div>

                    <!-- Related Articles -->
                    <div class="article-related">
                        <h3 class="article-related__title">Articulos Relacionados</h3>
                        <div class="article-related__grid">

                            <!-- Article 1 -->
                            <a href="[url-articulo-1].html" class="article-related__card">
                                <div class="article-related__image">
                                    <img src="../../img/img-index/[imagen].webp" alt="[Alt text]" loading="lazy" />
                                </div>
                                <div class="article-related__content">
                                    <span class="article-related__category">[Categoria]</span>
                                    <h4 class="article-related__card-title">[Titulo Articulo]</h4>
                                </div>
                            </a>

                            <!-- Article 2 -->
                            <a href="[url-articulo-2].html" class="article-related__card">
                                <div class="article-related__image">
                                    <img src="../../img/img-index/[imagen].webp" alt="[Alt text]" loading="lazy" />
                                </div>
                                <div class="article-related__content">
                                    <span class="article-related__category">[Categoria]</span>
                                    <h4 class="article-related__card-title">[Titulo Articulo]</h4>
                                </div>
                            </a>

                            <!-- Article 3 -->
                            <a href="[url-articulo-3].html" class="article-related__card">
                                <div class="article-related__image">
                                    <img src="../../img/img-index/[imagen].webp" alt="[Alt text]" loading="lazy" />
                                </div>
                                <div class="article-related__content">
                                    <span class="article-related__category">[Categoria]</span>
                                    <h4 class="article-related__card-title">[Titulo Articulo]</h4>
                                </div>
                            </a>

                        </div>
                    </div>

                </div>

                <!-- Sidebar -->
                <aside class="article-layout__sidebar">

                    <!-- Table of Contents -->
                    <div class="sidebar-toc">
                        <h3 class="sidebar-toc__title">Tabla de Contenidos</h3>
                        <nav class="sidebar-toc__nav">
                            <ul>
                                <li><a href="#[id-seccion-1]">[Titulo corto seccion 1]</a></li>
                                <li><a href="#[id-seccion-2]">[Titulo corto seccion 2]</a></li>
                                <li><a href="#[id-seccion-3]">[Titulo corto seccion 3]</a></li>
                                <li><a href="#[id-seccion-4]">[Titulo corto seccion 4]</a></li>
                                <li><a href="#[id-seccion-5]">[Titulo corto seccion 5]</a></li>
                            </ul>
                        </nav>
                    </div>

                    <!-- Articulos Destacados -->
                    <div class="sidebar-widget">
                        <h3 class="sidebar-widget__title">Articulos Destacados</h3>
                        <div class="sidebar-featured">

                            <div class="sidebar-featured__article">
                                <a href="iluminacion-neon-para-bodas-tendencias-efectos.html">
                                    <div class="sidebar-featured__image">
                                        <img src="../../img/img-index/city-color.webp" alt="Iluminacion Neon Bodas" loading="lazy" />
                                    </div>
                                </a>
                                <div class="sidebar-featured__content">
                                    <span class="sidebar-featured__category">Guias</span>
                                    <a href="iluminacion-neon-para-bodas-tendencias-efectos.html">
                                        <h4 class="sidebar-featured__title">Iluminacion Neon para Bodas: Tendencias 2025</h4>
                                    </a>
                                </div>
                            </div>

                            <div class="sidebar-featured__article">
                                <a href="uplighting-arquitectonico-transformar-espacios.html">
                                    <div class="sidebar-featured__image">
                                        <img src="../../img/img-index/iluminacion-arquitectonica.webp" alt="Uplighting" loading="lazy" />
                                    </div>
                                </a>
                                <div class="sidebar-featured__content">
                                    <span class="sidebar-featured__category">Guias</span>
                                    <a href="uplighting-arquitectonico-transformar-espacios.html">
                                        <h4 class="sidebar-featured__title">Uplighting Arquitectonico Profesional</h4>
                                    </a>
                                </div>
                            </div>

                            <div class="sidebar-featured__article">
                                <a href="guia-completa-equipo-audio-iluminacion-eventos.html">
                                    <div class="sidebar-featured__image">
                                        <img src="../../img/img-index/conferencias.webp" alt="Guia Audio" loading="lazy" />
                                    </div>
                                </a>
                                <div class="sidebar-featured__content">
                                    <span class="sidebar-featured__category">Guias</span>
                                    <a href="guia-completa-equipo-audio-iluminacion-eventos.html">
                                        <h4 class="sidebar-featured__title">Guia Completa de Audio e Iluminacion</h4>
                                    </a>
                                </div>
                            </div>

                        </div>
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
                            <li><a href="../../renta-de-iluminacion/proyector-de-gobos.html">Proyector de Gobos</a></li>
                            <li><a href="../../renta-de-iluminacion/city-light.html">City Light</a></li>
                            <li><a href="../../renta-de-iluminacion/seguidor-de-luz.html">Seguidor de Luz</a></li>
                        </ul>
                    </div>

                    <!-- Servicios de Sonido -->
                    <div class="sidebar-widget">
                        <h3 class="sidebar-widget__title">Audio Profesional</h3>
                        <ul class="sidebar-widget__list">
                            <li><a href="../../renta-de-bocinas/bocinas-para-bodas.html">Audio para Bodas</a></li>
                            <li><a href="../../renta-de-bocinas/bocinas-para-xv-anos.html">Audio para XV Anos</a></li>
                            <li><a href="../../renta-de-bocinas/audio-para-conferencias.html">Audio para Conferencias</a></li>
                            <li><a href="../../renta-de-bocinas/bocinas-para-fiestas.html">Audio para Fiestas</a></li>
                        </ul>
                    </div>

                    <!-- Equipos Especiales -->
                    <div class="sidebar-widget">
                        <h3 class="sidebar-widget__title">Equipos Especiales</h3>
                        <ul class="sidebar-widget__list">
                            <li><a href="../../equipos-para-eventos/bolas-disco.html">Bolas Disco</a></li>
                            <li><a href="../../equipos-para-eventos/maquina-de-humo.html">Maquina de Humo</a></li>
                            <li><a href="../../equipos-para-eventos/humo-bajo.html">Humo Bajo</a></li>
                            <li><a href="../../equipos-para-eventos/maquina-de-burbujas.html">Maquina de Burbujas</a></li>
                            <li><a href="../../equipos-para-eventos/maquina-de-confeti.html">Maquina de Confeti</a></li>
                            <li><a href="../../equipos-para-eventos/pantalla-inflable.html">Pantalla Inflable</a></li>
                            <li><a href="../../equipos-para-eventos/renta-de-podium.html">Renta de Podium</a></li>
                            <li><a href="../../equipos-para-eventos/mesas-picnic.html">Mesas Picnic</a></li>
                        </ul>
                    </div>

                    <!-- Contacto -->
                    <div class="sidebar-widget sidebar-contact">
                        <h3 class="sidebar-widget__title">Contactanos</h3>
                        <div class="sidebar-contact__info">

                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__icon">TEL</div>
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Telefono</div>
                                    <div class="sidebar-contact__value">
                                        <a href="tel:+525549375172">55 4937 5172</a>
                                    </div>
                                </div>
                            </div>

                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__icon">EMAIL</div>
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Email</div>
                                    <div class="sidebar-contact__value">
                                        <a href="mailto:contacto@redeil.com">contacto@redeil.com</a>
                                    </div>
                                </div>
                            </div>

                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__icon">UBICACION</div>
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Cobertura</div>
                                    <div class="sidebar-contact__value">CDMX y Estado de Mexico</div>
                                </div>
                            </div>

                            <div class="sidebar-contact__item">
                                <div class="sidebar-contact__icon">HORARIO</div>
                                <div class="sidebar-contact__content">
                                    <div class="sidebar-contact__label">Horario</div>
                                    <div class="sidebar-contact__value">Lun - Dom: 8:00 AM - 11:00 PM</div>
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

    <div id="footer-placeholder"></div>
    <script src="/js/load-components.js"></script>
    <script src="../../js/app.min.js" defer></script>
</body>
</html>
```

---

## PARTE 3: REGISTRAR EL ARTICULO EN articulos.json

### 3.1 Ubicacion del Archivo

```
/blog/articulos.json
```

### 3.2 Estructura de un Registro

```json
{
  "id": "nombre-del-articulo-sin-extension",
  "titulo": "Titulo del Articulo para la Card",
  "descripcion": "Descripcion corta para la card (max 160 caracteres)",
  "imagen": "../img/img-index/[nombre-imagen].webp",
  "categoria": "Guias",
  "autor": "REDEIL Team",
  "url": "articulos/[nombre-archivo].html",
  "lecturaMinutos": 12
}
```

### 3.3 Campos Explicados

| Campo | Descripcion | Ejemplo |
|-------|-------------|---------|
| `id` | Identificador unico (slug) | `"canones-led-rgbw-efectos-neon-cdmx"` |
| `titulo` | Titulo para la card del blog | `"Canones LED RGBW con Efectos Neon para Eventos en CDMX"` |
| `descripcion` | Descripcion corta (max 160 chars) | `"Descubre como los canones LED RGBW transforman eventos..."` |
| `imagen` | Ruta relativa a la imagen | `"../img/img-index/luz-neon.webp"` |
| `categoria` | Una de: Guias, Tendencias, Tips, Inspiracion | `"Guias"` |
| `autor` | Autor del articulo | `"REDEIL Team"` |
| `url` | Ruta al archivo HTML | `"articulos/canones-led-rgbw-efectos-neon-cdmx.html"` |
| `lecturaMinutos` | Tiempo estimado de lectura | `12` |

### 3.4 Categorias Disponibles

- **Guias**: Articulos instructivos y educativos
- **Tendencias**: Novedades y tendencias del mercado
- **Tips**: Consejos rapidos y practicos
- **Inspiracion**: Ideas y ejemplos visuales

### 3.5 IMPORTANTE: Orden de los Articulos

**Los articulos se muestran en el orden en que aparecen en el JSON.**

- **El PRIMER articulo** del array es el MAS RECIENTE
- **El ULTIMO articulo** del array es el MAS ANTIGUO

**Para agregar un nuevo articulo:**

1. Abre `/blog/articulos.json`
2. Localiza el array `"articulos": [`
3. **Inserta el nuevo registro AL INICIO del array** (despues del corchete de apertura)
4. No olvides la coma despues del nuevo objeto

### 3.6 Ejemplo de Insercion

**ANTES:**
```json
{
  "articulos": [
    {
      "id": "articulo-existente-1",
      ...
    },
    {
      "id": "articulo-existente-2",
      ...
    }
  ]
}
```

**DESPUES (nuevo articulo agregado al inicio):**
```json
{
  "articulos": [
    {
      "id": "nuevo-articulo",
      "titulo": "Titulo del Nuevo Articulo",
      "descripcion": "Descripcion del nuevo articulo...",
      "imagen": "../img/img-index/imagen.webp",
      "categoria": "Guias",
      "autor": "REDEIL Team",
      "url": "articulos/nuevo-articulo.html",
      "lecturaMinutos": 10
    },
    {
      "id": "articulo-existente-1",
      ...
    },
    {
      "id": "articulo-existente-2",
      ...
    }
  ]
}
```

---

## PARTE 4: IMAGENES DISPONIBLES

### 4.1 Ubicacion de Imagenes

```
/img/img-index/
```

### 4.2 Imagenes Existentes (usar estas)

| Archivo | Uso Recomendado |
|---------|-----------------|
| `luz-neon.webp` | Articulos de iluminacion neon, LED RGBW |
| `city-color.webp` | Articulos de iluminacion arquitectonica, city color |
| `luz-negra.webp` | Articulos de luz UV, fiestas neon |
| `iluminacion-arquitectonica.webp` | Uplighting, iluminacion de espacios |
| `cabezas-moviles.webp` | Articulos de efectos dinamicos, comparativas |
| `conferencias.webp` | Articulos corporativos, eventos empresariales |
| `bocinas-para-bodas.webp` | Articulos de bodas, audio nupcial |
| `bocinas-para-xv-anos.webp` | Articulos de XV anos |
| `bocinas-para-fiestas.webp` | Articulos de fiestas, presupuestos |
| `guirnaldas.webp` | Articulos de decoracion vintage |
| `cascadas-led.webp` | Articulos de tendencias, decoracion |
| `city-light.webp` | Articulos de inspiracion romantica |

### 4.3 Formato de Ruta

- **Desde articulos HTML**: `../../img/img-index/[imagen].webp`
- **Desde articulos.json**: `../img/img-index/[imagen].webp`

---

## PARTE 5: ELEMENTOS ESPECIALES DEL CONTENIDO

### 5.1 Info Box (Dato/Consejo)

```html
<div class="info-box">
    <h4>Dato Tecnico Profesional</h4>
    <p>Contenido del dato o consejo tecnico importante.</p>
</div>
```

### 5.2 Warning Box (Advertencia)

```html
<div class="warning-box">
    <h4>Transparencia en Costos</h4>
    <p>Contenido de advertencia o informacion importante.</p>
</div>
```

### 5.3 Imagen dentro del Contenido

```html
<div class="article-image-wrapper">
    <img src="../../img/img-index/[imagen].webp" alt="[Descripcion]" loading="lazy" />
</div>
```

### 5.4 Negritas para Keywords SEO

```html
<p>Los <strong>canones LED RGBW</strong> representan el siguiente nivel en <strong>iluminacion profesional para eventos</strong>.</p>
```

### 5.5 Listas

```html
<ul>
    <li>Primer elemento</li>
    <li>Segundo elemento</li>
    <li>Tercer elemento</li>
</ul>
```

---

## PARTE 6: GUIA DE REDACCION SEO

### 6.1 Estructura de Contenido Recomendada

1. **Introduccion** (150-200 palabras)
   - Incluir keywords principales en negritas
   - Mencionar REDEIL.COM
   - Mencionar zonas de cobertura (Polanco, Santa Fe, Interlomas, Lomas, etc.)

2. **Seccion 1** - Concepto/Tecnologia Principal
   - H2 con keyword principal
   - H3 para subtemas
   - H4 para detalles especificos

3. **Seccion 2** - Ventajas/Beneficios Tecnicos
   - Incluir datos tecnicos
   - Info box con dato profesional

4. **Seccion 3** - Aplicaciones por Zona/Tipo de Evento
   - Mencionar zonas premium de CDMX
   - Tipos de eventos (bodas, corporativos, XV anos)

5. **Seccion 4** - Paquetes/Configuraciones
   - Recomendaciones por tamano de evento
   - Consejo de experto en info box

6. **Seccion 5** - Presupuesto/Cotizacion
   - CTA hacia contacto
   - Warning box sobre transparencia

### 6.2 Keywords a Incluir

**Primarias:**
- renta de iluminacion
- audio para eventos
- equipo profesional
- CDMX / Ciudad de Mexico
- bodas / XV anos / eventos corporativos

**Geograficas:**
- Polanco
- Santa Fe
- Interlomas
- Lomas de Chapultepec
- Bosques de las Lomas
- Reforma
- Condesa
- Estado de Mexico

**Servicios:**
- renta de equipo
- montaje tecnico
- operacion profesional
- servicio integral
- cotizacion personalizada

### 6.3 Densidad de Keywords

- Usar keyword principal 8-12 veces en el articulo
- Usar keywords secundarias 4-6 veces cada una
- Distribuir naturalmente en el contenido
- Siempre en negritas la primera mencion de cada keyword importante

---

## PARTE 7: CHECKLIST DE CREACION

### 7.1 Antes de Crear

- [ ] Definir tema y keywords principales
- [ ] Elegir categoria (Guias/Tendencias/Tips/Inspiracion)
- [ ] Seleccionar imagen principal de las disponibles
- [ ] Definir nombre del archivo (slug URL-friendly)

### 7.2 Crear Archivo HTML

- [ ] Crear archivo en `/blog/articulos/[nombre].html`
- [ ] Copiar template completo de la PARTE 2
- [ ] Reemplazar titulo en `<title>` (max 60 chars)
- [ ] Reemplazar meta description (max 155 chars)
- [ ] Actualizar canonical URL
- [ ] Escribir H1 (titulo principal)
- [ ] Escribir subtitulo descriptivo
- [ ] Configurar imagen principal
- [ ] Escribir parrafo introductorio
- [ ] Crear 5 secciones de contenido
- [ ] Agregar IDs a cada seccion para TOC
- [ ] Actualizar tabla de contenidos en sidebar
- [ ] Agregar al menos 2 info-box o warning-box
- [ ] Configurar CTA final
- [ ] Seleccionar 3 articulos relacionados

### 7.3 Registrar en JSON

- [ ] Abrir `/blog/articulos.json`
- [ ] Crear nuevo objeto con todos los campos
- [ ] Insertar AL INICIO del array (articulo mas reciente)
- [ ] Verificar sintaxis JSON (comas, comillas)
- [ ] Guardar archivo

### 7.4 Verificacion Final

- [ ] Abrir articulo en navegador
- [ ] Verificar que carga correctamente
- [ ] Verificar que aparece en /blog/
- [ ] Verificar que aparece PRIMERO en la lista
- [ ] Probar links internos (TOC, articulos relacionados)
- [ ] Probar en vista movil

---

## PARTE 8: EJEMPLO COMPLETO

### 8.1 Datos del Articulo de Ejemplo

- **Archivo**: `canones-led-rgbw-efectos-neon-cdmx.html`
- **Titulo**: Iluminacion LED RGBW Profesional: Efectos Neon para Eventos CDMX
- **Categoria**: Guias
- **Tiempo lectura**: 12 minutos
- **Imagen**: luz-neon.webp

### 8.2 Estructura del Ejemplo

1. **Seccion 1**: Innovacion Visual con Canones LED RGBW
2. **Seccion 2**: Tecnologia y Precision (ventajas tecnicas)
3. **Seccion 3**: REDEIL en Zonas Premium de CDMX
4. **Seccion 4**: Paquetes Personalizados
5. **Seccion 5**: Presupuesto y Cotizacion

### 8.3 Registro JSON del Ejemplo

```json
{
  "id": "canones-led-rgbw-efectos-neon-cdmx",
  "titulo": "Canones LED RGBW con Efectos Neon para Eventos en CDMX",
  "descripcion": "Descubre como los canones LED RGBW transforman eventos en Polanco, Lomas y Santa Fe con efectos de luz neon vibrantes y UV. Guia completa con aplicaciones.",
  "imagen": "../img/img-index/luz-neon.webp",
  "categoria": "Guias",
  "autor": "REDEIL Team",
  "url": "articulos/canones-led-rgbw-efectos-neon-cdmx.html",
  "lecturaMinutos": 12
}
```

---

## PARTE 9: ERRORES COMUNES A EVITAR

### 9.1 Errores en HTML

- No cerrar tags correctamente
- Rutas incorrectas a imagenes (verificar `../../`)
- IDs duplicados en secciones
- Olvidar actualizar canonical URL
- No incluir scripts al final

### 9.2 Errores en JSON

- Falta de coma despues del nuevo objeto
- Comillas simples en lugar de dobles
- Agregar al final en lugar del inicio (articulo aparecera como antiguo)
- Rutas de imagen incorrectas (debe ser `../img/` no `../../img/`)

### 9.3 Errores de Contenido

- Titulos muy largos (>60 chars para SEO)
- Meta descriptions muy largas (>155 chars)
- Falta de keywords en negritas
- No mencionar zonas geograficas
- No incluir CTA hacia contacto

---

## PARTE 10: RESUMEN RAPIDO

**Para crear un nuevo articulo:**

1. **Crear HTML** en `/blog/articulos/[nombre].html`
2. **Copiar template** de la PARTE 2
3. **Personalizar contenido** (titulo, meta, secciones, imagenes)
4. **Abrir** `/blog/articulos.json`
5. **Insertar registro AL INICIO** del array
6. **Verificar** que aparece en el blog

**Recuerda:** El orden en el JSON determina el orden de visualizacion. Articulos nuevos van AL INICIO para aparecer primero.

---

*Documento creado para estandarizar la creacion de articulos del blog REDEIL*
*Version 1.0 - Noviembre 2025*