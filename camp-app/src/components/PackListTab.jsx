import { Card, CheckRow, GhostBtn, ProgressBar } from './ui'

export default function PackListTab({ data, checkState, onToggle, onClearAll }) {
  const allKeys = data.flatMap(cat => cat.items.map(item => `pack-${item.uuid}`))
  const done = allKeys.filter(k => checkState[k]?.checked).length

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 12px 0' }}>
        <span style={{ fontSize: 13, color: '#7a6a58' }}>Gear to pack + items to buy</span>
        <GhostBtn onClick={onClearAll}>Clear all</GhostBtn>
      </div>
      <ProgressBar done={done} total={allKeys.length} />
      {data.map((cat, ci) => {
        const catDone = cat.items.filter(item => checkState[`pack-${item.uuid}`]?.checked).length
        return (
          <Card key={cat.id || ci} headerText={cat.category} headerColor={cat.color} badge={`${catDone}/${cat.items.length}`}>
            {cat.items.map((row, ii) => {
              const key = `pack-${row.uuid}`
              const state = checkState[key]
              return (
                <CheckRow
                  key={row.id || ii}
                  label={row.item}
                  sublabel={row.note || null}
                  checkedBy={state?.checked_by || null}
                  rightLabel={row.qty || null}
                  checked={!!state?.checked}
                  onToggle={() => onToggle(key)}
                />
              )
            })}
          </Card>
        )
      })}
      <div style={{ height: 20 }} />
    </div>
  )
}
