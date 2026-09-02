'use client'
import type { Comparator } from '@/lib/types'
import { COMPARATOR_SYM, COMPARATOR_LABELS } from '@/lib/constants'

interface ComparatorSelectProps {
  value:    Comparator
  onChange: (v: Comparator) => void
}

export function ComparatorSelect({ value, onChange }: ComparatorSelectProps) {
  return (
    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
      {([0, 1, 2, 3] as Comparator[]).map(c => (
        <button
          key={c}
          type="button"
          onClick={() => onChange(c)}
          title={COMPARATOR_LABELS[c]}
          style={{
            padding:      '10px 20px',
            borderRadius: '10px',
            border:       `1px solid ${value === c ? '#a855f7' : '#221e40'}`,
            background:   value === c ? 'rgba(168,85,247,0.15)' : 'transparent',
            color:        value === c ? '#a855f7' : '#4a3d70',
            fontFamily:   'var(--font-mono)',
            fontSize:     '18px',
            fontWeight:   700,
            cursor:       'pointer',
            transition:   'all 150ms',
            minWidth:     '54px',
          }}
        >
          {COMPARATOR_SYM[c]}
        </button>
      ))}
    </div>
  )
}
