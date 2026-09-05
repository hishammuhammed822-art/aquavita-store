import { Fish, Sparkles, Sprout, Heart, Activity } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const DETAILS = [
  { icon: Fish, title: 'Natural Protein', desc: 'Rich source of natural protein for fish development.' },
  { icon: Sparkles, title: 'Essential Nutrients', desc: 'Packed with nutrients fish need to thrive.' },
  { icon: Sprout, title: 'Supports Growth', desc: 'Promotes steady and healthy growth in aquarium fish.' },
  { icon: Heart, title: 'Supports Vitality', desc: 'Enhances energy levels and overall fish vitality.' },
  { icon: Activity, title: 'Helps Maintain Fish Health', desc: 'Contributes to the long-term health of your fish.' },
];

export function WhatsInside() {
  return (
    <section id="about" className="relative border-t border-gold/10 bg-navy-800 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Product Details
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            WHAT'S <span className="text-gradient-gold">INSIDE</span>
          </h2>
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Ingredient highlight */}
          <Reveal>
            <div className="relative h-full overflow-hidden rounded-sm border border-gold/25 bg-navy-900 p-10">
              <div className="pointer-events-none absolute left-0 top-0 h-12 w-12 border-l-2 border-t-2 border-gold/50" />
              <div className="pointer-events-none absolute bottom-0 right-0 h-12 w-12 border-b-2 border-r-2 border-gold/50" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-aqua-light">
                Primary Ingredient
              </span>
              <h3 className="mt-3 font-display text-4xl font-bold text-gradient-gold">
                100% Dried Prawns
              </h3>
              <div className="my-6 h-px w-full bg-gradient-to-r from-gold/50 via-gold/20 to-transparent" />
              <p className="text-sm leading-relaxed text-muted">
                AQUAVITA Premium Prawn Bites contain only one ingredient — 100% natural
                dried prawns. No fillers, no additives, no artificial preservatives.
                Just pure, natural nutrition for your aquarium fish.
              </p>

              <div className="mt-8 rounded-sm border border-gold/20 bg-navy-800/60 p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-gold">Ingredients</span>
                <p className="mt-2 text-lg font-semibold text-offwhite">100% Dried Prawns</p>
              </div>
            </div>
          </Reveal>

          {/* Info cards */}
          <Reveal delay={2}>
            <div className="grid gap-4">
              {DETAILS.map((detail, i) => (
                <div
                  key={detail.title}
                  className="group flex items-center gap-5 rounded-sm border border-gold/15 bg-navy-900/50 p-5 transition-all duration-300 hover:border-gold/30 hover:bg-navy-900/80"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border border-gold/25 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(217,163,33,0.15)]">
                    <detail.icon className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-offwhite">{detail.title}</h4>
                    <p className="mt-1 text-sm text-muted">{detail.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
