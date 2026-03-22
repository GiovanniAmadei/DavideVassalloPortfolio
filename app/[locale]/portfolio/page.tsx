import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import client from '@/tina/__generated__/client'
import PortfolioContent from '../../components/PortfolioContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('portfolioTitle'),
    description: t('portfolioDesc'),
  }
}

export default async function PortfolioPage() {
  const fotoRes = await client.queries.fotografiaConnection()
  const videoRes = await client.queries.progettoVideoConnection()
  const pageRes = await client.queries.portfolioPage({ relativePath: "portfolio.json" })

  return (
    <PortfolioContent
      fotoData={fotoRes.data as any}
      fotoQuery={fotoRes.query}
      fotoVariables={fotoRes.variables}

      videoData={videoRes.data as any}
      videoQuery={videoRes.query}
      videoVariables={videoRes.variables}

      portfolioPageData={pageRes.data as any}
      portfolioPageQuery={pageRes.query}
      portfolioPageVariables={pageRes.variables}
    />
  )
}
