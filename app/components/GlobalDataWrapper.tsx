'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import type { GlobalQuery } from "../../../tina/__generated__/types"
import Header from './Header'
import Footer from './Footer'

interface GlobalDataWrapperProps {
  data: GlobalQuery
  query: string
  variables: object
  blogData: any
  blogQuery: string
  blogVariables: object
  locale: string
  children: React.ReactNode
}

export default function GlobalDataWrapper({ data, query, variables, blogData, blogQuery, blogVariables, locale, children }: GlobalDataWrapperProps) {
  const { data: globalData } = useTina({
    query,
    variables,
    data,
  })

  const { data: bData } = useTina({
    query: blogQuery,
    variables: blogVariables,
    data: blogData,
  })

  const globalSettings = globalData.global
  const blogSettings = bData?.blogPage

  return (
    <>
      <Header globalSettings={globalSettings} blogSettings={blogSettings} tinaField={tinaField} locale={locale} />
      {children}
      <Footer globalSettings={globalSettings} tinaField={tinaField} />
    </>
  )
}
