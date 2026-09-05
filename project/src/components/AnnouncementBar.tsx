import { Truck, X } from 'lucide-react';
import { useState } from 'react';

export function AnnouncementBar() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="relative z-50 flex items-center justify-center gap-3 bg-gradient-to-r from-aqua to-aqua-light px-4 py-2 text-white">
      <Truck className="h-4 w-4 flex-shrink-0" />
      <p className="text-center text-xs font-medium sm:text-sm">
        Orders are dispatched twice a week — every <strong>Sunday &amp; Wednesday</strong>
      </p>
      <button
        onClick={() => setVisible(false)}
        className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-white/20 transition-colors hover:bg-white/30"
        aria-label="Dismiss announcement"
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}
