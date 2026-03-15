import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import client from '@/tina/__generated__/client'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  try {
    const res = await client.queries.progettoVideo({ relativePath: `${slug}.json` })
    const v = res.data.progettoVideo
    return {
      title: `${v.title} — Davide Vassallo`,
      description: v.description || v.logline || '',
    }
  } catch {
    return { title: 'Progetto — Davide Vassallo' }
  }
}

export default async function ProgettoVideoPage({ params }: PageProps) {
  const { slug } = await params

  let videoData: any
  try {
    const res = await client.queries.progettoVideo({ relativePath: `${slug}.json` })
    videoData = res.data.progettoVideo
  } catch {
    notFound()
  }

  const isVideomaking = videoData.categoriaString === 'videomaking'
  const backHref = isVideomaking ? '/portfolio#videomaking' : '/portfolio#regia'
  const backLabel = isVideomaking ? '← Videomaking' : '← Regia'

  // Detect if url is an embeddable video link (YouTube or Vimeo)
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
      {/* Back link */}
      <Link href={backHref} className="project-back-link">
        {backLabel}
      </Link>

      {/* Header */}
      <header style={{ marginBottom: '2rem', marginTop: '1.5rem' }}>
        <p className="section-label" style={{ color: 'var(--muted)', marginBottom: '0.5rem', display: 'block', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem' }}>
          {videoData.metadata}
        </p>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', fontWeight: 400, textTransform: 'uppercase', letterSpacing: '-0.02em', lineHeight: 1 }}>
          {videoData.title}
        </h1>
      </header>

      {/* Video + Specifiche side by side */}
      {embedSrc ? (
        <div className="project-top-row">
          <div className="project-video-wrapper reveal active">
            <iframe src={embedSrc} allowFullScreen />
          </div>
          <div className="project-specifiche reveal active" style={{ transitionDelay: '0.1s' }}>
            <h2>Specifiche</h2>
            <ul className="project-specs-list">
              {videoData.metadata && (
                <li><span className="spec-label">Anno / Durata / Tipo</span>{videoData.metadata}</li>
              )}
              <li><span className="spec-label">Regia &amp; Direzione della Fotografia</span>Davide Vassallo</li>
              <li>
                <span className="spec-label">Categoria</span>
                {isVideomaking ? 'Videomaking' : 'Regia'}
                {sottocategoria && ` — ${sottocategoria}`}
              </li>
            </ul>
          </div>
        </div>
      ) : (
        /* No embed: cover image full-width + specifiche below in 2-col */
        <>
          {videoData.src && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={videoData.src}
              alt={videoData.title}
              style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover', marginBottom: '3rem' }}
            />
          )}
          <div className="project-content" style={{ marginBottom: '3rem' }}>
            <div />
            <div className="project-specifiche reveal active">
              <h2>Specifiche</h2>
              <ul className="project-specs-list">
                {videoData.metadata && (
                  <li><span className="spec-label">Anno / Durata / Tipo</span>{videoData.metadata}</li>
                )}
                <li><span className="spec-label">Regia &amp; Direzione della Fotografia</span>Davide Vassallo</li>
                <li>
                  <span className="spec-label">Categoria</span>
                  {isVideomaking ? 'Videomaking' : 'Regia'}
                  {sottocategoria && ` — ${sottocategoria}`}
                </li>
              </ul>
            </div>
          </div>
        </>
      )}

      {/* Sinossi — full width below */}
      {(videoData.logline || videoData.description) && (
        <div className="project-sinossi reveal active" style={{ transitionDelay: '0.2s', marginTop: '2.5rem' }}>
          <h2>Sinossi</h2>
          {videoData.logline && <p style={{ fontSize: '1.2rem', marginBottom: '1rem', fontStyle: 'italic', color: 'var(--muted)' }}>{videoData.logline}</p>}
          {videoData.description && <p>{videoData.description}</p>}
        </div>
      )}
    </main>
  )
}
