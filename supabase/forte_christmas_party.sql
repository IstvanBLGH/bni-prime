-- BNI FORTE: Christmas Party (11.12.2026, ora 17:30)
-- Ruleaza in Supabase SQL Editor. Atinge doar continutul Forte.
--
-- ATENTIE: inlocuieste agenda Forte si continutul biletului Forte.

BEGIN;

-- 1-4. Hero: titlu, data/ora, fara descriere
UPDATE hero_content
SET title       = 'CHRISTMAS PARTY',
    event_date  = '2026-12-11',
    event_time  = '17:30',
    date_text   = '11.12.2026',
    description = ''
WHERE event_slug = 'forte';

-- 5-7. Despre: textele din stanga (BNI FORTE) si dreapta (CHRISTMAS PARTY), "Ce este BNI?"
UPDATE about_content
SET group_body = 'De 10 ani, BNI FORTE aduce împreună antreprenori care cred în puterea colaborării și în relațiile construite pe încredere. Sub filosofia „Dăruind vei dobândi”, am crescut o comunitate în care recomandările deschid oportunități, iar oamenii se sprijină reciproc în dezvoltarea afacerilor. Anul acesta, aniversarea noastră devine un prilej de sărbătoare pentru întreaga comunitate BNI din regiune. Îi aducem alături pe cei care au contribuit la povestea FORTE și pe cei cu care vom scrie următoarele capitole.',
    event_title = 'CHRISTMAS PARTY',
    event_body = E'BNI FORTE te invită să încheiem anul împreună, într-o seară dedicată oamenilor și relațiilor care dau valoare comunității noastre. Christmas Party reunește membri BNI din regiune și invitații lor, într-o atmosferă festivă, cu muzică, voie bună, speed-networking și timp pentru conversații. Ne revedem cu partenerii, cunoaștem oameni din alte grupuri și sărbătorim împreună reușitele anului. Iar această întâlnire are o semnificație aparte: aniversăm 10 ani de BNI FORTE, alături de comunitatea din care facem parte.\n\nVino să sărbătorim și să ne cunoaștem mai bine!',
    power_team_title = 'Ce este BNI?',
    power_team_body = 'BNI este o organizație internațională de business networking care îi ajută pe antreprenori și profesioniști să își dezvolte afacerile prin recomandări și relații de încredere. Membrii se întâlnesc regulat, își cunosc activitatea și identifică oportunități de colaborare, devenind o sursă de sprijin și conexiuni pentru ceilalți. La baza BNI stă filosofia „Dăruind vei dobândi”: atunci când îi ajuți pe ceilalți să reușească, construiești relații care contribuie și la propria dezvoltare. Evenimentele regionale aduc această comunitate împreună și deschid oportunitatea de a cunoaște oameni și de a construi parteneriate dincolo de propriul grup.'
WHERE event_slug = 'forte';

-- 8. Agenda
DELETE FROM agenda_items WHERE event_slug = 'forte';
INSERT INTO agenda_items (event_slug, time_range, title, description, sort_order) VALUES
  ('forte', '17:30 - 18:30', 'Primire invitați', '', 1),
  ('forte', '18:30 - 19:05', 'Prezentare grupuri regiunea Cluj', '', 2),
  ('forte', '19:05 - 19:25', 'Speed Networking (Runda 1 și 2)', '', 3),
  ('forte', '19:25 - 19:50', 'Moment festiv BNI FORTE', '', 4),
  ('forte', '19:50 - 20:10', 'Speed Networking (Runda 3 și 4)', '', 5),
  ('forte', '20:10 - 20:15', 'Parteneri', '', 6),
  ('forte', '20:15 - 22:00', 'Free Networking', '', 7);

-- 9. Bilet: 350 lei, doua sectiuni (randurile care incep cu "# " sunt titluri de sectiune)
UPDATE tickets
SET price = 350,
    description = 'Acces la Christmas Party BNI FORTE.',
    features = '["# Acces și Networking", "Acces la eveniment", "Ecusonul de participant", "Sesiuni de speed networking", "Networking deschis", "# All Inclusive", "Finger-food", "Candy-bar", "Soft drinks", "Coffee", "Wine & Prosecco"]'::jsonb
WHERE event_slug = 'forte';

-- Numele evenimentului in FAQ-ul Forte
UPDATE faq_items
SET question = replace(replace(question, 'ZIUA INVITATULUI', 'CHRISTMAS PARTY'), 'Ziua Invitatului', 'Christmas Party'),
    answer   = replace(replace(answer,   'ZIUA INVITATULUI', 'CHRISTMAS PARTY'), 'Ziua Invitatului', 'Christmas Party')
WHERE event_slug = 'forte';

COMMIT;
