import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import BlogIndexContent from '../components/BlogIndexContent'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Blog di Davide Vassallo — Riflessioni sulla fotografia, tecnica, visione e racconti dai set.',
}

export default async function BlogPage() {
  const postRes = await client.queries.postConnection()
  const pageRes = await client.queries.blogPage({ relativePath: "blog.json" })

  return (
    <BlogIndexContent 
      data={postRes.data as any} 
      query={postRes.query}
      variables={postRes.variables}

      blogPageData={pageRes.data as any}
      blogPageQuery={pageRes.query}
      blogPageVariables={pageRes.variables}
    />
  )
}
