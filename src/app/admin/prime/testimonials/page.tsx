import { AdminPageShell } from "../../_components/AdminPageShell";

export default function PrimeTestimonialsPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Prime"
      title="Testimoniale"
      description="Gestionează testimonialele membrilor BNI Prime."
      table="testimonials"
      eventSlug="prime"
      orderBy="sort_order"
      sortable
      columns={[
        { key: "name", label: "Nume", placeholder: "Alexandru Antal", required: true },
        { key: "quote", label: "Citat", type: "textarea", placeholder: "Pentru mine BNI înseamnă...", required: true, span: "full" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
