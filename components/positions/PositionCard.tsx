'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import type { Market, UserStakes } from '@/lib/types'
import { MarketStateBadge } from '@/components/markets/MarketStateBadge'
import { ClaimButton } from './ClaimButton'
import { formatRitual } from '@/lib/utils'

interface PositionCardProps {
  market:  Market
  stakes:  UserStakes
  index?:  number
  onClaim?: () => void
}

export function PositionCard({ market, stakes, index = 0, onClaim }: PositionCardProps) {
  const [claimed, setClaimed] = useState(stakes.alreadySettled)

  const isResolved = market.state === 3
  const isInvalid  = market.state === 4
  const isYesWon   = market.outcome === 1
  const userWon    = isResolved && ((isYesWon && stakes.yes > 0n) || (!isYesWon && stakes.no > 0n))

  const handleSuccess = () => {
    setClaimed(true)
    onClaim?.()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      style={{
        background:   'rgba(255,255,255,0.03)',
        border:       `1px solid ${isResolved && userWon && !claimed ? 'rgba(34,211,238,0.25)' : isInvalid ? 'rgba(251,146,60,0.20)' : '#221e40'}`,
        borderRadius: '16px',
        padding:      '20px',
        display:      'flex',
        flexDirection:'column',
        gap:          '14px',
      }}
    >
      {/* Header: ID + state + question */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '12px' }}>
        <Link href={`/markets/${market.id}`} style={{ textDecoration: 'none', flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-heading)', fontSize: '15px', fontWeight: 600, color: '#ede9ff',
            lineHeight: 1.4,
            display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden',
            cursor: 'pointer',
          }}>
            #{market.id.toString()} · {market.question}
          </div>
        </Link>
        <MarketStateBadge state={market.state} />
      </div>

      {/* Stakes row */}
      <div style={{ display: 'flex', gap: '20px' }}>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4a3d70', marginBottom: '2px' }}>MY YES</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#22d3ee' }}>
            {formatRitual(stakes.yes, 4)} RITUAL
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4a3d70', marginBottom: '2px' }}>MY NO</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '14px', color: '#f43f5e' }}>
            {formatRitual(stakes.no, 4)} RITUAL
          </div>
        </div>
      </div>

      {/* Outcome section */}
      {isResolved && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <div>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: 700,
              color: isYesWon ? '#22d3ee' : '#f43f5e',
              padding: '3px 10px', borderRadius: '999px',
              border: `1px solid ${isYesWon ? 'rgba(34,211,238,0.3)' : 'rgba(244,63,94,0.3)'}`,
              background: isYesWon ? 'rgba(34,211,238,0.1)' : 'rgba(244,63,94,0.1)',
            }}>
              {isYesWon ? 'YES WON ✓' : 'NO WON ✗'}
            </span>
          </div>
          {claimed ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a3d70', padding: '3px 10px', borderRadius: '999px', border: '1px solid #352d64' }}>
              ✓ Claimed
            </span>
          ) : userWon ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#4a3d70' }}>Claimable</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: '#22d3ee', fontWeight: 700 }}>
                  {formatRitual(stakes.claimable, 4)} RITUAL
                </div>
              </div>
              <ClaimButton marketId={market.id} type="winnings" onSuccess={handleSuccess} />
            </div>
          ) : (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a3d70' }}>
              Lost — 0 RITUAL claimable
            </span>
          )}
        </div>
      )}

      {isInvalid && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          {claimed ? (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#4a3d70', padding: '3px 10px', borderRadius: '999px', border: '1px solid #352d64' }}>
              ✓ Claimed
            </span>
          ) : (
            <>
              <div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: '#fb923c' }}>Refundable</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '16px', color: '#fb923c', fontWeight: 700 }}>
                  {formatRitual(stakes.claimable, 4)} RITUAL
                </div>
              </div>
              <ClaimButton marketId={market.id} type="refund" onSuccess={handleSuccess} />
            </>
          )}
        </div>
      )}
    </motion.div>
  )
}
