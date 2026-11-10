import type { EventSlug } from "@/types/db";

// Event date/time as stored in hero_content: event_date "YYYY-MM-DD", event_time "HH:MM".
export interface EventSchedule {
  date: string | null;
  time: string | null;
}

interface ScheduleSource {
  event_date?: string | null;
  event_time?: string | null;
  date_text?: string | null;
}

// Used only when the database has no date for the event yet.
export const FALLBACK_SCHEDULE: Record<EventSlug, EventSchedule> = {
  prime: { date: null, time: null },
  forte: { date: "2026-12-11", time: "17:30" },
};

const MONTHS = [
  "ianuarie", "februarie", "martie", "aprilie", "mai", "iunie",
  "iulie", "august", "septembrie", "octombrie", "noiembrie", "decembrie",
];

function splitDate(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return { y, m, d };
}

// Legacy free-text dates were entered as "DD.MM.YYYY".
export function parseDateText(text?: string | null): string | null {
  const match = text?.trim().match(/^(\d{1,2})\.(\d{1,2})\.(\d{4})$/);
  if (!match) return null;
  const [, d, m, y] = match;
  return `${y}-${m.padStart(2, "0")}-${d.padStart(2, "0")}`;
}

export function resolveSchedule(slug: EventSlug, row?: ScheduleSource | null): EventSchedule {
  const date = row?.event_date || parseDateText(row?.date_text);
  if (date) return { date, time: row?.event_time || null };
  return FALLBACK_SCHEDULE[slug];
}

/** 03.11.2026 */
export function formatShortDate(date: string) {
  const { y, m, d } = splitDate(date);
  return `${String(d).padStart(2, "0")}.${String(m).padStart(2, "0")}.${y}`;
}

/** 3 noiembrie 2026 */
export function formatLongDate(date: string) {
  const { y, m, d } = splitDate(date);
  return `${d} ${MONTHS[m - 1]} ${y}`;
}

/** "03.11.2026, ora 17:00" (or the long form); empty string when no date is set. */
export function formatWhen(schedule: EventSchedule, style: "short" | "long" = "short") {
  if (!schedule.date) return "";
  const day = style === "long" ? formatLongDate(schedule.date) : formatShortDate(schedule.date);
  return schedule.time ? `${day}, ora ${schedule.time}` : day;
}

// ISO 8601 with the Romanian offset in effect on that day (EET/EEST).
export function toIsoDateTime(schedule: EventSchedule): string | null {
  if (!schedule.date) return null;
  const time = schedule.time || "00:00";
  const probe = new Date(`${schedule.date}T12:00:00Z`);
  const offset = new Intl.DateTimeFormat("en-US", { timeZone: "Europe/Bucharest", timeZoneName: "longOffset" })
    .formatToParts(probe)
    .find((p) => p.type === "timeZoneName")?.value.replace("GMT", "") || "+02:00";
  return `${schedule.date}T${time}:00${offset}`;
}
