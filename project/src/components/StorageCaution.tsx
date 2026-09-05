import { Archive, AlertTriangle } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

export function StorageCaution() {
  return (
    <section className="relative border-t border-gold/10 bg-navy-800 py-20 lg:py-24">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {/* Storage */}
          <Reveal>
            <div className="group relative h-full overflow-hidden rounded-sm border border-gold/20 bg-navy-900/60 p-8 transition-all duration-500 hover:border-gold/35">
              <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold/40" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold/40" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(217,163,33,0.15)]">
                <Archive className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-gold">Storage</h3>
              <p className="text-base leading-relaxed text-offwhite">
                Keep in a cool, dry place. Reseal after use.
              </p>
            </div>
          </Reveal>

          {/* Caution */}
          <Reveal delay={2}>
            <div className="group relative h-full overflow-hidden rounded-sm border border-red-500/20 bg-navy-900/60 p-8 transition-all duration-500 hover:border-red-500/35">
              <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-red-500/40" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-red-500/40" />

              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/25 transition-all duration-500 group-hover:border-red-500 group-hover:shadow-[0_0_25px_rgba(239,68,68,0.15)]">
                <AlertTriangle className="h-6 w-6 text-red-400" strokeWidth={1.5} />
              </div>

              <h3 className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-red-400">Caution</h3>
              <p className="text-base leading-relaxed text-offwhite">
                Not for human consumption. For aquarium fish only.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
