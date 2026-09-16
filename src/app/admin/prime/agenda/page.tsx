import { AdminPageShell } from "../../_components/AdminPageShell";

export default function PrimeAgendaPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Prime"
      title="Agendă eveniment"
      description="Programul evenimentului Prime Summer. Editează, adaugă sau șterge puncte de pe agendă."
      table="agenda_items"
      eventSlug="prime"
      orderBy="sort_order"
      sortable
      columns={[
        { key: "time_range", label: "Interval orar", placeholder: "17:00 - 17:45", required: true },
        { key: "title", label: "Titlu", placeholder: "Primirea participanților", required: true },
        { key: "description", label: "Descriere", type: "textarea", placeholder: "Detalii...", span: "full" },
        { key: "sort_order", label: "Ordine", type: "number", placeholder: "1" },
      ]}
    />
  );
}
