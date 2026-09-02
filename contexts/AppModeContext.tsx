'use client'
import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

type AppMode = 'demo' | 'live'

const AppModeContext = createContext<{
  mode: AppMode
  setMode: (m: AppMode) => void
}>({ mode: 'demo', setMode: () => {} })

export function AppModeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<AppMode>('demo')

  useEffect(() => {
    const saved = localStorage.getItem('ritual-hunters-mode') as AppMode | null
    if (saved === 'demo' || saved === 'live') setModeState(saved)
  }, [])

  const setMode = (m: AppMode) => {
    setModeState(m)
    localStorage.setItem('ritual-hunters-mode', m)
  }

  return (
    <AppModeContext.Provider value={{ mode, setMode }}>
      {children}
    </AppModeContext.Provider>
  )
}

export const useAppMode = () => useContext(AppModeContext)
