-- BNI Events CMS Schema
-- Run this in Supabase SQL Editor

-- =====================
-- TABLES
-- =====================

CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  badge TEXT DEFAULT 'Eveniment de business networking',
  title TEXT,
  date_text TEXT,
  city TEXT,
  description TEXT,
  image_url TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_slug)
);

CREATE TABLE IF NOT EXISTS about_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  group_title TEXT,
  group_body TEXT,
  group_link TEXT,
  event_title TEXT,
  event_body TEXT,
  power_team_title TEXT,
  power_team_body TEXT,
  domains JSONB DEFAULT '[]'::jsonb,
  pillars JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_slug)
);

CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  role TEXT DEFAULT '',
  company TEXT DEFAULT '',
  website TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  photo_url TEXT DEFAULT '',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS agenda_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  time_range TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  label TEXT DEFAULT '',
  price INT NOT NULL,
  description TEXT DEFAULT '',
  features JSONB DEFAULT '[]'::jsonb,
  is_available BOOLEAN DEFAULT TRUE,
  max_quantity INT,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS location_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  venue_name TEXT DEFAULT '',
  address TEXT DEFAULT '',
  description TEXT DEFAULT '',
  has_parking BOOLEAN DEFAULT TRUE,
  maps_embed_url TEXT DEFAULT '',
  maps_link TEXT DEFAULT '',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_slug)
);

CREATE TABLE IF NOT EXISTS faq_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  sort_order INT DEFAULT 0
);

CREATE TABLE IF NOT EXISTS contact_info (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_slug TEXT REFERENCES events(slug) ON DELETE CASCADE,
  email TEXT DEFAULT '',
  phone TEXT DEFAULT '',
  facebook_url TEXT DEFAULT '',
  operator_name TEXT DEFAULT 'BIG DESIGN TM S.R.L.',
  cui TEXT DEFAULT '39578361',
  address TEXT DEFAULT 'Str. Grănicerilor, nr. 3, Bistrița',
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_slug)
);

-- =====================
-- STORAGE BUCKET
-- =====================
-- Run in Supabase Dashboard → Storage → New bucket: "member-photos" (public)

-- =====================
-- SEED DATA
-- =====================

INSERT INTO events (slug, name) VALUES
  ('prime', 'BNI Prime'),
  ('forte', 'BNI Forte')
ON CONFLICT (slug) DO NOTHING;

-- FORTE: Hero
INSERT INTO hero_content (event_slug, badge, title, date_text, city, description) VALUES (
  'forte',
  'Eveniment de business networking',
  'ZIUA INVITATULUI',
  '29.09.2026',
  'Cluj-Napoca',
  'BNI FORTE te invită la evenimentul de business networking ZIUA INVITATULUI, un eveniment ce aduce la aceeași masă membri BNI și oameni de afaceri din regiune, un eveniment la care participanții pot identifica oportunități concrete pentru afacerile lor.'
) ON CONFLICT (event_slug) DO NOTHING;

-- FORTE: About
INSERT INTO about_content (
  event_slug, group_title, group_body, group_link,
  event_title, event_body,
  power_team_title, power_team_body,
  domains, pillars
) VALUES (
  'forte',
  'BNI FORTE',
  'BNI FORTE este cel mai vechi grup BNI de business networking din provincie și va aniversa, în luna decembrie, 10 ani de activitate. BNI FORTE își dorește să contribuie la schimbarea modului în care oamenii fac afaceri în Cluj-Napoca și în județ, alături de profesioniști ce cred în valori profesionale și care își doresc să-și crească afacerile prin construirea relațiilor pe termen lung.',
  'https://bniromania.ro',
  'ZIUA INVITATULUI',
  'ZIUA INVITATULUI este un eveniment de business networking organizat de grupul BNI FORTE pentru mediul de afaceri din județul Cluj și din regiune. Evenimentul este o oportunitate de a-ți extinde sfera de contacte, de a interacționa cu profesioniști din diverse domenii de activitate și de a construi relații profesionale care pot contribui la dezvoltarea afacerii tale. Fiecare ediție a evenimentului este organizată în jurul unui anumit Power Team, fiind invitați cu prioritate profesioniști din domenii de activitate complementare acestuia.',
  'Ce este un Power Team?',
  'Un Power Team este un grup de profesioniști din domenii de activitate complementare, care se adresează acelorași tipuri de clienți și își pot genera reciproc recomandări și oportunități de afaceri. ZIUA INVITATULUI este, în același timp, o oportunitate pentru invitați de a descoperi modul în care funcționează comunitatea BNI FORTE, de a cunoaște membrii acesteia și de a vedea concret cum networkingul structurat și recomandările de business pot contribui la dezvoltarea unei afaceri.',
  '["Domeniu 1", "Domeniu 2", "Domeniu 3"]'::jsonb,
  '[{"title":"Networking structurat","desc":"cadru pentru dezvoltarea relațiilor de afaceri"},{"title":"Construirea relațiilor","desc":"relații care să permită recomandări"},{"title":"Recomandări","desc":"o ușă deschisă către clientul dorit"}]'::jsonb
) ON CONFLICT (event_slug) DO NOTHING;

-- FORTE: Agenda
INSERT INTO agenda_items (event_slug, time_range, title, description, sort_order) VALUES
  ('forte','17:00 - 17:45','Primirea participanților','Acces în locație, primirea ecusonului de participant și primele conexiuni informale',1),
  ('forte','17:45 - 17:50','Deschiderea oficială a evenimentului','Bun venit din partea organizatorilor și prezentarea agendei complete a evenimentului',2),
  ('forte','17:50 - 17:55','Scop și privire de ansamblu BNI','Ce este networking-ul? Ce este BNI?',3),
  ('forte','17:55 - 18:00','Prezentarea valorilor BNI','Dăruind vei dobândi!',4),
  ('forte','18:00 - 18:10','Prezentarea membrilor power-team-ului (3-4 membri)','',5),
  ('forte','18:10 - 18:20','Sesiune de speed networking (1)','',6),
  ('forte','18:20 - 18:35','Speaker','Subiect: TBD',7),
  ('forte','18:35 - 18:45','Prezentarea membrilor power-team-ului (3-4 membri)','',8),
  ('forte','18:45 - 18:55','Sesiune de speed networking (2)','',9),
  ('forte','18:55 - 19:00','Închiderea evenimentului','',10),
  ('forte','19:00 - 19:20','Orientarea invitaților','Cum devin membru BNI?',11),
  ('forte','19:20 - 20:00','Networking deschis','',12);

-- FORTE: Ticket
INSERT INTO tickets (event_slug, name, label, price, description, features, sort_order) VALUES (
  'forte','Standard','1 bilet',175,
  'Acces la evenimentul de networking BNI FORTE Ziua Invitatului.',
  '["Acces la eveniment","Ecusonul de participant","Sesiuni de speed networking","Orientare BNI pentru invitați","Networking deschis","Email cu concluzii post-eveniment"]'::jsonb,
  1
);

-- FORTE: Location
INSERT INTO location_content (event_slug, venue_name, address, description, has_parking, maps_link) VALUES (
  'forte',
  'The Office',
  'B-dul 21 Decembrie 1989, nr. 77, mun. Cluj-Napoca',
  'Evenimentul organizat de grupul BNI Forte are loc la The Office din Cluj-Napoca, locația unde se desfășoară și întâlnirile săptămânale ale grupului.',
  TRUE,
  'https://maps.google.com/?q=The+Office+Cluj-Napoca+Bulevardul+21+Decembrie+1989+77'
) ON CONFLICT (event_slug) DO NOTHING;

-- FORTE: FAQ
INSERT INTO faq_items (event_slug, question, answer, sort_order) VALUES
  ('forte','Trebuie să fiu membru BNI ca să particip?','Nu. Evenimentul este deschis tuturor celor interesați de networking dedicat afacerilor, fie că sunt deja membri BNI, fie că vor să descopere pentru prima dată cum funcționează networking-ul de business structurat.',1),
  ('forte','Pot transfera biletul către altă persoană?','Da. Trimite-ne un email la bigdesigntm@gmail.com cu datele persoanei ce va participa în locul tău și actualizăm biletul fără costuri suplimentare.',2),
  ('forte','Există loc de parcare la locația evenimentului?','Da, The Office din Cluj-Napoca oferă parcare privată pentru toți participanții, contra-cost.',3),
  ('forte','Voi primi materiale după eveniment?','Toți participanții vor primi un email cu principalele concluzii ale evenimentului și contactele echipei de conducere a grupului.',4),
  ('forte','Cum mă pregătesc pentru eveniment?','Recomandăm să vii cu cărți de vizită, un mesaj clar despre ce oferi și ce cauți și deschidere către conversații autentice, exact spiritul pe care îl promovează fiecare membru BNI.',5);

-- FORTE: Contact
INSERT INTO contact_info (event_slug, email, phone, facebook_url) VALUES (
  'forte','bigdesigntm@gmail.com','+40 770 987 977',
  'https://www.facebook.com/BNI-Cluj'
) ON CONFLICT (event_slug) DO NOTHING;

-- PRIME: Contact
INSERT INTO contact_info (event_slug, email, phone, facebook_url) VALUES (
  'prime','bigdesigntm@gmail.com','+40 770 987 977',
  'https://www.facebook.com/people/BNI-Bistri%C8%9Ba-N%C4%83s%C4%83ud/61571400373476/'
) ON CONFLICT (event_slug) DO NOTHING;
