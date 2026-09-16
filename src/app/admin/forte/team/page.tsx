import { AdminPageShell } from "../../_components/AdminPageShell";

export default function ForteTeamPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Forte"
      title="Power Team"
      description="Membrii Power Team-ului care apar în secțiunea Echipa pe pagina Ziua Invitatului."
      table="team_members"
      eventSlug="forte"
      orderBy="sort_order"
      sortable
      hasPhotoUpload
      photoKey="photo_url"
      columns={[
        { key: "name", label: "Nume complet", placeholder: "Ion Popescu", required: true },
        { key: "role", label: "Serviciu / Produs", placeholder: "Servicii juridice" },
        { key: "company", label: "Societate", placeholder: "FIRMA SRL" },
        { key: "website", label: "Website", type: "url", placeholder: "https://exemplu.ro" },
        { key: "phone", label: "Telefon", type: "tel", placeholder: "+40 7XX XXX XXX" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "0" },
      ]}
    />
  );
}
