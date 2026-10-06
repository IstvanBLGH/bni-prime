-- Comenzi / inscrieri la evenimente
-- Ruleaza in Supabase SQL Editor
--
-- Daca tabelul exista deja fara coloana de cantitate:
--   ALTER TABLE orders ADD COLUMN IF NOT EXISTS quantity INT NOT NULL DEFAULT 1;

CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT NOT NULL,
  order_id TEXT UNIQUE NOT NULL,
  name TEXT DEFAULT '',
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  cui TEXT DEFAULT '',
  sursa TEXT DEFAULT '',
  quantity INT NOT NULL DEFAULT 1,
  amount INT,
  status TEXT NOT NULL DEFAULT 'Initiat',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  paid_at TIMESTAMPTZ
);

-- Tabelul contine date personale: blocheaza accesul cu cheia publica.
-- Scrierile vin de pe server cu service role, care ocoleste RLS.
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admin citeste comenzile" ON orders;
CREATE POLICY "Admin citeste comenzile" ON orders
  FOR SELECT TO authenticated USING (true);
