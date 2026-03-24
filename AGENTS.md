# AGENTS.md — REDEIL Instructions

## Project
- **Name:** REDEIL
- **Domain:** redeil.com
- **Business:** Renta de iluminación, audio, DJ y equipos para eventos CDMX
- **Stack:** Astro 4 + TypeScript + CSS scoped
- **Config:** src/lib/config.ts
- **Schemas:** src/lib/seo.ts
- **Phone:** 55 4937 5172
- **WhatsApp:** 525549375172
- **Email:** contacto@redeil.com

## Rules
1. Build limpio: `npm run build` con 0 errores
2. CERO animaciones
3. Hero 2 columnas (col2 = solo texto)
4. GEO: H2 como preguntas, respuesta en primera oración
5. Keyword density máx 1-2%
6. Sin palabras IA: crucial, pivotal, seamless, elevate, soluciones integrales
7. Imágenes: AVIF, quality 55, 1200×675, alt descriptivo
8. CTAs → /cotizar/ (no WhatsApp directo)
9. CSS scoped
10. Internal links: anchor text = keyword destino

## Content Collections
- Blog: src/content/blog/*.mdx (migrating from src/pages/blog/)
- Schema: src/content/config.ts

## Blog frontmatter
```yaml
title: "≤60 chars"
description: "≤155 chars"
publishDate: "YYYY-MM-DD"
category: "iluminacion|audio|equipos|eventos|dj"
heroImage: "/img/blog/nombre.avif"
heroImageAlt: "desc"
tags: ["tag1", "tag2"]
readTime: "X min"
faqs:
  - question: "¿?"
    answer: "Respuesta."
```

## After any task
1. `npm run build` → 0 errors
2. `git add -A && git commit -m "desc"`
