import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Termeni și Condiții | BNI Prime",
  description: "Termeni și condiții, politica GDPR, politica de livrare și politica de anulare pentru evenimentul BNI Prime Summer.",
  robots: { index: false, follow: false },
};

function Section({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-8">
      <h2 className="mb-4 text-xl font-bold tracking-tight text-foreground">{title}</h2>
      <div className="flex flex-col gap-5 text-sm leading-relaxed text-muted">{children}</div>
    </section>
  );
}

function Sub({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2 text-base font-semibold text-foreground">{title}</h3>
      {children}
    </div>
  );
}

function Ul({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, i) => <li key={i}>{item}</li>)}
    </ul>
  );
}

const NAV = [
  { href: "#termeni", label: "Termeni și Condiții" },
  { href: "#gdpr", label: "Politica GDPR" },
  { href: "#livrare", label: "Politica de Livrare" },
  { href: "#anulare", label: "Politica de Anulare" },
];

export default function TermeniSiConditii() {
  return (
    <main className="min-h-screen bg-background py-20 md:py-28">
      <div className="mx-auto max-w-3xl px-6">
        <Link href="/" className="mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-primary">
          ← Înapoi la site
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
          Termeni, Condiții și Politici
        </h1>
        <p className="mt-3 text-sm text-muted">BIG DESIGN TM S.R.L. · CUI 39578361 · bilete eveniment BNI PRIME SUMMER</p>

        {/* Navigare rapidă */}
        <nav className="mt-8 flex flex-wrap gap-2">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted transition-colors hover:border-primary hover:text-primary">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="mt-12 flex flex-col gap-14">

          {/* TERMENI ȘI CONDIȚII */}
          <Section id="termeni" title="Termeni și Condiții">
            <Sub title="1. Date de identificare ale operatorului">
              <p>Site-ul <strong>https://www.bniprime.ro</strong> este deținut și operat de:</p>
              <Ul items={[
                <><strong>Denumire:</strong> BIG DESIGN TM S.R.L.</>,
                <><strong>CUI:</strong> 39578361</>,
                <><strong>Nr. Reg. Comerțului:</strong> J6/1483/2018</>,
                <><strong>EUID:</strong> ROONRC.J6/1483/2018</>,
                <><strong>Sediu social:</strong> str. Grănicerilor, nr. 3, mun. Bistrița, jud. Bistrița-Năsăud, România.</>,
                <><strong>Email:</strong> <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">bigdesigntm@gmail.com</a></>,
                <><strong>Telefon:</strong> <a href="tel:+40770987977" className="text-primary hover:underline">+40 770 987 977</a></>,
              ]} />
            </Sub>
            <Sub title="2. Obiectul contractului">
              <p>Prin intermediul acestui site, BIG DESIGN TM S.R.L. (denumită în continuare &bdquo;Organizatorul&rdquo;) comercializează bilete de acces la evenimentul <strong>BNI PRIME SUMMER</strong>, care va avea loc în data de <strong>29 iulie 2026</strong>, în Bistrița.</p>
              <p>Biletul reprezintă un serviciu de acces la un eveniment cu dată fixă. Prin completarea formularului de înscriere și efectuarea plății, utilizatorul (denumit în continuare &bdquo;Participantul&rdquo;) acceptă în întregime prezenții Termeni și Condiții.</p>
            </Sub>
            <Sub title="3. Prețuri și modalități de plată">
              <Ul items={[
                "Prețurile afișate pe site sunt exprimate în lei (RON) și includ toate taxele aplicabile.",
                "Prețul biletului standard este de 175 lei / persoană.",
                "Prețul biletului plus este de 500 lei / persoană.",
                "Plata se efectuează online cu cardul, prin procesatorul autorizat NETOPIA Payments, în condiții de deplină siguranță. Organizatorul nu stochează datele cardului.",
              ]} />
            </Sub>
            <Sub title="4. Procesul de înscriere și confirmare">
              <Ul items={[
                "Participantul completează formularul de pe pagina principală cu datele solicitate.",
                "Este redirecționat către pagina securizată a procesatorului de plăți pentru achitarea contravalorii biletului.",
                "După confirmarea plății, Participantul primește pe email confirmarea rezervării și factura fiscală.",
              ]} />
            </Sub>
            <Sub title="5. Politica de retragere și anulare">
              <p>Conform art. 16 lit. l) din OUG nr. 34/2014, dreptul de retragere nu se aplică în cazul contractelor de prestări servicii legate de activități de petrecere a timpului liber, dacă contractul prevede o dată sau o perioadă de executare specifică.</p>
              <p>Pentru detalii complete privind anularea, consultați <a href="#anulare" className="text-primary hover:underline">Politica de anulare comandă</a>.</p>
            </Sub>
            <Sub title="6. Obligațiile Participantului">
              <Ul items={[
                "Să furnizeze date reale, complete și actualizate.",
                "Să respecte regulile de comportament în cadrul evenimentului.",
                "Să nu utilizeze site-ul în scopuri ilegale sau frauduloase.",
              ]} />
            </Sub>
            <Sub title="7. Limitarea răspunderii">
              <p>Organizatorul își rezervă dreptul de a modifica programul evenimentului, locația sau alte detalii din motive obiective, anunțând Participanții cu cel puțin 48 de ore înainte, prin email.</p>
              <p>Organizatorul nu răspunde pentru obiectele personale pierdute sau deteriorate în cadrul evenimentului.</p>
            </Sub>
            <Sub title="8. Proprietate intelectuală">
              <p>Conținutul site-ului (texte, imagini, logo-uri, grafică) este proprietatea BIG DESIGN TM S.R.L. sau a partenerilor săi și este protejat de legislația în vigoare. Reproducerea, distribuirea sau utilizarea fără acord scris sunt interzise.</p>
            </Sub>
            <Sub title="9. Soluționarea litigiilor">
              <p>Eventualele litigii se rezolvă pe cale amiabilă. În caz contrar, sunt de competența instanțelor române. Consumatorii pot apela la:</p>
              <Ul items={[
                <><a href="https://anpc.ro/ce-este-sal" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Platforma SAL a ANPC</a></>,
                <><a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">Platforma SOL a UE</a></>,
              ]} />
            </Sub>
            <Sub title="10. Modificări ale Termenilor">
              <p>Organizatorul își rezervă dreptul de a modifica prezenții Termeni și Condiții. Versiunea actualizată va fi publicată pe această pagină.</p>
            </Sub>
          </Section>

          <hr className="border-border" />

          {/* POLITICA GDPR */}
          <Section id="gdpr" title="Politica GDPR">
            <p>Această politică detaliază modul în care BIG DESIGN TM S.R.L. respectă Regulamentul (UE) 2016/679 privind protecția persoanelor fizice în ceea ce privește prelucrarea datelor cu caracter personal (GDPR).</p>
            <Sub title="1. Principiile prelucrării">
              <Ul items={[
                <><strong>Legalitate, echitate și transparență</strong> — îți spunem clar ce facem cu datele.</>,
                <><strong>Limitarea scopului</strong> — folosim datele doar în scopurile declarate.</>,
                <><strong>Reducerea la minimum a datelor</strong> — colectăm doar ce e necesar.</>,
                <><strong>Exactitate</strong> — actualizăm datele la cererea ta.</>,
                <><strong>Limitarea stocării</strong> — păstrăm datele doar atât cât este necesar.</>,
                <><strong>Integritate și confidențialitate</strong> — protejăm datele prin măsuri tehnice și organizatorice.</>,
                <><strong>Responsabilitate</strong> — putem demonstra respectarea acestor principii.</>,
              ]} />
            </Sub>
            <Sub title="2. Măsuri tehnice de securitate">
              <Ul items={[
                "Certificat SSL/TLS pentru toate transmisiile de date.",
                "Criptarea datelor sensibile la repaus (database encryption at rest).",
                "Acces restricționat la baza de date pe bază de roluri (Row Level Security).",
                "Backup-uri periodice și automate.",
                "Monitorizare pentru detecția intruziunilor.",
                "Procesarea plăților exclusiv prin NETOPIA Payments, certificată PCI-DSS.",
              ]} />
            </Sub>
            <Sub title="3. Măsuri organizatorice">
              <Ul items={[
                "Acces la date doar pentru persoanele autorizate, în baza necesității cunoașterii.",
                "Contracte de confidențialitate cu colaboratorii care prelucrează date.",
                "Acorduri de prelucrare a datelor (DPA) cu toți subprocesatorii.",
              ]} />
            </Sub>
            <Sub title="4. Notificarea breșelor de securitate">
              <p>În cazul puțin probabil al unei breșe de securitate care afectează datele tale, vom notifica:</p>
              <Ul items={[
                "ANSPDCP în termen de 72 de ore.",
                "Persoanele afectate, când breșa este susceptibilă să genereze un risc ridicat pentru drepturile și libertățile lor.",
              ]} />
            </Sub>
            <Sub title="5. Transferul datelor în afara UE">
              <p>Datele sunt prelucrate, de regulă, pe teritoriul Uniunii Europene. În cazuri excepționale (ex. furnizori de servicii cloud), transferurile se fac doar către țări cu nivel adecvat de protecție sau pe baza Clauzelor Contractuale Standard aprobate de Comisia Europeană.</p>
            </Sub>
            <Sub title="6. Responsabilul cu protecția datelor">
              <p>Pentru orice solicitare legată de protecția datelor, ne poți contacta la: <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">bigdesigntm@gmail.com</a>.</p>
              <p>Detalii suplimentare găsești în <Link href="/politica-de-confidentialitate" className="text-primary hover:underline">Politica de Confidențialitate</Link>.</p>
            </Sub>
          </Section>

          <hr className="border-border" />

          {/* POLITICA DE LIVRARE */}
          <Section id="livrare" title="Politica de Livrare a Comenzii">
            <Sub title="1. Tipul produsului">
              <p>BIG DESIGN TM S.R.L. comercializează exclusiv bilete electronice de acces la evenimentul BNI PRIME SUMMER. Nu se livrează produse fizice prin curier sau poștă.</p>
            </Sub>
            <Sub title="2. Modalitatea de livrare">
              <p>Biletul și factura fiscală sunt transmise exclusiv electronic, prin email, la adresa indicată în formularul de înscriere.</p>
            </Sub>
            <Sub title="3. Termenul de livrare">
              <Ul items={[
                "Confirmarea înscrierii este trimisă automat imediat după confirmarea plății de către procesatorul NETOPIA Payments (de regulă în mai puțin de 5 minute).",
                "Factura fiscală este transmisă în maximum 48 de ore lucrătoare de la confirmarea plății.",
                "Detaliile finale despre eveniment (locație exactă, program, dress code) sunt comunicate prin email cu cel puțin 3 zile înainte de eveniment.",
              ]} />
            </Sub>
            <Sub title="4. Costul livrării">
              <p>Livrarea biletului electronic este gratuită. Nu se percep taxe suplimentare.</p>
            </Sub>
            <Sub title="5. Ce faci dacă nu primești emailul">
              <Ul items={[
                "Verifică folderul Spam / Junk / Promoții al căsuței tale de email.",
                "Verifică dacă adresa de email a fost introdusă corect.",
                <>Dacă tot nu găsești emailul, contactează-ne la <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">bigdesigntm@gmail.com</a> sau la <a href="tel:+40770987977" className="text-primary hover:underline">+40 770 987 977</a> și îți retrimitem confirmarea.</>,
              ]} />
            </Sub>
            <Sub title="6. Accesul la eveniment">
              <p>La intrarea în locația evenimentului, vei prezenta confirmarea primită pe email (electronic sau tipărit), împreună cu un act de identitate.</p>
            </Sub>
          </Section>

          <hr className="border-border" />

          {/* POLITICA DE ANULARE */}
          <Section id="anulare" title="Politica de Anulare a Comenzii">
            <Sub title="1. Dreptul legal de retragere">
              <p>Conform art. 16 lit. l) din OUG nr. 34/2014 privind drepturile consumatorilor în cadrul contractelor încheiate cu profesioniștii, dreptul de retragere în termen de 14 zile nu se aplică contractelor de prestări servicii legate de activități de petrecere a timpului liber, dacă contractul prevede o dată sau o perioadă de executare specifică.</p>
              <p>Întrucât biletul la PRIME SUMMER este un serviciu cu dată fixă (29 iulie 2026), achiziția este, în principiu, definitivă.</p>
            </Sub>
            <Sub title="2. Politica comercială de anulare">
              <Ul items={[
                "Anulare cu mai mult de 14 zile înainte de eveniment: rambursare 100% din suma achitată.",
                "Anulare între 7 și 14 zile înainte de eveniment: rambursare 50% din suma achitată.",
                "Anulare cu mai puțin de 7 zile înainte de eveniment: nu se acordă rambursare.",
                <>Transferul biletului către o altă persoană este permis oricând, fără costuri suplimentare, dacă ne anunți în prealabil cu noile date la <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">bigdesigntm@gmail.com</a>.</>,
              ]} />
            </Sub>
            <Sub title="3. Anularea evenimentului de către Organizator">
              <p>În cazul în care evenimentul este anulat din motive ce țin de Organizator, Participanții vor primi rambursarea integrală a sumei achitate, în termen de maximum 14 zile de la data anunțului de anulare.</p>
              <p>În cazul reprogramării evenimentului, Participanții pot opta între păstrarea biletului pentru noua dată sau rambursarea integrală.</p>
            </Sub>
            <Sub title="4. Cum soliciți anularea">
              <p>Trimite o solicitare scrisă pe email la <a href="mailto:bigdesigntm@gmail.com" className="text-primary hover:underline">bigdesigntm@gmail.com</a>, care să conțină:</p>
              <Ul items={[
                "Numele și prenumele.",
                "Adresa de email folosită la înscriere.",
                "Numărul facturii sau al confirmării de înscriere.",
                "IBAN-ul pentru rambursare (titular și bancă).",
              ]} />
            </Sub>
            <Sub title="5. Termenul de rambursare">
              <p>Sumele se rambursează prin transfer bancar în contul indicat, în termen de maximum 14 zile lucrătoare de la confirmarea anulării.</p>
            </Sub>
            <Sub title="6. Forța majoră">
              <p>Niciuna dintre părți nu răspunde pentru neexecutarea obligațiilor contractuale, dacă aceasta se datorează unui caz de forță majoră (calamități naturale, restricții impuse de autorități, conflicte armate etc.), în condițiile legii.</p>
            </Sub>
          </Section>

        </div>

        <p className="mt-12 border-t border-border pt-6 text-xs text-muted">
          Ultima actualizare: iulie 2026 · BIG DESIGN TM S.R.L.
        </p>
      </div>
    </main>
  );
}
