import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import client from '@/tina/__generated__/client'
import AboutContent from '../../components/AboutContent'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  return {
    title: t('aboutTitle'),
    description: t('aboutDesc'),
  }
}

export default async function AboutPage() {
  const result = await client.queries.chiSono({ relativePath: 'chi-sono.json' }).catch(() => null)

  return (
    <AboutContent
      data={result?.data as any}
      query={result?.query || ''}
      variables={result?.variables || {}}
    />
  )
}
