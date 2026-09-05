import { ChevronRight, ChevronDown } from 'lucide-react';
import { IMAGES } from '@/data/images';

export function Hero() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-navy-900">
      {/* Background underwater image */}
      <div className="absolute inset-0">
        <img
          src={IMAGES.heroAquarium}
          alt="Tropical fish swimming in an aquarium"
          className="h-full w-full object-cover opacity-30"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/85 to-navy-900/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/60" />
      </div>

      {/* Bubbles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-aqua/10"
            style={{
              left: `${10 + i * 8}%`,
              bottom: `${Math.random() * 30}%`,
              width: `${4 + Math.random() * 12}px`,
              height: `${4 + Math.random() * 12}px`,
              animation: `bubble ${6 + Math.random() * 6}s ease-in ${Math.random() * 5}s infinite`,
            }}
          />
        ))}
      </div>

      {/* Gold decorative lines */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 opacity-30">
        <div className="absolute right-[15%] top-[10%] h-40 w-px bg-gradient-to-b from-gold/50 to-transparent" />
        <div className="absolute right-[5%] top-[25%] h-32 w-px bg-gradient-to-b from-gold/30 to-transparent" />
        <div className="absolute right-[20%] bottom-[15%] h-48 w-px bg-gradient-to-t from-gold/40 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pt-20 lg:px-8">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          {/* Left: text */}
          <div className="max-w-xl">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-12 bg-gradient-to-r from-gold to-transparent" />
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
                Premium Aquatic Nutrition & Supplies
              </span>
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] text-offwhite sm:text-5xl lg:text-6xl xl:text-7xl">
              EVERYTHING FOR{' '}
              <span className="text-gradient-aqua">HEALTHY,</span>{' '}
              <span className="text-gradient-gold">VIBRANT FISH</span>
            </h1>

            <p className="mt-6 text-base leading-relaxed text-muted sm:text-lg">
              Premium fish food, nutrition, and aquarium accessories — all in one place.
              Shop by category and give your aquatic friends the very best.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => scrollTo('#categories')}
                className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-8 py-4 text-sm font-bold text-white transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,159,227,0.4)]"
              >
                Shop by Category
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={() => scrollTo('#why')}
                className="group flex items-center justify-center gap-2 rounded-sm border border-gold/40 px-8 py-4 text-sm font-bold text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
              >
                Discover AQUAVITA
                <ChevronDown className="h-4 w-4 transition-transform group-hover:translate-y-1" />
              </button>
            </div>
          </div>

          {/* Right: dual image collage */}
          <div className="relative hidden lg:block">
            <div className="relative h-[500px]">
              {/* Glow ring */}
              <div className="absolute left-1/2 top-1/2 h-[440px] w-[440px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold/15" />
              <div className="absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-aqua/10" />

              {/* Top image — fish food */}
              <div className="animate-float-slow absolute left-0 top-4 h-[260px] w-[220px] overflow-hidden rounded-sm border-2 border-gold/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
                <img
                  src={IMAGES.prawnsCloseup}
                  alt="Premium dried prawns fish food"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-gold">Fish Food</span>
                  <p className="font-display text-lg font-bold text-offwhite">& Nutrition</p>
                </div>
              </div>

              {/* Bottom image — accessories */}
              <div className="animate-float absolute right-0 bottom-4 h-[260px] w-[220px] overflow-hidden rounded-sm border-2 border-aqua/30 shadow-[0_20px_60px_rgba(0,0,0,0.4)]" style={{ animationDelay: '1.5s' }}>
                <img
                  src={IMAGES.whyAquavitaAquarium}
                  alt="Aquarium with accessories"
                  className="h-full w-full object-cover"
                  loading="eager"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-aqua-light">Aquarium</span>
                  <p className="font-display text-lg font-bold text-offwhite">Accessories</p>
                </div>
              </div>

              {/* Floating stat */}
              <div className="animate-float absolute -left-4 top-1/2 -translate-y-1/2 rounded-sm border border-gold/20 bg-navy-800/90 px-4 py-3 backdrop-blur-md">
                <span className="block font-display text-2xl font-bold text-gradient-gold">8+</span>
                <span className="text-[10px] uppercase tracking-wider text-muted">Products</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy-900 to-transparent" />
    </section>
  );
}
