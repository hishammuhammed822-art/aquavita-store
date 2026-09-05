import { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag } from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useCart } from '@/cart/CartContext';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Categories', href: '#categories' },
  { label: 'Products', href: '#products' },
  { label: 'About Us', href: '#about' },
  { label: 'Why AQUAVITA', href: '#why' },
  { label: 'Feeding Guide', href: '#feeding' },
  { label: 'Contact', href: '#contact' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, openCart } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-navy-900/95 backdrop-blur-lg border-b border-gold/15 py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 lg:px-8">
          <Logo onClick={() => handleNavClick('#home')} />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 lg:flex">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="group relative text-sm font-medium text-muted transition-colors hover:text-offwhite"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-gold to-gold-light transition-all duration-300 group-hover:w-full" />
                </button>
              </li>
            ))}
          </ul>

          {/* Desktop actions */}
          <div className="hidden items-center gap-4 lg:flex">
            <button
              onClick={() => handleNavClick('#categories')}
              className="group relative overflow-hidden rounded-sm border border-aqua/50 px-5 py-2.5 text-sm font-semibold text-aqua-light transition-all duration-300 hover:border-aqua hover:bg-aqua/10"
            >
              Shop Now
            </button>
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-gold/30 text-gold transition-all duration-300 hover:border-gold hover:bg-gold/10"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-aqua text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-sm border border-gold/30 text-gold"
              aria-label="Open cart"
            >
              <ShoppingBag className="h-4 w-4" />
              {totalItems > 0 && (
                <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-aqua text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/30 text-offwhite"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile drawer */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden ${mobileOpen ? '' : 'pointer-events-none'}`}
        aria-hidden={!mobileOpen}
      >
        <div
          className={`absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity duration-300 ${
            mobileOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={() => setMobileOpen(false)}
        />
        <aside
          className={`absolute right-0 top-0 h-full w-80 max-w-[85vw] border-l border-gold/20 bg-navy-800 transition-transform duration-400 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex items-center justify-between border-b border-gold/15 px-5 py-5">
            <Logo />
            <button
              onClick={() => setMobileOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-sm border border-gold/30 text-offwhite"
              aria-label="Close menu"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <ul className="flex flex-col gap-1 px-3 py-6">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <button
                  onClick={() => handleNavClick(link.href)}
                  className="w-full rounded-sm px-4 py-3 text-left text-base font-medium text-muted transition-colors hover:bg-gold/10 hover:text-offwhite"
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
          <div className="px-5">
            <button
              onClick={() => handleNavClick('#categories')}
              className="w-full rounded-sm border border-aqua/50 px-5 py-3 text-sm font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
            >
              Shop Now
            </button>
          </div>
        </aside>
      </div>
    </>
  );
}
