'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Plus, RefreshCw } from 'lucide-react'
import { MarketGrid } from '@/components/markets/MarketGrid'
import { GlowButton } from '@/components/ui/GlowButton'
import { useMarkets } from '@/hooks/useMarkets'
import { useAppMode } from '@/contexts/AppModeContext'
import { CONTRACT_ADDRESS } from '@/lib/constants'
import type { MarketState } from '@/lib/types'

const FILTERS: { label: string; state: MarketState | null }[] = [
  { label: 'All',      state: null },
  { label: 'Live',     state: 0 },
  { label: 'Locked',   state: 1 },
  { label: 'Tracking', state: 2 },
  { label: 'Claimed',  state: 3 },
  { label: 'Void',     state: 4 },
]

export default function MarketsPage() {
  const { mode, setMode }                 = useAppMode()
  const { markets, isLoading, isError, refetch } = useMarkets()
  const [filter, setFilter]               = useState<MarketState | null>(null)
  const [lastRefresh, setLastRefresh]     = useState(Date.now())
  const [secondsAgo, setSecondsAgo]       = useState(0)

  useEffect(() => {
    const id = setInterval(() => setSecondsAgo(Math.floor((Date.now() - lastRefresh) / 1000)), 1000)
    return () => clearInterval(id)
  }, [lastRefresh])

  const handleRefetch = () => { refetch(); setLastRefresh(Date.now()) }

  const filtered = filter === null ? markets : markets.filter(m => m.state === filter)

  // Live mode, no contract yet — show friendly message
  if (mode === 'live' && !CONTRACT_ADDRESS) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
        <div style={{ textAlign: 'center', maxWidth: '540px' }}>
          <div style={{ fontSize: '56px', marginBottom: '20px' }}>🎯</div>
          <h2 style={{ fontFamily: 'var(--font-heading)', color: '#ede9ff', marginBottom: '16px', fontSize: '28px' }}>
            Hunt Zone Offline
          </h2>
          <p style={{ fontFamily: 'var(--font-body)', color: '#9985c8', lineHeight: 1.7, fontSize: '15px', marginBottom: '24px' }}>
            The Ritual Chain testnet is currently offline. Ritual Hunters will be live on Mainnet soon. Meanwhile, explore every feature in <span style={{ color: '#a855f7', fontWeight: 600 }}>Scout Mode</span> — set traps, place stakes, claim kills, and learn exactly how autonomous resolution works before going live.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => setMode('demo')}
              style={{
                padding: '12px 28px', borderRadius: '10px',
                background: 'linear-gradient(135deg, #a855f7, #9333ea)', color: '#ede9ff',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '14px',
                border: 'none', cursor: 'pointer',
                boxShadow: '0 0 20px rgba(168,85,247,0.35)',
              }}
            >
              Enter Scout Mode →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 24px' }}
      className="page-enter"
    >
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '32px', fontWeight: 800, color: '#ede9ff', margin: 0, letterSpacing: '-1px' }}>
            HUNT BOARD
          </h1>
          <span style={{
            background: 'rgba(168,85,247,0.12)', border: '1px solid rgba(168,85,247,0.30)', color: '#a855f7',
            borderRadius: '999px', padding: '3px 12px',
            fontFamily: 'var(--font-mono)', fontSize: '14px', fontWeight: 700,
          }}>
            {markets.length}
          </span>
        </div>
        <Link href="/create">
          <GlowButton size="sm">
            <Plus size={15} /> + SET A TRAP
          </GlowButton>
        </Link>
      </div>

      <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9985c8', marginBottom: '28px', marginTop: 0 }}>
        Track every active hunt. Filter by status. Place your stake.
      </p>

      {/* Filter tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '28px', flexWrap: 'wrap' }}>
        {FILTERS.map(f => (
          <button
            key={f.label}
            onClick={() => setFilter(f.state)}
            style={{
              padding: '6px 16px', borderRadius: '999px',
              border: `1px solid ${filter === f.state ? '#a855f7' : '#221e40'}`,
              background: filter === f.state ? '#a855f7' : 'transparent',
              color: filter === f.state ? '#07060f' : '#9985c8',
              fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: filter === f.state ? 700 : 400,
              cursor: 'pointer', transition: 'all 150ms',
            }}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Error state */}
      {isError && (
        <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(244,63,94,0.05)', border: '1px solid rgba(244,63,94,0.20)', borderRadius: '12px', marginBottom: '24px' }}>
          <p style={{ color: '#f43f5e', fontFamily: 'var(--font-body)' }}>Failed to load hunts</p>
          <GlowButton variant="outline" size="sm" onClick={handleRefetch} style={{ marginTop: '12px' }}>
            Retry
          </GlowButton>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !isError && filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
          <div style={{ fontSize: '64px', opacity: 0.4 }}>🎯</div>
          <div style={{ fontFamily: 'var(--font-heading)', fontSize: '20px', color: '#4a3d70' }}>No hunts found</div>
          <Link href="/create">
            <GlowButton>Set the first trap →</GlowButton>
          </Link>
        </div>
      )}

      {/* Grid */}
      <MarketGrid markets={filtered} isLoading={isLoading} />

      {/* Auto-refresh indicator */}
      <div style={{ textAlign: 'right', marginTop: '20px', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a3d70', display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '6px' }}>
        <RefreshCw size={11} />
        Updated {secondsAgo}s ago
        {mode === 'live' && (
          <button onClick={handleRefetch} style={{ background: 'none', border: 'none', color: '#a855f7', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '11px' }}>
            · Refresh
          </button>
        )}
      </div>
    </motion.div>
  )
}
