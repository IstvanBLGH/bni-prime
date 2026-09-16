import { AdminPageShell } from "../../_components/AdminPageShell";

export default function ForteFaqPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Forte"
      title="Întrebări frecvente (FAQ)"
      description="Întrebări și răspunsuri pentru pagina Ziua Invitatului."
      table="faq_items"
      eventSlug="forte"
      orderBy="sort_order"
      sortable
      columns={[
        { key: "question", label: "Întrebare", placeholder: "Trebuie să fiu membru BNI?", required: true, span: "full" },
        { key: "answer", label: "Răspuns", type: "textarea", placeholder: "Răspunsul detaliat...", required: true, span: "full" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
