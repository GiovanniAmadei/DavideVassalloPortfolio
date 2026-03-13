'use client'

import { useState, useCallback } from 'react'
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
  _tinaField?: any
}

interface MasonryGridProps {
  items: MasonryItem[]
  shuffle?: boolean
  limit?: number
  filter?: string
  id?: string
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

export default function MasonryGrid({ items, shuffle = false, limit, filter, id }: MasonryGridProps) {
  const [lightbox, setLightbox] = useState<{ index: number } | null>(null)

  const processed = useCallback(() => {
    let data = shuffle ? shuffleArray(items) : [...items]
    if (filter && filter !== 'all') data = data.filter(i => i.category === filter)
    if (limit) data = data.slice(0, limit)
    return data
  }, [items, shuffle, filter, limit])

  const data = processed()

  const openLightbox = (index: number) => setLightbox({ index })

  return (
    <>
      <div className="masonry-grid" id={id}>
        {data.map((item, index) => (
          <div
            key={`${item.src}-${index}`}
            className={`masonry-item reveal active${item.aspectRatio && item.aspectRatio < 1 ? ' portrait' : ''}${item.isPreviewCard ? ' has-preview' : ''}`}
            data-category={item.category}
            data-tina-field={item._tinaField}
            onClick={() => {
              if (item.url) window.location.href = item.url
              else openLightbox(index)
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={item.src} alt={item.title || ''} />
            {item.isPreviewCard ? (
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
      {lightbox !== null && (
        <Lightbox items={data} initialIndex={lightbox.index} onClose={() => setLightbox(null)} />
      )}
    </>
  )
}
