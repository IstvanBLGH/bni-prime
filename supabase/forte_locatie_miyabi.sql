-- BNI FORTE: fara "Domenii vizate", locatia Miyabi Space (de pe afis)
-- Ruleaza in Supabase SQL Editor. Atinge doar continutul Forte.

BEGIN;

UPDATE about_content
SET domains = '[]'::jsonb
WHERE event_slug = 'forte';

UPDATE location_content
SET venue_name     = 'Miyabi Space – Exclusiv Events',
    address        = 'Bulevardul Muncii 217-219, Cluj-Napoca',
    description    = 'Christmas Party BNI FORTE are loc la Miyabi Space – Exclusiv Events, pe Bulevardul Muncii 217-219, în Cluj-Napoca.',
    has_parking    = false,
    maps_link      = 'https://maps.google.com/?q=Miyabi+Space+Bulevardul+Muncii+217-219+Cluj-Napoca',
    maps_embed_url = 'https://maps.google.com/maps?q=Miyabi+Space+Bulevardul+Muncii+217-219+Cluj-Napoca&output=embed'
WHERE event_slug = 'forte';

COMMIT;
