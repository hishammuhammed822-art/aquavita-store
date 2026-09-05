import { Star, Quote } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const REVIEWS = [
  {
    name: 'Rajesh Kumar',
    location: 'Mumbai, India',
    rating: 5,
    text: 'The fish absolutely love it. Great quality and the prawns are easy to feed.',
  },
  {
    name: 'Sarah Mitchell',
    location: 'London, UK',
    rating: 5,
    text: 'Excellent protein source for my aquarium fish.',
  },
  {
    name: 'David Chen',
    location: 'Singapore',
    rating: 5,
    text: 'Premium quality and great packaging. AQUAVITA has become part of my regular fish-care routine.',
  },
];

export function Reviews() {
  return (
    <section className="relative border-t border-gold/10 bg-navy-900 py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Testimonials
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            LOVED BY <span className="text-gradient-gold">AQUARIUM KEEPERS</span>
          </h2>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {REVIEWS.map((review, i) => (
            <Reveal key={review.name} delay={(i + 1) as 1 | 2 | 3}>
              <div className="group relative h-full overflow-hidden rounded-sm border border-gold/15 bg-navy-800/50 p-8 transition-all duration-500 hover:border-gold/30">
                <Quote className="absolute right-6 top-6 h-10 w-10 text-gold/10 transition-all duration-500 group-hover:text-gold/20" />

                {/* Stars */}
                <div className="mb-5 flex gap-1">
                  {[...Array(review.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-gold" fill="currentColor" />
                  ))}
                </div>

                <p className="relative mb-6 text-base leading-relaxed text-offwhite">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-3 border-t border-gold/10 pt-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-navy-900">
                    <span className="font-display text-lg font-bold text-gold">
                      {review.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-offwhite">{review.name}</p>
                    <p className="text-xs text-muted">{review.location}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
