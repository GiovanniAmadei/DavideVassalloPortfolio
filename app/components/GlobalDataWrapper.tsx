'use client'

import { useTina, tinaField } from "tinacms/dist/react"
import type { GlobalQuery } from "../../../tina/__generated__/types"
import Header from './Header'
import Footer from './Footer'

interface GlobalDataWrapperProps {
  data: GlobalQuery
  query: string
  variables: object
  children: React.ReactNode
}

export default function GlobalDataWrapper({ data, query, variables, children }: GlobalDataWrapperProps) {
  const { data: globalData } = useTina({
    query,
    variables,
    data,
  })

  const globalSettings = globalData.global

  return (
    <>
      <Header globalSettings={globalSettings} tinaField={tinaField} />
      {children}
      <Footer globalSettings={globalSettings} tinaField={tinaField} />
    </>
  )
}
