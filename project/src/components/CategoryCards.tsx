import { Fish, Wrench, ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { IMAGES } from '@/data/images';
import type { ProductCategory } from '@/types';

interface CategoryCardsProps {
  onSelectCategory: (category: ProductCategory) => void;
}

const CATEGORIES: {
  id: ProductCategory;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  icon: typeof Fish;
  items: string[];
}[] = [
  {
    id: 'fish-food',
    title: 'Fish Food & Nutrition',
    subtitle: 'Premium Nutrition',
    description: 'High-quality dried shrimp, pellets, flakes, and treats — formulated for healthy growth and vibrant colors.',
    image: IMAGES.categoryFishFood,
    icon: Fish,
    items: ['Dry Shrimp', 'Pellets', 'Flakes', 'Freeze-Dried Treats'],
  },
  {
    id: 'accessories',
    title: 'Aquarium Accessories',
    subtitle: 'Tank Essentials',
    description: 'Filters, lights, pumps, and maintenance tools — everything you need to keep your aquarium thriving.',
    image: IMAGES.categoryAccessories,
    icon: Wrench,
    items: ['Filters', 'LED Lights', 'Air Pumps', 'Maintenance Tools'],
  },
];

export function CategoryCards({ onSelectCategory }: CategoryCardsProps) {
  return (
    <section id="categories" className="relative border-t border-gold/10 bg-navy-900 py-20 lg:py-28">
      {/* Subtle aqua glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-aqua/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Browse Our Catalog
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            SHOP BY <span className="text-gradient-gold">CATEGORY</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted">
            From premium fish food to essential aquarium accessories — find exactly what your aquatic friends need.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-2">
          {CATEGORIES.map((cat, i) => (
            <Reveal key={cat.id} delay={(i + 1) as 1 | 2}>
              <button
                onClick={() => onSelectCategory(cat.id)}
                className="group relative h-full w-full overflow-hidden rounded-sm border border-gold/20 bg-navy-800/60 text-left transition-all duration-500 hover:border-gold/45 hover:shadow-[0_0_40px_rgba(217,163,33,0.1)]"
              >
                {/* Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/40 to-transparent" />

                  {/* Icon badge */}
                  <div className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 bg-navy-900/80 backdrop-blur-md transition-all duration-500 group-hover:border-gold group-hover:shadow-[0_0_25px_rgba(217,163,33,0.25)]">
                    <cat.icon className="h-5 w-5 text-gold-light" strokeWidth={1.5} />
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <span className="text-xs font-semibold uppercase tracking-[0.25em] text-aqua-light">
                    {cat.subtitle}
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-bold text-offwhite">
                    {cat.title}
                  </h3>
                  <div className="my-4 h-px w-16 bg-gradient-to-r from-gold to-transparent" />
                  <p className="text-sm leading-relaxed text-muted">
                    {cat.description}
                  </p>

                  {/* Item tags */}
                  <div className="mt-5 flex flex-wrap gap-2">
                    {cat.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-sm border border-gold/15 bg-navy-900/50 px-3 py-1 text-[11px] font-medium text-muted transition-colors group-hover:border-gold/25 group-hover:text-offwhite"
                      >
                        {item}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-6 flex items-center gap-2 text-sm font-bold text-gold transition-all duration-300 group-hover:gap-3">
                    Browse Products
                    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </div>
                </div>

                {/* Corner accents */}
                <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold/30 transition-all duration-500 group-hover:h-14 group-hover:w-14" />
                <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold/30 transition-all duration-500 group-hover:h-14 group-hover:w-14" />
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
