import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import PortfolioContent from '../components/PortfolioContent'

export const metadata: Metadata = {
  title: 'Portfolio',
  description: 'Portfolio fotografico di Davide Vassallo — Fotografia, Videomaking, Regia, Mosaico. Galleria completa con lavori professionali.',
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
