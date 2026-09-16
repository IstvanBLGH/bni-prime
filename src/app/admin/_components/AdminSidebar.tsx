"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  LayoutDashboard, Users, CalendarDays, Ticket, HelpCircle, MessageSquare,
  LogOut, ChevronDown, ChevronRight, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const PRIME_ITEMS = [
  { href: "/admin/prime/team", label: "Echipă (Leadership)", icon: Users },
  { href: "/admin/prime/agenda", label: "Agendă", icon: CalendarDays },
  { href: "/admin/prime/tickets", label: "Bilete & Prețuri", icon: Ticket },
  { href: "/admin/prime/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/prime/testimonials", label: "Testimoniale", icon: MessageSquare },
];

const FORTE_ITEMS = [
  { href: "/admin/forte/team", label: "Power Team", icon: Users },
  { href: "/admin/forte/agenda", label: "Agendă", icon: CalendarDays },
  { href: "/admin/forte/tickets", label: "Bilet & Preț", icon: Ticket },
  { href: "/admin/forte/faq", label: "FAQ", icon: HelpCircle },
  { href: "/admin/forte/testimonials", label: "Testimoniale", icon: MessageSquare },
  { href: "/admin/forte/location", label: "Locație", icon: MapPin },
];

function NavSection({ title, items, defaultOpen = true }: {
  title: string;
  items: { href: string; label: string; icon: React.ElementType }[];
  defaultOpen?: boolean;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-widest text-muted hover:text-foreground"
      >
        {title}
        {open ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronRight className="h-3.5 w-3.5" />}
      </button>
      {open && (
        <ul className="mt-1 flex flex-col gap-0.5">
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    active
                      ? "bg-primary text-white"
                      : "text-muted hover:bg-surface hover:text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-border bg-background">
      {/* Logo */}
      <div className="flex h-16 items-center border-b border-border px-4">
        <span className="text-sm font-bold text-foreground">BNI Admin</span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-4 overflow-y-auto p-4">
        <a
          href="/admin"
          className={cn(
            "flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
            pathname === "/admin"
              ? "bg-primary text-white"
              : "text-muted hover:bg-surface hover:text-foreground"
          )}
        >
          <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
          Dashboard
        </a>

        <NavSection title="BNI Prime" items={PRIME_ITEMS} />
        <NavSection title="BNI Forte" items={FORTE_ITEMS} />
      </nav>

      {/* Logout */}
      <div className="border-t border-border p-4">
        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-muted transition-colors hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Deconectare
        </button>
      </div>
    </aside>
  );
}
