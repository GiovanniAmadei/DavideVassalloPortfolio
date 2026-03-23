'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { useTranslations } from 'next-intl'
import HeroBands from './HeroBands'
import MasonryGrid from './MasonryGrid'
import Reveal from './Reveal'
import Link from 'next/link'
import { loc } from '../lib/i18n'

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

  locale: string
}

export default function HomeContent(props: HomeContentProps) {
  const t = useTranslations()
  const { locale } = props
  const dateLocale = locale === 'en' ? 'en-GB' : 'it-IT'

  const { data: postsDataLocal } = useTina({
    query: props.postQuery,
    variables: props.postVariables,
    data: props.postData,
  })

  const { data: fotoDataLocal } = useTina({
    query: props.fotoQuery,
    variables: props.fotoVariables,
    data: props.fotoData,
  })

  const { data: homeDataLocal } = useTina({
    query: props.homeQuery,
    variables: props.homeVariables,
    data: props.homeData,
  })

  const hp = homeDataLocal.homepage

  const posts = (postsDataLocal.postConnection.edges || []).map((e: any) => e?.node).filter(Boolean) as any[]
  posts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())

  const fotografiaData = (fotoDataLocal.fotografiaConnection.edges || []).map((e: any) => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]

  const mosaicoFiltered = fotografiaData.filter((item: any) => item.inMosaico !== false)
  const mosaicoData = [
    ...mosaicoFiltered,
    ...mosaicoFiltered,
    ...mosaicoFiltered,
    ...mosaicoFiltered,
    ...mosaicoFiltered,
  ].map((item) => ({ ...item, _tinaField: tinaField(item) }))

  // Localized hero bands: swap title with _en variant when in English
  const localizedBands = (hp?.heroBands || []).map((band: any) => ({
    ...band,
    title: loc(band, 'title', locale) || band.title,
  }))

  const blogHref = locale === 'en' ? '/en/blog' : '/blog'
  const portfolioHref = locale === 'en' ? '/en/portfolio#mosaico' : '/portfolio#mosaico'
  const aboutHref = locale === 'en' ? '/en/about' : '/about'

  return (
    <>
      <HeroBands bands={localizedBands} tinaField={tinaField} homepageData={hp} />

      {/* CHI SONO PREVIEW */}
      <section className="section" id="chi-sono-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(hp, locale === 'en' ? 'chiSonoLabel_en' : 'chiSonoLabel')}>
            {loc(hp, 'chiSonoLabel', locale) || t('nav.about')}
          </span>
          <div className="section-rule" />
        </Reveal>
        <div className="about-grid">
          <Reveal className="about-image">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/DSC_0222-Enhanced-NR-2-2.jpg" alt="Davide Vassallo" />
          </Reveal>
          <Reveal className="about-text" style={{ transitionDelay: '.15s' }}>
            <h2 data-tina-field={tinaField(hp, locale === 'en' ? 'chiSonoPreviewTitle_en' : 'chiSonoPreviewTitle')}>
              {(() => {
                const title = loc(hp, 'chiSonoPreviewTitle', locale)
                return title
                  ? <span dangerouslySetInnerHTML={{ __html: title.replace('\n', '<br />') }} />
                  : <>Davide<br />Vassallo</>
              })()}
            </h2>
            <p data-tina-field={tinaField(hp, locale === 'en' ? 'chiSonoPreviewText1_en' : 'chiSonoPreviewText1')}>
              {loc(hp, 'chiSonoPreviewText1', locale) || t('about.bio1')}
            </p>
            <p data-tina-field={tinaField(hp, locale === 'en' ? 'chiSonoPreviewText2_en' : 'chiSonoPreviewText2')}>
              {loc(hp, 'chiSonoPreviewText2', locale) || t('about.bio2')}
            </p>
            <Link href={aboutHref} className="text-link">{t('common.readMore')}</Link>
          </Reveal>
        </div>
      </section>

      {/* BLOG PREVIEW */}
      <section className="section blog-preview-section" id="blog-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(hp, locale === 'en' ? 'blogLabel_en' : 'blogLabel')}>
            {loc(hp, 'blogLabel', locale) || t('nav.blog')}
          </span>
          <div className="section-rule" />
        </Reveal>
        <div className="blog-preview-grid">
          {posts.slice(0, 3).map((post) => {
            const date = new Date(post.publishedAt || new Date()).toLocaleDateString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' })
            const postHref = locale === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`
            const postTitle = loc(post, 'title', locale) || post.title
            return (
              <Link key={post.slug} className="blog-card reveal active" href={postHref} data-tina-field={tinaField(post)}>
                <div className="blog-card-image" data-tina-field={tinaField(post, 'mainImage')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.mainImage || '/assets/placeholder-blog.jpg'} alt={postTitle} />
                </div>
                <div className="blog-card-content">
                  <span className="blog-card-date" data-tina-field={tinaField(post, 'publishedAt')}>{date}</span>
                  <h3 className="blog-card-title" data-tina-field={tinaField(post, locale === 'en' ? 'title_en' : 'title')}>{postTitle}</h3>
                  <p className="blog-card-excerpt">{t('common.readArticle')}</p>
                </div>
              </Link>
            )
          })}
        </div>
        <div className="home-gallery-cta">
          <Link href={blogHref} data-tina-field={tinaField(hp, locale === 'en' ? 'ctaBlog_en' : 'ctaBlog')}>
            {loc(hp, 'ctaBlog', locale) || t('blog.readMore')}
          </Link>
        </div>
      </section>

      {/* MOSAICO PREVIEW */}
      <section className="section mosaico-preview-section" id="mosaico-preview">
        <Reveal className="section-header">
          <span className="section-label section-label-large" data-tina-field={tinaField(hp, locale === 'en' ? 'mosaicoLabel_en' : 'mosaicoLabel')}>
            {loc(hp, 'mosaicoLabel', locale) || t('nav.mosaic')}
          </span>
          <div className="section-rule" />
        </Reveal>
        <MasonryGrid items={mosaicoData} shuffle limit={48} id="mosaico-grid-preview" />
        <Reveal className="home-gallery-cta">
          <Link href={portfolioHref} data-tina-field={tinaField(hp, locale === 'en' ? 'ctaMosaico_en' : 'ctaMosaico')}>
            {loc(hp, 'ctaMosaico', locale) || t('nav.portfolio')}
          </Link>
        </Reveal>
      </section>
    </>
  )
}
