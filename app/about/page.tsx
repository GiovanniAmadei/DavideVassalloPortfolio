import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import AboutContent from '../components/AboutContent'

export const metadata: Metadata = {
  title: 'Chi Sono',
  description: 'Chi è Davide Vassallo — Fotografo editoriale milanese. Biografia, filosofia di scatto e percorso professionale.',
}

export default async function AboutPage() {
  const result = await client.queries.chiSono({ relativePath: 'chi-sono.json' }).catch(e => null)

  return (
    <AboutContent 
      data={result?.data as any} 
      query={result?.query || ''} 
      variables={result?.variables || {}} 
    />
  )
}
