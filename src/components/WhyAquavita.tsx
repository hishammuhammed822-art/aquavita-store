import { Reveal } from '@/components/Reveal';
import { IMAGES } from '@/data/images';

const STATS = [
  { value: '100%', label: 'Natural' },
  { value: 'High', label: 'Protein' },
  { value: 'Healthy', label: 'Growth' },
  { value: 'Premium', label: 'Nutrition' },
];

export function WhyAquavita() {
  return (
    <section id="why" className="relative overflow-hidden border-t border-gold/10 bg-navy-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Image */}
          <Reveal>
            <div className="relative">
              <div className="pointer-events-none absolute -left-3 -top-3 h-16 w-16 border-l-2 border-t-2 border-gold/40" />
              <div className="pointer-events-none absolute -bottom-3 -right-3 h-16 w-16 border-b-2 border-r-2 border-gold/40" />
              <div className="relative overflow-hidden rounded-sm">
                <img
                  src={IMAGES.whyAquavitaAquarium}
                  alt="Freshwater aquarium with lush green plants and angel fish"
                  className="h-[500px] w-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>

              {/* Floating stats card */}
              <div className="absolute -bottom-6 left-6 grid grid-cols-2 gap-px border border-gold/20 bg-navy-900 sm:left-8">
                {STATS.map((stat) => (
                  <div key={stat.label} className="bg-navy-800/90 px-6 py-4 backdrop-blur-md">
                    <span className="block font-display text-xl font-bold text-gradient-gold">{stat.value}</span>
                    <span className="text-[10px] uppercase tracking-wider text-muted">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <Reveal delay={2}>
            <div className="max-w-lg">
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                  Our Story
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
                WHY <span className="text-gradient-aqua">AQUAVITA?</span>
              </h2>
              <div className="my-6 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              <p className="text-base leading-relaxed text-muted lg:text-lg">
                AQUAVITA is created for aquarium enthusiasts who want to give their fish
                high-quality, natural nutrition. Our focus is simple — quality ingredients,
                excellent nutrition and healthier, more vibrant aquarium fish.
              </p>

              <div className="mt-8 space-y-4">
                {[
                  'Quality ingredients sourced from nature',
                  'Scientifically formulated for aquarium fish',
                  'Trusted by aquarium hobbyists and shops',
                ].map((point) => (
                  <div key={point} className="flex items-center gap-3">
                    <div className="h-2 w-2 rotate-45 border border-gold" />
                    <span className="text-sm text-offwhite">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
