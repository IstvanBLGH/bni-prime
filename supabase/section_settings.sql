-- Sectiuni site activate/dezactivate din admin (/admin/sectiuni)
-- Ruleaza in Supabase SQL Editor

CREATE TABLE IF NOT EXISTS section_settings (
  event_slug TEXT PRIMARY KEY REFERENCES events(slug) ON DELETE CASCADE,
  hidden_sections JSONB NOT NULL DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO section_settings (event_slug) VALUES ('prime'), ('forte')
ON CONFLICT (event_slug) DO NOTHING;

-- Oricine poate citi (site-ul public), doar adminul logat poate modifica
ALTER TABLE section_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public citeste sectiunile" ON section_settings;
CREATE POLICY "Public citeste sectiunile" ON section_settings
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admin modifica sectiunile" ON section_settings;
CREATE POLICY "Admin modifica sectiunile" ON section_settings
  FOR ALL TO authenticated USING (true) WITH CHECK (true);

NOTIFY pgrst, 'reload schema';
