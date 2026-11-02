-- Inlocuieste agenda unui eveniment cu programul de mai jos
-- Ruleaza in Supabase SQL Editor
--
-- ATENTIE: sterge agenda existenta a evenimentului ales si o inlocuieste.
-- Acest script este pentru BNI Prime; varianta Forte este agenda_update.sql.

DO $$
DECLARE
  ev TEXT := 'prime';
BEGIN
  DELETE FROM agenda_items WHERE event_slug = ev;

  INSERT INTO agenda_items (event_slug, time_range, title, description, sort_order) VALUES
    (ev, '17:00 - 17:45', 'Primirea participanților', 'Acces în locație, primirea ecusonului de participant și primele conexiuni informale', 1),
    (ev, '17:45 - 17:50', 'Deschiderea oficială a evenimentului', 'Bun venit din partea organizatorilor și prezentarea agendei complete a evenimentului', 2),
    (ev, '17:50 - 17:55', 'Scop și privire de ansamblu BNI', 'Ce este networking-ul? Ce este BNI?', 3),
    (ev, '17:55 - 18:00', 'Prezentarea valorilor BNI', 'Dăruind vei dobândi!', 4),
    (ev, '18:00 - 18:10', 'Prezentare Power-team', '', 5),
    (ev, '18:10 - 18:20', 'Sesiune de speed networking (1)', '', 6),
    (ev, '18:20 - 18:30', 'Prezentare Power-team', '', 7),
    (ev, '18:30 - 18:40', 'Sesiune de speed networking (2)', '', 8),
    (ev, '18:40 - 18:50', 'Prezentare Power-team', '', 9),
    (ev, '18:50 - 19:00', 'Sesiune de speed networking (3)', '', 10),
    (ev, '19:00 - 19:05', 'Închiderea evenimentului', '', 11),
    (ev, '19:05 - 19:15', 'Orientarea invitaților', '', 12),
    (ev, '19:15 - 20:00', 'Networking deschis', '', 13);
END $$;
