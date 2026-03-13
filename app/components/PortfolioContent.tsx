'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import type { FotografiaConnectionQuery, ProgettoVideoConnectionQuery } from "../../../tina/__generated__/types"
import PortfolioTabs from './PortfolioTabs'

interface PortfolioContentProps {
  fotoData: FotografiaConnectionQuery
  fotoQuery: string
  fotoVariables: object
  videoData: any
  videoQuery: string
  videoVariables: object
  portfolioPageData: any
  portfolioPageQuery: string
  portfolioPageVariables: object
}

export default function PortfolioContent(props: PortfolioContentProps) {
  // Use Tina on photography
  const { data: fotoDataLocal } = useTina({
    query: props.fotoQuery,
    variables: props.fotoVariables,
    data: props.fotoData,
  })

  // Use Tina on videos
  const { data: videoDataLocal } = useTina({
    query: props.videoQuery,
    variables: props.videoVariables,
    data: props.videoData,
  })

  // Use Tina on portfolio settings
  const { data: pageDataLocal } = useTina({
    query: props.portfolioPageQuery,
    variables: props.portfolioPageVariables,
    data: props.portfolioPageData,
  })

  const pageData = pageDataLocal.portfolioPage

  // Extract edges
  const rawFotografiaData = (fotoDataLocal.fotografiaConnection.edges || []).map(e => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]
  const rawVideoData = (videoDataLocal.progettoVideoConnection.edges || []).map(e => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]

  // Track the Tina Field on objects for Masonry Grid
  const fotografiaData = rawFotografiaData.map(item => ({ ...item, _tinaField: tinaField(item) }))
  const videoData = rawVideoData.map(item => ({ ...item, _tinaField: tinaField(item) }))

  const videomakingData = videoData.slice(0, 5)
  const regiaData = videoData.length > 5 ? videoData.slice(5) : videoData

  return (
    <PortfolioTabs 
      fotografiaData={fotografiaData}
      videomakingData={videomakingData}
      regiaData={regiaData}
      mosaicoData={fotografiaData}
      pageData={pageData}
      tinaField={tinaField}
    />
  )
}
