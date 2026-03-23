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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Davide Vassallo',
  jobTitle: 'Fotografo',
  url: 'https://davidevassallo.net',
  image: 'https://davidevassallo.net/assets/DSC_0222-Enhanced-NR-2-2.jpg',
  sameAs: [
    'https://www.instagram.com/davidevassallo',
  ],
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Ancona',
    addressCountry: 'IT',
  },
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params

  let fotoRes, postRes, homeRes
  try {
    ;[fotoRes, postRes, homeRes] = await Promise.all([
      client.queries.fotografiaConnection(),
      client.queries.postConnection(),
      client.queries.homepage({ relativePath: "homepage.json" }),
    ])
  } catch (err) {
    console.error('[HomePage] TinaCMS fetch failed:', err)
    throw err
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeContent
        postData={postRes!.data as any}
        postQuery={postRes!.query}
        postVariables={postRes!.variables}

        fotoData={fotoRes!.data as any}
        fotoQuery={fotoRes!.query}
        fotoVariables={fotoRes!.variables}

        homeData={homeRes!.data as any}
        homeQuery={homeRes!.query}
        homeVariables={homeRes!.variables}

        locale={locale}
      />
    </>
  )
}
