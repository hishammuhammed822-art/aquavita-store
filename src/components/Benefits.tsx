import { Leaf, Dumbbell, TrendingUp, Shield } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const BENEFITS = [
  {
    icon: Leaf,
    title: '100% NATURAL',
    description: 'Naturally sourced ingredients for quality aquarium nutrition.',
  },
  {
    icon: Dumbbell,
    title: 'HIGH PROTEIN',
    description: 'Protein-rich nutrition to support healthy fish development.',
  },
  {
    icon: TrendingUp,
    title: 'HEALTHY GROWTH',
    description: 'Supports healthy growth and overall vitality.',
  },
  {
    icon: Shield,
    title: 'BOOSTS IMMUNITY',
    description: 'Nutritional support for active and healthy aquarium fish.',
  },
];

export function Benefits() {
  return (
    <section className="relative border-t border-gold/10 bg-navy-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Why Choose Us
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            Premium Nutrition, <span className="text-gradient-gold">Naturally Delivered</span>
          </h2>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {BENEFITS.map((benefit, i) => (
            <Reveal key={benefit.title} delay={(i + 1) as 1 | 2 | 3 | 4}>
              <div className="group relative h-full overflow-hidden rounded-sm border border-gold/15 bg-navy-800/40 p-8 transition-all duration-500 hover:border-gold/35 hover:bg-navy-800/70">
                <div className="pointer-events-none absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/30 transition-all duration-500 group-hover:h-12 group-hover:w-12" />

                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full border border-gold/25 transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(217,163,33,0.2)]">
                  <benefit.icon className="h-6 w-6 text-gold-light" strokeWidth={1.5} />
                </div>

                <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-offwhite">
                  {benefit.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{benefit.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
