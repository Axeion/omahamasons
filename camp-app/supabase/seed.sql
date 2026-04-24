-- Mizpah Lodge #302 Camp App — Seed Data
-- Run this after schema.sql, on an empty database.
-- Uses CTEs to capture generated IDs when linking categories → items and days → meals → items.

-- ── RSVP ─────────────────────────────────────────────────────────────────────

insert into rsvp (name, fri, sat, shirt, sort_order) values
  ('Dalton Kock',              true,  true,  'XL',        0),
  ('Patrick Smith',            true,  false, 'XL',        1),
  ('Michael Duffy',            true,  true,  '2XL',       2),
  ('Skip Cruse',               true,  true,  'L',         3),
  ('Terry Winter',             true,  true,  '2XL',       4),
  ('Justin King',              true,  false, 'XL',        5),
  ('Will Holderness-Siglin',   true,  true,  '2XL',       6),
  ('Camden Holderness-Siglin', true,  true,  'XL',        7),
  ('Luke',                     true,  true,  'XL',        8),
  ('Jeremiah Jones',           true,  true,  'L',         9),
  ('Michael Bowsaw',           true,  true,  'XL',       10),
  ('Greg Carlson',             true,  true,  'XL (Tall)',11),
  ('Blake Ursch',              false, true,  'S',        12),
  ('Brandon',                  true,  true,  '3XL',      13),
  ('Matt Whitlow',             true,  false, 'XL',       14),
  ('Kyle Barcus',              true,  true,  'M',        15);

-- ── Pack List: Gear ───────────────────────────────────────────────────────────

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Must Have - Cook & Cast Iron', '#6e2e2e', 'gear', 0) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('12" Cast Iron Skillet',        '', 'Eggs, hash browns, burritos',          0),
  ('10" Cast Iron Skillet',        '', 'Bacon, overflow',                      1),
  ('12" Dutch Oven + lid',         '', 'Biscuits',                             2),
  ('10" Dutch Oven + lid',         '', 'Sausage gravy',                        3),
  ('Lid lifter',                   '', 'Non-negotiable',                       4),
  ('Leather / heat gloves',        '', 'Dutch oven & fire work',               5),
  ('Large aluminum roasting pan',  '', 'Beer brat bath - disposable OK',       6),
  ('Long-handled tongs (x2)',      '', '2 pairs minimum',                      7),
  ('Long-handled spatula',         '', '',                                     8),
  ('Sharp chef''s knife',          '', '',                                     9),
  ('Cutting board',                '', 'Large, plastic',                      10),
  ('Large mixing bowls (x2-3)',    '', '',                                    11),
  ('Ladle',                        '', 'Don''t go disposable - gravy is heavy',12),
  ('Can opener',                   '', '',                                    13),
  ('Instant read thermometer',     '', 'Steaks',                              14),
  ('Large serving spoons (x3)',    '', '',                                    15),
  ('Cast iron trivet or plywood',  '', 'Protects cabin surfaces',             16)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Good to Have', '#2e5c3a', 'gear', 1) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Flat cast iron griddle',    '', 'Hash patties go much faster',              0),
  ('Large stock pot',           '', 'Overflow, heating water',                  1),
  ('Wire cooling rack',         '', 'Resting steaks',                           2),
  ('Sheet pans (x2)',           '', 'Staging + holding burrito ingredients',    3),
  ('Squeeze bottles',           '', 'Cleaner than passing jars for 18 guys',   4),
  ('Chimney starter',           '', 'Faster coal lighting',                     5),
  ('Small propane torch',       '', 'Backup fire starter',                      6),
  ('Propane camp stove',        '', 'Confirm cabin stove handles the volume',   7),
  ('Folding table (x1-2)',      '', 'Sub bar + condiment station',              8),
  ('Headlamp',                  '', 'Early Sat breakfast in the dark',          9),
  ('Pre-mixed seasoning bags',  '', 'Mix at home - salt/pepper/garlic',        10)
) as v(item, qty, note, ord);

-- ── Pack List: Shopping ───────────────────────────────────────────────────────

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Meat & Protein', '#3a3020', 'shopping', 2) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('80/20 ground beef',              '10 lbs',              '', 0),
  ('Bratwurst',                      '4-5 pkgs (20-24 ct)', '', 1),
  ('Beer for brat bath (PBR/Busch)', '6-12 pack',           '', 2),
  ('Thick-cut bacon',                '4 lbs',               '', 3),
  ('Bulk breakfast sausage',         '4 lbs',               '', 4),
  ('Chorizo (loose/bulk)',           '2 lbs',               '', 5),
  ('NY Strip or Ribeye steaks',      '18-20 ct',            '', 6),
  ('Deli turkey',                    '2 lbs',               '', 7),
  ('Deli ham',                       '2 lbs',               '', 8),
  ('Deli roast beef',                '1.5 lbs',             '', 9)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Dairy & Eggs', '#3a3020', 'shopping', 3) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Eggs',                     '5 dozen',  '', 0),
  ('Whole milk',               '1 gallon', '', 1),
  ('Butter, unsalted',         '3 lbs',    '', 2),
  ('Shredded cheddar',         '2 lbs',    '', 3),
  ('Sliced cheese assortment', '3 pkgs',   '', 4),
  ('Sour cream',               '16 oz',    '', 5)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Bread & Baking', '#3a3020', 'shopping', 4) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Hamburger buns',               '24 ct',          '', 0),
  ('Hoagie/brat rolls',            '24 ct',          '', 1),
  ('Sub/hoagie rolls (lunch)',     '20 ct',          '', 2),
  ('Large flour tortillas',        '2 pkgs (30 ct)', '', 3),
  ('Grands refrigerated biscuits', '4 cans',         '', 4),
  ('All-purpose flour',            '2 lbs',          '', 5)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Produce', '#3a3020', 'shopping', 5) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Russet potatoes',     '10 lbs',   '', 0),
  ('Yellow onions',       '6 large',  '', 1),
  ('Bell peppers, mixed', '4',        '', 2),
  ('Roma tomatoes',       '6',        '', 3),
  ('Iceberg lettuce',     '2 heads',  '', 4),
  ('Garlic, fresh',       '1 bulb',   '', 5)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Pantry & Canned', '#3a3020', 'shopping', 6) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Cowboy baked beans, large can', '4-5 cans',    '', 0),
  ('Pickles, jar',                  '2 jars',       '', 1),
  ('Banana peppers',                '1 jar',        '', 2),
  ('Black olives',                  '1 can',        '', 3),
  ('Salsa',                         '2 large jars', '', 4)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Seasonings & Condiments', '#3a3020', 'shopping', 7) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Kosher salt',         'large box',    '', 0),
  ('Black pepper',        'large',        '', 1),
  ('Garlic powder',       'large',        '', 2),
  ('Onion powder',        '1',            '', 3),
  ('Paprika',             '1',            '', 4),
  ('Ketchup',             '2 large',      '', 5),
  ('Yellow mustard',      '2',            '', 6),
  ('Brown/spicy mustard', '1',            '', 7),
  ('Mayo',                '2 large jars', '', 8),
  ('Italian dressing',    '2 bottles',    '', 9),
  ('Hot sauce',           '2 bottles',    '',10),
  ('Vegetable oil',       '1 large',      '',11)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Frozen & Refrigerated', '#3a3020', 'shopping', 8) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Frozen hash brown patties', '2 large bags', '', 0),
  ('Pre-made coleslaw',         'large tub',    '', 1)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Plates, Cups & Utensils', '#3a3020', 'shopping', 9) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Heavy duty paper plates (foam-backed)',  '75-100 ct',        '', 0),
  ('Disposable bowls',                       '25+ ct',           '', 1),
  ('Heavyweight plastic utensils',           '100+ ct',          '', 2),
  ('Extra forks pack',                       '50+ ct',           '', 3),
  ('16-20 oz plastic cups',                  '2 packs of 50',    '', 4),
  ('Disposable coffee cups',                 '1 pack',           '', 5),
  ('Aluminum foil pans w/ lids (half-size)', '12-15 ct',         '', 6),
  ('Large aluminum roasting pan',            '2-3 ct',           '', 7)
) as v(item, qty, note, ord);

with cat as (
  insert into pack_list_categories (category, color, list_type, sort_order)
  values ('Supplies & Disposables', '#3a3020', 'shopping', 10) returning id
)
insert into pack_list_items (category_id, item, qty, note, sort_order)
select cat.id, v.item, v.qty, v.note, v.ord from cat, (values
  ('Heavy duty aluminum foil', '2 rolls',       '', 0),
  ('Paper towels',             'large pack',    '', 1),
  ('Napkins',                  '2 large packs', '', 2),
  ('Dish soap + sponge',       '',              '', 3),
  ('Trash bags',               '1 box',         '', 4),
  ('Zip-lock bags, gallon',    '1 box',         '', 5),
  ('Sharpie + masking tape',   '',              '', 6),
  ('Disposable gloves',        '1 box',         '', 7)
) as v(item, qty, note, ord);

-- ── Menu ─────────────────────────────────────────────────────────────────────

-- Friday Night
insert into menu_days (day, color, sort_order) values ('Friday Night', '#6e3e10', 0);

with meal as (
  insert into menu_meals (day_id, meal, name, note, sort_order)
  select id, 'Dinner', 'Burgers, Beer Brats & Sides',
    'Simmer brats first - never boil hard or casings split. Finish on grate for snap and char.', 0
  from menu_days where day = 'Friday Night' returning id
)
insert into menu_meal_items (meal_id, item_text, sort_order)
select meal.id, v.item, v.ord from meal, (values
  ('80/20 ground beef patties (8 oz) - salt, pepper, garlic powder', 0),
  ('Beer brats - simmer in beer & onions 30-40 min, then char on grate', 1),
  ('Buns: hamburger buns + hoagie-style brat rolls', 2),
  ('Beer bath: cheap malty beer + sliced onions (onions become a topping)', 3),
  ('Toppings: beer-bath onions, sharp cheddar, brown & spicy mustard, ketchup, pickles', 4),
  ('Sides: pre-made coleslaw, chips', 5)
) as v(item, ord);

-- Saturday
insert into menu_days (day, color, sort_order) values ('Saturday', '#1a4a2e', 1);

with meal as (
  insert into menu_meals (day_id, meal, name, note, sort_order)
  select id, 'Breakfast', 'Eggs, Bacon, Hash Browns + Dutch Oven B&G',
    'Stage Dutch ovens 20 min before eggs. 2 rounds of biscuits - wrap Round 1 in foil. 8-10 coals on top / 6-8 underneath for the 12".', 0
  from menu_days where day = 'Saturday' returning id
)
insert into menu_meal_items (meal_id, item_text, sort_order)
select meal.id, v.item, v.ord from meal, (values
  ('Scrambled eggs - large cast iron batches', 0),
  ('Thick-cut bacon on grill grate over fire', 1),
  ('Frozen hash brown patties on griddle or cast iron', 2),
  ('Dutch Oven #1 (12"): Grands biscuits - ~25 min on coals', 3),
  ('Dutch Oven #2 (10"): Sausage gravy - sausage, flour, milk, S&P', 4)
) as v(item, ord);

with meal as (
  insert into menu_meals (day_id, meal, name, note, sort_order)
  select id, 'Lunch', 'Build-Your-Own Deli Sub Bar',
    'Zero cook time - set it out, guys serve themselves.', 1
  from menu_days where day = 'Saturday' returning id
)
insert into menu_meal_items (meal_id, item_text, sort_order)
select meal.id, v.item, v.ord from meal, (values
  ('Deli meats: turkey, ham, roast beef', 0),
  ('Cheeses: provolone, pepper jack, Swiss', 1),
  ('Sub/hoagie rolls', 2),
  ('Toppings: lettuce, tomato, onion, banana peppers, black olives', 3),
  ('Condiments: mayo, mustard, Italian dressing', 4),
  ('Sides: kettle chips, pickle spears', 5)
) as v(item, ord);

with meal as (
  insert into menu_meals (day_id, meal, name, note, sort_order)
  select id, 'Dinner', 'Steaks on the Fire + Camp Sides',
    'Foil packets go on 30 min before steaks. Pull steaks 5 degrees early, rest 5 min under foil. Top with compound butter.', 2
  from menu_days where day = 'Saturday' returning id
)
insert into menu_meal_items (meal_id, item_text, sort_order)
select meal.id, v.item, v.ord from meal, (values
  ('NY Strip or Ribeye (10-12 oz per man) - kosher salt, pepper, garlic powder', 0),
  ('Compound butter: softened butter + minced garlic + herbs, wrapped in foil', 1),
  ('Foil packet potatoes - diced russets, butter, onion, seasoning - 30 min on coals', 2),
  ('Cowboy baked beans warmed in Dutch oven', 3)
) as v(item, ord);

-- Sunday
insert into menu_days (day, color, sort_order) values ('Sunday Breakfast', '#1a3a5c', 2);

with meal as (
  insert into menu_meals (day_id, meal, name, note, sort_order)
  select id, 'Breakfast', 'Campfire Breakfast Burritos',
    'Everything in one big cast iron skillet. Guys build their own.', 0
  from menu_days where day = 'Sunday Breakfast' returning id
)
insert into menu_meal_items (meal_id, item_text, sort_order)
select meal.id, v.item, v.ord from meal, (values
  ('Scrambled eggs with diced bell pepper & onion', 0),
  ('Crumbled breakfast sausage or chorizo', 1),
  ('Shredded cheddar cheese', 2),
  ('Large flour tortillas - warm on grill grate', 3),
  ('Toppings: salsa, hot sauce, sour cream', 4)
) as v(item, ord);
