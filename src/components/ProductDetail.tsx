import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Zap, Truck, Package } from 'lucide-react';
import type { Product } from '@/types';
import { isOutOfStock } from '@/types';
import { useCart } from '@/cart/CartContext';
import { StarRating } from '@/components/StarRating';

interface ProductDetailProps {
  product: Product | null;
  onClose: () => void;
}

const SAMPLE_REVIEWS = [
  { name: 'Rajesh K.', rating: 5, text: 'Excellent quality! My fish love it. Will definitely order again.' },
  { name: 'Sarah M.', rating: 5, text: 'Premium product, fast delivery. Highly recommended for aquarium owners.' },
  { name: 'David C.', rating: 4, text: 'Good value for money. Product arrived well-packaged.' },
];

export function ProductDetail({ product, onClose }: ProductDetailProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();

  if (!product) return null;

  const outOfStock = isOutOfStock(product);

  const handleAdd = () => {
    if (!outOfStock) {
      addItem(product, quantity);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto scrollbar-hide rounded-sm border border-gold/25 bg-navy-800">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-sm border border-gold/25 text-offwhite transition-colors hover:border-gold hover:bg-gold/10"
          aria-label="Close"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Image */}
          <div className="relative overflow-hidden bg-navy-900">
            <img
              src={product.image}
              alt={product.name}
              className={`h-full max-h-[400px] w-full object-cover md:min-h-[500px] ${outOfStock ? 'grayscale opacity-60' : ''}`}
            />
            {outOfStock && (
              <span className="absolute left-4 top-4 rounded-sm bg-red-500/90 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                Out of Stock
              </span>
            )}
            {product.badge && !outOfStock && (
              <span className="absolute left-4 top-4 rounded-sm bg-gradient-to-r from-gold to-gold-light px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-navy-900">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col p-6 lg:p-8">
            <span className="text-xs font-semibold uppercase tracking-[0.25em] text-aqua-light">
              {product.tagline}
            </span>
            <h2 className="mt-2 font-display text-2xl font-bold text-offwhite lg:text-3xl">
              {product.name}
            </h2>

            {product.rating != null && (
              <div className="mt-3">
                <StarRating rating={product.rating} reviewCount={product.reviewCount} size="md" />
              </div>
            )}

            <div className="mt-4 h-px w-full bg-gradient-to-r from-gold/30 to-transparent" />

            <p className="mt-4 text-sm leading-relaxed text-muted">
              {product.description}
            </p>

            <div className="mt-5 flex items-baseline gap-3">
              <span className="font-display text-3xl font-bold text-gradient-gold">
                ₹{product.price.toFixed(2)}
              </span>
              {outOfStock && (
                <span className="text-sm font-semibold text-red-400">Currently Unavailable</span>
              )}
            </div>

            {/* Shipping notice */}
            <div className="mt-4 flex items-center gap-2 rounded-sm border border-aqua/20 bg-aqua/5 px-4 py-3">
              <Truck className="h-4 w-4 flex-shrink-0 text-aqua-light" />
              <p className="text-xs text-muted">
                Dispatched twice a week — every <strong className="text-offwhite">Sunday &amp; Wednesday</strong>
              </p>
            </div>

            {/* Quantity + actions */}
            {!outOfStock && (
              <div className="mt-6">
                <div className="mb-3 flex items-center gap-3">
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted">Quantity</span>
                  <div className="flex items-center border border-gold/25">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
                      aria-label="Decrease"
                    >
                      <Minus className="h-3.5 w-3.5" />
                    </button>
                    <span className="w-12 text-center text-sm font-semibold text-offwhite">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="flex h-9 w-9 items-center justify-center text-muted transition-colors hover:text-gold"
                      aria-label="Increase"
                    >
                      <Plus className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={handleAdd}
                    className="flex flex-1 items-center justify-center gap-2 rounded-sm border border-aqua/50 px-5 py-3 text-sm font-bold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Add to Cart
                  </button>
                  <button
                    onClick={handleAdd}
                    className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-5 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(0,159,227,0.35)]"
                  >
                    <Zap className="h-4 w-4" />
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {/* Reviews section */}
            <div className="mt-8 border-t border-gold/10 pt-6">
              <div className="mb-4 flex items-center gap-2">
                <Package className="h-4 w-4 text-gold" />
                <h3 className="text-sm font-bold uppercase tracking-wider text-offwhite">
                  Customer Reviews
                </h3>
              </div>
              <div className="space-y-4">
                {SAMPLE_REVIEWS.map((review, i) => (
                  <div key={i} className="rounded-sm border border-gold/10 bg-navy-900/40 p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm font-semibold text-offwhite">{review.name}</span>
                      <StarRating rating={review.rating} />
                    </div>
                    <p className="text-xs leading-relaxed text-muted">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
