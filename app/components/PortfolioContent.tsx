'use client'

import { useEffect } from 'react'
import { useTina, tinaField } from "tinacms/dist/react"
import PortfolioTabs from './PortfolioTabs'
import { usePortfolio } from './PortfolioContext'

interface PortfolioContentProps {
  fotoData: any
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
  const { setVideoCategories, setRegiaCategories } = usePortfolio()

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
  const rawFotografiaData = (fotoDataLocal.fotografiaConnection.edges || []).map((e: any) => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]
  const rawVideoData = (videoDataLocal.progettoVideoConnection.edges || []).map((e: any) => e?.node).filter(Boolean).sort((a: any, b: any) => (a.ordine || 0) - (b.ordine || 0)) as any[]

  // Track the Tina Field on objects for Masonry Grid and map categoriaString to category
  const fotografiaData = rawFotografiaData.map(item => ({ ...item, category: item.categoriaString, _tinaField: tinaField(item) }))
  const videoData = rawVideoData.map(item => ({ 
    ...item, 
    // Use sottocategoria for filtering (sub-category tags like reportage, ricerca, etc.)
    // categoriaString (videomaking/regia) is only for tab routing
    category: item.sottocategoria || undefined,
    slug: item._sys?.filename,
    _tinaField: tinaField(item) 
  }))

  // Split by categoriaString: only "videomaking" goes to videomaking tab, only "regia" to regia tab
  const videomakingData = videoData.filter((v: any) => v.categoriaString === 'videomaking')
  const regiaData = videoData.filter((v: any) => v.categoriaString === 'regia')

  // Extract unique sottocategorie for the header filters
  const vCatsStr = JSON.stringify(videomakingData.map((v: any) => v.category).filter(Boolean))
  const rCatsStr = JSON.stringify(regiaData.map((v: any) => v.category).filter(Boolean))

  useEffect(() => {
    const vCats = Array.from(new Set(JSON.parse(vCatsStr))).map(c => ({ id: c as string, label: (c as string).charAt(0).toUpperCase() + (c as string).slice(1) }))
    const rCats = Array.from(new Set(JSON.parse(rCatsStr))).map(c => ({ id: c as string, label: (c as string).charAt(0).toUpperCase() + (c as string).slice(1) }))

    setVideoCategories(vCats)
    setRegiaCategories(rCats)
  }, [vCatsStr, rCatsStr, setVideoCategories, setRegiaCategories])

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
