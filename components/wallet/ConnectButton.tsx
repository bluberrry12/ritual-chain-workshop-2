'use client'
import { ConnectButton } from '@rainbow-me/rainbowkit'

export function CustomConnectButton() {
  return (
    <ConnectButton.Custom>
      {({ account, chain, openAccountModal, openChainModal, openConnectModal, mounted }) => {
        if (!mounted) return null

        if (!account) {
          return (
            <button
              onClick={openConnectModal}
              style={{
                background: 'transparent', color: '#a855f7', border: '1px solid #a855f7',
                padding: '8px 18px', borderRadius: '10px', cursor: 'pointer',
                fontFamily: 'var(--font-body)', fontSize: '14px', fontWeight: 600,
                transition: 'all 200ms',
              }}
              onMouseEnter={e => { (e.target as HTMLButtonElement).style.background = 'rgba(168,85,247,0.12)' }}
              onMouseLeave={e => { (e.target as HTMLButtonElement).style.background = 'transparent' }}
            >
              CONNECT WALLET
            </button>
          )
        }

        if (chain?.unsupported) {
          return (
            <button
              onClick={openChainModal}
              style={{
                background: 'rgba(244,63,94,0.15)', color: '#f43f5e',
                border: '1px solid #f43f5e', padding: '8px 18px',
                borderRadius: '10px', cursor: 'pointer', fontFamily: 'var(--font-body)',
                fontSize: '14px', animation: 'hunterPulse 1.5s ease-in-out infinite',
              }}
            >
              WRONG NETWORK ⚠
            </button>
          )
        }

        return (
          <div
            onClick={openAccountModal}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '8px 14px', border: '1px solid #221e40', borderRadius: '10px',
              cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: '13px',
              background: 'rgba(255,255,255,0.02)',
              transition: 'all 200ms',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#352d64' }}
            onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.borderColor = '#221e40' }}
          >
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ color: '#ede9ff' }}>{account.displayName}</span>
            {account.displayBalance && (
              <span style={{ color: '#9985c8' }}>{account.displayBalance}</span>
            )}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
