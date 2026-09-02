'use client'
import Link from 'next/link'
import Image from 'next/image'
import { RITUAL_EXPLORER, RITUAL_FAUCET, CONTRACT_ADDRESS } from '@/lib/constants'
import { shortAddr } from '@/lib/utils'
import { ExternalLink } from 'lucide-react'

export function Footer() {
  return (
    <footer style={{
      borderTop:  '1px solid #221e40',
      background: 'rgba(7,6,15,0.92)',
      padding:    '48px 24px 32px',
      marginTop:  '80px',
      position:   'relative',
      zIndex:     1,
    }}>
      <div style={{
        maxWidth: '1200px', margin: '0 auto',
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '40px',
        marginBottom: '40px',
      }}>
        {/* Brand */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Image
              src="/ritual-logo.png"
              alt="Ritual Hunters"
              width={24}
              height={24}
              style={{ filter: 'invert(52%) sepia(80%) saturate(1200%) hue-rotate(250deg) brightness(1.1)', opacity: 1 }}
            />
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, color: '#a855f7', fontSize: '16px' }}>
              RITUAL HUNTERS
            </span>
          </div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#9985c8', lineHeight: 1.6 }}>
            Precision prediction markets. Hunt. Stake. Claim.
          </p>
        </div>

        {/* Navigate — 2×2 grid */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '12px', color: '#4a3d70', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Navigate
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px' }}>
            {[
              { href: '/markets',   label: 'Hunt Board' },
              { href: '/create',    label: 'Set a Trap' },
              { href: '/positions', label: 'My Kills' },
              { href: '/admin',     label: 'Command Post' },
            ].map(l => (
              <Link key={l.href} href={l.href} style={{
                fontFamily: 'var(--font-body)', fontSize: '13px',
                color: '#6b5c8a', textDecoration: 'none',
                transition: 'color 150ms',
              }}
              onMouseEnter={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#a855f7'
              }}
              onMouseLeave={e => {
                ;(e.currentTarget as HTMLElement).style.color = '#6b5c8a'
              }}>
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Resources */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '13px', color: '#4a3d70', letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
            Resources
          </h4>
          {[
            { href: RITUAL_EXPLORER, label: 'Ritual Explorer' },
            { href: RITUAL_FAUCET,   label: 'Testnet Faucet' },
          ].map(l => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: '#9985c8', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {l.label} <ExternalLink size={11} />
            </a>
          ))}
          {CONTRACT_ADDRESS && (
            <a
              href={`${RITUAL_EXPLORER}/address/${CONTRACT_ADDRESS}`}
              target="_blank" rel="noopener noreferrer"
              style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#6b5c8a', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {shortAddr(CONTRACT_ADDRESS)} <ExternalLink size={10} />
            </a>
          )}
        </div>
      </div>

      {/* Bottom bar — minimal */}
      <div style={{
        borderTop: '1px solid #221e40', paddingTop: '20px',
        textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: '11px', color: '#4a3d70',
      }}>
        © {new Date().getFullYear()} Ritual Hunters · Powered by Ritual Chain
      </div>
    </footer>
  )
}
