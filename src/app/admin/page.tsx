import { ArrowRight, Users, CalendarDays, Ticket, HelpCircle } from "lucide-react";

const EVENTS = [
  {
    slug: "prime",
    name: "BNI Prime",
    subtitle: "Prime Summer · 29 Iulie 2026 · Bistrița",
    color: "from-red-600 to-red-800",
    sections: [
      { label: "Echipă", href: "/admin/prime/team", icon: Users },
      { label: "Agendă", href: "/admin/prime/agenda", icon: CalendarDays },
      { label: "Bilete", href: "/admin/prime/tickets", icon: Ticket },
      { label: "FAQ", href: "/admin/prime/faq", icon: HelpCircle },
    ],
  },
  {
    slug: "forte",
    name: "BNI Forte",
    subtitle: "Ziua Invitatului · 29 Septembrie 2026 · Cluj-Napoca",
    color: "from-red-700 to-rose-900",
    sections: [
      { label: "Power Team", href: "/admin/forte/team", icon: Users },
      { label: "Agendă", href: "/admin/forte/agenda", icon: CalendarDays },
      { label: "Bilet", href: "/admin/forte/tickets", icon: Ticket },
      { label: "FAQ", href: "/admin/forte/faq", icon: HelpCircle },
    ],
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="mt-1 text-sm text-muted">Gestionează conținutul ambelor evenimente BNI.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {EVENTS.map((ev) => (
          <div key={ev.slug} className="overflow-hidden rounded-2xl border border-border bg-background shadow-sm">
            <div className={`bg-gradient-to-r ${ev.color} p-6 text-white`}>
              <h2 className="text-xl font-bold">{ev.name}</h2>
              <p className="mt-1 text-sm text-white/80">{ev.subtitle}</p>
              <div className="mt-4 flex gap-3">
                <a
                  href={ev.slug === "prime" ? "/" : "/forte"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/20 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/30"
                >
                  Vezi site-ul live
                  <ArrowRight className="h-3 w-3" />
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 p-4">
              {ev.sections.map((sec) => {
                const Icon = sec.icon;
                return (
                  <a
                    key={sec.href}
                    href={sec.href}
                    className="flex items-center gap-2.5 rounded-xl border border-border px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary hover:bg-surface hover:text-primary"
                  >
                    <Icon className="h-4 w-4 shrink-0 text-primary" aria-hidden="true" />
                    {sec.label}
                  </a>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-amber-200 bg-amber-50 p-6">
        <h3 className="font-semibold text-amber-900">Configurare necesară</h3>
        <ul className="mt-3 flex flex-col gap-2 text-sm text-amber-800">
          <li>1. Creează un proiect Supabase și rulează <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">supabase/schema.sql</code></li>
          <li>2. Adaugă variabilele de mediu: <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">NEXT_PUBLIC_SUPABASE_URL</code>, <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">NEXT_PUBLIC_SUPABASE_ANON_KEY</code>, <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">SUPABASE_SERVICE_ROLE_KEY</code></li>
          <li>3. Creează un bucket Storage &ldquo;member-photos&rdquo; (public) în Supabase</li>
          <li>4. Creează un utilizator admin în Supabase Authentication</li>
          <li>5. Adaugă <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">FORTE_NETOPIA_API_KEY</code> și <code className="rounded bg-amber-100 px-1 py-0.5 font-mono">FORTE_NETOPIA_SIGNATURE</code> pentru plăți Forte</li>
        </ul>
      </div>
    </div>
  );
}
