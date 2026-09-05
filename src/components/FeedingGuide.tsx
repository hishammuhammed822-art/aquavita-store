import { Sun, CloudSun, Moon, Info } from 'lucide-react';
import { Reveal } from '@/components/Reveal';

const SCHEDULE = [
  { icon: Sun, time: 'Morning', note: 'Start the day with a small portion' },
  { icon: CloudSun, time: 'Afternoon', note: 'Midday feeding for energy' },
  { icon: Moon, time: 'Evening', note: 'Final feed before lights dim' },
];

export function FeedingGuide() {
  return (
    <section id="feeding" className="relative overflow-hidden border-t border-gold/10 bg-navy-900 py-20 lg:py-28">
      {/* Underwater ambient glow */}
      <div className="pointer-events-none absolute left-0 top-1/2 h-64 w-64 -translate-y-1/2 rounded-full bg-aqua/5 blur-[100px]" />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <Reveal className="mb-14 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              How to Feed
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            FEEDING <span className="text-gradient-gold">GUIDE</span>
          </h2>
        </Reveal>

        {/* Main instruction */}
        <Reveal delay={1}>
          <div className="relative mx-auto mb-14 max-w-3xl overflow-hidden rounded-sm border border-gold/25 bg-navy-800/60 p-10 text-center backdrop-blur-md">
            <div className="pointer-events-none absolute left-0 top-0 h-10 w-10 border-l-2 border-t-2 border-gold/50" />
            <div className="pointer-events-none absolute right-0 top-0 h-10 w-10 border-r-2 border-t-2 border-gold/50" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-10 w-10 border-b-2 border-l-2 border-gold/50" />
            <div className="pointer-events-none absolute bottom-0 right-0 h-10 w-10 border-b-2 border-r-2 border-gold/50" />

            <p className="font-display text-2xl font-medium leading-relaxed text-offwhite lg:text-3xl">
              Feed 2–3 times daily, only as much as your fish can consume in{' '}
              <span className="text-gradient-aqua">2–3 minutes</span>.
            </p>
          </div>
        </Reveal>

        {/* Timeline */}
        <Reveal delay={2}>
          <div className="relative grid grid-cols-1 gap-6 sm:grid-cols-3">
            {/* Connecting line */}
            <div className="pointer-events-none absolute left-0 right-0 top-[44px] hidden h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent sm:block" />

            {SCHEDULE.map((item) => (
              <div
                key={item.time}
                className="group relative flex flex-col items-center rounded-sm border border-gold/15 bg-navy-800/50 p-6 text-center transition-all duration-300 hover:border-gold/30 hover:bg-navy-800/80"
              >
                <div className="relative z-10 mb-4 flex h-[88px] w-[88px] items-center justify-center rounded-full border-2 border-gold/30 bg-navy-900 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_30px_rgba(217,163,33,0.2)]">
                  <item.icon className="h-8 w-8 text-gold-light" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-2xl font-bold text-offwhite">{item.time}</h3>
                <p className="mt-2 text-sm text-muted">{item.note}</p>
              </div>
            ))}
          </div>
        </Reveal>

        {/* Note */}
        <Reveal delay={3}>
          <div className="mt-12 flex items-center justify-center gap-3 rounded-sm border border-aqua/20 bg-aqua/5 px-6 py-4">
            <Info className="h-5 w-5 flex-shrink-0 text-aqua-light" />
            <p className="text-sm text-muted">
              Remove uneaten food to help maintain clean aquarium water.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
