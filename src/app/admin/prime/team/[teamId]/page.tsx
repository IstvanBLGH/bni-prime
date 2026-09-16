"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { AdminPageShell } from "../../../_components/AdminPageShell";
import { ArrowLeft } from "lucide-react";

export default function PrimeTeamMembersPage() {
  const { teamId } = useParams<{ teamId: string }>();

  return (
    <div>
      <div className="px-8 pt-6">
        <Link href="/admin/prime/team" className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground">
          <ArrowLeft className="h-4 w-4" />
          Inapoi la Power Teams
        </Link>
      </div>
      <AdminPageShell
        breadcrumb="BNI Prime"
        title="Membrii Power Team"
        description="Adauga, editeaza sau sterge membrii acestui Power Team."
        table="team_members"
        eventSlug="prime"
        orderBy="sort_order"
        sortable
        hasPhotoUpload
        photoKey="photo_url"
        extraFilter={{ key: "power_team_id", value: teamId }}
        extraData={{ power_team_id: teamId }}
        columns={[
          { key: "name", label: "Nume complet", placeholder: "Ion Popescu", required: true },
          { key: "role", label: "Domeniu / Rol", placeholder: "Servicii imobiliare" },
          { key: "company", label: "Companie", placeholder: "FIRMA SRL" },
          { key: "website", label: "Website", type: "url", placeholder: "https://exemplu.ro" },
          { key: "phone", label: "Telefon", type: "tel", placeholder: "+40 7XX XXX XXX" },
          { key: "sort_order", label: "Ordine", type: "number", placeholder: "0" },
        ]}
      />
    </div>
  );
}
