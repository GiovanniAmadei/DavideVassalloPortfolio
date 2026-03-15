'use client'

import { useState, useEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'

interface LightboxItem {
  src: string
  title?: string
  description?: string
  metadata?: string
}

interface LightboxProps {
  items: LightboxItem[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ items, initialIndex, onClose }: LightboxProps) {
  const [index, setIndex] = useState(initialIndex)
  const item = items[index]

  const prev = useCallback(() => setIndex(i => (i - 1 + items.length) % items.length), [items.length])
  const next = useCallback(() => setIndex(i => (i + 1) % items.length), [items.length])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [prev, next, onClose])
  const content = (
    <div className="lightbox-modal active" id="lightbox-modal">
      <div className="lightbox-close" onClick={onClose}>✕</div>
      <button className="lightbox-nav lightbox-prev" onClick={(e) => { e.stopPropagation(); prev() }} aria-label="Previous image">‹</button>
      <button className="lightbox-nav lightbox-next" onClick={(e) => { e.stopPropagation(); next() }} aria-label="Next image">›</button>
      <div className="lightbox-content-wrapper">
        <div className="lightbox-image-container">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="lightbox-image" src={item.src} alt={item.title || ''} />
        </div>
        <div className="lightbox-info">
          <h2 className="lightbox-title">{item.title}</h2>
          <p className="lightbox-desc">{item.description}</p>
          <p className="lightbox-meta">{item.metadata}</p>
        </div>
      </div>
    </div>
  )

  if (typeof document === 'undefined') return null

  return createPortal(content, document.body)
}
