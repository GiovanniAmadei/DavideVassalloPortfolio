'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { usePortfolio } from './PortfolioContext'
import { loc } from '../lib/i18n'

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4.5" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
)

const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a2.994 2.994 0 0 0-2.107-2.117C19.545 3.5 12 3.5 12 3.5s-7.545 0-9.391.569A2.994 2.994 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a2.994 2.994 0 0 0 2.107 2.117C4.455 20.5 12 20.5 12 20.5s7.545 0 9.391-.569a2.994 2.994 0 0 0 2.107-2.117C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.971H15.83c-1.491 0-1.956.93-1.956 1.886v2.267h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
  </svg>
)

export default function Header({ globalSettings, blogSettings, tinaField, locale }: { globalSettings?: any, blogSettings?: any, tinaField?: any, locale?: string }) {
  const pathname = usePathname()
  const router = useRouter()
  const t = useTranslations('nav')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const submenuNavRef = useRef<HTMLElement>(null)

  const {
    activeTab, setActiveTab,
    fotoFilter, setFotoFilter,
    videoFilter, setVideoFilter,
    videoCategories, regiaCategories,
    showFotoGrid, setShowFotoGrid
  } = usePortfolio()

  const currentLocale = locale || 'it'
  const isPortfolio = (pathname ?? '').replace(/^\/(en)/, '').startsWith('/portfolio') || (pathname ?? '').startsWith('/portfolio')
  const isStudio = (pathname ?? '').startsWith('/studio') || (pathname ?? '').includes('/studio')

  // Auto-scroll submenu to active tab on mobile
  useEffect(() => {
    if (!submenuNavRef.current) return
    const activeEl = submenuNavRef.current.querySelector('.portfolio-tab-link.active') as HTMLElement | null
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [activeTab])

  if (isStudio) return null

  // Language switcher: swap locale in current path
  const switchLocale = (newLocale: string) => {
    const currentPath = pathname ?? '/'
    let newPath: string
    if (currentLocale === 'it') {
      // Italian paths have no prefix, add /en
      newPath = newLocale === 'en' ? `/en${currentPath}` : currentPath
    } else {
      // English paths have /en prefix, remove it for Italian
      newPath = newLocale === 'it' ? currentPath.replace(/^\/en/, '') || '/' : currentPath
    }
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`
    router.push(newPath)
    router.refresh()
  }

  const rawNavLinks = [
    { href: '/', label: globalSettings?.navHome || t('home'), field: 'navHome' },
    { href: '/portfolio', label: globalSettings?.navPortfolio || t('portfolio'), id: 'portfolio-toggle', field: 'navPortfolio' },
    { href: '/blog', label: globalSettings?.navBlog || t('blog'), field: 'navBlog' },
    { href: '/about', label: loc(globalSettings, 'navAbout', currentLocale) || t('about'), field: currentLocale === 'en' ? 'navAbout_en' : 'navAbout' },
    { href: '/contatti', label: loc(globalSettings, 'navContact', currentLocale) || t('contact'), field: currentLocale === 'en' ? 'navContact_en' : 'navContact' },
  ]

  // Hide blog link if attivata is explicitly false
  const navLinks = rawNavLinks.filter(link => {
    if (link.href === '/blog' && blogSettings?.attivata === false) {
      return false
    }
    return true
  })

  // Prefix href with locale for English
  const localizedHref = (href: string) => currentLocale === 'en' ? `/en${href}` : href

  const openSubmenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setSubmenuOpen(true)
  }
  const closeSubmenu = () => {
    closeTimerRef.current = setTimeout(() => setSubmenuOpen(false), 90)
  }

  // Tertiary bar config
  const fotoPanelsConfig = [
    { id: 'ritratti', label: loc(globalSettings, 'filterFoto1', currentLocale) || t('portraits') },
    { id: 'narrazione', label: loc(globalSettings, 'filterFoto2', currentLocale) || t('narration') },
  ]
  const currentVideoCategories = activeTab === 'videomaking' ? videoCategories : regiaCategories
  const videoFiltersConfig = [
    { id: 'all', label: loc(globalSettings, 'filterVideoAll', currentLocale) || t('all') },
    ...currentVideoCategories
  ]

  const showTertiary = isPortfolio && ((activeTab === 'fotografia' && showFotoGrid) || ((activeTab === 'videomaking' || activeTab === 'regia') && currentVideoCategories.length > 0))

  // Check active state considering locale prefix
  const isActive = (href: string) => {
    const path = pathname ?? ''
    const normalizedPath = path.replace(/^\/en/, '') || '/'
    if (href === '/') return normalizedPath === '/'
    return normalizedPath.startsWith(href)
  }

  return (
    <header className={`site-header${isPortfolio || submenuOpen ? ' is-portfolio-open' : ''}${showTertiary ? ' has-tertiary' : ''}`}>
      <div className="header-main">
        <Link className="header-logo" href={localizedHref('/')} style={{ letterSpacing: '0.05em' }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'logoName') : undefined}>
          {globalSettings?.logoName || 'Davide Vassallo'}
        </Link>

        <button
          className={`mobile-menu-toggle${mobileOpen ? ' active' : ''}`}
          id="mobile-menu-toggle"
          aria-label="Toggle Menu"
          onClick={() => setMobileOpen(o => !o)}
        >
          <span /><span /><span />
        </button>

        <nav className={`header-nav${mobileOpen ? ' mobile-active' : ''}`} id="header-nav">
          {navLinks.map((link, i) => {
            const active = isActive(link.href)

            if (link.id === 'portfolio-toggle') {
              return (
                <span key={link.href} style={{ display: 'contents' }}>
                  {i > 0 && <span className="nav-separator">&bull;</span>}
                  <Link
                    href={localizedHref('/portfolio#mosaico')}
                    id="portfolio-toggle"
                    className={active ? 'active' : ''}
                    onMouseEnter={mobileOpen ? undefined : openSubmenu}
                    onMouseLeave={mobileOpen ? undefined : closeSubmenu}
                    onClick={() => {
                      setActiveTab('mosaico')
                      setMobileOpen(false)
                    }}
                    data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, link.field) : undefined}
                  >
                    {link.label}
                  </Link>
                </span>
              )
            }

            return (
              <span key={link.href} style={{ display: 'contents' }}>
                {i > 0 && <span className="nav-separator">&bull;</span>}
                <Link
                  href={localizedHref(link.href)}
                  className={active ? 'active' : ''}
                  onClick={() => setMobileOpen(false)}
                  data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, link.field) : undefined}
                >
                  {link.label}
                </Link>
              </span>
            )
          })}

          {/* Language switcher — mobile only (desktop version is in header-social) */}
          <span className="lang-switcher-mobile">
            <button
              className={`lang-btn${currentLocale === 'it' ? ' active' : ''}`}
              onClick={() => switchLocale('it')}
              aria-label="Italiano"
            >IT</button>
            <span className="lang-divider">/</span>
            <button
              className={`lang-btn${currentLocale === 'en' ? ' active' : ''}`}
              onClick={() => switchLocale('en')}
              aria-label="English"
            >EN</button>
          </span>
        </nav>

        <div className="header-social">
          <a href={globalSettings?.instagram || "https://instagram.com"} target="_blank" rel="noopener" aria-label="Instagram" data-tina-field={tinaField ? tinaField(globalSettings, 'instagram') : undefined}>
            <InstagramIcon />
          </a>
          <a href={globalSettings?.linkedin || "https://linkedin.com"} target="_blank" rel="noopener" aria-label="LinkedIn" data-tina-field={tinaField ? tinaField(globalSettings, 'linkedin') : undefined}>
            <LinkedInIcon />
          </a>
          <a href={globalSettings?.youtube || "https://youtube.com"} target="_blank" rel="noopener" aria-label="YouTube" data-tina-field={tinaField ? tinaField(globalSettings, 'youtube') : undefined}>
            <YouTubeIcon />
          </a>
          <a href={globalSettings?.facebook || "https://facebook.com"} target="_blank" rel="noopener" aria-label="Facebook" data-tina-field={tinaField ? tinaField(globalSettings, 'facebook') : undefined}>
            <FacebookIcon />
          </a>
          <span className="lang-switcher">
            <button
              className={`lang-btn${currentLocale === 'it' ? ' active' : ''}`}
              onClick={() => switchLocale('it')}
              aria-label="Italiano"
            >IT</button>
            <span className="lang-divider">/</span>
            <button
              className={`lang-btn${currentLocale === 'en' ? ' active' : ''}`}
              onClick={() => switchLocale('en')}
              aria-label="English"
            >EN</button>
          </span>
        </div>
      </div>

      {/* Second bar: portfolio tab links */}
      <div
        id="submenu-portfolio"
        className={`header-submenu${isPortfolio || submenuOpen ? ' open' : ''}`}
        onMouseEnter={openSubmenu}
        onMouseLeave={closeSubmenu}
      >
        <nav className="submenu-nav" ref={submenuNavRef}>
          <Link href={localizedHref('/portfolio#fotografia')} className={`portfolio-tab-link${isPortfolio && activeTab === 'fotografia' ? ' active' : ''}`} data-tab="fotografia" onClick={() => { setActiveTab('fotografia'); setShowFotoGrid(false); setFotoFilter('ritratti'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, currentLocale === 'en' ? 'navSubFotografia_en' : 'navSubFotografia') : undefined}>{loc(globalSettings, 'navSubFotografia', currentLocale) || t('photography')}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href={localizedHref('/portfolio#videomaking')} className={`portfolio-tab-link${isPortfolio && activeTab === 'videomaking' ? ' active' : ''}`} data-tab="videomaking" onClick={() => { setActiveTab('videomaking'); setVideoFilter('all'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubVideomaking') : undefined}>{globalSettings?.navSubVideomaking || t('videomaking')}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href={localizedHref('/portfolio#regia')} className={`portfolio-tab-link${isPortfolio && activeTab === 'regia' ? ' active' : ''}`} data-tab="regia" onClick={() => { setActiveTab('regia'); setVideoFilter('all'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, currentLocale === 'en' ? 'navSubRegia_en' : 'navSubRegia') : undefined}>{loc(globalSettings, 'navSubRegia', currentLocale) || t('direction')}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href={localizedHref('/portfolio#mosaico')} className={`portfolio-tab-link${isPortfolio && activeTab === 'mosaico' ? ' active' : ''}`} data-tab="mosaico" onClick={() => { setActiveTab('mosaico'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, currentLocale === 'en' ? 'navSubMosaico_en' : 'navSubMosaico') : undefined}>{loc(globalSettings, 'navSubMosaico', currentLocale) || t('mosaic')}</Link>
        </nav>
      </div>

      {/* Third bar: sub-filters for fotografia and videomaking */}
      <div className={`header-tertiary${showTertiary ? ' open' : ''}`}>
        <nav className="submenu-nav">
          {activeTab === 'fotografia' && fotoPanelsConfig.map((p, i) => (
            <span key={p.id} style={{ display: 'contents' }}>
              {i > 0 && <span className="nav-separator">&bull;</span>}
              <button
                type="button"
                className={`tertiary-link filter-btn${fotoFilter === p.id ? ' active' : ''}`}
                onClick={() => setFotoFilter(p.id)}
              >{p.label}</button>
            </span>
          ))}
          {(activeTab === 'videomaking' || activeTab === 'regia') && videoFiltersConfig.map((f, i) => (
            <span key={f.id} style={{ display: 'contents' }}>
              {i > 0 && <span className="nav-separator">&bull;</span>}
              <button
                type="button"
                className={`tertiary-link filter-btn${videoFilter === f.id ? ' active' : ''}`}
                onClick={() => setVideoFilter(f.id)}
              >{f.label}</button>
            </span>
          ))}
        </nav>
      </div>
    </header>
  )
}
