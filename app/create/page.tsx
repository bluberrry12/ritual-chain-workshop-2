'use client'
import { motion } from 'framer-motion'
import { CreateMarketWizard } from '@/components/create/CreateMarketWizard'
import { useAppMode } from '@/contexts/AppModeContext'

export default function CreatePage() {
  const { mode } = useAppMode()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 24px' }}
      className="page-enter"
    >
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '48px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '36px', fontWeight: 800, color: '#ede9ff', margin: '0 0 12px', letterSpacing: '-1px' }}>
          SET A TRAP
        </h1>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '16px', color: '#9985c8', maxWidth: '540px', margin: '0 auto', lineHeight: 1.6 }}>
          Define a yes/no prediction with an oracle feed and resolution threshold. The Ritual Scheduler handles autonomous settlement — zero manual steps, zero central control.
        </p>
        {mode === 'demo' && (
          <div style={{
            display: 'inline-block', marginTop: '16px',
            padding: '6px 16px', background: 'rgba(168,85,247,0.08)', border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: '999px', fontFamily: 'var(--font-mono)', fontSize: '12px', color: '#a855f7',
          }}>
            🎯 SCOUT MODE — No wallet needed. Transactions are fully simulated.
          </div>
        )}
      </div>

      <CreateMarketWizard />
    </motion.div>
  )
}
