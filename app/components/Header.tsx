'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useRef } from 'react'

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

export default function Header({ globalSettings, tinaField }: { globalSettings?: any, tinaField?: any }) {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [submenuOpen, setSubmenuOpen] = useState(false)
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const isPortfolio = pathname === '/portfolio' || pathname.startsWith('/portfolio/')
  const isStudio = pathname.startsWith('/studio')

  // Don't render header on studio pages
  if (isStudio) return null

  const navLinks = [
    { href: '/', label: globalSettings?.navHome || 'Home', field: 'navHome' },
    { href: '/portfolio', label: globalSettings?.navPortfolio || 'Portfolio', id: 'portfolio-toggle', field: 'navPortfolio' },
    { href: '/blog', label: globalSettings?.navBlog || 'Blog', field: 'navBlog' },
    { href: '/about', label: globalSettings?.navAbout || 'Chi Sono', field: 'navAbout' },
    { href: '/contatti', label: globalSettings?.navContact || 'Contatti', field: 'navContact' },
  ]

  const openSubmenu = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current)
    setSubmenuOpen(true)
  }
  const closeSubmenu = () => {
    closeTimerRef.current = setTimeout(() => setSubmenuOpen(false), 90)
  }

  return (
    <header className={`site-header${isPortfolio || submenuOpen ? ' is-portfolio-open' : ''}`}>
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
              : pathname.startsWith(link.href)

            if (link.id === 'portfolio-toggle') {
              return (
                <span key={link.href} style={{ display: 'contents' }}>
                  {i > 0 && <span className="nav-separator">&bull;</span>}
                  <Link
                    href={link.href}
                    id="portfolio-toggle"
                    className={isActive ? 'active' : ''}
                    onMouseEnter={openSubmenu}
                    onMouseLeave={closeSubmenu}
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
                <Link href={link.href} className={isActive ? 'active' : ''} data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, link.field) : undefined}>
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
        </div>
      </div>

      <div
        id="submenu-portfolio"
        className={`header-submenu${isPortfolio || submenuOpen ? ' open' : ''}`}
        onMouseEnter={openSubmenu}
        onMouseLeave={closeSubmenu}
      >
        <nav className="submenu-nav">
          <Link href="/portfolio#fotografia" className="portfolio-tab-link" data-tab="fotografia" data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubFotografia') : undefined}>{globalSettings?.navSubFotografia || 'Fotografia'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#videomaking" className="portfolio-tab-link" data-tab="videomaking" data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubVideomaking') : undefined}>{globalSettings?.navSubVideomaking || 'Videomaking'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#regia" className="portfolio-tab-link" data-tab="regia" data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubRegia') : undefined}>{globalSettings?.navSubRegia || 'Regia'}</Link>
          <span className="nav-separator">&bull;</span>
          <Link href="/portfolio#mosaico" className="portfolio-tab-link" data-tab="mosaico" data-tina-field={tinaField && globalSettings ? tinaField(globalSettings, 'navSubMosaico') : undefined}>{globalSettings?.navSubMosaico || 'Mosaico'}</Link>
        </nav>
      </div>
    </header>
  )
}
