import { AdminPageShell } from "../../_components/AdminPageShell";

export default function PrimeTeamPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Prime"
      title="Echipă Leadership"
      description="Membrii grupului BNI Prime care apar în secțiunea Leadership."
      table="team_members"
      eventSlug="prime"
      orderBy="sort_order"
      sortable
      hasPhotoUpload
      photoKey="photo_url"
      columns={[
        { key: "name", label: "Nume complet", placeholder: "Ion Popescu", required: true },
        { key: "role", label: "Domeniu / Rol", placeholder: "Servicii imobiliare" },
        { key: "company", label: "Companie", placeholder: "FIRMA SRL" },
        { key: "website", label: "Website", type: "url", placeholder: "https://exemplu.ro" },
        { key: "phone", label: "Telefon", type: "tel", placeholder: "+40 7XX XXX XXX" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "0" },
      ]}
    />
  );
}
