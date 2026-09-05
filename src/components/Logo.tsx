import { Droplet } from 'lucide-react';

interface LogoProps {
  onClick?: () => void;
  size?: 'sm' | 'md';
}

export function Logo({ onClick, size = 'md' }: LogoProps) {
  const titleSize = size === 'sm' ? 'text-lg' : 'text-xl';
  const taglineSize = size === 'sm' ? 'text-[8px]' : 'text-[9px]';

  return (
    <button onClick={onClick} className="group flex items-center gap-2.5 text-left" aria-label="AQUAVITA home">
      <div className="relative">
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-navy-800/80 transition-all duration-300 group-hover:border-gold group-hover:shadow-[0_0_20px_rgba(217,163,33,0.3)]">
          <Droplet className="h-4 w-4 text-aqua-light" fill="currentColor" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className={`font-display font-bold tracking-[0.18em] text-offwhite ${titleSize}`}>
          AQUAVITA
        </span>
        <span className={`font-sans font-medium uppercase tracking-[0.3em] text-gold/80 ${taglineSize}`}>
          Aquatic Nutrition
        </span>
      </div>
    </button>
  );
}
