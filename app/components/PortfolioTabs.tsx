'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import MasonryGrid from './MasonryGrid'
import Link from 'next/link'

interface MediaItem {
  src: string
  title?: string
  description?: string
  metadata?: string
  category?: string
  aspectRatio?: number
  isPreviewCard?: boolean
  logline?: string
  url?: string
}

interface PortfolioTabsProps {
  fotografiaData: MediaItem[]
  videomakingData: MediaItem[]
  regiaData: MediaItem[]
  mosaicoData: MediaItem[]
  pageData?: any
  tinaField?: any
}

const defaultTabTitles: Record<string, string> = {
  fotografia: 'Fotografia',
  videomaking: 'Videomaking',
  regia: 'Regia',
  mosaico: 'Mosaico',
}



function FotoPanelSlider({ images, label }: { images: string[]; label: string }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const iv = setInterval(() => setCurrent(i => (i + 1) % images.length), 4000 + Math.random() * 2000)
    return () => clearInterval(iv)
  }, [images.length])
  return (
    <div className="foto-panel-slider">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={src} src={src} alt={label} className={i === current ? 'active' : ''} />
      ))}
    </div>
  )
}

export default function PortfolioTabs({ fotografiaData, videomakingData, regiaData, mosaicoData, pageData, tinaField }: PortfolioTabsProps) {
  const [activeTab, setActiveTab] = useState('fotografia')
  const [fotoFilter, setFotoFilter] = useState('ritratti')
  const [showFotoGrid, setShowFotoGrid] = useState(false)
  const [videoFilter, setVideoFilter] = useState('all')

  const tabTitles: Record<string, string> = {
    fotografia: pageData?.tabFotografia || defaultTabTitles.fotografia,
    videomaking: pageData?.tabVideomaking || defaultTabTitles.videomaking,
    regia: pageData?.tabRegia || defaultTabTitles.regia,
    mosaico: pageData?.tabMosaico || defaultTabTitles.mosaico,
  }

  const fotoPanelsConfig = [
    {
      id: 'ritratti',
      label: pageData?.filterFoto1 || 'Ritratti',
      field: 'filterFoto1',
      imagesField: 'imagesFoto1',
      images: pageData?.imagesFoto1?.length ? pageData.imagesFoto1 : ['/assets/DSC_3667-Enhanced-NR.jpg', '/assets/DSC_3643-Enhanced-NR.jpg', '/assets/DSC_3596-Enhanced-NR-2.jpg'],
    },
    {
      id: 'narrazione',
      label: pageData?.filterFoto2 || 'Narrazione',
      field: 'filterFoto2',
      imagesField: 'imagesFoto2',
      images: pageData?.imagesFoto2?.length ? pageData.imagesFoto2 : ['/assets/DSC_2852.jpg', '/assets/DSC_2620-2.jpg', '/assets/DSC_9738-Enhanced-NR-2.jpg'],
    },
  ]

  // Read initial hash from URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const valid = ['fotografia', 'videomaking', 'regia', 'mosaico']
    if (valid.includes(hash)) setActiveTab(hash)
  }, [])

  const switchTab = useCallback((tab: string) => {
    setActiveTab(tab)
    if (tab === 'fotografia') {
      setShowFotoGrid(false)
    }
    history.replaceState(null, '', '#' + tab)
  }, [])

  const mosaicoFull = [...mosaicoData, ...mosaicoData, ...mosaicoData, ...mosaicoData, ...mosaicoData]

  return (
    <>
      {/* Page header */}
      <div className="portfolio-page-header">
        <p className="portfolio-page-label" data-tina-field={tinaField ? tinaField(pageData, `tab${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`) : undefined}>{tabTitles[activeTab]}</p>
        <h1 className="portfolio-page-title" data-tina-field={tinaField ? tinaField(pageData, `tab${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`) : undefined}>{tabTitles[activeTab]}</h1>
      </div>

      {/* FOTOGRAFIA */}
      <section className={`portfolio-tab-panel section${activeTab !== 'fotografia' ? ' hidden' : ''}`} id="tab-fotografia" style={{ display: activeTab === 'fotografia' ? '' : 'none' }}>
        {!showFotoGrid ? (
          <div className="foto-panels-container" id="foto-panels">
            {fotoPanelsConfig.map(panel => (
              <div
                key={panel.id}
                className="foto-panel"
                data-sub={panel.id}
                onClick={() => { setShowFotoGrid(true); setFotoFilter(panel.id) }}
                data-tina-field={tinaField ? tinaField(pageData, panel.imagesField as any) : undefined}
              >
                <FotoPanelSlider images={panel.images} label={panel.label} />
                <h2 data-tina-field={tinaField ? tinaField(pageData, panel.field) : undefined}>{panel.label}</h2>
              </div>
            ))}
          </div>
        ) : (
          <div className="fotografia-main" style={{ display: 'block', opacity: 1 }}>
            {/* Tertiary: Fotografia filters */}
            <div id="tertiary-fotografia" className="tertiary-submenu-nav open" style={{ marginBottom: '2rem' }}>
              {fotoPanelsConfig.map((p, i) => (
                <span key={p.id} style={{ display: 'contents' }}>
                  {i > 0 && <span className="nav-separator">&bull;</span>}
                  <a
                    href="#fotografia"
                    className={`tertiary-link filter-btn${fotoFilter === p.id ? ' active' : ''}`}
                    onClick={e => { e.preventDefault(); setFotoFilter(p.id) }}
                    data-tina-field={tinaField ? tinaField(pageData, p.field) : undefined}
                  >{p.label}</a>
                </span>
              ))}
            </div>
            <MasonryGrid items={fotografiaData} filter={fotoFilter} />
          </div>
        )}
      </section>

      {/* VIDEOMAKING */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'videomaking' ? '' : 'none' }} id="tab-videomaking">
        {/* Tertiary: Videomaking filters */}
        <div id="tertiary-videomaking" className="tertiary-submenu-nav open" style={{ marginBottom: '2rem' }}>
          {[{ id: 'all', label: pageData?.filterVideoAll || 'Tutto', field: 'filterVideoAll' }, { id: 'reportage', label: pageData?.filterVideo1 || 'Reportage', field: 'filterVideo1' }, { id: 'ricerca', label: pageData?.filterVideo2 || 'Ricerca', field: 'filterVideo2' }].map((f, i) => (
            <span key={f.id} style={{ display: 'contents' }}>
              {i > 0 && <span className="nav-separator">&bull;</span>}
              <a
                href="#videomaking"
                className={`tertiary-link filter-btn${videoFilter === f.id ? ' active' : ''}`}
                onClick={e => { e.preventDefault(); setVideoFilter(f.id) }}
                data-tina-field={tinaField ? tinaField(pageData, f.field) : undefined}
              >{f.label}</a>
            </span>
          ))}
        </div>
        <MasonryGrid items={videomakingData} filter={videoFilter === 'all' ? undefined : videoFilter} />
      </section>

      {/* REGIA */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'regia' ? '' : 'none' }} id="tab-regia">
        <div className="project-video-wrapper reveal active" style={{ marginBottom: '4rem' }}>
          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0" allowFullScreen />
        </div>
        <MasonryGrid items={regiaData} />
      </section>

      {/* MOSAICO */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'mosaico' ? '' : 'none' }} id="tab-mosaico">
        <MasonryGrid items={mosaicoFull} shuffle id="masonry-grid-mosaico" />
      </section>
    </>
  )
}
