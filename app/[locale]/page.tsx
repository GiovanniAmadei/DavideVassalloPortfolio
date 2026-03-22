import { getTranslations } from 'next-intl/server'
import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import HomeContent from '../components/HomeContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('homeTitle'),
    description: t('homeDesc'),
  }
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  const fotoRes = await client.queries.fotografiaConnection()
  const postRes = await client.queries.postConnection()
  const homeRes = await client.queries.homepage({ relativePath: "homepage.json" })

  return (
    <HomeContent
      postData={postRes.data as any}
      postQuery={postRes.query}
      postVariables={postRes.variables}

      fotoData={fotoRes.data as any}
      fotoQuery={fotoRes.query}
      fotoVariables={fotoRes.variables}

      homeData={homeRes.data as any}
      homeQuery={homeRes.query}
      homeVariables={homeRes.variables}

      locale={locale}
    />
  )
}
