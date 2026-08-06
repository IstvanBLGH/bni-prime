import { ExternalLink } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center bg-black px-6 text-center">
      <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl">
        Evenimente noi în curând...
      </h1>

      <a
        href="https://bni-romania.com/ro-RO/index"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-10 inline-flex items-center gap-3 rounded-2xl bg-primary px-8 py-5 text-base font-bold text-white shadow-lg transition-opacity duration-300 hover:opacity-90 sm:px-10 sm:py-6 sm:text-lg md:text-xl"
      >
        Vezi pagina oficială BNI România pentru mai multe detalii
        <ExternalLink className="h-5 w-5 shrink-0" aria-hidden="true" />
      </a>
    </main>
  );
}
