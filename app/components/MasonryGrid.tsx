'use client'

import { useState, useMemo } from 'react'
import { useTranslations } from 'next-intl'
import Lightbox from './Lightbox'

interface MasonryItem {
  src: string
  title?: string
  description?: string
  metadata?: string
  category?: string
  aspectRatio?: number
  isPreviewCard?: boolean
  logline?: string
  url?: string
  slug?: string
  _tinaField?: any
}

interface MasonryGridProps {
  items: MasonryItem[]
  shuffle?: boolean
  limit?: number
  filter?: string
  id?: string
  orderedGrid?: boolean
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function MasonryGrid({ items, shuffle = false, limit, filter, id, orderedGrid = false }: MasonryGridProps) {
  const t = useTranslations('nav')
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null)
  const [refreshKey, setRefreshKey] = useState(0)

  const data = useMemo(() => {
    let result = shuffle ? shuffleArray(items) : [...items]
    if (filter && filter !== 'all') result = result.filter(i => i.category === filter)
    if (limit) result = result.slice(0, limit)
    return result
  }, [items, shuffle, filter, limit, refreshKey])

  const openLightbox = (index: number) => setLightbox({ index })
  const handleRefresh = () => setRefreshKey(k => k + 1)

  return (
    <>
      <div className={orderedGrid ? "ordered-grid" : "masonry-grid"} id={id}>
        {data.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`masonry-item reveal active${item.aspectRatio && item.aspectRatio < 1 ? ' portrait' : ''}${item.isPreviewCard ? ' has-preview' : ''}`}
            data-category={item.category}
            data-tina-field={item._tinaField}
            onClick={(e) => {
              if (orderedGrid && item.slug) {
                // Video items always navigate to their project page
                window.location.href = `/portfolio/video/${item.slug}`
              } else if (item.url) {
                if (item.url.includes('project-detail.html')) {
                  e.preventDefault()
                  openLightbox(index)
                } else if (item.url.startsWith('http') || item.url.startsWith('www')) {
                  window.open(item.url.startsWith('http') ? item.url : `https://${item.url}`, '_blank')
                } else {
                  window.location.href = item.url
                }
              } else {
                openLightbox(index)
              }
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.title || ''} />
            {(orderedGrid || item.isPreviewCard) ? (
              <div className="project-preview-card">
                <h3 className="project-preview-title">{item.title}</h3>
                <p className="project-preview-meta">{item.metadata}</p>
                <p className="project-preview-logline">{item.logline}</p>
              </div>
            ) : (
              <div className="masonry-caption">
                <p className="masonry-caption-title">{item.title}</p>
                <p className="masonry-caption-cat">{item.category}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {shuffle && (
        <div style={{ textAlign: 'center', marginTop: '3rem', marginBottom: '2rem' }}>
          <button
            onClick={handleRefresh}
            style={{
              background: 'transparent',
              border: '1px solid var(--border)',
              padding: '0.6rem 1.5rem',
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.8rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              color: 'inherit',
              transition: 'background 0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'var(--foreground)'
              e.currentTarget.style.color = 'var(--background)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent'
              e.currentTarget.style.color = 'inherit'
            }}
          >
            {t('refreshMosaic')}
          </button>
        </div>
      )}

      {lightbox !== null && (
        <Lightbox items={data} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
