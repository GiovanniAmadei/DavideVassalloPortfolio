import client from '@/tina/__generated__/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import PostDetailContent from '../../../components/PostDetailContent'

type Props = { params: Promise<{ locale: string; slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const postRes = await client.queries.post({ relativePath: `${slug}.md` }).catch(() => null)
  const post = postRes?.data?.post
  return { title: post?.title || 'Post' }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params

  const postRes = await client.queries.post({ relativePath: `${slug}.md` }).catch(() => null)

  if (!postRes || !postRes.data || !postRes.data.post) notFound()

  return (
    <PostDetailContent
      data={postRes.data as any}
      query={postRes.query}
      variables={postRes.variables}
    />
  )
}
