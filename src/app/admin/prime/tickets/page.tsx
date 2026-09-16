import { AdminPageShell } from "../../_components/AdminPageShell";

export default function PrimeTicketsPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Prime"
      title="Bilete & Prețuri"
      description={'Gestionează tipurile de bilete și prețurile. Features-urile se editează ca JSON array: ["Feature 1", "Feature 2"].'}
      table="tickets"
      eventSlug="prime"
      orderBy="sort_order"
      columns={[
        { key: "name", label: "Tip bilet", placeholder: "Standard", required: true },
        { key: "price", label: "Preț (RON)", type: "number", placeholder: "175", required: true },
        { key: "description", label: "Descriere scurtă", placeholder: "Acces complet la eveniment." },
        { key: "label", label: "Label bilete (ex: 1 bilet)", placeholder: "1 bilet" },
        { key: "max_quantity", label: "Cantitate maximă (lăsați gol = nelimitat)", type: "number", placeholder: "" },
        { key: "is_available", label: "Disponibil pentru vânzare", type: "checkbox", placeholder: "Activ" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
