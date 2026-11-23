# Publicar artículos en el blog de RDS

El blog usa archivos Markdown para que puedas publicar sin entrar al código de cada página.

1. Crea un archivo `.md` dentro de `src/content/blog/` con un nombre corto en minúsculas y separado por guiones. Ese nombre se convierte en la URL del artículo.
2. Añade estos datos al inicio:

```yaml
---
title: "Pregunta o tema del artículo"
description: "Resumen específico del artículo, útil para compartir y buscar."
publishDate: 2026-11-23
category: "Diseño web"
readingTime: 6
draft: true
---
```

3. Escribe el artículo en Markdown. Usa encabezados que respondan preguntas, enlaza a servicios relacionados y cita las fuentes de cualquier dato externo.
4. Revisa el contenido y cambia `draft: true` a `draft: false` cuando esté listo. Los borradores no aparecen en el blog ni se incluyen en las rutas publicadas.
5. Ejecuta `pnpm build` para generar el sitio. La URL queda como `/blog/nombre-del-articulo/`.

Categorías admitidas: `Diseño web`, `SEO` y `SEO + IA`. El esquema valida los metadatos al construir el sitio.

## Dominio de producción

Configura la variable `SITE_URL` en el entorno de build con el origen canónico completo, por ejemplo `https://tu-dominio.com`. Sin ella el build omite canonicals absolutos y sitemap para evitar publicar URLs falsas. Con ella, el build escribe `sitemap.xml` y declara su ubicación en `robots.txt`.
