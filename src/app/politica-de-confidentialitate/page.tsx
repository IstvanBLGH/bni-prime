import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Politica de Confidențialitate | BNI Prime",
  description: "Politica de confidențialitate BIG DESIGN TM S.R.L. — modul în care colectăm și protejăm datele tale personale.",
  robots: { index: false, follow: false },
};

const SECTIONS = [
  {
    title: "1. Operatorul de date",
    content: (
      <p>
        BIG DESIGN TM S.R.L., CUI 39578361, cu sediul în mun. Bistrița, str. Grănicerilor, nr. 3,
        jud. Bistrița-Năsăud, România.
        <br />
        Contact:{" "}
        <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">
          bigdesigntm@gmail.com
        </a>
        .
      </p>
    ),
  },
  {
    title: "2. Ce date colectăm",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Date de identificare:</strong> nume, prenume, email, telefon.</li>
        <li><strong>Date despre companie</strong> (dacă alegi să le oferi): denumire firmă, capitol BNI, funcție.</li>
        <li><strong>Date de plată:</strong> procesate exclusiv de NETOPIA Payments. Noi nu stocăm date despre cardul tău.</li>
        <li><strong>Date tehnice:</strong> adresă IP, tip de browser, paginile vizitate (prin cookies — vezi mai jos).</li>
      </ul>
    ),
  },
  {
    title: "3. În ce scop folosim datele",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li>Procesarea înscrierii.</li>
        <li>Emiterea facturii fiscale (obligație legală).</li>
        <li>Comunicarea informațiilor despre eveniment (program, locație, modificări).</li>
        <li>Răspunsul la întrebări și solicitări de suport.</li>
        <li>Îmbunătățirea funcționării site-ului.</li>
      </ul>
    ),
  },
  {
    title: "4. Temeiul legal",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Executarea contractului</strong> (art. 6(1)(b) GDPR) — pentru procesarea biletului.</li>
        <li><strong>Obligație legală</strong> (art. 6(1)(c) GDPR) — pentru facturare și contabilitate.</li>
        <li><strong>Interes legitim</strong> (art. 6(1)(f) GDPR) — pentru securitatea site-ului.</li>
        <li><strong>Consimțământ</strong> (art. 6(1)(a) GDPR) — pentru comunicări de marketing, dacă optezi.</li>
      </ul>
    ),
  },
  {
    title: "5. Cui transmitem datele",
    content: (
      <>
        <ul className="list-disc pl-5 space-y-1">
          <li><strong>NETOPIA Payments</strong> — procesator autorizat de plăți cu cardul.</li>
          <li><strong>Furnizori de servicii IT</strong> — găzduire (Lovable / Cloudflare), bază de date (Supabase), email (provider transactional).</li>
          <li><strong>Contabilul firmei</strong> — pentru obligațiile fiscale.</li>
          <li><strong>Autorități publice</strong> — la cererea expresă a acestora, în condițiile legii.</li>
        </ul>
        <p className="mt-3">Nu vindem și nu cedăm datele tale către terți în scopuri de marketing.</p>
      </>
    ),
  },
  {
    title: "6. Cât timp păstrăm datele",
    content: (
      <ul className="list-disc pl-5 space-y-1">
        <li><strong>Date de înscriere:</strong> 3 ani de la data evenimentului.</li>
        <li><strong>Documente contabile (facturi):</strong> 10 ani, conform legislației fiscale.</li>
        <li><strong>Date din comunicări de marketing:</strong> până la retragerea consimțământului.</li>
      </ul>
    ),
  },
  {
    title: "7. Drepturile tale",
    content: (
      <>
        <p className="mb-3">În calitate de persoană vizată, ai următoarele drepturi:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>Dreptul de acces la date.</li>
          <li>Dreptul de rectificare.</li>
          <li>Dreptul la ștergere (&bdquo;dreptul de a fi uitat&rdquo;).</li>
          <li>Dreptul la restricționarea prelucrării.</li>
          <li>Dreptul la portabilitatea datelor.</li>
          <li>Dreptul de opoziție.</li>
          <li>Dreptul de a-ți retrage consimțământul oricând.</li>
          <li>
            Dreptul de a depune o plângere la{" "}
            <a href="https://www.dataprotection.ro" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              ANSPDCP (dataprotection.ro)
            </a>.
          </li>
        </ul>
        <p className="mt-3">
          Pentru exercitarea acestor drepturi, ne poți contacta la{" "}
          <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">
            bigdesigntm@gmail.com
          </a>.
        </p>
      </>
    ),
  },
  {
    title: "8. Cookies",
    content: (
      <p>
        Site-ul folosește cookies strict necesare pentru funcționarea formularului și a procesului
        de plată. Nu folosim cookies de marketing fără consimțământul tău explicit.
      </p>
    ),
  },
  {
    title: "9. Securitate",
    content: (
      <p>
        Folosim conexiune securizată HTTPS (SSL), iar bazele de date sunt găzduite pe
        infrastructură cu măsuri tehnice și organizatorice adecvate (firewall, criptare la repaus,
        control acces).
      </p>
    ),
  },
];

export default function PoliticaDeConfidentialitate() {
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary"
        >
          ← Înapoi la site
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Politica de Confidențialitate
        </h1>
        <p className="mt-3 text-sm text-muted">
          BIG DESIGN TM S.R.L. respectă confidențialitatea datelor tale și se angajează să le
          protejeze conform Regulamentului (UE) 2016/679 (GDPR) și legislației române aplicabile.
        </p>

        <div className="mt-10 flex flex-col gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-lg font-semibold text-foreground">{section.title}</h2>
              <div className="text-sm leading-relaxed text-muted">{section.content}</div>
            </section>
          ))}
        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted">
          Ultima actualizare: iulie 2026 · BIG DESIGN TM S.R.L.
        </p>
      </div>
    </main>
  );
}
