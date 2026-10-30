-- BNI Prime: diacritice in textele salvate in baza de date
-- Ruleaza in Supabase SQL Editor

-- Locatie: Codrisor -> Codrișor
UPDATE location_content
SET venue_name  = replace(venue_name,  'Codrisor', 'Codrișor'),
    address     = replace(address,     'Codrisor', 'Codrișor'),
    description = replace(description, 'Codrisor', 'Codrișor')
WHERE event_slug = 'prime';

-- Bilete: invitati -> invitați
UPDATE tickets
SET features    = replace(features::text, 'invitati', 'invitați')::jsonb,
    description = replace(description,    'invitati', 'invitați')
WHERE event_slug = 'prime';
