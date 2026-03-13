import type { Metadata } from 'next'
import client from '@/tina/__generated__/client'
import ContattiContent from '../components/ContattiContent'

export const metadata: Metadata = {
  title: 'Contatti',
  description: 'Contatta Davide Vassallo — Fotografo disponibile per ritratti, reportage ed eventi a Milano e in Italia.',
}

export default async function ContattiPage() {
  const result = await client.queries.contatti({ relativePath: 'contatti.json' }).catch(e => null)

  return (
    <ContattiContent 
      data={result?.data as any} 
      query={result?.query || ''} 
      variables={result?.variables || {}} 
    />
  )
}
