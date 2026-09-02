'use client'
import { motion } from 'framer-motion'
import { Spinner } from './Spinner'

type Variant = 'primary' | 'outline' | 'danger' | 'warning' | 'ghost'

interface GlowButtonProps {
  variant?:   Variant
  size?:      'sm' | 'md' | 'lg'
  loading?:   boolean
  disabled?:  boolean
  onClick?:   () => void
  children:   React.ReactNode
  fullWidth?: boolean
  type?:      'button' | 'submit'
  style?:     React.CSSProperties
}

const STYLES: Record<Variant, React.CSSProperties> = {
  primary: { background: 'linear-gradient(135deg, #a855f7, #9333ea)', color: '#ede9ff', fontWeight: 700, border: 'none' },
  outline: { background: 'transparent', color: '#a855f7', border: '1px solid #a855f7' },
  danger:  { background: 'linear-gradient(135deg, #f43f5e, #e11d48)', color: '#fff', border: 'none' },
  warning: { background: 'transparent', color: '#fb923c', border: '1px solid #fb923c' },
  ghost:   { background: 'transparent', color: '#9985c8', border: 'none' },
}

const SIZES: Record<string, React.CSSProperties> = {
  sm: { padding: '8px 16px',  fontSize: '13px', borderRadius: '8px' },
  md: { padding: '12px 24px', fontSize: '15px', borderRadius: '12px' },
  lg: { padding: '16px 32px', fontSize: '17px', borderRadius: '14px' },
}

export function GlowButton({
  variant = 'primary', size = 'md', loading = false, disabled = false,
  onClick, children, fullWidth = false, type = 'button', style,
}: GlowButtonProps) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      whileHover={!isDisabled ? { scale: 1.02, boxShadow: variant === 'primary' ? '0 0 30px rgba(168,85,247,0.55)' : undefined } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      style={{
        ...STYLES[variant],
        ...SIZES[size],
        width:       fullWidth ? '100%' : undefined,
        opacity:     isDisabled ? 0.4 : 1,
        cursor:      isDisabled ? 'not-allowed' : 'pointer',
        display:     'inline-flex',
        alignItems:  'center',
        justifyContent: 'center',
        gap:         '8px',
        transition:  'all 200ms',
        fontFamily:  'var(--font-body)',
        fontWeight:  600,
        letterSpacing: '0.03em',
        ...style,
      }}
    >
      {loading && <Spinner size={14} />}
      {children}
    </motion.button>
  )
}
