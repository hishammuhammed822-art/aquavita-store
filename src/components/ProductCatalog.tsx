import { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { ProductGridCard } from '@/components/ProductGridCard';
import { ProductDetail } from '@/components/ProductDetail';
import { supabase } from '@/lib/supabase';
import { productRowToProduct, type ProductRow, type Product, type ProductCategory } from '@/types';

export type CategoryFilter = 'all' | ProductCategory;

interface ProductCatalogProps {
  activeCategory: CategoryFilter;
  onCategoryChange: (category: CategoryFilter) => void;
}

const TABS: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All Products' },
  { id: 'fish-food', label: 'Fish Food & Nutrition' },
  { id: 'accessories', label: 'Aquarium Accessories' },
];

export function ProductCatalog({ activeCategory, onCategoryChange }: ProductCatalogProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadProducts() {
      const { data, error: fetchError } = await supabase
        .from('products')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: true });

      if (fetchError || !data) {
        setError(true);
        setLoading(false);
        return;
      }
      setProducts((data as ProductRow[]).map(productRowToProduct));
      setLoading(false);
    }
    loadProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products;
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [products, activeCategory, searchQuery]);

  return (
    <section id="products" className="relative border-t border-gold/10 bg-navy-800 py-20 lg:py-28">
      {/* Subtle aqua glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-aqua/5 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <Reveal className="mb-10 text-center">
          <div className="mx-auto mb-4 flex w-fit items-center gap-3">
            <div className="h-px w-10 bg-gradient-to-r from-transparent to-gold" />
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
              Our Products
            </span>
            <div className="h-px w-10 bg-gradient-to-l from-transparent to-gold" />
          </div>
          <h2 className="font-display text-3xl font-bold text-offwhite sm:text-4xl lg:text-5xl">
            EXPLORE <span className="text-gradient-gold">OUR COLLECTION</span>
          </h2>
        </Reveal>

        {/* Search bar */}
        <Reveal delay={1}>
          <div className="mx-auto mb-10 max-w-md">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products by name or category..."
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 py-3 pl-11 pr-4 text-sm text-offwhite placeholder-muted/60 outline-none focus:border-gold/50"
              />
            </div>
          </div>
        </Reveal>

        {/* Filter tabs */}
        <Reveal delay={1}>
          <div className="mb-12 flex flex-wrap items-center justify-center gap-3">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`rounded-sm border px-5 py-2.5 text-sm font-semibold transition-all duration-300 ${
                  activeCategory === tab.id
                    ? 'border-gold bg-gold/10 text-gold shadow-[0_0_20px_rgba(217,163,33,0.1)]'
                    : 'border-gold/20 text-muted hover:border-gold/40 hover:text-offwhite'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </Reveal>

        {/* Product grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold/30 border-t-gold" />
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <p className="text-muted">Unable to load products right now.</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-sm border border-aqua/50 px-5 py-2.5 text-sm font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
            >
              Try Again
            </button>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <p className="text-muted">No products available in this category yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, i) => (
              <Reveal key={product.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <ProductGridCard product={product} onCardClick={setSelectedProduct} />
              </Reveal>
            ))}
          </div>
        )}
      </div>

      <ProductDetail product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </section>
  );
}
