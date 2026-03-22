import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { redirect } from 'next/navigation'
import client from '@/tina/__generated__/client'
import BlogIndexContent from '../../components/BlogIndexContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('blogTitle'),
    description: t('blogDesc'),
  }
}

export default async function BlogPage() {
  const postRes = await client.queries.postConnection()
  const pageRes = await client.queries.blogPage({ relativePath: "blog.json" })

  const blogPageData = pageRes.data?.blogPage as any
  if (blogPageData?.attivata === false) {
    redirect('/')
  }

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
