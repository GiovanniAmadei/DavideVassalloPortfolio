'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import { TinaMarkdown } from "tinacms/dist/rich-text"
import { useLocale } from 'next-intl'
import type { PostQuery } from "../../../tina/__generated__/types"

interface PostDetailContentProps {
  data: PostQuery
  query: string
  variables: object
}

export default function PostDetailContent(props: PostDetailContentProps) {
  const locale = useLocale()
  const dateLocale = locale === 'en' ? 'en-GB' : 'it-IT'

  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  })

  const post = data.post
  const date = new Date(post.publishedAt || new Date()).toLocaleDateString(dateLocale, { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <article style={{ maxWidth: '760px', margin: '0 auto', padding: '8rem 2rem 6rem' }}>
      <p style={{ fontSize: '0.8rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: '1rem' }} data-tina-field={tinaField(post, 'publishedAt')}>
        {date}
      </p>
      <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 300, letterSpacing: '-0.02em', marginBottom: '3rem' }} data-tina-field={tinaField(post, 'title')}>
        {post.title}
      </h1>
      {post.mainImage && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.mainImage} alt={post.title} style={{ width: '100%', marginBottom: '3rem', objectFit: 'cover' }} data-tina-field={tinaField(post, 'mainImage')} />
      )}
      <div style={{ fontSize: '1.05rem', lineHeight: '1.8', color: 'var(--muted)' }} className="tina-markdown" data-tina-field={tinaField(post, 'body')}>
        <TinaMarkdown content={post.body} />
      </div>
    </article>
  )
}
