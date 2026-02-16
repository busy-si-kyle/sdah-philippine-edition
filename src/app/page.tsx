import { SearchInterface } from "@/components/SearchInterface";
import { AboutModal } from "@/components/AboutModal";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "SDA Hymnal Philippine Edition",
    "url": "https://sdah-philippine-edition.vercel.app",
    "description": "A digital collection of the Seventh-day Adventist Hymnal (Philippine Edition) featuring lyrics and sheet music.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://sdah-philippine-edition.vercel.app/?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center p-8 sm:p-24 bg-zinc-50 dark:bg-zinc-950 overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="flex w-full max-w-2xl flex-col items-center gap-12">
        <header className="w-full flex justify-between items-start">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-zinc-900 dark:text-zinc-50">
              SDA Hymnal
            </h1>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              Philippine Edition
            </p>
          </div>
          <AboutModal />
        </header>

        <section className="w-full">
          <SearchInterface />
        </section>

        <section className="w-full mt-12 py-12 border-t border-zinc-200 dark:border-zinc-800">
          <div className="prose prose-zinc dark:prose-invert max-w-none">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50 mb-6">About this Project</h2>
            <div className="space-y-4 text-zinc-600 dark:text-zinc-400 leading-relaxed">
              <p>
                Welcome to the digital home of the <strong>SDA Hymnal Philippine Edition</strong>. This platform is designed to facilitate worship and musical preparation by providing easy access to hymns for personal devotions, small groups, and church services.
              </p>
              <p>
                Our collection includes a comprehensive list of hymns used in Seventh-day Adventist churches across the Philippines, featuring both <strong>lyrics</strong> and <strong>sheet music</strong>. Whether you are a pianist, a choir member, or simply wish to sing along, this resource is here to support your musical journey.
              </p>
              <p>
                Key features:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Searchable database by hymn number, title, or lyrics.</li>
                <li>Offline access: Download the entire hymnal to use even without an internet connection.</li>
                <li>Mobile-friendly design for easy viewing on any device.</li>
                <li>Digital sheet music for musical accompaniment.</li>
              </ul>
              <p className="pt-4 italic text-sm">
                "Sing to the Lord a new song; sing to the Lord, all the earth." – Psalm 96:1
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="mt-24 py-8 text-center text-zinc-500 text-sm">
        <p>© {new Date().getFullYear()} SDA Hymnal Philippine Edition</p>
      </footer>
    </div>
  );
}


