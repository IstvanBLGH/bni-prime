import { AdminPageShell } from "../../_components/AdminPageShell";

export default function PrimeFaqPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Prime"
      title="Întrebări frecvente (FAQ)"
      description="Adaugă, editează sau șterge întrebările din secțiunea FAQ."
      table="faq_items"
      eventSlug="prime"
      orderBy="sort_order"
      sortable
      columns={[
        { key: "question", label: "Întrebare", placeholder: "Cum mă înscriu?", required: true, span: "full" },
        { key: "answer", label: "Răspuns", type: "textarea", placeholder: "Răspunsul detaliat...", required: true, span: "full" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
