import { ChevronRight } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { IMAGES } from '@/data/images';

export function CTASection() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative overflow-hidden border-t border-gold/10 bg-navy-900 py-28 lg:py-36">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.ctaUnderwater}
          alt="Underwater with sunlight rays"
          className="h-full w-full object-cover opacity-25"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-900 via-navy-900/70 to-navy-900" />
      </div>

      {/* Aqua glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua/10 blur-[120px]" />

      {/* Gold decorative lines */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-gold/20 to-transparent" />

      <div className="relative z-10 mx-auto max-w-3xl px-5 text-center lg:px-8">
        <Reveal>
          <div className="mx-auto mb-6 flex w-fit items-center gap-3">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Start Feeding Better
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-gold" />
          </div>

          <h2 className="font-display text-4xl font-bold leading-tight text-offwhite sm:text-5xl lg:text-6xl">
            HEALTHY FOOD. <br />
            <span className="text-gradient-aqua">HAPPY FISH.</span>
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted lg:text-lg">
            Give your aquarium the nutrition it deserves.
          </p>

          <button
            onClick={() => scrollTo('#categories')}
            className="group mt-10 inline-flex items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-10 py-4 text-sm font-bold uppercase tracking-wider text-white transition-all duration-300 hover:shadow-[0_0_50px_rgba(0,159,227,0.5)]"
          >
            Shop AQUAVITA
            <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}
