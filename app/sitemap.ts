import type { MetadataRoute } from 'next'

const BASE_URL = 'https://davidevassallo.net'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { it: '/', en: '/en' },
    { it: '/about', en: '/en/about' },
    { it: '/blog', en: '/en/blog' },
    { it: '/portfolio', en: '/en/portfolio' },
    { it: '/contatti', en: '/en/contatti' },
  ]

  const entries: MetadataRoute.Sitemap = []

  for (const route of staticRoutes) {
    entries.push({
      url: `${BASE_URL}${route.it}`,
      lastModified: new Date(),
      alternates: {
        languages: {
          it: `${BASE_URL}${route.it}`,
          en: `${BASE_URL}${route.en}`,
        },
      },
    })
  }

  return entries
}
