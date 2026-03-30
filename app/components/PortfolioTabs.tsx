'use client'

import { useState, useEffect, useCallback } from 'react'
import MasonryGrid from './MasonryGrid'
import { usePortfolio } from './PortfolioContext'

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



function FotoPanelSlider({ images, label }: { images: { src: string; objectPosition?: string }[]; label: string }) {
  const [current, setCurrent] = useState(0)
  useEffect(() => {
    if (images.length <= 1) return
    const iv = setInterval(() => setCurrent(i => (i + 1) % images.length), 4000 + Math.random() * 2000)
    return () => clearInterval(iv)
  }, [images.length])
  return (
    <div className="foto-panel-slider">
      {images.map((imgObj, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img key={imgObj.src} src={imgObj.src} alt={label} className={i === current ? 'active' : ''} style={{ objectPosition: imgObj.objectPosition || 'center center' }} />
      ))}
    </div>
  )
}

export default function PortfolioTabs({ fotografiaData, videomakingData, regiaData, mosaicoData, pageData, tinaField }: PortfolioTabsProps) {
  const { activeTab, setActiveTab, fotoFilter, setFotoFilter, videoFilter, setVideoFilter, showFotoGrid, setShowFotoGrid } = usePortfolio()

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
      descField: 'descFoto1',
      desc: pageData?.descFoto1 || '',
      images: pageData?.imagesFoto1?.length ? pageData.imagesFoto1 : [{ src: '/assets/DSC_3667-Enhanced-NR.jpg' }, { src: '/assets/DSC_3643-Enhanced-NR.jpg' }, { src: '/assets/DSC_3596-Enhanced-NR-2.jpg' }],
    },
    {
      id: 'narrazione',
      label: pageData?.filterFoto2 || 'Narrazione',
      field: 'filterFoto2',
      imagesField: 'imagesFoto2',
      descField: 'descFoto2',
      desc: pageData?.descFoto2 || '',
      images: pageData?.imagesFoto2?.length ? pageData.imagesFoto2 : [{ src: '/assets/DSC_2852.jpg' }, { src: '/assets/DSC_2620-2.jpg' }, { src: '/assets/DSC_9738-Enhanced-NR-2.jpg' }],
    },
  ]

  // Read initial hash from URL
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const valid = ['fotografia', 'videomaking', 'regia', 'mosaico']
    if (valid.includes(hash)) {
      setActiveTab(hash)
      if (hash === 'fotografia') setShowFotoGrid(false)
    }
  }, [setActiveTab, setShowFotoGrid])

  const switchTab = useCallback((tab: string) => {
    setActiveTab(tab)
    if (tab === 'fotografia') {
      setShowFotoGrid(false)
    }
    history.replaceState(null, '', '#' + tab)
  }, [setActiveTab, setShowFotoGrid])

  // Keep switchTab callable from hash links in the header - listen to hash changes
  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const valid = ['fotografia', 'videomaking', 'regia', 'mosaico']
      if (valid.includes(hash)) {
        setActiveTab(hash)
        if (hash === 'fotografia') setShowFotoGrid(false)
      }
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [setActiveTab, setShowFotoGrid])

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
            {(() => {
              const activePanel = fotoPanelsConfig.find(p => p.id === fotoFilter)
              return activePanel?.desc ? (
                <p
                  className="foto-section-intro"
                  data-tina-field={tinaField ? tinaField(pageData, activePanel.descField as any) : undefined}
                >
                  {activePanel.desc}
                </p>
              ) : null
            })()}
            <MasonryGrid items={fotografiaData} filter={fotoFilter} />
          </div>
        )}
      </section>

      {/* VIDEOMAKING */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'videomaking' ? '' : 'none' }} id="tab-videomaking">
        <MasonryGrid items={videomakingData} filter={videoFilter} orderedGrid={true} />
      </section>

      {/* REGIA */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'regia' ? '' : 'none' }} id="tab-regia">
        <div className="project-video-wrapper reveal active" style={{ marginBottom: '4rem' }}>
          <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?controls=1&rel=0" allowFullScreen />
        </div>
        <MasonryGrid items={regiaData} orderedGrid={true} />
      </section>

      {/* MOSAICO */}
      <section className="portfolio-tab-panel section" style={{ display: activeTab === 'mosaico' ? '' : 'none' }} id="tab-mosaico">
        <MasonryGrid items={mosaicoFull} shuffle id="masonry-grid-mosaico" />
      </section>
    </>
  )
}
