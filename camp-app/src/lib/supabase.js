import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const key = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, key)

// ── Fetch helpers ─────────────────────────────────────────────────────────────

export async function fetchRsvp() {
  const { data, error } = await supabase
    .from('rsvp')
    .select('*')
    .order('sort_order')
  if (error) throw error
  return data || []
}

export async function fetchPackList() {
  const { data, error } = await supabase
    .from('pack_list_categories')
    .select('*, pack_list_items(*)')
    .order('sort_order')
  if (error) throw error
  return (data || []).map(({ pack_list_items, ...cat }) => ({
    ...cat,
    items: (pack_list_items || []).sort((a, b) => a.sort_order - b.sort_order),
  }))
}

export async function fetchMenu() {
  const { data, error } = await supabase
    .from('menu_days')
    .select('*, menu_meals(*, menu_meal_items(*))')
    .order('sort_order')
  if (error) throw error
  return (data || []).map(({ menu_meals, ...day }) => ({
    ...day,
    meals: (menu_meals || [])
      .sort((a, b) => a.sort_order - b.sort_order)
      .map(({ menu_meal_items, ...meal }) => ({
        ...meal,
        items: (menu_meal_items || [])
          .sort((a, b) => a.sort_order - b.sort_order)
          .map(i => i.item_text),
      })),
  }))
}

export async function fetchCheckState() {
  const { data, error } = await supabase
    .from('checklist_state')
    .select('*')
  if (error) throw error
  return Object.fromEntries(
    (data || []).map(row => [row.item_key, { checked: row.checked, checked_by: row.checked_by }])
  )
}

// ── Checklist mutations ───────────────────────────────────────────────────────

export async function upsertCheckItem(itemKey, checked, checkedBy) {
  const { error } = await supabase.from('checklist_state').upsert({
    item_key: itemKey,
    checked,
    checked_by: checkedBy,
    updated_at: new Date().toISOString(),
  })
  if (error) throw error
}

export async function clearAllCheckItems() {
  const { error } = await supabase
    .from('checklist_state')
    .delete()
    .not('item_key', 'is', null)
  if (error) throw error
}

// ── Admin save helpers ────────────────────────────────────────────────────────

export async function saveRsvpToSupabase(newRsvp) {
  // Delete all then reinsert (RSVP has no FK deps from other tables)
  const { data: existing } = await supabase.from('rsvp').select('id')
  if (existing?.length) {
    await supabase.from('rsvp').delete().in('id', existing.map(r => r.id))
  }
  const toInsert = newRsvp.map(({ id, ...r }, i) => ({ ...r, sort_order: i }))
  const { data, error } = await supabase.from('rsvp').insert(toInsert).select()
  if (error) throw error
  return data || newRsvp
}

export async function savePackListToSupabase(newPackList) {
  // Delete all categories (cascades to items)
  const { data: existing } = await supabase.from('pack_list_categories').select('id')
  if (existing?.length) {
    await supabase.from('pack_list_categories').delete().in('id', existing.map(c => c.id))
  }

  // Insert categories
  const catInserts = newPackList.map(({ items, pack_list_items, id, ...cat }, i) => ({
    ...cat,
    sort_order: i,
  }))
  const { data: insertedCats, error: catErr } = await supabase
    .from('pack_list_categories')
    .insert(catInserts)
    .select()
  if (catErr) throw catErr

  // Insert items for each category, preserving UUIDs for stable checklist keys
  for (let ci = 0; ci < insertedCats.length; ci++) {
    const catId = insertedCats[ci].id
    const itemInserts = (newPackList[ci].items || []).map(
      ({ id: _id, category_id: _cid, ...item }, ii) => ({
        ...item,
        uuid: item.uuid || crypto.randomUUID(),
        category_id: catId,
        sort_order: ii,
      })
    )
    if (itemInserts.length > 0) {
      const { error: itemErr } = await supabase.from('pack_list_items').insert(itemInserts)
      if (itemErr) throw itemErr
    }
  }

  return fetchPackList()
}

export async function saveMenuToSupabase(newMenu) {
  // Delete all days (cascades to meals and meal items)
  const { data: existing } = await supabase.from('menu_days').select('id')
  if (existing?.length) {
    await supabase.from('menu_days').delete().in('id', existing.map(d => d.id))
  }

  const dayInserts = newMenu.map(({ meals, menu_meals, id, ...day }, i) => ({
    ...day,
    sort_order: i,
  }))
  const { data: insertedDays, error: dayErr } = await supabase
    .from('menu_days')
    .insert(dayInserts)
    .select()
  if (dayErr) throw dayErr

  for (let di = 0; di < insertedDays.length; di++) {
    const dayId = insertedDays[di].id
    const mealInserts = (newMenu[di].meals || []).map(
      ({ items, menu_meal_items, id, day_id, ...meal }, mi) => ({
        ...meal,
        day_id: dayId,
        sort_order: mi,
      })
    )
    if (!mealInserts.length) continue

    const { data: insertedMeals, error: mealErr } = await supabase
      .from('menu_meals')
      .insert(mealInserts)
      .select()
    if (mealErr) throw mealErr

    for (let mi = 0; mi < insertedMeals.length; mi++) {
      const mealId = insertedMeals[mi].id
      const itemInserts = (newMenu[di].meals[mi].items || [])
        .filter(t => t.trim())
        .map((item_text, ii) => ({ meal_id: mealId, item_text, sort_order: ii }))
      if (itemInserts.length > 0) {
        const { error: itemErr } = await supabase.from('menu_meal_items').insert(itemInserts)
        if (itemErr) throw itemErr
      }
    }
  }
}
