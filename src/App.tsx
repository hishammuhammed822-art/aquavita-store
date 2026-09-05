import { useState, useEffect } from 'react';
import { CartProvider } from '@/cart/CartContext';
import { StoreSettingsProvider } from '@/store/StoreSettingsContext';
import { AuthProvider, useAuth } from '@/auth/AuthContext';
import { Navbar } from '@/components/Navbar';
import { AnnouncementBar } from '@/components/AnnouncementBar';
import { CartDrawer } from '@/components/CartDrawer';
import { Hero } from '@/components/Hero';
import { CategoryCards } from '@/components/CategoryCards';
import { ProductCatalog, type CategoryFilter } from '@/components/ProductCatalog';
import { Benefits } from '@/components/Benefits';
import { WhyAquavita } from '@/components/WhyAquavita';
import { WhatsInside } from '@/components/WhatsInside';
import { FeedingGuide } from '@/components/FeedingGuide';
import { StorageCaution } from '@/components/StorageCaution';
import { Reviews } from '@/components/Reviews';
import { CTASection } from '@/components/CTASection';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';
import { Checkout } from '@/components/Checkout';
import { AdminLogin } from '@/components/AdminLogin';
import { AdminDashboard } from '@/components/AdminDashboard';
import type { ProductCategory } from '@/types';

function useAdminRoute(): boolean {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const check = () => setIsAdmin(window.location.pathname.startsWith('/admin'));
    check();
    window.addEventListener('popstate', check);
    return () => window.removeEventListener('popstate', check);
  }, []);

  return isAdmin;
}

function AdminRoute() {
  const { session, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-navy-900">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
      </div>
    );
  }

  return session ? <AdminDashboard /> : <AdminLogin />;
}

function Storefront() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [checkoutOpen, setCheckoutOpen] = useState(false);

  const handleSelectCategory = (category: ProductCategory) => {
    setActiveCategory(category);
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <CartProvider>
      <StoreSettingsProvider>
        <AnnouncementBar />
        <Navbar />
        <CartDrawer onCheckout={() => setCheckoutOpen(true)} />
        <main>
          <Hero />
          <CategoryCards onSelectCategory={handleSelectCategory} />
          <ProductCatalog activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <Benefits />
          <WhyAquavita />
          <WhatsInside />
          <FeedingGuide />
          <StorageCaution />
          <Reviews />
          <CTASection />
          <Contact />
        </main>
        <Footer />
        <Checkout isOpen={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
      </StoreSettingsProvider>
    </CartProvider>
  );
}

function AppContent() {
  const isAdmin = useAdminRoute();

  if (isAdmin) {
    return (
      <AuthProvider>
        <StoreSettingsProvider>
          <AdminRoute />
        </StoreSettingsProvider>
      </AuthProvider>
    );
  }

  return <Storefront />;
}

export default function App() {
  return <AppContent />;
}
