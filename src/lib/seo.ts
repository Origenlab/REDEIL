// =============================================================================
// REDEIL — Generadores de JSON-LD (Schema.org)
// =============================================================================

import {
  SITE_NAME,
  SITE_URL,
  SITE_DESCRIPTION,
  PHONE_PRIMARY,
  WHATSAPP_NUMBER,
  EMAIL,
  LOCATION,
  GEO,
  OG_IMAGE_DEFAULT,
  LOGO_PATH,
  getSocialMediaUrls,
} from './config';

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}${LOGO_PATH}`,
    description: SITE_DESCRIPTION,
    telephone: PHONE_PRIMARY,
    email: EMAIL,
    sameAs: getSocialMediaUrls(),
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: PHONE_PRIMARY,
        contactType: 'customer service',
        availableLanguage: ['Spanish'],
        areaServed: ['MX'],
      },
      {
        '@type': 'ContactPoint',
        url: `https://wa.me/${WHATSAPP_NUMBER}`,
        contactType: 'customer service',
        availableLanguage: ['Spanish'],
        areaServed: ['MX'],
      },
    ],
  };
}

export function localBusinessSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: SITE_NAME,
    alternateName: 'Redeil - Renta de Iluminación y Audio',
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    telephone: PHONE_PRIMARY,
    email: EMAIL,
    logo: `${SITE_URL}${LOGO_PATH}`,
    image: `${SITE_URL}${OG_IMAGE_DEFAULT}`,
    priceRange: '$$',
    paymentAccepted: ['Cash', 'Credit Card', 'Bank Transfer'],
    currenciesAccepted: 'MXN',
    address: {
      '@type': 'PostalAddress',
      addressLocality: LOCATION.locality,
      addressRegion: LOCATION.region,
      addressCountry: LOCATION.country,
      postalCode: LOCATION.postalCode,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: parseFloat(GEO.latitude),
      longitude: parseFloat(GEO.longitude),
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: GEO.latitude,
        longitude: GEO.longitude,
      },
      geoRadius: '50000',
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '19:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '10:00',
        closes: '15:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '127',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: 'es-MX',
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqSchema(items: Array<{ pregunta: string; respuesta: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.pregunta,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.respuesta,
      },
    })),
  };
}

export function serviceSchema(opts: { name: string; description: string; url: string; areaServed?: string; provider?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: opts.name,
    description: opts.description,
    url: opts.url.startsWith('http') ? opts.url : `${SITE_URL}${opts.url}`,
    provider: {
      '@type': 'LocalBusiness',
      name: opts.provider || SITE_NAME,
      url: SITE_URL,
      telephone: PHONE_PRIMARY,
      email: EMAIL,
    },
    areaServed: {
      '@type': 'Place',
      name: opts.areaServed || 'Ciudad de México y Estado de México',
    },
  };
}

export function breadcrumbSchema(items: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
    })),
  };
}
