import { AdminPageShell } from "../../_components/AdminPageShell";

export default function ForteTestimonialsPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Forte"
      title="Testimoniale"
      description="Testimoniale ale membrilor BNI Forte afișate pe pagina Ziua Invitatului."
      table="testimonials"
      eventSlug="forte"
      orderBy="sort_order"
      sortable
      columns={[
        { key: "name", label: "Nume", placeholder: "Ion Popescu", required: true },
        { key: "quote", label: "Citat", type: "textarea", placeholder: "BNI pentru mine înseamnă...", required: true, span: "full" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
