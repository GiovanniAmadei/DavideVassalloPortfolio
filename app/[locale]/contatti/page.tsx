import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import client from '@/tina/__generated__/client'
import ContattiContent from '../../components/ContattiContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('contactTitle'),
    description: t('contactDesc'),
  }
}

export default async function ContattiPage() {
  const result = await client.queries.contatti({ relativePath: 'contatti.json' }).catch(() => null)

  return (
    <ContattiContent
      data={result?.data as any}
      query={result?.query || ''}
      variables={result?.variables || {}}
    />
  )
}
