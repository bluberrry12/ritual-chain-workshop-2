'use client'
import { motion } from 'framer-motion'

interface GlowCardProps {
  children:   React.ReactNode
  glowColor?: '#a855f7' | '#f43f5e' | '#fb923c' | 'none'
  className?: string
  onClick?:   () => void
  hoverable?: boolean
  padding?:   string
  style?:     React.CSSProperties
}

export function GlowCard({
  children,
  glowColor = '#a855f7',
  className = '',
  onClick,
  hoverable = false,
  padding = '24px',
  style,
}: GlowCardProps) {
  const glowShadow = glowColor !== 'none' ? `0 0 30px ${glowColor}20` : undefined

  return (
    <motion.div
      onClick={onClick}
      whileHover={hoverable ? {
        scale: 1.01,
        y: -2,
        boxShadow: glowShadow,
        borderColor: '#352d64',
      } : {}}
      style={{
        background:     'rgba(255,255,255,0.03)',
        border:         '1px solid #221e40',
        borderRadius:   '16px',
        backdropFilter: 'blur(20px)',
        padding,
        cursor:     onClick ? 'pointer' : 'default',
        transition: 'all 200ms',
        ...style,
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
