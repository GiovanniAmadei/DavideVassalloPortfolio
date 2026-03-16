'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import type { PostConnectionQuery, FotografiaConnectionQuery } from "../../../tina/__generated__/types"
import HeroBands from './HeroBands'
import MasonryGrid from './MasonryGrid'
import Reveal from './Reveal'
import Link from 'next/link'

interface HomeContentProps {
  postData: any
  postQuery: string
  postVariables: object
  
  fotoData: any
  fotoQuery: string
  fotoVariables: object

  homeData: any
  homeQuery: string
  homeVariables: object
}

export default function HomeContent(props: HomeContentProps) {
  // Use Tina on posts
  const { data: postsDataLocal } = useTina({
    query: props.postQuery,
    variables: props.postVariables,
    data: props.postData,
  })

  // Use Tina on photography
  const { data: fotoDataLocal } = useTina({
    query: props.fotoQuery,
    variables: props.fotoVariables,
    data: props.fotoData,
  })

  // Use Tina on homepage settings
  const { data: homeDataLocal } = useTina({
    query: props.homeQuery,
    variables: props.homeVariables,
    data: props.homeData,
  })

  const homepageData = homeDataLocal.homepage

  // Re-process items
  const posts = (postsDataLocal.postConnection.edges || []).map((e: any) => e?.node).filter(Boolean) as any[]
  posts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())

  const fotografiaData = (fotoDataLocal.fotografiaConnection.edges || []).map((e: any) => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]
  
  // Note: Since MasonryGrid maps over items, to get visual editing on photos we ideally pass the `tinaField` info 
  // into the items array or refactor MasonryGrid. For now we will map the `tinaField` attribute on the objects so MasonryGrid can use it
  const mosaicoData = [
    ...fotografiaData,
    ...fotografiaData,
    ...fotografiaData,
    ...fotografiaData,
    ...fotografiaData,
  ].map((item, id) => ({...item, _tinaField: tinaField(item)}))
  

  return (
    <>
      <HeroBands bands={homepageData?.heroBands || []} tinaField={tinaField} homepageData={homepageData} />

      {/* CHI SONO PREVIEW */}
      <section className="section" id="chi-sono-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(homepageData, 'chiSonoLabel')}>
            {homepageData?.chiSonoLabel || 'Chi sono'}
          </span>
          <div className="section-rule" />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/DSC_0222-Enhanced-NR-2-2.jpg" alt="Davide Vassallo" />
          </Reveal>
          <Reveal className="about-text" style={{ transitionDelay: '.15s' }}>
            <h2 data-tina-field={tinaField(homepageData, 'chiSonoPreviewTitle')}>{homepageData?.chiSonoPreviewTitle ? <span dangerouslySetInnerHTML={{__html: homepageData.chiSonoPreviewTitle.replace('\n', '<br />')}} /> : <>Davide<br />Vassallo</>}</h2>
            <p data-tina-field={tinaField(homepageData, 'chiSonoPreviewText1')}>{homepageData?.chiSonoPreviewText1 || "Sono Davide Vassallo, fotografo con base a Milano. Il mio linguaggio nasce dalla sottrazione: rigore geometrico e ricerca costante sull'identità e lo spazio."}</p>
            <p data-tina-field={tinaField(homepageData, 'chiSonoPreviewText2')}>{homepageData?.chiSonoPreviewText2 || "Dieci anni tra editoria e set commerciali, intrecciando reportage e ritratto in studio."}</p>
            <Link href="/about" className="text-link">Leggi di più →</Link>
          </Reveal>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section blog-preview-section" id="blog-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(homepageData, 'blogLabel')}>
            {homepageData?.blogLabel || 'Blog'}
          </span>
          <div className="section-rule" />
        </Reveal>
        <div className="blog-preview-grid">
          {posts.slice(0, 1).map((post) => {
            const date = new Date(post.publishedAt || new Date()).toLocaleDateString('it-IT', { day: '2-digit', month: 'long', year: 'numeric' })
            return (
              <Link key={post.slug} className="blog-card reveal active" href={`/blog/${post.slug}`} data-tina-field={tinaField(post)}>
                <div className="blog-card-image" data-tina-field={tinaField(post, 'mainImage')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.mainImage || '/assets/placeholder-blog.jpg'} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <span className="blog-card-date" data-tina-field={tinaField(post, 'publishedAt')}>{date}</span>
                  <h3 className="blog-card-title" data-tina-field={tinaField(post, 'title')}>{post.title}</h3>
                  <p className="blog-card-excerpt">Leggi l&apos;articolo...</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="home-gallery-cta">
          <Link href="/blog" data-tina-field={tinaField(homepageData, 'ctaBlog')}>
            {homepageData?.ctaBlog || 'Tutte le riflessioni'}
          </Link>
        </div>
      </section>

      {/* MOSAICO PREVIEW */}
      <section className="section mosaico-preview-section" id="mosaico-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(homepageData, 'mosaicoLabel')}>
            {homepageData?.mosaicoLabel || 'Mosaico'}
          </span>
          <div className="section-rule" />
        </Reveal>
        <MasonryGrid items={mosaicoData} shuffle limit={48} id="mosaico-grid-preview" />
        <Reveal className="home-gallery-cta">
          <Link href="/portfolio#mosaico" data-tina-field={tinaField(homepageData, 'ctaMosaico')}>
            {homepageData?.ctaMosaico || 'vai al portfolio'}
          </Link>
        </Reveal>
      </section>
    </>
  )
}
