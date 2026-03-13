import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import HomeContent from './components/HomeContent'

export const metadata: Metadata = {
  title: 'Davide Vassallo | Photographer',
  description: 'Davide Vassallo — Fotografo professionale a Milano. Portfolio editoriale di ritratto, reportage eventi e ricerca fotografica.',
}

export default async function HomePage() {
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
    />
  )
}
