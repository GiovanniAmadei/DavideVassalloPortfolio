'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef, useEffect } from 'react'
import { usePortfolio } from './PortfolioContext'

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

export default function Header({ globalSettings, blogSettings, tinaField }: { globalSettings?: any, blogSettings?: any, tinaField?: any }) {
  const pathname = usePathname()
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

  const isPortfolio = (pathname ?? '').startsWith('/portfolio')
  const isStudio = (pathname ?? '').startsWith('/studio')

  // Auto-scroll submenu to active tab on mobile
  useEffect(() => {
    if (!submenuNavRef.current) return
    const activeEl = submenuNavRef.current.querySelector('.portfolio-tab-link.active') as HTMLElement | null
    if (activeEl) {
      activeEl.scrollIntoView({ inline: 'center', behavior: 'smooth', block: 'nearest' })
    }
  }, [activeTab])

  // Don't render header on studio pages
  if (isStudio) return null

  const rawNavLinks = [
    { href: '/', label: globalSettings?.navHome || 'Home', field: 'navHome' },
    { href: '/portfolio', label: globalSettings?.navPortfolio || 'Portfolio', id: 'portfolio-toggle', field: 'navPortfolio' },
    { href: '/blog', label: globalSettings?.navBlog || 'Blog', field: 'navBlog' },
    { href: '/about', label: globalSettings?.navAbout || 'Chi Sono', field: 'navAbout' },
    { href: '/contatti', label: globalSettings?.navContact || 'Contatti', field: 'navContact' },
  ]

  // Hide blog link if attivata is explicitly false
  const navLinks = rawNavLinks.filter(link => {
    if (link.href === '/blog' && blogSettings?.attivata === false) {
      return false
    }
    return true
  })

  const openSubmenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setSubmenuOpen(true)
  }
  const closeSubmenu = () => {
    closeTimerRef.current = setTimeout(() => setSubmenuOpen(false), 90)
  }

  // Tertiary bar config
  const fotoPanelsConfig = [
    { id: 'ritratti', label: globalSettings?.filterFoto1 || 'Ritratti' },
    { id: 'narrazione', label: globalSettings?.filterFoto2 || 'Narrazione' },
  ]
  const currentVideoCategories = activeTab === 'videomaking' ? videoCategories : regiaCategories
  const videoFiltersConfig = [
    { id: 'all', label: globalSettings?.filterVideoAll || 'Tutto' },
    ...currentVideoCategories
  ]

  // Show tertiary bar when on portfolio page and in fotografia (with grid shown) or videomaking/regia (if filters exist)
  const isVideoOrRegia = activeTab === 'videomaking' || activeTab === 'regia'
  const hasVideoFilters = currentVideoCategories.length > 0
  const showTertiary = isPortfolio && ((activeTab === 'fotografia' && showFotoGrid) || (isVideoOrRegia && hasVideoFilters))

  return (
    <header className={`site-header${isPortfolio || submenuOpen ? ' is-portfolio-open' : ''}${showTertiary ? ' has-tertiary' : ''}`}>
      <div className="header-main">
        <Link className="header-logo" href="/" data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'logoName') : undefined}>
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
            const isActive = link.href === '/'
              ? pathname === '/'
              : (pathname ?? '').startsWith(link.href)

            if (link.id === 'portfolio-toggle') {
              return (
                <span key={link.href} style={{ display: 'contents' }}>
                  {i > 0 && <span className="nav-separator">&bull;</span>}
                  <Link
                    href="/portfolio#mosaico"
                    id="portfolio-toggle"
                    className={isActive ? 'active' : ''}
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
                  href={link.href} 
                  className={isActive ? 'active' : ''} 
                  onClick={() => setMobileOpen(false)}
                  data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, link.field) : undefined}
                >
                  {link.label}
                </Link>
              </span>
            )
          })}
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
          <Link href="/portfolio#fotografia" className={`portfolio-tab-link${activeTab === 'fotografia' ? ' active' : ''}`} data-tab="fotografia" onClick={() => { setActiveTab('fotografia'); setShowFotoGrid(false); setFotoFilter('ritratti'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubFotografia') : undefined}>{globalSettings?.navSubFotografia || 'Fotografia'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#videomaking" className={`portfolio-tab-link${activeTab === 'videomaking' ? ' active' : ''}`} data-tab="videomaking" onClick={() => { setActiveTab('videomaking'); setVideoFilter('all'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubVideomaking') : undefined}>{globalSettings?.navSubVideomaking || 'Videomaking'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#regia" className={`portfolio-tab-link${activeTab === 'regia' ? ' active' : ''}`} data-tab="regia" onClick={() => { setActiveTab('regia'); setVideoFilter('all'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubRegia') : undefined}>{globalSettings?.navSubRegia || 'Regia'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#mosaico" className={`portfolio-tab-link${activeTab === 'mosaico' ? ' active' : ''}`} data-tab="mosaico" onClick={() => { setActiveTab('mosaico'); setMobileOpen(false) }} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubMosaico') : undefined}>{globalSettings?.navSubMosaico || 'Mosaico'}</Link>
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
