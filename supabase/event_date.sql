-- Data si ora evenimentului, editabile din admin (Hero)
-- Ruleaza in Supabase SQL Editor

ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS event_date DATE;
ALTER TABLE hero_content ADD COLUMN IF NOT EXISTS event_time TEXT;

-- Preia data din vechiul camp text (format DD.MM.YYYY)
UPDATE hero_content
SET event_date = to_date(date_text, 'DD.MM.YYYY')
WHERE event_date IS NULL AND date_text ~ '^\d{1,2}\.\d{1,2}\.\d{4}$';

UPDATE hero_content
SET event_date = '2026-11-03', event_time = '17:00', date_text = '03.11.2026'
WHERE event_slug = 'forte';

-- Reincarca schema in API ca admin-ul sa vada coloanele noi imediat
NOTIFY pgrst, 'reload schema';
