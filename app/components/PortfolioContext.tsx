'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PortfolioContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  fotoFilter: string
  setFotoFilter: (f: string) => void
  videoFilter: string
  setVideoFilter: (f: string) => void
  videoCategories: { id: string, label: string }[]
  setVideoCategories: (cats: { id: string, label: string }[]) => void
  regiaCategories: { id: string, label: string }[]
  setRegiaCategories: (cats: { id: string, label: string }[]) => void
  showFotoGrid: boolean
  setShowFotoGrid: (v: boolean) => void
}

const PortfolioContext = createContext<PortfolioContextType>({
  activeTab: 'fotografia',
  setActiveTab: () => {},
  fotoFilter: 'ritratti',
  setFotoFilter: () => {},
  videoFilter: 'all',
  setVideoFilter: () => {},
  videoCategories: [],
  setVideoCategories: () => {},
  regiaCategories: [],
  setRegiaCategories: () => {},
  showFotoGrid: false,
  setShowFotoGrid: () => {},
})

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('fotografia')
  const [fotoFilter, setFotoFilter] = useState('ritratti')
  const [videoFilter, setVideoFilter] = useState('all')
  const [videoCategories, setVideoCategories] = useState<{ id: string, label: string }[]>([])
  const [regiaCategories, setRegiaCategories] = useState<{ id: string, label: string }[]>([])
  const [showFotoGrid, setShowFotoGrid] = useState(false)

  return (
    <PortfolioContext.Provider value={{
      activeTab, setActiveTab,
      fotoFilter, setFotoFilter,
      videoFilter, setVideoFilter,
      videoCategories, setVideoCategories,
      regiaCategories, setRegiaCategories,
      showFotoGrid, setShowFotoGrid
    }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
