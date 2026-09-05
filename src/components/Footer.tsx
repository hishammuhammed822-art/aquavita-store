import { Droplet, Instagram, Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';
import { useStoreSettings } from '@/store/StoreSettingsContext';

const LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Categories', href: '#categories' },
  { label: 'Products', href: '#products' },
  { label: 'About', href: '#about' },
  { label: 'Feeding Guide', href: '#feeding' },
  { label: 'Contact', href: '#contact' },
  { label: 'Privacy Policy', href: '#' },
  { label: 'Terms & Conditions', href: '#' },
];

export function Footer() {
  const { settings } = useStoreSettings();

  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const socials = [
    { icon: Instagram, label: 'Instagram', url: settings?.instagram_url || '#' },
    { icon: Facebook, label: 'Facebook', url: settings?.facebook_url || '#' },
    { icon: MessageCircle, label: 'WhatsApp', url: settings?.whatsapp_url || '#' },
  ];

  return (
    <footer className="relative border-t border-gold/15 bg-navy-900">
      {/* Gold top line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-navy-800/80">
                <Droplet className="h-4 w-4 text-aqua-light" fill="currentColor" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-xl font-bold tracking-[0.18em] text-offwhite">AQUAVITA</span>
                <span className="text-[9px] font-medium uppercase tracking-[0.3em] text-gold/80">Aquatic Nutrition</span>
              </div>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              Premium aquatic nutrition for healthy, vibrant aquarium fish.
              100% natural, high protein, and trusted by enthusiasts worldwide.
            </p>

            {/* Social icons */}
            <div className="mt-6 flex gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-sm border border-gold/25 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10 hover:shadow-[0_0_20px_rgba(217,163,33,0.15)]"
                >
                  <social.icon className="h-5 w-5" strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="md:justify-self-center">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Quick Links
            </h4>
            <ul className="grid grid-cols-2 gap-3 sm:grid-cols-1">
              {LINKS.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-muted transition-colors hover:text-offwhite"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact summary */}
          <div className="md:justify-self-end">
            <h4 className="mb-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              Contact
            </h4>
            <ul className="space-y-3 text-sm text-muted">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gold-light" />
                7559955088
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gold-light" />
                info@aquavita.com
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gold-light" />
                Available Worldwide
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="my-10 h-px w-full bg-gradient-to-r from-transparent via-gold/15 to-transparent" />

        {/* Copyright */}
        <div className="text-center">
          <p className="text-xs text-muted">© 2026 AQUAVITA. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
