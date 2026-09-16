import { AdminPageShell } from "../../_components/AdminPageShell";

export default function ForteTicketsPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Forte"
      title="Bilet & Preț"
      description="Gestionează biletul pentru Ziua Invitatului. Prețul se actualizează și pe site instantaneu."
      table="tickets"
      eventSlug="forte"
      orderBy="sort_order"
      columns={[
        { key: "name", label: "Tip bilet", placeholder: "Standard", required: true },
        { key: "price", label: "Preț (RON)", type: "number", placeholder: "175", required: true },
        { key: "description", label: "Descriere scurtă", placeholder: "Acces complet la eveniment.", span: "full" },
        { key: "is_available", label: "Disponibil pentru vânzare", type: "checkbox", placeholder: "Activ" },
        { key: "max_quantity", label: "Cantitate maximă (lăsați gol = nelimitat)", type: "number", placeholder: "" },
      ]}
    />
  );
}
