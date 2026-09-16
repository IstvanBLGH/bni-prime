import type { ReactNode } from "react";
import { AdminSidebar } from "./_components/AdminSidebar";

export const metadata = {
  title: "Admin — BNI Events",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-surface">
      <AdminSidebar />
      <main className="flex flex-1 flex-col overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
