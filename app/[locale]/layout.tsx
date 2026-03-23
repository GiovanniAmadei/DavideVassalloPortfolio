import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import Header from '../components/Header'
import Footer from '../components/Footer'
import PaperGrain from '../components/PaperGrain'
import GlobalDataWrapper from '../components/GlobalDataWrapper'
import { PortfolioProvider } from '../components/PortfolioContext'
import CookieBanner from '../components/CookieBanner'
import client from '@/tina/__generated__/client'
import '../../styles.css'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'metadata' })
  const title = t('homeTitle')
  const description = t('homeDesc')
  return {
    title: {
      default: title,
      template: `%s | Davide Vassallo`
    },
    description,
    openGraph: {
      title,
      description,
      url: 'https://davidevassallo.net',
      siteName: 'Davide Vassallo',
      images: [
        {
          url: 'https://davidevassallo.net/assets/DSC_2852.jpg',
          width: 1200,
          height: 800,
          alt: 'Davide Vassallo — Fotografo Professionale',
        },
      ],
      locale: locale === 'en' ? 'en_GB' : 'it_IT',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://davidevassallo.net/assets/DSC_2852.jpg'],
    },
    metadataBase: new URL('https://davidevassallo.net'),
  }
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  if (!(routing.locales as readonly string[]).includes(locale)) {
    notFound()
  }

  const messages = await getMessages()
  let globalRes: any
  let blogRes: any
  try {
    globalRes = await client.queries.global({ relativePath: "global.json" })
    blogRes = await client.queries.blogPage({ relativePath: "blog.json" })
  } catch (err: any) {
    return (
      <html lang={locale}>
        <body>
          <div style={{ padding: '2rem', fontFamily: 'monospace', color: 'red' }}>
            <h1>Server-side Rendering Error: client.queries failed</h1>
            <p>{err.message}</p>
            <pre>{err.stack}</pre>
          </div>
        </body>
      </html>
    )
  }

  return (
    <html lang={locale}>
      <body style={{ margin: 0, padding: 0 }}>
        <NextIntlClientProvider messages={messages}>
          <PaperGrain />
          <PortfolioProvider>
            <GlobalDataWrapper
              data={globalRes.data as any}
              query={globalRes.query}
              variables={globalRes.variables}
              blogData={blogRes.data as any}
              blogQuery={blogRes.query}
              blogVariables={blogRes.variables}
              locale={locale}
            >
              {children}
            </GlobalDataWrapper>
          </PortfolioProvider>
          <CookieBanner />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
