// =============================================================================
// REDEIL — Configuración centralizada del sitio
// Fuente única de verdad para datos de negocio, contacto y SEO
// =============================================================================

// -- Identidad del sitio --
export const SITE_NAME = 'REDEIL';
export const SITE_URL = 'https://redeil.com';
export const SITE_DESCRIPTION = 'Renta de iluminación, audio, DJ y equipos para eventos en CDMX y Estado de México. 10+ años de experiencia. Instalación profesional incluida.';
export const SITE_TAGLINE = 'Renta de Iluminación y Audio para Eventos';

// -- Contacto --
export const PHONE_PRIMARY = '+525549375172';
export const PHONE_DISPLAY = '55 4937 5172';
export const WHATSAPP_NUMBER = '525549375172';
export const WHATSAPP_DISPLAY = '55 4937 5172';
export const EMAIL = 'contacto@redeil.com';

// -- Horarios de atención --
export const BUSINESS_HOURS = {
  weekdays: 'Lun-Vie 9:00-19:00',
  saturday: 'Sáb 10:00-15:00',
  display: 'Lun-Vie 9:00-19:00 | Sáb 10:00-15:00',
  shortDisplay: 'Lun-Sáb',
};

// -- Ubicación --
export const LOCATION = {
  locality: 'Ciudad de México',
  region: 'CDMX',
  country: 'MX',
  postalCode: '01000',
  areaServed: 'CDMX y Estado de México',
};

// -- Geo (SEO local) --
export const GEO = {
  region: 'MX-CMX',
  placename: 'Ciudad de México',
  latitude: '19.432608',
  longitude: '-99.133209',
};

// -- Brand --
export const BRAND_COLOR = '#1a365d';
export const ACCENT_COLOR = '#0071e3';
export const OG_IMAGE_DEFAULT = '/img/redeil.avif';
export const LOGO_PATH = '/img/redeil.avif';

// -- Redes sociales --
export const SOCIAL_MEDIA = {
  facebook: 'https://www.facebook.com/redeilmx',
  instagram: 'https://www.instagram.com/redeil_mx',
  tiktok: 'https://www.tiktok.com/@redeil_mx',
  linkedin: 'https://www.linkedin.com/in/redeilmx/',
  pinterest: 'https://mx.pinterest.com/redeilmx/',
} as const;

export const getSocialMediaUrls = (): string[] =>
  Object.values(SOCIAL_MEDIA).filter((url) => url.length > 0);

// -- URLs preformateadas --
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}`;
export const WHATSAPP_URL_MSG = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hola REDEIL, me interesa cotizar equipo para mi evento.')}`;
export const PHONE_URL = `tel:${PHONE_PRIMARY}`;
export const EMAIL_URL = `mailto:${EMAIL}`;

// -- Servicios: Iluminación (12 items con paquetes) --
export const ILUMINACION_SERVICES = [
  { nombre: 'Guirnaldas de Luces', slug: 'guirnaldas', imagen: '/img/img-index/pro/guirnaldas.avif', descripcion: 'Luces vintage con focos Edison para bodas en jardín y eventos elegantes.', paquetes: [
    { nombre: 'Básico — 50 metros', slug: 'paquete-50-metros' },
    { nombre: 'Estándar — 100 metros', slug: 'paquete-100-metros' },
    { nombre: 'Premium — 200 metros', slug: 'paquete-200-metros' },
    { nombre: 'Producción — 500 metros', slug: 'paquete-500-metros' },
  ]},
  { nombre: 'Luz Neón LED', slug: 'luz-neon', imagen: '/img/img-index/pro/luz-neon.avif', descripcion: 'Letreros y figuras neón LED personalizadas para ambientar cualquier evento.', paquetes: [
    { nombre: 'UV Básico', slug: 'paquete-uv-basico' },
    { nombre: 'Glow Party', slug: 'paquete-glow-party' },
    { nombre: 'Neón Premium', slug: 'paquete-neon-premium' },
    { nombre: 'Producción Neón', slug: 'paquete-produccion-neon' },
  ]},
  { nombre: 'Luz Negra UV', slug: 'luz-negra', imagen: '/img/img-index/pro/luz-negra.avif', descripcion: 'Iluminación ultravioleta para fiestas temáticas neón y eventos nocturnos.', paquetes: [
    { nombre: 'Blacklight Básico', slug: 'paquete-blacklight-basico' },
    { nombre: 'Blacklight Party', slug: 'paquete-blacklight-party' },
    { nombre: 'UV Premium', slug: 'paquete-uv-premium' },
    { nombre: 'Producción UV', slug: 'paquete-produccion-uv' },
  ]},
  { nombre: 'City Color LED', slug: 'city-color', imagen: '/img/img-index/pro/city-color.avif', descripcion: 'Iluminación de alta potencia para bañar fachadas y espacios grandes en color.', paquetes: [
    { nombre: '4 Cañones', slug: 'paquete-4-canones' },
    { nombre: '8 Cañones', slug: 'paquete-8-canones' },
    { nombre: '16 Cañones', slug: 'paquete-16-canones' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Sky Tracker', slug: 'sky-tracker', imagen: '/img/img-index/pro/sky-tracker.avif', descripcion: 'Rayos de luz verticales visibles a kilómetros para inauguraciones y eventos.', paquetes: [
    { nombre: '1 Sky Tracker', slug: 'paquete-1-sky-tracker' },
    { nombre: '2 Sky Trackers', slug: 'paquete-2-sky-trackers' },
    { nombre: '4 Sky Trackers', slug: 'paquete-4-sky-trackers' },
    { nombre: 'Producción', slug: 'paquete-produccion-sky-tracker' },
  ]},
  { nombre: 'Cabezas Móviles', slug: 'cabezas-moviles', imagen: '/img/img-index/pro/cabezas-moviles.avif', descripcion: 'Luces robóticas inteligentes con movimiento y cambio de color para pistas de baile.', paquetes: [
    { nombre: 'Show Básico', slug: 'paquete-show-basico' },
    { nombre: 'Show Estándar', slug: 'paquete-show-estandar' },
    { nombre: 'Show Premium', slug: 'paquete-show-premium' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Iluminación Láser', slug: 'iluminacion-laser', imagen: '/img/img-index/pro/iluminacion-laser.avif', descripcion: 'Efectos láser profesionales para shows, conciertos y fiestas de alto impacto.', paquetes: [
    { nombre: 'Láser Básico', slug: 'paquete-laser-basico' },
    { nombre: 'Láser Estándar', slug: 'paquete-laser-estandar' },
    { nombre: 'Láser Premium', slug: 'paquete-laser-premium' },
    { nombre: 'Producción Láser', slug: 'paquete-produccion-laser' },
  ]},
  { nombre: 'Luces Arquitectónicas', slug: 'luces-arquitectonicas', imagen: '/img/img-index/iluminacion-arquitectonica.avif', descripcion: 'Uplighting para resaltar columnas, fachadas y arquitectura de tu venue.', paquetes: [
    { nombre: '6 Uplighters', slug: 'paquete-6-uplighters' },
    { nombre: '12 Uplighters', slug: 'paquete-12-uplighters' },
    { nombre: '20 Uplighters', slug: 'paquete-20-uplighters' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Cascadas LED', slug: 'cascadas-led', imagen: '/img/img-index/pro/cascadas-led.avif', descripcion: 'Cortinas de luces LED tipo cascada para decoración de salones y jardines.', paquetes: [
    { nombre: '1 Cortina', slug: 'paquete-1-cortina' },
    { nombre: '2 Cortinas', slug: 'paquete-2-cortinas' },
    { nombre: '4 Cortinas', slug: 'paquete-4-cortinas' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Proyector de Gobos', slug: 'proyector-de-gobos', imagen: '/img/img-index/proyector-de-gobos.avif', descripcion: 'Proyección de logos, iniciales o patrones personalizados sobre cualquier superficie.', paquetes: [
    { nombre: '1 Gobo', slug: 'paquete-1-gobo' },
    { nombre: '2 Gobos', slug: 'paquete-2-gobos' },
    { nombre: '4 Gobos', slug: 'paquete-4-gobos' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'City Light', slug: 'city-light', imagen: '/img/img-index/city-light.avif', descripcion: 'Reflectores LED compactos para iluminación ambiental versátil en eventos.', paquetes: [
    { nombre: '8 Par LED', slug: 'paquete-8-par-led' },
    { nombre: '16 Par LED', slug: 'paquete-16-par-led' },
    { nombre: '24 Par LED', slug: 'paquete-24-par-led' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Seguidor de Luz', slug: 'seguidor-de-luz', imagen: '/img/img-index/seguidor-de-luz.avif', descripcion: 'Spotlight profesional para seguir al protagonista en ceremonias y presentaciones.', paquetes: [
    { nombre: 'Momento Estelar', slug: 'paquete-momento-estelar' },
    { nombre: '2 Seguidores', slug: 'paquete-2-seguidores' },
    { nombre: 'Recepción Completa', slug: 'paquete-recepcion-completa' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
] as const;

// -- Servicios: Audio (4 items con paquetes) --
export const AUDIO_SERVICES = [
  { nombre: 'Bocinas para Bodas', slug: 'bocinas-para-bodas', imagen: '/img/img-index/bocinas-para-bodas.avif', descripcion: 'Audio profesional JBL calibrado para ceremonias y fiestas de boda.', paquetes: [
    { nombre: 'Solo Ceremonia', slug: 'paquete-solo-ceremonia' },
    { nombre: 'Boda Completa', slug: 'paquete-boda-completa' },
    { nombre: 'Boda con DJ', slug: 'paquete-boda-con-dj' },
    { nombre: 'Producción Boda', slug: 'paquete-produccion-boda' },
  ]},
  { nombre: 'Bocinas para XV Años', slug: 'bocinas-para-xv-anos', imagen: '/img/img-index/bocinas-para-xv-anos.avif', descripcion: 'Sistemas de sonido potentes para quinceañeras con hasta 300 invitados.', paquetes: [
    { nombre: 'XV Básico', slug: 'paquete-xv-basico' },
    { nombre: 'XV Completo', slug: 'paquete-xv-completo' },
    { nombre: 'XV con DJ y Luces', slug: 'paquete-xv-dj-luces' },
    { nombre: 'XV Producción', slug: 'paquete-xv-produccion' },
  ]},
  { nombre: 'Bocinas para Fiestas', slug: 'bocinas-para-fiestas', imagen: '/img/img-index/bocinas-para-fiestas.avif', descripcion: 'Bocinas de alta potencia para fiestas privadas, cumpleaños y reuniones.', paquetes: [
    { nombre: 'Fiesta en Casa', slug: 'paquete-fiesta-casa' },
    { nombre: 'Fiesta en Jardín', slug: 'paquete-fiesta-jardin' },
    { nombre: 'Fiesta en Salón', slug: 'paquete-fiesta-salon' },
    { nombre: 'Fiesta Masiva', slug: 'paquete-fiesta-masiva' },
  ]},
  { nombre: 'Audio para Conferencias', slug: 'audio-para-conferencias', imagen: '/img/img-index/conferencias.avif', descripcion: 'Sistemas de audio con micrófonos inalámbricos para eventos corporativos.', paquetes: [
    { nombre: 'Sala de Juntas', slug: 'paquete-sala-juntas' },
    { nombre: 'Conferencia Salón', slug: 'paquete-conferencia-salon' },
    { nombre: 'Auditorio', slug: 'paquete-auditorio' },
    { nombre: 'Producción Congreso', slug: 'paquete-produccion-congreso' },
  ]},
] as const;

// -- Servicios: Equipos especiales (8 items con paquetes) --
export const EQUIPOS_SERVICES = [
  { nombre: 'Bolas Disco', slug: 'bolas-disco', imagen: '/img/img-index/bolas-disco.avif', descripcion: 'Bolas disco profesionales con LED integrado para ambientes festivos.', paquetes: [
    { nombre: 'Bola 30 cm', slug: 'paquete-30cm' },
    { nombre: 'Bola 60 cm', slug: 'paquete-60cm' },
    { nombre: 'Bola 90 cm', slug: 'paquete-90cm' },
    { nombre: 'Bola 120 cm', slug: 'paquete-120cm' },
  ]},
  { nombre: 'Máquina de Confeti', slug: 'maquina-de-confeti', imagen: '/img/img-index/maquina-de-confeti.avif', descripcion: 'Cañones de confeti para momentos de celebración espectaculares.', paquetes: [
    { nombre: '2 Cañones', slug: 'paquete-2-canones' },
    { nombre: '4 Cañones', slug: 'paquete-4-canones' },
    { nombre: 'Confeti Biodegradable', slug: 'paquete-confeti-biodegradable' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Renta de Podium', slug: 'renta-de-podium', imagen: '/img/img-index/renta-de-podium.avif', descripcion: 'Podiums profesionales para conferencias y presentaciones corporativas.', paquetes: [
    { nombre: '1 Podium', slug: 'paquete-1-podium' },
    { nombre: '2 Podiums', slug: 'paquete-2-podiums' },
    { nombre: 'Congreso', slug: 'paquete-congreso' },
    { nombre: 'Escenario Completo', slug: 'paquete-escenario-completo' },
  ]},
  { nombre: 'Pantalla Inflable', slug: 'pantalla-inflable', imagen: '/img/img-index/pantalla-inflable.avif', descripcion: 'Pantallas inflables gigantes para cine al aire libre y proyecciones.', paquetes: [
    { nombre: 'Pantalla 3 metros', slug: 'paquete-3metros' },
    { nombre: 'Pantalla 5 metros', slug: 'paquete-5metros' },
    { nombre: 'Pantalla 8 metros', slug: 'paquete-8metros' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Máquina de Humo', slug: 'maquina-de-humo', imagen: '/img/img-index/maquina-de-humo.avif', descripcion: 'Máquinas de humo profesional para efectos atmosféricos en tu evento.', paquetes: [
    { nombre: 'DJ y Fiesta', slug: 'paquete-dj-fiesta' },
    { nombre: 'Noche Completa', slug: 'paquete-noche-completa' },
    { nombre: 'Show Corporativo', slug: 'paquete-show-corporativo' },
    { nombre: 'Festival', slug: 'paquete-festival' },
  ]},
  { nombre: 'Máquina de Burbujas', slug: 'maquina-de-burbujas', imagen: '/img/img-index/maquina-de-burbujas.avif', descripcion: 'Burbujas para bodas, eventos infantiles y momentos mágicos.', paquetes: [
    { nombre: 'Fiesta Infantil', slug: 'paquete-fiesta-infantil' },
    { nombre: 'Boda — Entrada', slug: 'paquete-boda-entrada' },
    { nombre: 'Burbujas Gigantes', slug: 'paquete-burbujas-gigantes' },
    { nombre: 'Producción', slug: 'paquete-produccion' },
  ]},
  { nombre: 'Humo Bajo', slug: 'humo-bajo', imagen: '/img/img-index/humo-bajo.avif', descripcion: 'Efecto "bailando en las nubes" para primer baile y momentos especiales.', paquetes: [
    { nombre: 'Vals Único', slug: 'paquete-vals-unico' },
    { nombre: 'Doble Cobertura', slug: 'paquete-doble-cobertura' },
    { nombre: 'Recepción Completa', slug: 'paquete-recepcion-completa' },
    { nombre: 'Producción Premium', slug: 'paquete-produccion-premium' },
  ]},
  { nombre: 'Mesas Picnic', slug: 'mesas-picnic', imagen: '/img/img-index/mesas-picnic.avif', descripcion: 'Mobiliario resistente para celebraciones al aire libre y eventos familiares.', paquetes: [
    { nombre: '4 Mesas', slug: 'paquete-4-mesas' },
    { nombre: '8 Mesas', slug: 'paquete-8-mesas' },
    { nombre: '12 Mesas', slug: 'paquete-12-mesas' },
    { nombre: 'Evento Completo', slug: 'paquete-evento-completo' },
  ]},
] as const;

// -- Navegación principal --
export const NAV_LINKS = [
  {
    label: 'Iluminación',
    href: '/renta-de-iluminacion/',
    children: ILUMINACION_SERVICES.map(s => ({
      label: s.nombre,
      href: `/renta-de-iluminacion/${s.slug}/`,
    })),
  },
  {
    label: 'Audio',
    href: '/renta-de-bocinas/',
    children: AUDIO_SERVICES.map(s => ({
      label: s.nombre,
      href: `/renta-de-bocinas/${s.slug}/`,
    })),
  },
  {
    label: 'Equipos',
    href: '/equipos-para-eventos/',
    children: EQUIPOS_SERVICES.map(s => ({
      label: s.nombre,
      href: `/equipos-para-eventos/${s.slug}/`,
    })),
  },
  { label: 'Luz y Sonido', href: '/luz-y-sonido/' },
  { label: 'Eventos', href: '/eventos/' },
  { label: 'Nosotros', href: '/nosotros/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'Cotizar', href: '/cotizar/' },
] as const;
