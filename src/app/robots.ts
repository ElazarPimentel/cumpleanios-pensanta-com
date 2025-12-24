import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/auth/', '/log/'],
    },
    sitemap: 'https://cumpleanios.pensanta.com/sitemap.xml',
  }
}
