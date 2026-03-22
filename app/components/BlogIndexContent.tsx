'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { useTranslations, useLocale } from 'next-intl'
import type { PostConnectionQuery } from "../../../tina/__generated__/types"
import Reveal from './Reveal'
import Link from 'next/link'

interface BlogIndexContentProps {
  data: any
  query: string
  variables: object
  blogPageData: any
  blogPageQuery: string
  blogPageVariables: object
}

export default function BlogIndexContent(props: BlogIndexContentProps) {
  const t = useTranslations('blog')
  const locale = useLocale()
  const dateLocale = locale === 'en' ? 'en-GB' : 'it-IT'

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })
  const { data: pageDataLocal } = useTina({
    query: props.blogPageQuery,
    variables: props.blogPageVariables,
    data: props.blogPageData,
  })

  const pageData = pageDataLocal.blogPage

  const posts = (data.postConnection.edges || []).map((e: any) => e?.node).filter(Boolean) as any[]
  posts.sort((a, b) => new Date(b.publishedAt || 0).getTime() - new Date(a.publishedAt || 0).getTime())

  return (
    <>
      <div className="page-hero">
        <Reveal tag="p" className="page-hero-label" style={{ display: 'block' }}>
          <span data-tina-field={tinaField(pageData, 'label')}>{pageData?.label || t('label')}</span>
        </Reveal>
        <Reveal tag="h1" className="page-hero-title">
          <span data-tina-field={tinaField(pageData, 'title')}>{pageData?.title || t('title')}</span>
        </Reveal>
      </div>

      <section className="section">
        <div className="blog-grid" id="blog-grid">
          {(!posts || posts.length === 0) ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', color: 'var(--muted)', padding: '2rem' }} data-tina-field={tinaField(pageData, 'emptyMessage')}>
              {pageData?.emptyMessage || t('empty')}
            </p>
          ) : posts.map((post) => {
            const date = new Date(post.publishedAt || new Date()).toLocaleDateString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' })
            const postHref = locale === 'en' ? `/en/blog/${post.slug}` : `/blog/${post.slug}`
            return (
              <Link key={post.slug} className="blog-card reveal active" href={postHref} data-tina-field={tinaField(post)}>
                <div className="blog-card-image" data-tina-field={tinaField(post, 'mainImage')}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={post.mainImage || '/assets/placeholder-blog.jpg'} alt={post.title} />
                </div>
                <div className="blog-card-content">
                  <span className="blog-card-date" data-tina-field={tinaField(post, 'publishedAt')}>{date}</span>
                  <h3 className="blog-card-title" data-tina-field={tinaField(post, 'title')}>{post.title}</h3>
                  <p className="blog-card-excerpt" data-tina-field={tinaField(pageData, 'readMoreLabel')}>
                    {pageData?.readMoreLabel || t('readMore')}
                  </p>
                </div>
              </Link>
            )
          })}
        </div>
      </section>
    </>
  )
}
