import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import client from '@/tina/__generated__/client'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, locale } = await params
  try {
    const res = await client.queries.progettoVideo({ relativePath: `${slug}.json` })
    const v = res.data.progettoVideo
    return {
      title: `${v.title} — Davide Vassallo`,
      description: v.description || v.logline || '',
    }
  } catch {
    const t = await getTranslations({ locale, namespace: 'video' })
    return { title: t('fallbackTitle') }
  }
}

export default async function ProgettoVideoPage({ params }: PageProps) {
  const { slug, locale } = await params
  const t = await getTranslations({ locale, namespace: 'video' })

  let videoData: any
  try {
    const res = await client.queries.progettoVideo({ relativePath: `${slug}.json` })
    videoData = res.data.progettoVideo
  } catch {
    notFound()
  }

  const isVideomaking = videoData.categoriaString === 'videomaking'
  const backHref = isVideomaking ? '/portfolio#videomaking' : '/portfolio#regia'
  const backLabel = isVideomaking ? t('backVideomaking') : t('backRegia')

  const videoUrl = videoData.url || ''
  let embedSrc: string | null = null

  if (videoUrl.includes('youtube.com/watch')) {
    const urlObj = new URL(videoUrl)
    const id = urlObj.searchParams.get('v')
    if (id) embedSrc = `https://www.youtube.com/embed/${id}?controls=1&rel=0`
  } else if (videoUrl.includes('youtu.be/')) {
    const id = videoUrl.split('youtu.be/')[1]?.split('?')[0]
    if (id) embedSrc = `https://www.youtube.com/embed/${id}?controls=1&rel=0`
  } else if (videoUrl.includes('vimeo.com/')) {
    const id = videoUrl.split('vimeo.com/')[1]?.split('?')[0]
    if (id) embedSrc = `https://player.vimeo.com/video/${id}`
  }

  const sottocategoria = videoData.sottocategoria || null

  return (
    <main className="project-hero section">
      <Link href={backHref} className="project-back-link">
        {backLabel}
      </Link>

      <header style={{ marginBottom: '2rem', marginTop: '1.5rem' }}>
        <p className="section-label" style={{ color: 'var(--muted)', marginBottom: '0.5rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
          {videoData.metadata}
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {videoData.title}
        </h1>
      </header>

      {/* Video + Specifiche side by side */}
      <div className="project-top-row">
        {embedSrc ? (
          <div className="project-video-wrapper reveal active">
            <iframe src={embedSrc} allowFullScreen />
          </div>
        ) : videoData.src ? (
          <div className="reveal active">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={videoData.src}
              alt={videoData.title}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover' }}
            />
          </div>
        ) : (
          <div className="reveal active" />
        )}
        <div className="project-specifiche reveal active" style={{ transitionDelay: '0.1s' }}>
          <h2>{t('specs')}</h2>
          <ul className="project-specs-list">
            {videoData.metadata && (
              <li><span className="spec-label">{t('yearDurationType')}</span>{videoData.metadata}</li>
            )}
            <li><span className="spec-label">{t('directionPhoto')}</span>Davide Vassallo</li>
            <li>
              <span className="spec-label">{t('category')}</span>
              {isVideomaking ? 'Videomaking' : (locale === 'en' ? 'Direction' : 'Regia')}
              {sottocategoria && ` — ${sottocategoria}`}
            </li>
          </ul>
        </div>
      </div>

      {(videoData.logline || videoData.description) && (
        <div className="project-sinossi reveal active" style={{ transitionDelay: '0.2s', marginTop: '2.5rem' }}>
          <h2>{t('synopsis')}</h2>
          {videoData.logline && <p style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic', color: 'var(--muted)' }}>{videoData.logline}</p>}
          {videoData.description && <p>{videoData.description}</p>}
        </div>
      )}
    </main>
  )
}
