import { useState } from 'react'
import { T } from '../constants'
import { Btn } from './ui'

export default function NameModal({ onSave }) {
  const [name, setName] = useState('')

  const submit = () => {
    const trimmed = name.trim()
    if (trimmed) onSave(trimmed)
  }

  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.9)', zIndex: 200,
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 12,
        padding: 28, width: '100%', maxWidth: 320, textAlign: 'center' }}>
        <div style={{ fontSize: 22, color: T.accent, marginBottom: 6 }}>⛺</div>
        <div style={{ fontSize: 16, fontWeight: 'bold', color: T.accent, marginBottom: 6 }}>Mizpah Lodge #302</div>
        <div style={{ fontSize: 13, color: T.muted, marginBottom: 22, lineHeight: 1.5 }}>
          Who are you? Your name shows up when you check items off.
        </div>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Your name"
          autoFocus
          style={{ textAlign: 'center', marginBottom: 16 }}
        />
        <Btn onClick={submit}>Let's Go</Btn>
      </div>
    </div>
  )
}
