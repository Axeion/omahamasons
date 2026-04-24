import { useState, useEffect, useCallback } from 'react'
import {
  supabase,
  fetchRsvp, fetchPackList, fetchMenu, fetchCheckState,
  upsertCheckItem, clearAllCheckItems,
  saveRsvpToSupabase, savePackListToSupabase, saveMenuToSupabase,
} from './lib/supabase'
import { T } from './constants'
import PackListTab from './components/PackListTab'
import MenuTab from './components/MenuTab'
import RsvpTab from './components/RsvpTab'
import AdminTab from './components/AdminTab'
import NameModal from './components/NameModal'

const TABS = [
  { id: 'packlist', label: 'Pack List' },
  { id: 'menu',     label: 'Menu' },
  { id: 'rsvp',     label: 'RSVP' },
]

export default function App() {
  const [tab, setTab]           = useState('packlist')
  const [adminOpen, setAdminOpen] = useState(false)
  const [userName, setUserName] = useState(() => localStorage.getItem('camp_user_name') || '')
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)

  const [rsvp,      setRsvp]      = useState([])
  const [packList,  setPackList]  = useState([])
  const [menu,      setMenu]      = useState([])
  const [checkState, setCheckState] = useState({})

  // Initial data load + realtime subscription
  useEffect(() => {
    Promise.all([fetchRsvp(), fetchPackList(), fetchMenu(), fetchCheckState()])
      .then(([r, p, m, c]) => {
        setRsvp(r); setPackList(p); setMenu(m); setCheckState(c)
        setLoading(false)
      })
      .catch(err => {
        console.error('Load failed:', err)
        setError(err.message || 'Failed to connect to database.')
        setLoading(false)
      })

    const channel = supabase
      .channel('checklist-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'checklist_state' },
        ({ eventType, new: row, old }) => {
          if (eventType === 'DELETE') {
            setCheckState(prev => { const next = { ...prev }; delete next[old.item_key]; return next })
          } else {
            setCheckState(prev => ({
              ...prev,
              [row.item_key]: { checked: row.checked, checked_by: row.checked_by },
            }))
          }
        })
      .subscribe()

    return () => { supabase.removeChannel(channel) }
  }, [])

  const toggleCheck = useCallback((itemKey) => {
    const current = checkState[itemKey]?.checked || false
    const newChecked = !current
    setCheckState(prev => ({ ...prev, [itemKey]: { checked: newChecked, checked_by: userName } }))
    upsertCheckItem(itemKey, newChecked, userName).catch(console.error)
  }, [checkState, userName])

  const clearAllChecks = useCallback(() => {
    setCheckState({})
    clearAllCheckItems().catch(console.error)
  }, [])

  const saveRsvp = useCallback(async (newRsvp) => {
    setRsvp(newRsvp)
    const updated = await saveRsvpToSupabase(newRsvp).catch(console.error)
    if (updated) setRsvp(updated)
  }, [])

  const savePackList = useCallback(async (newPackList) => {
    setPackList(newPackList)
    const updated = await savePackListToSupabase(newPackList).catch(console.error)
    if (updated) setPackList(updated)
  }, [])

  const saveMenu = useCallback(async (newMenu) => {
    setMenu(newMenu)
    saveMenuToSupabase(newMenu).catch(console.error)
  }, [])

  if (loading) {
    return (
      <div style={{ background: T.bg, minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif' }}>
        <div style={{ color: T.muted, fontSize: 14 }}>Loading…</div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ background: T.bg, minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', fontFamily: 'Georgia, serif', padding: 24, textAlign: 'center' }}>
        <div style={{ fontSize: 15, color: T.accent, marginBottom: 10 }}>Connection Error</div>
        <div style={{ fontSize: 13, color: T.muted, maxWidth: 320, lineHeight: 1.6 }}>{error}</div>
        <div style={{ fontSize: 12, color: T.muted, marginTop: 16, opacity: 0.6 }}>
          Check that VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set correctly.
        </div>
      </div>
    )
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', color: T.text, fontFamily: 'Georgia, serif', paddingBottom: 60 }}>
      {!userName && <NameModal onSave={name => {
        localStorage.setItem('camp_user_name', name)
        setUserName(name)
      }} />}

      <div style={{ background: 'linear-gradient(180deg,#1c1410 0%,#0f0d0a 100%)',
        borderBottom: `1px solid ${T.cardBorder}`, padding: '16px 14px 12px', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: 19, fontWeight: 'bold', color: T.accent, letterSpacing: '0.04em' }}>Mizpah Lodge #302</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 2, fontStyle: 'italic' }}>Camp Cook — Dalton Kock</div>
        </div>
        <button onClick={() => setAdminOpen(true)} style={{ background: 'none',
          border: `1px solid ${T.cardBorder}`, borderRadius: 6, color: T.muted,
          padding: '5px 10px', fontSize: 11, cursor: 'pointer', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
          Admin
        </button>
      </div>

      {adminOpen ? (
        <AdminTab
          rsvp={rsvp} packList={packList} menu={menu}
          onSaveRsvp={saveRsvp} onSavePackList={savePackList} onSaveMenu={saveMenu}
          onClose={() => setAdminOpen(false)}
        />
      ) : (
        <>
          <div style={{ display: 'flex', background: '#161210', borderBottom: `1px solid ${T.cardBorder}`, overflowX: 'auto' }}>
            {TABS.map(t => (
              <button key={t.id} onClick={() => setTab(t.id)} style={{
                flex: '0 0 auto', padding: '12px 20px', fontSize: 13,
                fontWeight: tab === t.id ? 'bold' : 'normal',
                color: tab === t.id ? T.accent : T.muted, background: 'none', border: 'none',
                borderBottom: tab === t.id ? `2px solid ${T.accent}` : '2px solid transparent',
                cursor: 'pointer', whiteSpace: 'nowrap', fontFamily: 'Georgia, serif',
              }}>{t.label}</button>
            ))}
          </div>
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            {tab === 'packlist' && <PackListTab data={packList} checkState={checkState} onToggle={toggleCheck} onClearAll={clearAllChecks} />}
            {tab === 'menu'     && <MenuTab data={menu} />}
            {tab === 'rsvp'     && <RsvpTab data={rsvp} />}
          </div>
        </>
      )}
    </div>
  )
}
