'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function LanguageSwitcher() {
  const pathname = usePathname()

  const getLocalePath = (locale: string) => {
    // Remove current locale prefix if any
    let basePath = pathname
    if (pathname.startsWith('/en')) {
      basePath = pathname.replace(/^\/en/, '') || '/'
    } else if (pathname.startsWith('/pt')) {
      basePath = pathname.replace(/^\/pt/, '') || '/'
    }

    // Add new locale prefix
    if (locale === 'es') {
      return basePath || '/'
    }
    return `/${locale}${basePath === '/' ? '' : basePath}`
  }

  const currentLocale = pathname.startsWith('/en') ? 'en' : pathname.startsWith('/pt') ? 'pt' : 'es'

  return (
    <div className="language-switcher">
      <Link
        href={getLocalePath('es')}
        className={`lang-btn ${currentLocale === 'es' ? 'active' : ''}`}
      >
        ES
      </Link>
      <Link
        href={getLocalePath('en')}
        className={`lang-btn ${currentLocale === 'en' ? 'active' : ''}`}
      >
        EN
      </Link>
      <Link
        href={getLocalePath('pt')}
        className={`lang-btn ${currentLocale === 'pt' ? 'active' : ''}`}
      >
        PT
      </Link>
    </div>
  )
}
