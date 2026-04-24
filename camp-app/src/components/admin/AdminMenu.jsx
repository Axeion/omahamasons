import { useState } from 'react'
import { T } from '../../constants'
import { Btn, GhostBtn, Modal } from '../ui'

export default function AdminMenu({ data, onChange }) {
  const [openDay, setOpenDay] = useState(null)
  const [editing, setEditing] = useState(null)
  const [form, setForm] = useState({})

  const openEdit = (di, mi) => {
    setEditing({ di, mi })
    const meal = data[di].meals[mi]
    setForm({ name: meal.name, note: meal.note || '', items: [...meal.items] })
  }

  const saveEdit = () => {
    const next = data.map((d, di) => di !== editing.di ? d : {
      ...d,
      meals: d.meals.map((m, mi) => mi !== editing.mi ? m : {
        ...m,
        name: form.name,
        note: form.note,
        items: form.items.filter(i => i.trim()),
      }),
    })
    onChange(next)
    setEditing(null)
    setForm({})
  }

  const updateItem = (ii, val) => setForm(f => ({ ...f, items: f.items.map((it, i) => i === ii ? val : it) }))
  const addItem    = () => setForm(f => ({ ...f, items: [...f.items, ''] }))
  const removeItem = (ii) => setForm(f => ({ ...f, items: f.items.filter((_, i) => i !== ii) }))

  return (
    <div>
      {data.map((day, di) => (
        <div key={day.id || di} style={{ marginBottom: 8, border: `1px solid ${T.cardBorder}`, borderRadius: 8, overflow: 'hidden' }}>
          <div onClick={() => setOpenDay(openDay === di ? null : di)}
            style={{ background: day.color || T.accentDim, padding: '9px 14px', display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <span style={{ flex: 1, fontSize: 12, fontWeight: 'bold', color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              {day.day} {openDay === di ? '▲' : '▼'}
            </span>
          </div>
          {openDay === di && day.meals.map((meal, mi) => (
            <div key={meal.id || mi} style={{ padding: '10px 14px', borderBottom: `1px solid ${T.divider}`,
              display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, color: T.accent, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{meal.meal}</div>
                <div style={{ fontSize: 13, color: T.text, fontWeight: 'bold' }}>{meal.name}</div>
              </div>
              <Btn small onClick={() => openEdit(di, mi)}>Edit</Btn>
            </div>
          ))}
        </div>
      ))}

      {editing !== null && (
        <Modal title={'Edit: ' + (data[editing.di]?.meals[editing.mi]?.meal || '')}
          onClose={() => { setEditing(null); setForm({}) }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>Meal Name</div>
              <input value={form.name || ''} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 6 }}>
                Menu Items <span style={{ color: T.accentDim, fontSize: 11 }}>(one per line)</span>
              </div>
              {(form.items || []).map((item, ii) => (
                <div key={ii} style={{ display: 'flex', gap: 6, marginBottom: 6 }}>
                  <input value={item} onChange={e => updateItem(ii, e.target.value)} style={{ flex: 1 }} />
                  <button onClick={() => removeItem(ii)} style={{ background: T.red, color: '#fff',
                    border: 'none', borderRadius: 5, padding: '0 12px', cursor: 'pointer',
                    fontSize: 18, lineHeight: 1, flexShrink: 0 }}>×</button>
                </div>
              ))}
              <GhostBtn onClick={addItem}>+ Add Item</GhostBtn>
            </div>
            <div>
              <div style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>Cook's Note</div>
              <textarea value={form.note || ''} onChange={e => setForm(f => ({ ...f, note: e.target.value }))} rows={3} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: 8, marginTop: 18, justifyContent: 'flex-end' }}>
            <GhostBtn onClick={() => { setEditing(null); setForm({}) }}>Cancel</GhostBtn>
            <Btn onClick={saveEdit}>Save</Btn>
          </div>
        </Modal>
      )}
    </div>
  )
}
