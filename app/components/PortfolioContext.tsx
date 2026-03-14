'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface PortfolioContextType {
  activeTab: string
  setActiveTab: (tab: string) => void
  fotoFilter: string
  setFotoFilter: (f: string) => void
  videoFilter: string
  setVideoFilter: (f: string) => void
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
  showFotoGrid: false,
  setShowFotoGrid: () => {},
})

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [activeTab, setActiveTab] = useState('fotografia')
  const [fotoFilter, setFotoFilter] = useState('ritratti')
  const [videoFilter, setVideoFilter] = useState('all')
  const [showFotoGrid, setShowFotoGrid] = useState(false)

  return (
    <PortfolioContext.Provider value={{ activeTab, setActiveTab, fotoFilter, setFotoFilter, videoFilter, setVideoFilter, showFotoGrid, setShowFotoGrid }}>
      {children}
    </PortfolioContext.Provider>
  )
}

export function usePortfolio() {
  return useContext(PortfolioContext)
}
