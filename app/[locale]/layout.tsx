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
  return {
    title: {
      default: t('homeTitle'),
      template: `%s | Davide Vassallo`
    },
    description: t('homeDesc'),
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
  const globalRes = await client.queries.global({ relativePath: "global.json" })
  const blogRes = await client.queries.blogPage({ relativePath: "blog.json" })

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
