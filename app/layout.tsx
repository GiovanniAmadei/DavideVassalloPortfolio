import type { Metadata } from 'next'
import Header from './components/Header'
import Footer from './components/Footer'
import PaperGrain from './components/PaperGrain'
import GlobalDataWrapper from './components/GlobalDataWrapper'
import { PortfolioProvider } from './components/PortfolioContext'
import CookieBanner from './components/CookieBanner'
import client from '@/tina/__generated__/client'
import '../styles.css'

export const metadata: Metadata = {
  title: {
    default: 'Davide Vassallo | Photographer',
    template: '%s | Davide Vassallo'
  },
  description: 'Davide Vassallo — Fotografo professionale a Milano. Portfolio editoriale di ritratto, reportage eventi e ricerca fotografica.',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const globalRes = await client.queries.global({ relativePath: "global.json" })
  const blogRes = await client.queries.blogPage({ relativePath: "blog.json" })
  
  return (
    <html lang="it">
      <body style={{ margin: 0, padding: 0 }}>
        <PaperGrain />
        <PortfolioProvider>
          <GlobalDataWrapper
            data={globalRes.data as any}
            query={globalRes.query}
            variables={globalRes.variables}
            blogData={blogRes.data as any}
            blogQuery={blogRes.query}
            blogVariables={blogRes.variables}
          >
            {children}
          </GlobalDataWrapper>
        </PortfolioProvider>
        <CookieBanner />
      </body>
    </html>
  )
}
