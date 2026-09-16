import { AdminPageShell } from "../../_components/AdminPageShell";

export default function ForteAgendaPage() {
  return (
    <AdminPageShell
      breadcrumb="BNI Forte"
      title="Agendă — Ziua Invitatului"
      description="Programul evenimentului Ziua Invitatului BNI Forte."
      table="agenda_items"
      eventSlug="forte"
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
