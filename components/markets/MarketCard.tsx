'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import type { Market } from '@/lib/types'
import { MarketStateBadge } from './MarketStateBadge'
import { OddsBar } from './OddsBar'
import { CountdownTimer } from './CountdownTimer'
import { formatRitual, shortAddr, explorerAddr } from '@/lib/utils'
import { useBlockTime } from '@/hooks/useBlockTime'
import { MAX_ATTEMPTS } from '@/lib/constants'

interface MarketCardProps {
  market: Market
  index?: number
}

export function MarketCard({ market, index = 0 }: MarketCardProps) {
  const blockTimeMs = useBlockTime()
  const isOpen = market.state === 0

  const timingRow = () => {
    switch (market.state) {
      case 0: return <CountdownTimer targetBlock={market.closeBlock}   blockTimeMs={blockTimeMs} label="Closes in" />
      case 1: return <CountdownTimer targetBlock={market.resolveBlock} blockTimeMs={blockTimeMs} label="Resolves in" />
      case 2: return (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#a855f7' }}>
          <span style={{ display: 'inline-block', animation: 'spin 1s linear infinite', marginRight: '5px' }}>◌</span>
          Attempt {market.attempts}/{MAX_ATTEMPTS}
        </span>
      )
      case 3: return (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
          {market.outcome === 1
            ? <span style={{ color: '#22d3ee' }}>✓ YES · Oracle: {market.observedValue.toLocaleString()}</span>
            : <span style={{ color: '#f43f5e' }}>✗ NO · Oracle: {market.observedValue.toLocaleString()}</span>
          }
        </span>
      )
      case 4: return (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#6b5c8a' }}>
          ✕ {market.invalidReason.slice(0, 60)}{market.invalidReason.length > 60 ? '…' : ''}
        </span>
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      whileHover={{ y: -4, boxShadow: '0 0 30px rgba(168,85,247,0.18)' }}
      style={{
        background:     'rgba(255,255,255,0.03)',
        border:         isOpen ? '1px solid rgba(168,85,247,0.20)' : '1px solid #221e40',
        borderRadius:   '16px',
        padding:        '20px',
        cursor:         'pointer',
        transition:     'all 200ms',
        display:        'flex',
        flexDirection:  'column',
        gap:            '14px',
        animation:      isOpen ? 'hunterPulse 2s ease-in-out infinite' : undefined,
      }}
    >
      <Link href={`/markets/${market.id}`} style={{ textDecoration: 'none', color: 'inherit', display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {/* Header: state badge + ID */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <MarketStateBadge state={market.state} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a3d70' }}>#{market.id.toString()}</span>
        </div>

        {/* Question */}
        <div style={{
          fontFamily: 'var(--font-heading)', fontSize: '16px', fontWeight: 600, color: '#ede9ff',
          lineHeight: 1.4,
          display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {market.question}
        </div>

        {/* Odds bar */}
        <OddsBar totalYes={market.totalYes} totalNo={market.totalNo} height={10} showLabels />

        {/* YES/NO totals */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#22d3ee' }}>
              YES {formatRitual(market.totalYes, 3)}
            </span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '13px', color: '#f43f5e' }}>
              NO {formatRitual(market.totalNo, 3)}
            </span>
          </div>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a3d70' }}>
            {formatRitual(market.totalYes + market.totalNo, 3)} RITUAL total
          </span>
        </div>

        {/* Timing */}
        <div>{timingRow()}</div>

        {/* Creator */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#352d64' }}>
            {shortAddr(market.creator)}
          </span>
          <a
            href={explorerAddr(market.creator)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={e => e.stopPropagation()}
            style={{ color: '#352d64', display: 'flex' }}
          >
            <ExternalLink size={10} />
          </a>
        </div>
      </Link>
    </motion.div>
  )
}
