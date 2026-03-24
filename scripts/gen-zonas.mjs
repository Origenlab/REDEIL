// =============================================================================
// Generador de páginas de zonas de servicio — REDEIL
// =============================================================================
import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const BASE = join(import.meta.dirname, '..', 'src', 'pages', 'zonas');

// ---------------------------------------------------------------------------
// DATA: 30 zonas con contenido único
// ---------------------------------------------------------------------------
const ZONAS = [
  // ── CDMX (15) ──
  {
    slug: 'polanco',
    nombre: 'Polanco',
    region: 'CDMX',
    heroP1: 'Polanco es sinónimo de exclusividad y sofisticación en la Ciudad de México. Sus venues de primer nivel como el Hotel W, Sofitel, Marquis Reforma, Casa Polanco y el Auditorio Nacional demandan iluminación profesional que esté a la altura de cada celebración.',
    heroP2: 'En REDEIL llevamos equipos de iluminación y sonido a bodas en Campos Elíseos, eventos corporativos en Presidente Masaryk, XV años en salones de Polanco y fiestas privadas en las residencias de Lomas de Chapultepec. Servicio puntual, instalación profesional y la mejor tecnología LED disponible.',
    venues: ['Hotel W México City', 'Sofitel México City Reforma', 'Marquis Reforma', 'Casa Polanco', 'Auditorio Nacional', 'JW Marriott Polanco'],
    colonias: ['Polanco I-V Sección', 'Lomas de Chapultepec', 'Campos Elíseos', 'Bosque de Chapultepec'],
    faq: [
      { pregunta: '¿Cuánto cuesta rentar iluminación para un evento en Polanco?', respuesta: 'Los paquetes de iluminación para eventos en Polanco van desde $3,500 MXN para guirnaldas básicas hasta $25,000+ para producciones completas con cabezas móviles, láser y efectos especiales. El precio final depende del tipo de venue, duración y equipos seleccionados.' },
      { pregunta: '¿Cubren toda la zona de Polanco y alrededores?', respuesta: 'Sí, cubrimos toda la zona de Polanco incluyendo las cinco secciones, Campos Elíseos, Lomas de Chapultepec, Bosque de Chapultepec y alrededores. Nuestro equipo llega puntualmente con todo el equipo necesario.' },
      { pregunta: '¿En qué horarios pueden instalar el equipo en Polanco?', respuesta: 'Nos adaptamos al horario de tu venue. Normalmente instalamos 3-4 horas antes del evento. Para hoteles como el W o Sofitel, coordinamos directamente con el área de banquetes para respetar sus protocolos de acceso.' },
      { pregunta: '¿Qué venues populares atienden en Polanco?', respuesta: 'Hemos trabajado en Hotel W, Sofitel, Marquis Reforma, Casa Polanco, JW Marriott, restaurantes de Masaryk y residencias privadas en Lomas de Chapultepec. Conocemos los accesos y requerimientos de cada venue.' },
      { pregunta: '¿Cómo puedo cotizar iluminación para mi evento en Polanco?', respuesta: 'Envíanos un WhatsApp con la fecha, tipo de evento, venue y número de invitados. Te respondemos en menos de 2 horas con una cotización personalizada sin compromiso.' },
    ],
  },
  {
    slug: 'condesa',
    nombre: 'Condesa',
    region: 'CDMX',
    heroP1: 'La Condesa es uno de los barrios más vibrantes de la Ciudad de México, famosa por su arquitectura art déco, parques arbolados y vida nocturna. Venues como Casa Xipe, Salón Pata Negra, Parker & Lenox, Terraza Condesa DF y el Parque México son escenarios ideales para eventos memorables.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a bodas íntimas en jardines de la Condesa, fiestas en terrazas de la Hipódromo, eventos corporativos en restaurantes de Tamaulipas y celebraciones privadas en casas de la colonia. Equipo LED de última generación con instalación incluida.',
    venues: ['Casa Xipe', 'Salón Pata Negra', 'Parker & Lenox', 'Terraza Condesa DF', 'Parque México', 'Casa Lamm'],
    colonias: ['Condesa', 'Hipódromo', 'Hipódromo Condesa', 'Escandón'],
    faq: [
      { pregunta: '¿Cuánto cuesta rentar iluminación para un evento en la Condesa?', respuesta: 'Nuestros paquetes para la Condesa comienzan desde $3,500 MXN para iluminación básica con guirnaldas. Paquetes completos con audio, luces arquitectónicas y efectos van desde $8,000 hasta $25,000+ MXN según la producción.' },
      { pregunta: '¿Cubren toda la zona de la Condesa?', respuesta: 'Cubrimos Condesa, Hipódromo, Hipódromo Condesa y Escandón. También zonas cercanas como Roma Norte, Roma Sur y Narvarte. Conocemos bien los accesos y restricciones de estacionamiento de la zona.' },
      { pregunta: '¿En qué horarios instalan equipo en la Condesa?', respuesta: 'Instalamos en el horario que tu venue permita, normalmente 3-4 horas antes del evento. Para terrazas y restaurantes de la Condesa, coordinamos con el establecimiento para no afectar su operación.' },
      { pregunta: '¿Qué venues atienden frecuentemente en la Condesa?', respuesta: 'Trabajamos regularmente en Casa Xipe, Salón Pata Negra, Parker & Lenox, terrazas de hoteles boutique, restaurantes en Tamaulipas y Nuevo León, y residencias privadas en toda la colonia.' },
      { pregunta: '¿Cómo cotizo iluminación para mi evento en la Condesa?', respuesta: 'Escríbenos por WhatsApp con los detalles de tu evento: fecha, venue, tipo de celebración y número de invitados. Recibirás tu cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'roma',
    nombre: 'Roma',
    region: 'CDMX',
    heroP1: 'La Roma es el corazón cultural de la CDMX, con casonas históricas convertidas en venues únicos, galerías y espacios creativos. Lugares como Casa Basalta, Salón La Romita, MN Roy, La Barraca Valenciana y el Jardín Pushkin ofrecen atmósferas inigualables para todo tipo de eventos.',
    heroP2: 'En REDEIL entregamos iluminación profesional y audio de alta fidelidad para bodas en casonas de la Roma Norte, fiestas en rooftops de la Roma Sur, eventos corporativos en galerías y celebraciones privadas. Nuestros técnicos conocen los accesos y las particularidades de los venues de esta colonia.',
    venues: ['Casa Basalta', 'Salón La Romita', 'MN Roy', 'La Barraca Valenciana', 'Jardín Pushkin', 'Casa Quimera'],
    colonias: ['Roma Norte', 'Roma Sur', 'Doctores', 'Juárez'],
    faq: [
      { pregunta: '¿Cuánto cuesta rentar iluminación en la Roma?', respuesta: 'Los paquetes van desde $3,500 MXN para guirnaldas básicas hasta $25,000+ MXN para producciones completas. Las casonas de la Roma suelen lucir espectaculares con iluminación arquitectónica desde $6,000 MXN.' },
      { pregunta: '¿Cubren Roma Norte y Roma Sur?', respuesta: 'Sí, cubrimos ambas colonias Roma Norte y Roma Sur, además de Juárez y Doctores. Conocemos perfectamente los accesos, restricciones de carga/descarga y estacionamiento de la zona.' },
      { pregunta: '¿Qué horarios manejan para instalación en la Roma?', respuesta: 'Nos adaptamos al horario de tu venue. Generalmente llegamos 3-4 horas antes. Para casonas y galerías de la Roma, coordinamos el acceso de equipo directamente con el encargado del espacio.' },
      { pregunta: '¿En qué venues de la Roma han trabajado?', respuesta: 'Hemos iluminado eventos en Casa Basalta, Salón La Romita, MN Roy, La Barraca, Casa Quimera, Jardín Pushkin, y decenas de rooftops y casonas privadas en la colonia.' },
      { pregunta: '¿Cómo cotizo para un evento en la Roma?', respuesta: 'Envía un WhatsApp con fecha, venue, tipo de evento y asistentes. Te enviamos cotización personalizada en menos de 2 horas, sin compromiso.' },
    ],
  },
  {
    slug: 'coyoacan',
    nombre: 'Coyoacán',
    region: 'CDMX',
    heroP1: 'Coyoacán combina historia, cultura y tradición como pocos lugares en la CDMX. Sus jardines coloniales, haciendas y espacios como La Casa de las Campanas, Hacienda de Cortés, Foro Cultural Coyoacanense, los Viveros y el Centro de Coyoacán son venues extraordinarios para eventos con carácter.',
    heroP2: 'REDEIL transforma estos espacios mágicos con iluminación profesional LED y audio de alta calidad. Desde bodas en jardines de casas coloniales hasta eventos corporativos en foros culturales, llevamos guirnaldas, luces arquitectónicas, cabezas móviles y sonido profesional a toda la alcaldía de Coyoacán.',
    venues: ['La Casa de las Campanas', 'Hacienda de Cortés', 'Foro Cultural Coyoacanense', 'Viveros de Coyoacán', 'Centro Cultural Elena Garro', 'Museo Frida Kahlo (cercanía)'],
    colonias: ['Centro de Coyoacán', 'Del Carmen', 'Villa Coyoacán', 'Santa Catarina', 'El Rosedal'],
    faq: [
      { pregunta: '¿Cuánto cuesta rentar iluminación en Coyoacán?', respuesta: 'Nuestros paquetes para Coyoacán inician desde $3,500 MXN para guirnaldas. Los jardines y haciendas de la zona lucen espectaculares con iluminación arquitectónica ($6,000+) o paquetes completos de producción ($15,000-$25,000 MXN).' },
      { pregunta: '¿Cubren toda la alcaldía de Coyoacán?', respuesta: 'Sí, cubrimos Centro de Coyoacán, Del Carmen, Villa Coyoacán, Santa Catarina, El Rosedal, Pedregal de San Ángel y colonias cercanas. Servicio con tiempos de instalación garantizados.' },
      { pregunta: '¿En qué horarios instalan en venues de Coyoacán?', respuesta: 'Instalamos 3-4 horas antes de tu evento. Para venues como La Casa de las Campanas o haciendas coloniales, coordinamos el acceso de equipo pesado con el encargado del espacio.' },
      { pregunta: '¿Qué venues populares atienden en Coyoacán?', respuesta: 'Trabajamos frecuentemente en haciendas coloniales del centro, jardines privados, La Casa de las Campanas, foros culturales y restaurantes con terraza en toda la alcaldía.' },
      { pregunta: '¿Cómo cotizo iluminación para Coyoacán?', respuesta: 'Escríbenos por WhatsApp con la fecha, venue, tipo de evento y número de invitados. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'del-valle',
    nombre: 'Del Valle',
    region: 'CDMX',
    heroP1: 'Del Valle es una de las colonias residenciales más importantes de la CDMX, con excelente ubicación y venues versátiles. Salones como La Mansión Del Valle, Salón Mexsi Bokan, el Parque Hundido, restaurantes sobre Insurgentes y numerosos espacios privados son ideales para eventos de todos los tamaños.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a bodas, XV años, eventos corporativos y fiestas privadas en Del Valle. Nuestros paquetes se adaptan desde reuniones íntimas en departamentos hasta grandes celebraciones en salones. Instalación profesional, equipo LED de última generación y soporte técnico durante todo el evento.',
    venues: ['La Mansión Del Valle', 'Salón Mexsi Bokan', 'Parque Hundido', 'World Trade Center CDMX', 'Restaurantes de Insurgentes Sur'],
    colonias: ['Del Valle Centro', 'Del Valle Norte', 'Del Valle Sur', 'Insurgentes Mixcoac', 'Nápoles'],
    faq: [
      { pregunta: '¿Cuánto cuesta la iluminación para eventos en Del Valle?', respuesta: 'Los precios inician desde $3,500 MXN para guirnaldas básicas. Paquetes de iluminación y sonido completos para salones de Del Valle van de $8,000 a $25,000+ MXN dependiendo del tamaño y equipos requeridos.' },
      { pregunta: '¿Cubren toda la colonia Del Valle?', respuesta: 'Sí, cubrimos Del Valle Centro, Norte, Sur, Nápoles, Insurgentes Mixcoac y colonias aledañas. La ubicación céntrica de Del Valle nos permite llegar rápidamente desde nuestra base.' },
      { pregunta: '¿En qué horarios pueden instalar en Del Valle?', respuesta: 'Instalamos en el horario que tu venue requiera, normalmente 3-4 horas antes. Conocemos las restricciones de estacionamiento y carga/descarga de la zona para ser puntuales.' },
      { pregunta: '¿Qué venues atienden en Del Valle?', respuesta: 'Trabajamos en salones sobre Insurgentes, restaurantes privados, departamentos y casas en Del Valle, el World Trade Center y espacios cercanos al Parque Hundido.' },
      { pregunta: '¿Cómo cotizo iluminación en Del Valle?', respuesta: 'Mándanos WhatsApp con fecha, tipo de evento, venue y número de invitados. Cotización personalizada sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'santa-fe',
    nombre: 'Santa Fe',
    region: 'CDMX',
    heroP1: 'Santa Fe es el distrito corporativo más importante de México, hogar de corporativos, centros comerciales de lujo y hoteles cinco estrellas. Venues como el Westin Santa Fe, Hotel Hyatt Regency, Centro Santa Fe, Samara y las terrazas de Torre Virreyes son escenarios premium para eventos de alto nivel.',
    heroP2: 'En REDEIL somos especialistas en iluminación y audio para eventos corporativos en Santa Fe: conferencias, lanzamientos de producto, galas, cenas de gala y celebraciones privadas. Contamos con equipo profesional capaz de transformar cualquier espacio del distrito con tecnología LED de vanguardia.',
    venues: ['Westin Santa Fe', 'Hyatt Regency Santa Fe', 'Centro Santa Fe', 'Samara Santa Fe', 'Torre Virreyes', 'Garden Santa Fe'],
    colonias: ['Santa Fe', 'Lomas de Santa Fe', 'Cruz Manca', 'Contadero', 'Cuajimalpa'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos corporativos en Santa Fe?', respuesta: 'Los paquetes corporativos para Santa Fe van desde $5,000 MXN para conferencias con audio básico hasta $30,000+ MXN para galas con producción completa de iluminación, audio y efectos especiales.' },
      { pregunta: '¿Cubren toda la zona de Santa Fe?', respuesta: 'Sí, cubrimos Santa Fe, Lomas de Santa Fe, Cruz Manca, Contadero y toda la zona de Cuajimalpa. Conocemos los accesos, estacionamientos y protocolos de seguridad de los principales corporativos y hoteles.' },
      { pregunta: '¿En qué horarios instalan en hoteles de Santa Fe?', respuesta: 'Coordinamos con el departamento de banquetes de cada hotel. Normalmente instalamos 4-5 horas antes para eventos corporativos grandes. Para conferencias, 2-3 horas son suficientes.' },
      { pregunta: '¿Qué venues cubren en Santa Fe?', respuesta: 'Hemos trabajado en Westin, Hyatt Regency, salones de Centro Santa Fe, Samara, Torre Virreyes, Garden Santa Fe y oficinas corporativas de todo el distrito.' },
      { pregunta: '¿Cómo cotizo para un evento corporativo en Santa Fe?', respuesta: 'Envíanos un WhatsApp con fecha, venue, tipo de evento corporativo, número de asistentes y requerimientos técnicos. Cotización profesional en menos de 2 horas.' },
    ],
  },
  {
    slug: 'narvarte',
    nombre: 'Narvarte',
    region: 'CDMX',
    heroP1: 'Narvarte es una colonia residencial céntrica que ha experimentado un renacimiento gastronómico y cultural. Sus salones de fiestas, restaurantes con terraza sobre Diagonal de San Antonio, casas con jardín y espacios como el Parque de los Venados ofrecen opciones accesibles para todo tipo de celebraciones.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a fiestas de XV años en salones de Narvarte, bodas íntimas en jardines privados, eventos corporativos en restaurantes y celebraciones familiares. Paquetes desde $3,500 MXN con instalación profesional incluida y soporte técnico durante tu evento.',
    venues: ['Salones sobre Diagonal San Antonio', 'Parque de los Venados', 'Restaurantes de Eje Central', 'Casas con jardín en Narvarte Poniente'],
    colonias: ['Narvarte Poniente', 'Narvarte Oriente', 'Álamos', 'Piedad Narvarte'],
    faq: [
      { pregunta: '¿Cuánto cuesta la iluminación para fiestas en Narvarte?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas, ideales para fiestas en casa o jardín. Paquetes completos con iluminación y audio para salones de Narvarte desde $7,000 hasta $20,000 MXN.' },
      { pregunta: '¿Cubren Narvarte Poniente y Oriente?', respuesta: 'Sí, cubrimos toda la zona de Narvarte: Poniente, Oriente, Álamos y Piedad Narvarte. También colonias cercanas como Del Valle y Portales.' },
      { pregunta: '¿En qué horarios instalan en Narvarte?', respuesta: 'Instalamos 3-4 horas antes de tu evento. Para fiestas en casa o jardín, coordinamos contigo directamente. Para salones, seguimos los horarios del establecimiento.' },
      { pregunta: '¿Qué tipo de eventos cubren en Narvarte?', respuesta: 'Atendemos XV años, bodas, cumpleaños, fiestas familiares, graduaciones y eventos corporativos pequeños en salones, restaurantes, casas y jardines de toda la colonia.' },
      { pregunta: '¿Cómo cotizo iluminación para Narvarte?', respuesta: 'Mándanos WhatsApp con fecha, tipo de evento, lugar y número de invitados. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'san-angel',
    nombre: 'San Ángel',
    region: 'CDMX',
    heroP1: 'San Ángel es una de las zonas más elegantes y tradicionales de la CDMX, con calles empedradas, haciendas coloniales y jardines espectaculares. Venues como la Ex Hacienda de Goicoechea, Museo Casa Estudio Diego Rivera, San Ángel Inn, Jardín del Arte y Bazaar Sábado crean atmósferas únicas para eventos.',
    heroP2: 'En REDEIL transformamos las haciendas y jardines de San Ángel con iluminación profesional que realza la arquitectura colonial. Guirnaldas Edison en patios empedrados, luces arquitectónicas en fachadas históricas, y audio cristalino para ceremonias al aire libre. Experiencia comprobada en los venues más exigentes de la zona.',
    venues: ['Ex Hacienda de Goicoechea', 'San Ángel Inn', 'Museo Casa Estudio Diego Rivera', 'Jardín del Arte', 'Bazaar Sábado', 'Restaurantes de la Plaza San Jacinto'],
    colonias: ['San Ángel', 'San Ángel Inn', 'Guadalupe Inn', 'Chimalistac', 'Tlacopac'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para una boda en San Ángel?', respuesta: 'Las bodas en haciendas de San Ángel típicamente requieren paquetes de $8,000 a $25,000 MXN que incluyen guirnaldas, uplighting arquitectónico y audio. Paquetes básicos desde $3,500 MXN.' },
      { pregunta: '¿Cubren toda la zona de San Ángel?', respuesta: 'Sí, cubrimos San Ángel, San Ángel Inn, Guadalupe Inn, Chimalistac, Tlacopac y áreas cercanas. Conocemos los accesos especiales de las haciendas y calles empedradas de la zona.' },
      { pregunta: '¿En qué horarios instalan en haciendas de San Ángel?', respuesta: 'Normalmente 4-5 horas antes para bodas en haciendas. Coordinamos con el venue el acceso para equipo pesado, especialmente importante en calles empedradas con acceso limitado.' },
      { pregunta: '¿Qué venues atienden en San Ángel?', respuesta: 'Hemos iluminado eventos en Ex Hacienda de Goicoechea, San Ángel Inn, jardines privados en Chimalistac, restaurantes de la Plaza San Jacinto y residencias exclusivas de la zona.' },
      { pregunta: '¿Cómo cotizo para un evento en San Ángel?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de celebración y número de invitados. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'pedregal',
    nombre: 'Pedregal',
    region: 'CDMX',
    heroP1: 'El Pedregal de San Ángel es una de las zonas residenciales más exclusivas de México, con residencias de arquitectura moderna rodeadas de jardines de roca volcánica. Venues privados en Jardines del Pedregal, Pedregal de San Ángel, y cercanía con centros como Perisur hacen de esta zona un destino premium para eventos.',
    heroP2: 'REDEIL ofrece iluminación y sonido de alta gama para eventos privados en residencias del Pedregal. Desde fiestas en jardines con guirnaldas y luces arquitectónicas hasta producciones completas con cabezas móviles y audio profesional. Equipo y personal que cumplen con los estándares de exclusividad de la zona.',
    venues: ['Residencias en Jardines del Pedregal', 'Perisur', 'Club de Golf México', 'Restaurantes de Insurgentes Sur', 'Centros de convenciones cercanos'],
    colonias: ['Jardines del Pedregal', 'Pedregal de San Ángel', 'Pedregal de Santo Domingo', 'Héroes de Padierna'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para fiestas en el Pedregal?', respuesta: 'Los paquetes para eventos en el Pedregal van desde $5,000 MXN para iluminación decorativa hasta $30,000+ MXN para producciones completas en residencias grandes. El precio varía según el tamaño del jardín y los equipos seleccionados.' },
      { pregunta: '¿Cubren toda la zona del Pedregal?', respuesta: 'Sí, cubrimos Jardines del Pedregal, Pedregal de San Ángel, Pedregal de Santo Domingo y colonias aledañas incluyendo Héroes de Padierna y cercanías de Periférico Sur.' },
      { pregunta: '¿En qué horarios instalan en residencias del Pedregal?', respuesta: 'Nos adaptamos al horario que necesites. Para eventos en residencias privadas normalmente instalamos 4-5 horas antes. Nuestro equipo respeta protocolos de seguridad de fraccionamientos cerrados.' },
      { pregunta: '¿Qué tipo de eventos cubren en el Pedregal?', respuesta: 'Bodas de jardín, cumpleaños, XV años, cenas de gala, eventos corporativos privados, celebraciones de fin de año y fiestas temáticas en residencias exclusivas del Pedregal.' },
      { pregunta: '¿Cómo cotizo para mi evento en el Pedregal?', respuesta: 'Envíanos WhatsApp con fecha, dirección aproximada, tipo de evento y número de invitados. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'xochimilco',
    nombre: 'Xochimilco',
    region: 'CDMX',
    heroP1: 'Xochimilco, Patrimonio de la Humanidad por la UNESCO, ofrece venues únicos e irrepetibles. Desde eventos en trajineras y embarcaderos como Nativitas y Cuemanco, hasta haciendas, jardines y quintas como la Quinta San Cristóbal y espacios junto a los icónicos canales y chinampas.',
    heroP2: 'REDEIL transforma los espacios mágicos de Xochimilco con iluminación LED profesional y audio de calidad. Guirnaldas sobre embarcaderos, luces arquitectónicas en haciendas, city color para jardines nocturnos y sonido cristalino para ceremonias al aire libre. Equipo preparado para exteriores y condiciones de campo.',
    venues: ['Embarcadero Nativitas', 'Embarcadero Cuemanco', 'Quinta San Cristóbal', 'Haciendas de Xochimilco', 'Jardines junto a los canales'],
    colonias: ['Centro de Xochimilco', 'Nativitas', 'San Lorenzo', 'Santa Cruz Acalpixca', 'San Gregorio Atlapulco'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Xochimilco?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Eventos en quintas y jardines de Xochimilco con iluminación completa van de $8,000 a $20,000 MXN. Incluimos generador eléctrico cuando el venue lo requiere.' },
      { pregunta: '¿Cubren toda la alcaldía de Xochimilco?', respuesta: 'Sí, cubrimos el centro de Xochimilco, embarcaderos, Nativitas, San Lorenzo, Santa Cruz y todas las quintas y haciendas de la zona. Conocemos bien los accesos rurales de la alcaldía.' },
      { pregunta: '¿Manejan equipo apto para exteriores en Xochimilco?', respuesta: 'Sí, todo nuestro equipo es apto para exteriores. Para venues sin toma eléctrica cercana, llevamos generadores silenciosos. Nuestras guirnaldas y luces LED son resistentes a la humedad.' },
      { pregunta: '¿En qué venues de Xochimilco han trabajado?', respuesta: 'Hemos iluminado eventos en Quinta San Cristóbal, embarcaderos Nativitas y Cuemanco, haciendas y jardines privados, y quintas en todo Xochimilco.' },
      { pregunta: '¿Cómo cotizo iluminación para Xochimilco?', respuesta: 'Escríbenos por WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'tlalpan',
    nombre: 'Tlalpan',
    region: 'CDMX',
    heroP1: 'Tlalpan ofrece una mezcla única de ambiente pueblerino y naturaleza dentro de la CDMX. Su centro histórico con casonas coloniales, venues como la Quinta de Tlalpan, Hacienda de Tlalpan, el Bosque de Tlalpan, y espacios cercanos al Ajusco crean escenarios extraordinarios para eventos con personalidad.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a bodas en haciendas de Tlalpan, celebraciones en jardines del Ajusco, eventos en el centro histórico y fiestas privadas. Nuestro equipo LED transforma patios coloniales y jardines boscosos en espacios mágicos para cualquier celebración.',
    venues: ['Quinta de Tlalpan', 'Hacienda de Tlalpan', 'Bosque de Tlalpan', 'Centro Histórico de Tlalpan', 'Parque Nacional Ajusco'],
    colonias: ['Centro de Tlalpan', 'Fuentes de Tepepan', 'Héroes de Padierna', 'Pedregal de San Nicolás', 'Ajusco'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Tlalpan?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Bodas en haciendas y quintas de Tlalpan con iluminación completa van de $8,000 a $22,000 MXN. Incluimos generador cuando el venue lo requiere.' },
      { pregunta: '¿Cubren toda la alcaldía de Tlalpan?', respuesta: 'Sí, cubrimos el centro de Tlalpan, Fuentes de Tepepan, Héroes de Padierna, Pedregal de San Nicolás y hasta la zona del Ajusco. Nuestro equipo está preparado para venues rurales y boscosos.' },
      { pregunta: '¿Trabajan en venues al aire libre en Tlalpan?', respuesta: 'Sí, somos especialistas en iluminación exterior. Para jardines y espacios del Ajusco sin toma eléctrica, llevamos generadores silenciosos. Todo nuestro equipo es resistente para exteriores.' },
      { pregunta: '¿Qué venues cubren en Tlalpan?', respuesta: 'Hacienda de Tlalpan, Quinta de Tlalpan, jardines y quintas del centro histórico, espacios cercanos al Bosque de Tlalpan y venues privados en toda la alcaldía.' },
      { pregunta: '¿Cómo cotizo para un evento en Tlalpan?', respuesta: 'Envíanos WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'benito-juarez',
    nombre: 'Benito Juárez',
    region: 'CDMX',
    heroP1: 'La alcaldía Benito Juárez es una de las más prósperas y mejor conectadas de la CDMX. Con venues como el World Trade Center, Salón 360, restaurantes de la Nápoles, espacios del Parque Hundido y salones sobre Insurgentes Sur, es una ubicación estratégica para eventos corporativos y sociales.',
    heroP2: 'REDEIL atiende eventos en toda Benito Juárez con iluminación y sonido profesional. Desde conferencias en el WTC hasta bodas en salones de la Nápoles, XV años en Del Valle y fiestas privadas en Mixcoac. Equipo LED de última generación con instalación y soporte técnico incluidos.',
    venues: ['World Trade Center CDMX', 'Salón 360', 'Parque Hundido', 'Restaurantes de Nápoles', 'Salones de Insurgentes Sur'],
    colonias: ['Nápoles', 'Del Valle', 'Mixcoac', 'Narvarte', 'Xoco', 'Portales'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Benito Juárez?', respuesta: 'Paquetes desde $3,500 MXN para iluminación básica. Eventos corporativos en el WTC o salones de Insurgentes van de $8,000 a $25,000+ MXN según la escala de producción requerida.' },
      { pregunta: '¿Cubren toda la alcaldía Benito Juárez?', respuesta: 'Sí, cubrimos Nápoles, Del Valle, Mixcoac, Narvarte, Xoco y Portales. La ubicación céntrica de la alcaldía nos permite llegar rápidamente a cualquier venue.' },
      { pregunta: '¿Atienden eventos corporativos en Benito Juárez?', respuesta: 'Es una de nuestras especialidades en esta zona. Hemos montado iluminación y audio para conferencias, lanzamientos, galas y eventos corporativos en el WTC, hoteles y salones de la alcaldía.' },
      { pregunta: '¿Qué venues cubren en Benito Juárez?', respuesta: 'World Trade Center, Salón 360, salones sobre Insurgentes, restaurantes de Nápoles, terrazas en Xoco y espacios privados en toda la alcaldía.' },
      { pregunta: '¿Cómo cotizo para Benito Juárez?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'miguel-hidalgo',
    nombre: 'Miguel Hidalgo',
    region: 'CDMX',
    heroP1: 'Miguel Hidalgo es una de las alcaldías más emblemáticas de la CDMX, hogar de Polanco, Lomas de Chapultepec, Bosque de Chapultepec y Nuevo Polanco. Venues como el Castillo de Chapultepec, Museo Tamayo, Sala de Armas, Hipódromo de las Américas y hoteles de Reforma hacen de esta zona un destino de eventos de primer nivel.',
    heroP2: 'En REDEIL ofrecemos iluminación y sonido para los eventos más exigentes de Miguel Hidalgo. Desde galas en museos hasta bodas en jardines de Lomas, eventos corporativos en hoteles de Reforma y fiestas en Nuevo Polanco. Equipo profesional, técnicos especializados y servicio de primera.',
    venues: ['Castillo de Chapultepec', 'Museo Tamayo', 'Sala de Armas', 'Hipódromo de las Américas', 'Hoteles de Paseo de la Reforma', 'Antara Fashion Hall'],
    colonias: ['Polanco', 'Lomas de Chapultepec', 'Nuevo Polanco', 'Anzures', 'Granada', 'Verónica Anzures'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Miguel Hidalgo?', respuesta: 'Los paquetes van desde $3,500 MXN para iluminación básica hasta $30,000+ MXN para producciones de gala en venues premium como museos y hoteles de la zona.' },
      { pregunta: '¿Cubren toda la alcaldía Miguel Hidalgo?', respuesta: 'Sí, cubrimos Polanco, Lomas de Chapultepec, Nuevo Polanco, Anzures, Granada, Bosque de Chapultepec y todas las colonias de la alcaldía.' },
      { pregunta: '¿Trabajan con hoteles sobre Reforma?', respuesta: 'Sí, tenemos experiencia en hoteles como St. Regis, Four Seasons, Marquis Reforma y otros sobre Paseo de la Reforma. Coordinamos directamente con sus equipos de banquetes.' },
      { pregunta: '¿Qué venues atienden en Miguel Hidalgo?', respuesta: 'Castillo de Chapultepec, Museo Tamayo, Sala de Armas, Hipódromo de las Américas, Antara, hoteles de Reforma y residencias en Lomas de Chapultepec.' },
      { pregunta: '¿Cómo cotizo para Miguel Hidalgo?', respuesta: 'Escríbenos por WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización profesional en menos de 2 horas.' },
    ],
  },
  {
    slug: 'cuauhtemoc',
    nombre: 'Cuauhtémoc',
    region: 'CDMX',
    heroP1: 'La alcaldía Cuauhtémoc es el corazón de la Ciudad de México. Desde el Centro Histórico con el Palacio de Bellas Artes y la Torre Latinoamericana, hasta la Zona Rosa, Reforma y la Juárez, alberga venues icónicos como el Casino Español, Salón Los Ángeles, Terraza Catedral y cientos de restaurantes y hoteles.',
    heroP2: 'REDEIL ilumina eventos en los venues más emblemáticos de Cuauhtémoc. Bodas en el Centro Histórico, eventos corporativos en hoteles de Reforma, fiestas en la Zona Rosa y celebraciones en la Juárez. Nuestro equipo profesional transforma cualquier espacio con iluminación LED y audio de alta calidad.',
    venues: ['Casino Español', 'Salón Los Ángeles', 'Terraza Catedral', 'Palacio de Bellas Artes (cercanía)', 'Hoteles de Reforma', 'Zona Rosa'],
    colonias: ['Centro Histórico', 'Zona Rosa', 'Juárez', 'Tabacalera', 'San Rafael', 'Santa María la Ribera'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Cuauhtémoc?', respuesta: 'Paquetes desde $3,500 MXN. Eventos en venues del Centro Histórico o Reforma con producción completa van de $10,000 a $30,000+ MXN según la escala y requerimientos técnicos.' },
      { pregunta: '¿Cubren toda la alcaldía Cuauhtémoc?', respuesta: 'Sí, cubrimos Centro Histórico, Zona Rosa, Juárez, Tabacalera, San Rafael, Santa María la Ribera y todas las colonias de la alcaldía.' },
      { pregunta: '¿Pueden instalar en venues del Centro Histórico?', respuesta: 'Sí, conocemos los accesos y restricciones del Centro Histórico. Coordinamos permisos de carga/descarga y respetamos los horarios permitidos para ingreso de equipo.' },
      { pregunta: '¿Qué venues atienden en Cuauhtémoc?', respuesta: 'Casino Español, Salón Los Ángeles, terrazas del Centro Histórico, hoteles sobre Reforma, restaurantes de la Juárez y Zona Rosa, y espacios de Santa María la Ribera.' },
      { pregunta: '¿Cómo cotizo para un evento en Cuauhtémoc?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización personalizada en menos de 2 horas, sin compromiso.' },
    ],
  },
  {
    slug: 'azcapotzalco',
    nombre: 'Azcapotzalco',
    region: 'CDMX',
    heroP1: 'Azcapotzalco combina tradición industrial con zonas residenciales llenas de vida. Espacios como el Foro Cultural Azcapotzalco, salones de fiestas sobre Avenida de las Granjas, el Jardín Hidalgo, quintas en San Pedro Xalpa y centros sociales ofrecen venues accesibles para todo tipo de celebraciones.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a bodas, XV años, graduaciones, fiestas de cumpleaños y eventos familiares en toda la alcaldía de Azcapotzalco. Paquetes accesibles desde $3,500 MXN con instalación profesional incluida y la mejor calidad en equipo LED.',
    venues: ['Foro Cultural Azcapotzalco', 'Salones de Avenida de las Granjas', 'Jardín Hidalgo', 'Quintas en San Pedro Xalpa', 'Centro Social Azcapotzalco'],
    colonias: ['Centro de Azcapotzalco', 'Clavería', 'San Pedro Xalpa', 'Prohogar', 'Nueva Santa María'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para fiestas en Azcapotzalco?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Paquetes completos de iluminación y sonido para salones de Azcapotzalco van de $6,000 a $18,000 MXN según tamaño y equipos seleccionados.' },
      { pregunta: '¿Cubren toda la alcaldía de Azcapotzalco?', respuesta: 'Sí, cubrimos Centro de Azcapotzalco, Clavería, San Pedro Xalpa, Prohogar, Nueva Santa María y todas las colonias de la alcaldía.' },
      { pregunta: '¿En qué horarios instalan en Azcapotzalco?', respuesta: 'Instalamos 3-4 horas antes de tu evento. Nos adaptamos al horario de tu salón o venue. Para quintas y jardines, coordinamos directamente contigo.' },
      { pregunta: '¿Qué tipo de eventos atienden en Azcapotzalco?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas de empresa y todo tipo de celebraciones familiares en salones, quintas y espacios de la alcaldía.' },
      { pregunta: '¿Cómo cotizo iluminación para Azcapotzalco?', respuesta: 'Mándanos WhatsApp con fecha, tipo de evento, venue y número de invitados. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },

  // ── ESTADO DE MÉXICO (15) ──
  {
    slug: 'naucalpan',
    nombre: 'Naucalpan',
    region: 'Estado de México',
    heroP1: 'Naucalpan de Juárez es uno de los municipios más importantes del Estado de México, con zonas residenciales premium como Lomas Verdes, Ciudad Satélite y Tecamachalco. Venues como el Centro de Convenciones Tlalnepantla-Naucalpan, salones en Lomas Verdes, jardines en Tecamachalco y hoteles de la zona ofrecen espacios de primer nivel.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a eventos en todo Naucalpan. Desde bodas en jardines de Tecamachalco hasta XV años en salones de Lomas Verdes, eventos corporativos y celebraciones familiares. Servicio puntual desde CDMX con instalación profesional incluida.',
    venues: ['Salones en Lomas Verdes', 'Jardines de Tecamachalco', 'Plaza Satélite (cercanía)', 'Hoteles de Periférico Norte', 'Quintas en Naucalpan Centro'],
    colonias: ['Lomas Verdes', 'Tecamachalco', 'Ciudad Satélite', 'Naucalpan Centro', 'San Mateo Nopala'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Naucalpan?', respuesta: 'Paquetes desde $3,500 MXN para iluminación básica. Eventos en salones y jardines de Naucalpan con producción completa van de $7,000 a $22,000 MXN según el tamaño y los equipos requeridos.' },
      { pregunta: '¿Cubren todo Naucalpan?', respuesta: 'Sí, cubrimos Lomas Verdes, Tecamachalco, Ciudad Satélite, Naucalpan Centro, San Mateo Nopala y todas las colonias del municipio. El traslado desde CDMX es rápido por Periférico.' },
      { pregunta: '¿Cobran extra por ir a Naucalpan?', respuesta: 'No cobramos extra por traslado a Naucalpan. El municipio está dentro de nuestra zona de cobertura metropolitana estándar. El precio es el mismo que en CDMX.' },
      { pregunta: '¿Qué venues atienden en Naucalpan?', respuesta: 'Salones de Lomas Verdes, jardines y residencias en Tecamachalco, quintas en Naucalpan Centro, hoteles de Periférico Norte y espacios de eventos en toda la zona.' },
      { pregunta: '¿Cómo cotizo para Naucalpan?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'tlalnepantla',
    nombre: 'Tlalnepantla',
    region: 'Estado de México',
    heroP1: 'Tlalnepantla de Baz es un municipio dinámico del Estado de México con excelente conectividad a la CDMX. Venues como salones sobre Boulevard Ávila Camacho, jardines en Tlalnepantla Centro, el Centro Cultural Mexiquense y espacios en Industrial Vallejo ofrecen opciones para eventos corporativos y sociales.',
    heroP2: 'REDEIL atiende Tlalnepantla con iluminación y sonido profesional para bodas, XV años, eventos corporativos, graduaciones y todo tipo de celebraciones. Equipo LED de última generación, audio JBL profesional e instalación incluida en todos nuestros paquetes.',
    venues: ['Salones de Boulevard Ávila Camacho', 'Jardines de Tlalnepantla Centro', 'Centro Cultural Mexiquense', 'Hoteles de la zona industrial', 'Quintas en San Lucas Patoni'],
    colonias: ['Tlalnepantla Centro', 'Valle Dorado', 'San Lucas Patoni', 'La Romana', 'Viveros del Valle'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Tlalnepantla?', respuesta: 'Paquetes desde $3,500 MXN. Eventos completos en salones de Tlalnepantla con iluminación y audio van de $7,000 a $20,000 MXN dependiendo del venue y la producción.' },
      { pregunta: '¿Cubren todo Tlalnepantla?', respuesta: 'Sí, cubrimos Tlalnepantla Centro, Valle Dorado, San Lucas Patoni, La Romana, Viveros del Valle y todas las colonias. Acceso rápido por Periférico Norte.' },
      { pregunta: '¿Hay costo extra por Tlalnepantla?', respuesta: 'No, Tlalnepantla está dentro de nuestra cobertura metropolitana. No cobramos extra por traslado.' },
      { pregunta: '¿Qué venues cubren en Tlalnepantla?', respuesta: 'Salones sobre Boulevard Ávila Camacho, jardines y quintas del centro, hoteles de la zona y espacios de eventos en Valle Dorado y alrededores.' },
      { pregunta: '¿Cómo cotizo para Tlalnepantla?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'huixquilucan',
    nombre: 'Huixquilucan',
    region: 'Estado de México',
    heroP1: 'Huixquilucan es uno de los municipios más exclusivos del Estado de México, hogar de zonas residenciales premium como Interlomas, La Herradura, Bosque Real y Lomas de Tecamachalco. Venues como el Hotel Presidente Interlomas, salones de Bosque Real, jardines en La Herradura y clubes deportivos ofrecen espacios de lujo.',
    heroP2: 'REDEIL ofrece iluminación y sonido de alta gama para los eventos más exigentes de Huixquilucan. Bodas en residencias de Interlomas, galas en Bosque Real, fiestas privadas en La Herradura y eventos corporativos. Equipo premium y servicio que cumple con los más altos estándares de calidad.',
    venues: ['Hotel Presidente Interlomas', 'Salones de Bosque Real', 'Jardines en La Herradura', 'Clubes deportivos de Interlomas', 'Residencias de Bosque Real'],
    colonias: ['Interlomas', 'La Herradura', 'Bosque Real', 'Lomas de Tecamachalco', 'Jesús del Monte'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Huixquilucan?', respuesta: 'Paquetes desde $5,000 MXN para iluminación decorativa. Eventos premium en residencias de Interlomas o Bosque Real con producción completa van de $10,000 a $30,000+ MXN.' },
      { pregunta: '¿Cubren Interlomas y Bosque Real?', respuesta: 'Sí, cubrimos Interlomas, La Herradura, Bosque Real, Lomas de Tecamachalco, Jesús del Monte y todo Huixquilucan. Conocemos los accesos y protocolos de seguridad de los fraccionamientos cerrados.' },
      { pregunta: '¿Hay cargo extra por ir a Huixquilucan?', respuesta: 'No, Huixquilucan está dentro de nuestra zona metropolitana de cobertura. No hay cargos adicionales por traslado.' },
      { pregunta: '¿Qué tipo de eventos atienden en Huixquilucan?', respuesta: 'Bodas de lujo, fiestas de cumpleaños, XV años, eventos corporativos, galas, cenas de gala y celebraciones exclusivas en residencias, clubes y hoteles de la zona.' },
      { pregunta: '¿Cómo cotizo para Huixquilucan?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'atizapan',
    nombre: 'Atizapán de Zaragoza',
    region: 'Estado de México',
    heroP1: 'Atizapán de Zaragoza ofrece una combinación de zonas residenciales y espacios para eventos rodeados de naturaleza. Venues como jardines y quintas en Atizapán Centro, salones en Ciudad López Mateos, el Parque Bicentenario, espacios en Lomas de Atizapán y haciendas cercanas son ideales para celebraciones familiares.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a bodas, XV años, graduaciones y fiestas familiares en todo Atizapán. Paquetes accesibles con equipo LED de calidad profesional, audio JBL e instalación incluida. Tu evento merece la mejor iluminación sin importar la ubicación.',
    venues: ['Jardines y quintas de Atizapán Centro', 'Salones en Ciudad López Mateos', 'Parque Bicentenario (cercanía)', 'Lomas de Atizapán', 'Haciendas de la zona'],
    colonias: ['Atizapán Centro', 'Ciudad López Mateos', 'Lomas de Atizapán', 'Villa de las Flores', 'El Potrero'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Atizapán?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Eventos completos en jardines y salones de Atizapán con iluminación y audio van de $6,000 a $18,000 MXN.' },
      { pregunta: '¿Cubren todo Atizapán de Zaragoza?', respuesta: 'Sí, cubrimos Atizapán Centro, Ciudad López Mateos, Lomas de Atizapán, Villa de las Flores y todo el municipio. Acceso directo por la autopista Chamapa-Lechería.' },
      { pregunta: '¿Cobran extra por ir a Atizapán?', respuesta: 'No, Atizapán está dentro de nuestra zona metropolitana de cobertura estándar. Sin cargos adicionales por traslado.' },
      { pregunta: '¿Qué venues cubren en Atizapán?', respuesta: 'Jardines, quintas, salones de fiestas, haciendas y residencias privadas en todo el municipio de Atizapán de Zaragoza.' },
      { pregunta: '¿Cómo cotizo para Atizapán?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'satelite',
    nombre: 'Ciudad Satélite',
    region: 'Estado de México',
    heroP1: 'Ciudad Satélite es una de las zonas residenciales más emblemáticas del norte de la Zona Metropolitana, reconocida por las icónicas Torres de Satélite. Con venues como salones en Circuito Centro Comercial, jardines en Satélite, Plaza Satélite, restaurantes de Periférico Norte y residencias con amplios jardines, es perfecta para eventos familiares y corporativos.',
    heroP2: 'REDEIL atiende Ciudad Satélite y colonias aledañas con iluminación y sonido profesional. Guirnaldas para jardines, luces arquitectónicas para salones, audio para fiestas y producción completa para eventos de gran formato. Paquetes desde $3,500 MXN con servicio de primera calidad.',
    venues: ['Plaza Satélite', 'Salones de Circuito Centro Comercial', 'Jardines de Satélite', 'Restaurantes de Periférico Norte', 'Torres de Satélite (referencia)'],
    colonias: ['Ciudad Satélite', 'Circuito Científicos', 'Circuito Ingenieros', 'Lomas de Satélite', 'Viveros de la Loma'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Satélite?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas en jardín. Eventos completos en salones de Satélite con iluminación y audio van de $7,000 a $20,000 MXN según equipos y duración.' },
      { pregunta: '¿Cubren toda la zona de Satélite?', respuesta: 'Sí, cubrimos Ciudad Satélite, todos los circuitos, Lomas de Satélite, Viveros de la Loma y colonias cercanas como Echegaray y Pirules.' },
      { pregunta: '¿Hay cargo extra por Satélite?', respuesta: 'No, Ciudad Satélite está dentro de nuestra zona de cobertura metropolitana. Sin cargos adicionales.' },
      { pregunta: '¿Qué venues atienden en Satélite?', respuesta: 'Salones de fiestas, jardines residenciales, restaurantes de Periférico, terrazas y residencias privadas en toda la zona de Satélite y alrededores.' },
      { pregunta: '¿Cómo cotizo para Satélite?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización en menos de 2 horas.' },
    ],
  },
  {
    slug: 'interlomas',
    nombre: 'Interlomas',
    region: 'Estado de México',
    heroP1: 'Interlomas es una de las zonas residenciales más modernas y exclusivas del poniente de la Zona Metropolitana. Con desarrollos como Bosque Real, La Vista Country Club, Centro Comercial Interlomas, terrazas de departamentos de lujo y clubes deportivos, ofrece venues de primer nivel para eventos sofisticados.',
    heroP2: 'REDEIL ofrece iluminación y sonido premium para eventos en Interlomas. Bodas en terrazas con vista al bosque, fiestas en residencias de Bosque Real, eventos corporativos en salones y celebraciones exclusivas. Equipo LED de vanguardia con instalación profesional y atención personalizada.',
    venues: ['La Vista Country Club', 'Centro Comercial Interlomas', 'Bosque Real Country Club', 'Terrazas residenciales de lujo', 'Salones de eventos de Interlomas'],
    colonias: ['Interlomas', 'Bosque Real', 'La Vista', 'Hacienda de las Palmas', 'La Herradura'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Interlomas?', respuesta: 'Paquetes desde $5,000 MXN. Eventos premium en Interlomas y Bosque Real con producción completa de iluminación y audio van de $10,000 a $30,000+ MXN según la escala del evento.' },
      { pregunta: '¿Cubren Interlomas y Bosque Real?', respuesta: 'Sí, cubrimos toda la zona de Interlomas, Bosque Real, La Vista, Hacienda de las Palmas y La Herradura. Conocemos los accesos de los principales fraccionamientos y condominios.' },
      { pregunta: '¿Cobran extra por Interlomas?', respuesta: 'No, Interlomas está dentro de nuestra cobertura metropolitana estándar. No hay cargos adicionales por traslado.' },
      { pregunta: '¿Qué tipo de eventos cubren en Interlomas?', respuesta: 'Bodas de lujo, fiestas de cumpleaños, XV años, eventos corporativos, cenas de gala y celebraciones privadas en residencias, clubes y terrazas de la zona.' },
      { pregunta: '¿Cómo cotizo para Interlomas?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización personalizada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'metepec',
    nombre: 'Metepec',
    region: 'Estado de México',
    heroP1: 'Metepec es un Pueblo Mágico del Estado de México famoso por su artesanía, arquitectura colonial y calles pintorescas. Venues como haciendas, jardines de eventos, el centro histórico con el Ex Convento de San Juan Bautista, quintas y restaurantes con terraza ofrecen escenarios únicos para celebraciones memorables.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional hasta Metepec para transformar haciendas, jardines y espacios coloniales. Guirnaldas Edison en patios empedrados, luces arquitectónicas en fachadas históricas, audio para ceremonias y producción completa para eventos de cualquier escala.',
    venues: ['Haciendas de Metepec', 'Ex Convento de San Juan Bautista', 'Jardines de eventos', 'Centro histórico de Metepec', 'Restaurantes con terraza'],
    colonias: ['Centro de Metepec', 'San Mateo Atenco (cercanía)', 'La Purísima', 'San Jerónimo Chicahualco', 'Ixtapan de la Sal (cercanía)'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Metepec?', respuesta: 'Paquetes desde $4,500 MXN para guirnaldas incluyendo traslado. Eventos completos en haciendas y jardines de Metepec con producción van de $10,000 a $25,000 MXN.' },
      { pregunta: '¿Cubren Metepec desde CDMX?', respuesta: 'Sí, damos servicio a Metepec y todo el Valle de Toluca. El traslado toma aproximadamente 1 hora por la autopista México-Toluca. Llegamos con tiempo suficiente para instalación.' },
      { pregunta: '¿Hay cargo extra por ir a Metepec?', respuesta: 'Para Metepec y zona de Toluca aplicamos un cargo de traslado que varía según la distancia exacta. Te lo indicamos transparentemente en la cotización.' },
      { pregunta: '¿Qué venues atienden en Metepec?', respuesta: 'Haciendas coloniales, jardines de eventos, quintas, restaurantes del centro histórico y espacios privados en todo Metepec y alrededores.' },
      { pregunta: '¿Cómo cotizo para Metepec?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización detallada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'toluca',
    nombre: 'Toluca',
    region: 'Estado de México',
    heroP1: 'Toluca, capital del Estado de México, ofrece venues impresionantes como el Centro de Convenciones de Toluca, haciendas como La Hacienda, jardines de eventos, el Centro Histórico con el Cosmovitral y salones de hoteles como el Marriott y Fiesta Inn. Una ciudad con tradición y modernidad para eventos de todas las escalas.',
    heroP2: 'REDEIL extiende su servicio profesional de iluminación y sonido hasta Toluca. Bodas en haciendas, eventos corporativos en el Centro de Convenciones, XV años en salones, fiestas en jardines y toda producción audiovisual. Equipo LED de última generación y técnicos especializados.',
    venues: ['Centro de Convenciones de Toluca', 'Haciendas de Toluca', 'Cosmovitral', 'Hotel Marriott Toluca', 'Fiesta Inn Toluca', 'Jardines de eventos'],
    colonias: ['Centro de Toluca', 'Metepec (cercanía)', 'Santa Ana Tlapaltitlán', 'Zinacantepec (cercanía)', 'San Mateo Otzacatipan'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para eventos en Toluca?', respuesta: 'Paquetes desde $4,500 MXN incluyendo traslado. Producciones completas para eventos en Toluca van de $10,000 a $28,000 MXN según la escala del evento y equipos seleccionados.' },
      { pregunta: '¿Dan servicio en Toluca desde CDMX?', respuesta: 'Sí, cubrimos Toluca y todo el Valle de Toluca. El traslado por la autopista México-Toluca es de aproximadamente 1 hora. Nuestro equipo llega con tiempo de sobra para la instalación.' },
      { pregunta: '¿Hay costo extra por traslado a Toluca?', respuesta: 'Para Toluca aplicamos un cargo de traslado que incluimos transparentemente en tu cotización. El monto varía según la ubicación exacta del venue.' },
      { pregunta: '¿Qué venues cubren en Toluca?', respuesta: 'Centro de Convenciones, haciendas, jardines de eventos, hoteles como Marriott y Fiesta Inn, salones del Centro Histórico y espacios privados en todo el Valle de Toluca.' },
      { pregunta: '¿Cómo cotizo para Toluca?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización completa en menos de 2 horas.' },
    ],
  },
  {
    slug: 'ecatepec',
    nombre: 'Ecatepec',
    region: 'Estado de México',
    heroP1: 'Ecatepec de Morelos es el municipio más poblado de México, con una vibrante cultura de celebraciones. Salones de fiestas sobre Vía Morelos, jardines de eventos en San Cristóbal, el centro de Ecatepec, quintas en Jardines de Morelos y espacios en Ciudad Azteca ofrecen venues accesibles para todo tipo de celebraciones.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a fiestas, bodas, XV años, graduaciones y eventos familiares en todo Ecatepec. Paquetes accesibles con equipo de calidad profesional, audio potente e instalación incluida. Transformamos cualquier salón o jardín con la mejor tecnología LED.',
    venues: ['Salones de Vía Morelos', 'Jardines en San Cristóbal', 'Quintas en Jardines de Morelos', 'Centro de Ecatepec', 'Espacios en Ciudad Azteca'],
    colonias: ['Ecatepec Centro', 'Ciudad Azteca', 'San Cristóbal Centro', 'Jardines de Morelos', 'Valle de Anáhuac'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para fiestas en Ecatepec?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Paquetes completos de iluminación y sonido para salones de Ecatepec van de $6,000 a $16,000 MXN según el venue y equipos.' },
      { pregunta: '¿Cubren todo Ecatepec?', respuesta: 'Sí, cubrimos Ecatepec Centro, Ciudad Azteca, San Cristóbal, Jardines de Morelos, Valle de Anáhuac y todas las colonias del municipio.' },
      { pregunta: '¿Hay cargo extra por Ecatepec?', respuesta: 'No, Ecatepec está dentro de nuestra zona de cobertura metropolitana. No hay cargos adicionales por traslado.' },
      { pregunta: '¿Qué tipo de eventos cubren en Ecatepec?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas infantiles y todo tipo de celebraciones familiares en salones, jardines y quintas.' },
      { pregunta: '¿Cómo cotizo para Ecatepec?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'nezahualcoyotl',
    nombre: 'Nezahualcóyotl',
    region: 'Estado de México',
    heroP1: 'Ciudad Nezahualcóyotl es un municipio vibrante con fuerte tradición de celebraciones familiares. Salones de fiestas sobre Avenida Bordo de Xochiaca, jardines en Ciudad Lago, espacios en la zona centro, quintas sobre López Mateos y centros sociales ofrecen venues accesibles para eventos memorables.',
    heroP2: 'REDEIL lleva la mejor iluminación y sonido profesional a las fiestas de Nezahualcóyotl. XV años espectaculares, bodas con iluminación de ensueño, cumpleaños con show de luces y audio potente. Paquetes desde $3,500 MXN con instalación profesional y equipo LED de primera.',
    venues: ['Salones de Avenida Bordo de Xochiaca', 'Jardines de Ciudad Lago', 'Quintas sobre López Mateos', 'Centros sociales', 'Salones del centro'],
    colonias: ['Centro de Nezahualcóyotl', 'Ciudad Lago', 'Impulsora Popular', 'Benito Juárez', 'Rey Nezahualcóyotl'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación para XV años en Neza?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas decorativas. Paquetes completos para XV años con iluminación, efectos y audio van de $6,000 a $15,000 MXN según la producción deseada.' },
      { pregunta: '¿Cubren todo Nezahualcóyotl?', respuesta: 'Sí, cubrimos todo el municipio: Centro, Ciudad Lago, Impulsora Popular, Benito Juárez, Rey Nezahualcóyotl y todas las colonias.' },
      { pregunta: '¿Hay costo extra por ir a Neza?', respuesta: 'No, Nezahualcóyotl está dentro de nuestra zona de cobertura metropolitana estándar. Sin cargos adicionales.' },
      { pregunta: '¿Qué eventos cubren en Nezahualcóyotl?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas infantiles y celebraciones familiares en salones, jardines y quintas de todo el municipio.' },
      { pregunta: '¿Cómo cotizo para Nezahualcóyotl?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'texcoco',
    nombre: 'Texcoco',
    region: 'Estado de México',
    heroP1: 'Texcoco, antigua capital del Acolhuacán, combina historia prehispánica con espacios naturales únicos. Venues como haciendas históricas, los jardines de la Universidad Autónoma Chapingo, quintas en Texcoco Centro, Molino de Flores y el Parque Nacional con vistas al valle ofrecen escenarios extraordinarios.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional hasta Texcoco para bodas en haciendas, celebraciones en jardines, eventos en quintas y producciones al aire libre. Guirnaldas para patios coloniales, luces arquitectónicas, audio de calidad y equipo preparado para venues rurales y al aire libre.',
    venues: ['Molino de Flores', 'Haciendas de Texcoco', 'Universidad Autónoma Chapingo', 'Quintas del centro', 'Parque Nacional Molino de Flores'],
    colonias: ['Texcoco Centro', 'San Miguel Coatlinchán', 'Chapingo', 'San Bernardino', 'La Purificación'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Texcoco?', respuesta: 'Paquetes desde $4,000 MXN para guirnaldas incluyendo traslado. Eventos completos en haciendas y jardines de Texcoco van de $8,000 a $22,000 MXN según la producción.' },
      { pregunta: '¿Dan servicio en Texcoco?', respuesta: 'Sí, cubrimos Texcoco y municipios cercanos. El traslado es de aproximadamente 45 minutos desde CDMX por la autopista Peñón-Texcoco.' },
      { pregunta: '¿Hay cargo extra por Texcoco?', respuesta: 'Para Texcoco puede aplicar un cargo menor de traslado que te indicamos transparentemente en la cotización.' },
      { pregunta: '¿Qué venues cubren en Texcoco?', respuesta: 'Molino de Flores, haciendas coloniales, jardines, quintas del centro, espacios de la Universidad Chapingo y venues rurales de la región.' },
      { pregunta: '¿Cómo cotizo para Texcoco?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización detallada en menos de 2 horas.' },
    ],
  },
  {
    slug: 'coacalco',
    nombre: 'Coacalco',
    region: 'Estado de México',
    heroP1: 'Coacalco de Berriozábal es un municipio residencial del norte de la Zona Metropolitana con excelente conectividad. Salones de fiestas, jardines en Coacalco Centro, espacios en Villa de las Flores, quintas y centros sociales ofrecen venues accesibles para celebraciones familiares y eventos sociales.',
    heroP2: 'REDEIL atiende Coacalco con iluminación y sonido profesional para bodas, XV años, cumpleaños, graduaciones y todo tipo de celebraciones. Equipo LED de calidad profesional, audio potente e instalación incluida en todos nuestros paquetes. Tu fiesta merece la mejor iluminación.',
    venues: ['Salones de Coacalco Centro', 'Jardines de eventos', 'Villa de las Flores', 'Quintas y haciendas', 'Centro Social de Coacalco'],
    colonias: ['Coacalco Centro', 'Villa de las Flores', 'San Francisco', 'Real del Bosque', 'Parque Residencial Coacalco'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Coacalco?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Eventos completos en salones de Coacalco con iluminación y audio van de $6,000 a $16,000 MXN.' },
      { pregunta: '¿Cubren todo Coacalco?', respuesta: 'Sí, cubrimos Coacalco Centro, Villa de las Flores, San Francisco, Real del Bosque y todo el municipio. Acceso rápido por la autopista México-Pachuca.' },
      { pregunta: '¿Hay cargo extra por Coacalco?', respuesta: 'No, Coacalco está dentro de nuestra zona de cobertura metropolitana estándar. Sin cargos adicionales.' },
      { pregunta: '¿Qué eventos cubren en Coacalco?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas infantiles y celebraciones familiares en salones, jardines y quintas.' },
      { pregunta: '¿Cómo cotizo para Coacalco?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización en menos de 2 horas.' },
    ],
  },
  {
    slug: 'cuautitlan-izcalli',
    nombre: 'Cuautitlán Izcalli',
    region: 'Estado de México',
    heroP1: 'Cuautitlán Izcalli es un municipio moderno y planificado del norte del Estado de México. Venues como salones en el centro urbano, jardines de eventos, quintas en Lago de Guadalupe, el Parque Espejo de los Lirios y espacios en fraccionamientos como Arcos del Alba ofrecen opciones para todo tipo de celebraciones.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional a eventos en todo Cuautitlán Izcalli. Paquetes accesibles para XV años, bodas, cumpleaños, graduaciones y fiestas familiares. Equipo LED de última generación con instalación profesional incluida.',
    venues: ['Salones del centro urbano', 'Jardines de eventos', 'Quintas en Lago de Guadalupe', 'Parque Espejo de los Lirios', 'Espacios en Arcos del Alba'],
    colonias: ['Cuautitlán Izcalli Centro', 'Lago de Guadalupe', 'Arcos del Alba', 'La Quebrada', 'Cumbria'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Cuautitlán Izcalli?', respuesta: 'Paquetes desde $3,500 MXN. Eventos completos con iluminación y audio en Cuautitlán Izcalli van de $6,000 a $18,000 MXN según tamaño y equipos.' },
      { pregunta: '¿Cubren todo Cuautitlán Izcalli?', respuesta: 'Sí, cubrimos el centro urbano, Lago de Guadalupe, Arcos del Alba, La Quebrada, Cumbria y todo el municipio. Acceso por la autopista México-Querétaro.' },
      { pregunta: '¿Hay cargo extra por Cuautitlán Izcalli?', respuesta: 'No, Cuautitlán Izcalli está dentro de nuestra cobertura metropolitana. Sin cargos adicionales por traslado.' },
      { pregunta: '¿Qué eventos atienden en Cuautitlán Izcalli?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas infantiles y eventos familiares en salones, jardines y quintas del municipio.' },
      { pregunta: '¿Cómo cotizo para Cuautitlán Izcalli?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
  {
    slug: 'tultitlan',
    nombre: 'Tultitlán',
    region: 'Estado de México',
    heroP1: 'Tultitlán es un municipio con fuerte identidad comunitaria y tradición de celebraciones. Salones de fiestas sobre Vía Gustavo Baz, jardines de eventos, quintas en Tultitlán Centro, espacios en San Pablo de las Salinas y centros sociales ofrecen venues accesibles para fiestas y eventos familiares.',
    heroP2: 'REDEIL lleva la mejor iluminación y sonido a las celebraciones de Tultitlán. XV años con show de luces, bodas elegantes, cumpleaños espectaculares y fiestas familiares con audio profesional. Paquetes desde $3,500 MXN con equipo LED e instalación incluida.',
    venues: ['Salones de Vía Gustavo Baz', 'Jardines de eventos', 'Quintas en Tultitlán Centro', 'San Pablo de las Salinas', 'Centros sociales'],
    colonias: ['Tultitlán Centro', 'San Pablo de las Salinas', 'Fuentes del Valle', 'Buenavista', 'Santiago Teyahualco'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Tultitlán?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Eventos completos en salones de Tultitlán con iluminación y audio van de $6,000 a $16,000 MXN.' },
      { pregunta: '¿Cubren todo Tultitlán?', respuesta: 'Sí, cubrimos Tultitlán Centro, San Pablo de las Salinas, Fuentes del Valle, Buenavista y todo el municipio.' },
      { pregunta: '¿Hay cargo extra por Tultitlán?', respuesta: 'No, Tultitlán está dentro de nuestra cobertura metropolitana estándar. Sin cargos adicionales.' },
      { pregunta: '¿Qué eventos cubren en Tultitlán?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos y todo tipo de celebraciones en salones, jardines y quintas del municipio.' },
      { pregunta: '¿Cómo cotizo para Tultitlán?', respuesta: 'Mándanos WhatsApp con fecha, venue, tipo de evento y asistentes. Cotización en menos de 2 horas.' },
    ],
  },
  {
    slug: 'chalco',
    nombre: 'Chalco',
    region: 'Estado de México',
    heroP1: 'Chalco de Díaz Covarrubias combina historia y crecimiento urbano en el oriente del Estado de México. Venues como haciendas y quintas, salones sobre la carretera México-Cuautla, jardines de eventos, el centro histórico y espacios en Valle de Chalco ofrecen opciones accesibles para celebraciones de todas las escalas.',
    heroP2: 'REDEIL lleva iluminación y sonido profesional hasta Chalco para bodas, XV años, graduaciones, cumpleaños y eventos familiares. Paquetes accesibles con equipo LED de calidad profesional, audio potente e instalación incluida. No importa la ubicación, tu evento merece la mejor producción.',
    venues: ['Haciendas de Chalco', 'Salones de carretera México-Cuautla', 'Jardines de eventos', 'Centro histórico de Chalco', 'Quintas en Valle de Chalco'],
    colonias: ['Chalco Centro', 'Valle de Chalco Solidaridad', 'San Martín Cuautlalpan', 'Xico', 'Santa Catarina Ayotzingo'],
    faq: [
      { pregunta: '¿Cuánto cuesta iluminación en Chalco?', respuesta: 'Paquetes desde $3,500 MXN para guirnaldas. Eventos completos en salones y jardines de Chalco con iluminación y audio van de $6,000 a $16,000 MXN.' },
      { pregunta: '¿Dan servicio en Chalco?', respuesta: 'Sí, cubrimos Chalco Centro, Valle de Chalco Solidaridad, San Martín Cuautlalpan y todo el municipio. Llegamos por la autopista México-Puebla.' },
      { pregunta: '¿Hay cargo extra por Chalco?', respuesta: 'Para Chalco puede aplicar un cargo menor de traslado que incluimos transparentemente en tu cotización.' },
      { pregunta: '¿Qué eventos cubren en Chalco?', respuesta: 'XV años, bodas, cumpleaños, graduaciones, bautizos, fiestas infantiles y celebraciones familiares en salones, jardines, haciendas y quintas.' },
      { pregunta: '¿Cómo cotizo para Chalco?', respuesta: 'Envía WhatsApp con fecha, venue, tipo de evento y número de invitados. Cotización sin compromiso en menos de 2 horas.' },
    ],
  },
];

// ---------------------------------------------------------------------------
// Services to recommend in zone pages
// ---------------------------------------------------------------------------
const SERVICIOS_RECOMENDADOS = [
  { nombre: 'Guirnaldas de Luces', href: '/renta-de-iluminacion/guirnaldas/', desc: 'Luces vintage Edison para jardines y exteriores' },
  { nombre: 'Luces Arquitectónicas', href: '/renta-de-iluminacion/luces-arquitectonicas/', desc: 'Uplighting para resaltar fachadas y columnas' },
  { nombre: 'Cabezas Móviles', href: '/renta-de-iluminacion/cabezas-moviles/', desc: 'Show de luces robóticas para pistas de baile' },
  { nombre: 'Bocinas para Bodas', href: '/renta-de-bocinas/bocinas-para-bodas/', desc: 'Audio profesional JBL para ceremonias y fiestas' },
  { nombre: 'Humo Bajo', href: '/equipos-para-eventos/humo-bajo/', desc: 'Efecto "bailando en las nubes" para primer baile' },
  { nombre: 'Máquina de Confeti', href: '/equipos-para-eventos/maquina-de-confeti/', desc: 'Cañones de confeti para momentos especiales' },
  { nombre: 'Cascadas LED', href: '/renta-de-iluminacion/cascadas-led/', desc: 'Cortinas de luz LED para decoración de salones' },
  { nombre: 'Proyector de Gobos', href: '/renta-de-iluminacion/proyector-de-gobos/', desc: 'Proyección de logos e iniciales personalizadas' },
];

// ---------------------------------------------------------------------------
// TEMPLATE: Individual zone page
// ---------------------------------------------------------------------------
function zoneTemplate(z) {
  return `---
import Base from '../../../layouts/Base.astro';
import TopBar from '../../../components/TopBar.astro';
import Header from '../../../components/Header.astro';
import Hero from '../../../components/Hero.astro';
import Breadcrumb from '../../../components/Breadcrumb.astro';
import FaqSection from '../../../components/FaqSection.astro';
import Footer from '../../../components/Footer.astro';
import WhatsAppBubble from '../../../components/WhatsAppBubble.astro';
import { faqSchema, localBusinessSchema, breadcrumbSchema } from '../../../lib/seo';
import { WHATSAPP_URL_MSG, SITE_URL } from '../../../lib/config';

const faqItems = ${JSON.stringify(z.faq, null, 2)};

const structuredData = [
  localBusinessSchema(),
  faqSchema(faqItems),
  breadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Zonas de Servicio', url: '/zonas/' },
    { name: '${z.nombre}', url: '/zonas/${z.slug}/' },
  ]),
];
---

<Base
  title="Renta de Iluminación y Sonido en ${z.nombre} | REDEIL"
  description="Renta de iluminación, audio y efectos para eventos en ${z.nombre}. Guirnaldas, luces LED, sonido profesional. Instalación incluida. Cotiza hoy."
  structuredData={structuredData}
>
  <TopBar />
  <Header />
  <Breadcrumb items={[
    { name: 'Zonas de Servicio', href: '/zonas/' },
    { name: '${z.nombre}', href: '/zonas/${z.slug}/' },
  ]} />

  <Hero
    badge="${z.region}"
    title="Renta de Iluminación y Sonido en ${z.nombre}"
    description="Iluminación profesional LED, audio de alta fidelidad y efectos especiales para bodas, XV años, eventos corporativos y fiestas en ${z.nombre}."
    primaryCta={{ text: 'Cotizar ahora', href: WHATSAPP_URL_MSG }}
    secondaryCta={{ text: 'Ver servicios', href: '#servicios' }}
  >
    <Fragment slot="hero-seo">
      <p>${z.heroP1}</p>
      <p>${z.heroP2}</p>
    </Fragment>
  </Hero>

  <!-- Servicios recomendados -->
  <section class="section" id="servicios">
    <div class="container">
      <h2 class="section__title">Servicios de Iluminación y Sonido en ${z.nombre}</h2>
      <p class="section__subtitle">Equipo profesional que llevamos hasta tu venue en ${z.nombre}. Instalación y soporte técnico incluidos.</p>
      <div class="servicios-grid">
${SERVICIOS_RECOMENDADOS.map(s => `        <a href="${s.href}" class="servicio-card">
          <h3 class="servicio-card__title">${s.nombre}</h3>
          <p class="servicio-card__desc">${s.desc}</p>
          <span class="servicio-card__link">Ver paquetes →</span>
        </a>`).join('\n')}
      </div>
    </div>
  </section>

  <!-- Venues y cobertura -->
  <section class="section section--bg">
    <div class="container content-prose">
      <h2>Venues y Espacios que Atendemos en ${z.nombre}</h2>
      <p>Nuestro equipo conoce los principales venues de ${z.nombre} y sus requerimientos técnicos. Coordinamos directamente con cada espacio para garantizar una instalación impecable.</p>
      <div class="venues-grid">
        <div class="venues-col">
          <h3>Venues Populares</h3>
          <ul>
${z.venues.map(v => `            <li>${v}</li>`).join('\n')}
          </ul>
        </div>
        <div class="venues-col">
          <h3>Colonias que Cubrimos</h3>
          <ul>
${z.colonias.map(c => `            <li>${c}</li>`).join('\n')}
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA WhatsApp -->
  <section class="section cta-zona">
    <div class="container cta-zona__inner">
      <h2 class="cta-zona__title">¿Tienes un evento en ${z.nombre}?</h2>
      <p class="cta-zona__desc">Cuéntanos los detalles y recibe tu cotización personalizada en menos de 2 horas. Sin compromiso.</p>
      <a href={WHATSAPP_URL_MSG} target="_blank" rel="noopener" class="btn btn--wa">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 0 0 .917.918l4.462-1.494A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.703-6.32-1.905l-.44-.295-2.641.884.884-2.638-.306-.453A9.958 9.958 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        Cotizar por WhatsApp
      </a>
    </div>
  </section>

  <FaqSection items={faqItems} />

  <Footer />
  <WhatsAppBubble />
</Base>

<style>
  .section__title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }
  .section__subtitle {
    font-size: var(--font-size-lg);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-xl);
    max-width: 640px;
  }

  /* Servicios grid */
  .servicios-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-md);
  }
  @media (min-width: 640px) {
    .servicios-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .servicios-grid { grid-template-columns: repeat(4, 1fr); }
  }

  .servicio-card {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-xs);
    padding: var(--spacing-md);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-lg);
    text-decoration: none;
    color: inherit;
    transition: box-shadow 0.2s ease, border-color 0.2s ease;
  }
  .servicio-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-md);
  }
  .servicio-card__title {
    font-size: var(--font-size-base);
    font-weight: 600;
    color: var(--color-text);
  }
  .servicio-card__desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    line-height: 1.5;
  }
  .servicio-card__link {
    font-size: var(--font-size-sm);
    font-weight: 600;
    color: var(--color-accent);
    margin-top: auto;
  }

  /* Venues grid */
  .venues-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-lg);
  }
  @media (min-width: 640px) {
    .venues-grid { grid-template-columns: repeat(2, 1fr); }
  }
  .venues-col h3 {
    font-size: var(--font-size-lg);
    font-weight: 600;
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }
  .venues-col ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .venues-col li {
    font-size: var(--font-size-base);
    color: var(--color-text-light);
    padding-left: 1.25rem;
    position: relative;
  }
  .venues-col li::before {
    content: "✓";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 700;
  }

  /* CTA zona */
  .cta-zona {
    background: linear-gradient(135deg, var(--color-primary) 0%, #0f1f3d 100%);
    text-align: center;
  }
  .cta-zona__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  .cta-zona__title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-white);
  }
  .cta-zona__desc {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.8);
    max-width: 520px;
  }

  /* Content prose */
  .content-prose h2 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }
  .content-prose p {
    font-size: var(--font-size-base);
    color: var(--color-text-light);
    line-height: 1.7;
    max-width: 720px;
  }
</style>
`;
}

// ---------------------------------------------------------------------------
// TEMPLATE: Hub page /zonas/
// ---------------------------------------------------------------------------
function hubTemplate() {
  const cdmx = ZONAS.filter(z => z.region === 'CDMX');
  const edomex = ZONAS.filter(z => z.region === 'Estado de México');

  return `---
import Base from '../../layouts/Base.astro';
import TopBar from '../../components/TopBar.astro';
import Header from '../../components/Header.astro';
import Hero from '../../components/Hero.astro';
import Breadcrumb from '../../components/Breadcrumb.astro';
import FaqSection from '../../components/FaqSection.astro';
import Footer from '../../components/Footer.astro';
import WhatsAppBubble from '../../components/WhatsAppBubble.astro';
import { faqSchema, localBusinessSchema, breadcrumbSchema } from '../../lib/seo';
import { WHATSAPP_URL_MSG, SITE_URL } from '../../lib/config';

const faqItems = [
  { pregunta: '¿Qué zonas de la CDMX cubren?', respuesta: 'Cubrimos toda la Ciudad de México incluyendo Polanco, Condesa, Roma, Coyoacán, Del Valle, Santa Fe, San Ángel, Pedregal, Xochimilco, Tlalpan, Narvarte, Benito Juárez, Miguel Hidalgo, Cuauhtémoc y Azcapotzalco. Nuestro equipo llega puntualmente a cualquier venue de la ciudad.' },
  { pregunta: '¿Atienden eventos en el Estado de México?', respuesta: 'Sí, cubrimos toda la Zona Metropolitana del Estado de México: Naucalpan, Tlalnepantla, Huixquilucan, Atizapán, Satélite, Interlomas, Metepec, Toluca, Ecatepec, Nezahualcóyotl, Texcoco, Coacalco, Cuautitlán Izcalli, Tultitlán y Chalco.' },
  { pregunta: '¿Cobran extra por traslado fuera de la CDMX?', respuesta: 'La mayoría de los municipios del Estado de México están dentro de nuestra zona de cobertura estándar sin cargo extra. Para zonas más alejadas como Toluca, Metepec o Texcoco, puede aplicar un cargo de traslado que indicamos transparentemente en la cotización.' },
  { pregunta: '¿Cuánto tiempo antes deben llegar para instalar?', respuesta: 'Normalmente llegamos 3-5 horas antes del evento dependiendo de la complejidad de la producción. Coordinamos directamente con tu venue para respetar sus horarios y protocolos de acceso.' },
  { pregunta: '¿Qué pasa si mi zona no aparece en la lista?', respuesta: 'Si tu zona no está listada, escríbenos de todas formas. Es muy probable que podamos atenderte. Nuestra cobertura se extiende a toda la Zona Metropolitana del Valle de México y podemos evaluar ubicaciones especiales caso por caso.' },
];

const structuredData = [
  localBusinessSchema(),
  faqSchema(faqItems),
  breadcrumbSchema([
    { name: 'Inicio', url: '/' },
    { name: 'Zonas de Servicio', url: '/zonas/' },
  ]),
];
---

<Base
  title="Zonas de Servicio — Cobertura CDMX y Estado de México | REDEIL"
  description="REDEIL cubre 30 zonas en CDMX y Estado de México. Renta de iluminación, audio y efectos para eventos. Polanco, Condesa, Santa Fe, Interlomas y más."
  structuredData={structuredData}
>
  <TopBar />
  <Header />
  <Breadcrumb items={[
    { name: 'Zonas de Servicio', href: '/zonas/' },
  ]} />

  <Hero
    badge="30 zonas de cobertura"
    title="Cobertura CDMX y Zona Metropolitana"
    description="Llevamos iluminación profesional, audio de alta calidad y efectos especiales a eventos en toda la Ciudad de México y los principales municipios del Estado de México."
    primaryCta={{ text: 'Cotizar ahora', href: WHATSAPP_URL_MSG }}
    secondaryCta={{ text: 'Ver zonas', href: '#zonas' }}
    metrics={[
      { valor: '30', texto: 'zonas de cobertura' },
      { valor: '10+', texto: 'años de experiencia' },
      { valor: '127+', texto: 'reseñas 5 estrellas' },
    ]}
  >
    <Fragment slot="hero-seo">
      <p>REDEIL ofrece renta de iluminación, audio y efectos especiales para eventos en toda la Zona Metropolitana del Valle de México. Desde Polanco y la Condesa hasta Interlomas y Satélite, nuestro equipo profesional llega con puntualidad a cualquier venue con todo el equipo necesario para transformar tu evento.</p>
      <p>Cubrimos bodas, XV años, eventos corporativos, fiestas privadas, graduaciones y todo tipo de celebraciones. Instalación profesional incluida, soporte técnico durante el evento y la mejor tecnología LED disponible en el mercado.</p>
    </Fragment>
  </Hero>

  <!-- Zonas Grid -->
  <section class="section" id="zonas">
    <div class="container">
      <div class="zonas-layout">
        <!-- CDMX -->
        <div class="zonas-col">
          <h2 class="zonas-col__title">Ciudad de México</h2>
          <p class="zonas-col__desc">15 zonas en las principales alcaldías y colonias de la CDMX.</p>
          <div class="zonas-list">
${cdmx.map(z => `            <a href="/zonas/${z.slug}/" class="zona-card">
              <span class="zona-card__name">${z.nombre}</span>
              <span class="zona-card__arrow">→</span>
            </a>`).join('\n')}
          </div>
        </div>

        <!-- Estado de México -->
        <div class="zonas-col">
          <h2 class="zonas-col__title">Estado de México</h2>
          <p class="zonas-col__desc">15 municipios de la Zona Metropolitana con servicio sin cargo extra.</p>
          <div class="zonas-list">
${edomex.map(z => `            <a href="/zonas/${z.slug}/" class="zona-card">
              <span class="zona-card__name">${z.nombre}</span>
              <span class="zona-card__arrow">→</span>
            </a>`).join('\n')}
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Mapa conceptual -->
  <section class="section section--bg">
    <div class="container content-prose">
      <h2>Cobertura Completa en la Zona Metropolitana</h2>
      <p>Nuestra cobertura abarca toda la Zona Metropolitana del Valle de México, desde las zonas más exclusivas como Polanco, Santa Fe e Interlomas hasta municipios del oriente como Ecatepec, Nezahualcóyotl y Chalco.</p>

      <div class="mapa-grid">
        <div class="mapa-sector">
          <h3>Poniente</h3>
          <ul>
            <li>Santa Fe</li>
            <li>Huixquilucan</li>
            <li>Interlomas</li>
            <li>Naucalpan</li>
          </ul>
        </div>
        <div class="mapa-sector">
          <h3>Norte</h3>
          <ul>
            <li>Satélite</li>
            <li>Tlalnepantla</li>
            <li>Atizapán</li>
            <li>Coacalco</li>
            <li>Cuautitlán Izcalli</li>
            <li>Tultitlán</li>
            <li>Ecatepec</li>
            <li>Azcapotzalco</li>
          </ul>
        </div>
        <div class="mapa-sector">
          <h3>Centro</h3>
          <ul>
            <li>Polanco</li>
            <li>Condesa</li>
            <li>Roma</li>
            <li>Cuauhtémoc</li>
            <li>Miguel Hidalgo</li>
            <li>Narvarte</li>
            <li>Del Valle</li>
            <li>Benito Juárez</li>
          </ul>
        </div>
        <div class="mapa-sector">
          <h3>Sur</h3>
          <ul>
            <li>San Ángel</li>
            <li>Pedregal</li>
            <li>Coyoacán</li>
            <li>Tlalpan</li>
            <li>Xochimilco</li>
          </ul>
        </div>
        <div class="mapa-sector">
          <h3>Oriente</h3>
          <ul>
            <li>Nezahualcóyotl</li>
            <li>Texcoco</li>
            <li>Chalco</li>
          </ul>
        </div>
        <div class="mapa-sector">
          <h3>Valle de Toluca</h3>
          <ul>
            <li>Toluca</li>
            <li>Metepec</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA -->
  <section class="section cta-zona">
    <div class="container cta-zona__inner">
      <h2 class="cta-zona__title">¿No encuentras tu zona?</h2>
      <p class="cta-zona__desc">Escríbenos de todas formas. Nuestra cobertura es amplia y podemos evaluar tu ubicación sin compromiso.</p>
      <a href={WHATSAPP_URL_MSG} target="_blank" rel="noopener" class="btn btn--wa">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.75.75 0 0 0 .917.918l4.462-1.494A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.336 0-4.512-.703-6.32-1.905l-.44-.295-2.641.884.884-2.638-.306-.453A9.958 9.958 0 0 1 2 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
        Cotizar por WhatsApp
      </a>
    </div>
  </section>

  <FaqSection items={faqItems} />

  <Footer />
  <WhatsAppBubble />
</Base>

<style>
  /* Zonas layout */
  .zonas-layout {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-xl);
  }
  @media (min-width: 768px) {
    .zonas-layout { grid-template-columns: repeat(2, 1fr); }
  }

  .zonas-col__title {
    font-size: var(--font-size-xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-xs);
  }
  .zonas-col__desc {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    margin-bottom: var(--spacing-md);
  }

  .zonas-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .zona-card {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.875rem var(--spacing-md);
    background: var(--color-white);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .zona-card:hover {
    border-color: var(--color-accent);
    box-shadow: var(--shadow-sm);
  }
  .zona-card__name {
    font-size: var(--font-size-base);
    font-weight: 500;
    color: var(--color-text);
  }
  .zona-card__arrow {
    font-size: var(--font-size-base);
    color: var(--color-accent);
    font-weight: 600;
  }

  /* Mapa grid */
  .mapa-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: var(--spacing-lg);
    margin-top: var(--spacing-xl);
  }
  @media (min-width: 640px) {
    .mapa-grid { grid-template-columns: repeat(2, 1fr); }
  }
  @media (min-width: 1024px) {
    .mapa-grid { grid-template-columns: repeat(3, 1fr); }
  }

  .mapa-sector h3 {
    font-size: var(--font-size-base);
    font-weight: 700;
    color: var(--color-primary);
    margin-bottom: var(--spacing-xs);
    padding-bottom: var(--spacing-xs);
    border-bottom: 2px solid var(--color-accent);
  }
  .mapa-sector ul {
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
  }
  .mapa-sector li {
    font-size: var(--font-size-sm);
    color: var(--color-text-light);
    padding-left: 1rem;
    position: relative;
  }
  .mapa-sector li::before {
    content: "•";
    position: absolute;
    left: 0;
    color: var(--color-accent);
    font-weight: 700;
  }

  /* CTA zona */
  .cta-zona {
    background: linear-gradient(135deg, var(--color-primary) 0%, #0f1f3d 100%);
    text-align: center;
  }
  .cta-zona__inner {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-md);
  }
  .cta-zona__title {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-white);
  }
  .cta-zona__desc {
    font-size: var(--font-size-lg);
    color: rgba(255, 255, 255, 0.8);
    max-width: 520px;
  }

  /* Content prose */
  .content-prose h2 {
    font-size: var(--font-size-2xl);
    font-weight: 700;
    color: var(--color-text);
    margin-bottom: var(--spacing-sm);
  }
  .content-prose p {
    font-size: var(--font-size-base);
    color: var(--color-text-light);
    line-height: 1.7;
    max-width: 720px;
  }
</style>
`;
}

// ---------------------------------------------------------------------------
// GENERATE ALL FILES
// ---------------------------------------------------------------------------

// Hub page
writeFileSync(join(BASE, 'index.astro'), hubTemplate());
console.log('✓ /zonas/index.astro');

// Individual zone pages
for (const z of ZONAS) {
  const dir = join(BASE, z.slug);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.astro'), zoneTemplate(z));
  console.log(`✓ /zonas/${z.slug}/index.astro`);
}

console.log(`\nTotal: ${ZONAS.length + 1} pages generated (1 hub + ${ZONAS.length} zones)`);
