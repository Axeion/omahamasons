import { T } from '../constants'

export function ProgressBar({ done, total }) {
  const pct = total ? Math.round((done / total) * 100) : 0
  return (
    <div style={{ padding: '10px 12px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flex: 1, height: 4, background: T.cardBorder, borderRadius: 2, overflow: 'hidden' }}>
        <div style={{ width: pct + '%', height: '100%', background: T.green, borderRadius: 2, transition: 'width 0.3s' }} />
      </div>
      <span style={{ fontSize: 12, color: T.muted, flexShrink: 0 }}>{done}/{total}</span>
    </div>
  )
}

export function Card({ children, headerText, headerColor, badge }) {
  return (
    <div style={{ background: T.card, border: `1px solid ${T.cardBorder}`, borderRadius: 8, margin: '10px 12px 0', overflow: 'hidden' }}>
      <div style={{ background: headerColor || T.accentDim, padding: '9px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{headerText}</span>
        {badge !== undefined && <span style={{ fontSize: 11, background: 'rgba(0,0,0,0.3)', color: '#fff', padding: '2px 8px', borderRadius: 10 }}>{badge}</span>}
      </div>
      {children}
    </div>
  )
}

export function CheckRow({ label, sublabel, checkedBy, rightLabel, checked, onToggle }) {
  return (
    <div onClick={onToggle} style={{ display: 'flex', alignItems: 'center', padding: '12px 14px',
      borderBottom: `1px solid ${T.divider}`, background: checked ? 'rgba(74,140,92,0.07)' : 'transparent',
      cursor: 'pointer', userSelect: 'none' }}>
      <div style={{ width: 24, height: 24, borderRadius: 5, border: `2px solid ${checked ? T.green : T.muted}`,
        background: checked ? T.green : 'transparent', display: 'flex', alignItems: 'center',
        justifyContent: 'center', flexShrink: 0, marginRight: 12, transition: 'all 0.15s' }}>
        {checked && <span style={{ color: '#fff', fontSize: 14, fontWeight: 'bold', lineHeight: 1 }}>✓</span>}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, color: checked ? T.muted : T.text, textDecoration: checked ? 'line-through' : 'none', lineHeight: 1.3 }}>{label}</div>
        {sublabel && !checked && <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{sublabel}</div>}
        {checked && checkedBy && <div style={{ fontSize: 11, color: T.green, marginTop: 3, opacity: 0.8 }}>✓ {checkedBy}</div>}
      </div>
      {rightLabel && <span style={{ fontSize: 12, color: T.accent, fontWeight: 'bold', marginLeft: 10, flexShrink: 0, fontStyle: 'italic' }}>{rightLabel}</span>}
    </div>
  )
}

export function Btn({ children, onClick, color, small }) {
  return (
    <button onClick={onClick} style={{ background: color || T.accentDim, color: '#fff', border: 'none',
      borderRadius: 6, padding: small ? '5px 12px' : '9px 16px', fontSize: small ? 12 : 13,
      fontFamily: 'Georgia, serif', cursor: 'pointer', fontWeight: 'bold' }}>{children}</button>
  )
}

export function GhostBtn({ children, onClick, color }) {
  return (
    <button onClick={onClick} style={{ background: 'none', color: color || T.muted,
      border: `1px solid ${color || T.cardBorder}`, borderRadius: 5, padding: '4px 10px',
      fontSize: 12, fontFamily: 'Georgia, serif', cursor: 'pointer' }}>{children}</button>
  )
}

export function Modal({ title, onClose, children }) {
  return (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.85)', zIndex: 100,
      overflowY: 'auto', padding: 16, display: 'flex', alignItems: 'flex-start', justifyContent: 'center' }}>
      <div onClick={e => e.stopPropagation()} style={{ background: T.card, border: `1px solid ${T.cardBorder}`,
        borderRadius: 10, padding: 20, width: '100%', maxWidth: 460, marginTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
          <div style={{ fontSize: 15, fontWeight: 'bold', color: T.accent }}>{title}</div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: T.muted,
            fontSize: 22, cursor: 'pointer', lineHeight: 1, padding: '0 0 0 12px' }}>×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
