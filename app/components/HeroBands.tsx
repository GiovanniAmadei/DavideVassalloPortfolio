'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'

interface HeroBandsProps {
  bands: {
    title?: string
    href?: string
    images?: string[]
  }[]
  tinaField?: any
  homepageData?: any
}

export default function HeroBands({ bands, tinaField, homepageData }: HeroBandsProps) {
  const refs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const intervals: ReturnType<typeof setInterval>[] = []

    bands.forEach((band, bandIdx) => {
      const container = refs.current[bandIdx]
      if (!container) return
      const imgs = container.querySelectorAll('img')
      if (imgs.length <= 1) return
      let current = 0
      const iv = setInterval(() => {
        imgs[current]?.classList.remove('active')
        current = (current + 1) % imgs.length
        if (imgs[current]) imgs[current].classList.add('active')
      }, 4000 + Math.random() * 2000)
      intervals.push(iv)
    })

    return () => intervals.forEach(clearInterval)
  }, [bands])

  return (
    <section className="hero-container" data-tina-field={tinaField ? tinaField(homepageData, 'heroBands') : undefined}>
      {bands.map((band, bandIdx) => (
        <Link 
          href={band.href || '#'} 
          className="hero-band" 
          id={`hero-band-${bandIdx}`} 
          key={bandIdx}
          data-tina-field={tinaField ? tinaField(band) : undefined}
        >
          <div
            className="hero-band-slider"
            ref={el => { refs.current[bandIdx] = el }}
          >
            {(band.images || []).map((src, i) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={`${src}-${i}`} src={src || ''} alt={band.title || ''} className={i === 0 ? 'active' : ''} />
            ))}
          </div>
          <div className="hero-band-overlay" />
          <h2 className="hero-band-title" data-tina-field={tinaField ? tinaField(band, 'title') : undefined}>{band.title}</h2>
        </Link>
      ))}
    </section>
  )
}
