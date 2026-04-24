import { useState } from 'react'
import { T, SHIRT_SIZES } from '../../constants'
import { Btn, GhostBtn, Modal } from '../ui'

export default function AdminRsvp({ data, onChange }) {
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  const openEdit = (i) => {
    setEditing(i)
    setForm(i === 'new' ? { name: '', fri: true, sat: true, shirt: 'XL' } : { ...data[i] })
  }

  const saveEntry = () => {
    if (!form.name.trim()) return
    const next = [...data]
    if (editing === 'new') next.push({ ...form })
    else next[editing] = { ...form }
    onChange(next)
    setEditing(null)
  }

  const deleteEntry = (i) => {
    if (!confirm('Remove ' + data[i].name + '?')) return
    onChange(data.filter((_, idx) => idx !== i))
  }

  return (
    <div>
      {data.map((r, i) => (
        <div key={r.id || i} style={{ display: 'flex', alignItems: 'center', padding: '10px 14px',
          borderBottom: `1px solid ${T.divider}`, background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.015)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: T.text }}>{r.name}</div>
            <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>
              {r.fri ? 'Fri' : 'No Fri'} · {r.sat ? 'Sat' : 'No Sat'} · {r.shirt}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            <GhostBtn onClick={() => openEdit(i)}>Edit</GhostBtn>
            <GhostBtn onClick={() => deleteEntry(i)} color={T.red}>Del</GhostBtn>
          </div>
        </div>
      ))}
      <div style={{ padding: '12px 14px' }}>
        <Btn onClick={() => openEdit('new')}>+ Add Person</Btn>
      </div>

      {editing !== null && (
        <Modal
          title={editing === 'new' ? 'Add Person' : 'Edit ' + (data[editing]?.name || '')}
          onClose={() => setEditing(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>Name</div>
              <input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="Full name" />
            </div>
            <div style={{ display: 'flex', gap: 16 }}>
              {[['fri', 'Friday Night'], ['sat', 'Saturday Night']].map(([key, label]) => (
                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 8, color: T.text, fontSize: 14, cursor: 'pointer' }}>
                  <input type="checkbox" checked={!!form[key]} onChange={e => setForm(f => ({ ...f, [key]: e.target.checked }))}
                    style={{ width: 18, height: 18, accentColor: T.green }} />
                  {label}
                </label>
              ))}
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>Shirt Size</div>
              <select value={form.shirt || 'XL'} onChange={e => setForm(f => ({ ...f, shirt: e.target.value }))}>
                {SHIRT_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
            <GhostBtn onClick={() => setEditing(null)}>Cancel</GhostBtn>
            <Btn onClick={saveEntry}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}
