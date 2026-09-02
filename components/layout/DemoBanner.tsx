'use client'
import { useEffect, useState } from 'react'
import { useAppMode } from '@/contexts/AppModeContext'

export function DemoBanner() {
  const { mode } = useAppMode()
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined' && sessionStorage.getItem('scout-banner-dismissed') === '1') {
      setDismissed(true)
    }
  }, [])

  const dismiss = () => {
    setDismissed(true)
    sessionStorage.setItem('scout-banner-dismissed', '1')
  }

  if (mode !== 'demo' || dismissed) return null

  return (
    <div style={{
      background: 'rgba(168,85,247,0.05)',
      borderBottom: '1px solid rgba(168,85,247,0.12)',
      padding: '8px 24px',
      display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9985c8',
    }}>
      <span>
        <span style={{ color: '#a855f7', fontWeight: 600 }}>SCOUT MODE</span>
        {' '}— Simulated hunts only. No real transactions or wallet required. Stalk freely.
      </span>
      <button
        onClick={dismiss}
        style={{ color: '#4a3d70', background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px', lineHeight: 1, padding: '0 4px' }}
        aria-label="Dismiss"
      >
        ×
      </button>
    </div>
  )
}
