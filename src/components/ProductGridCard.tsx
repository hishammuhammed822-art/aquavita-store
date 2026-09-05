import { useState } from 'react';
import { Plus, Minus, ShoppingBag, Zap } from 'lucide-react';
import type { Product } from '@/types';
import { isOutOfStock } from '@/types';
import { useCart } from '@/cart/CartContext';
import { StarRating } from '@/components/StarRating';

interface ProductGridCardProps {
  product: Product;
  onCardClick?: (product: Product) => void;
}

export function ProductGridCard({ product, onCardClick }: ProductGridCardProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCart();
  const outOfStock = isOutOfStock(product);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!outOfStock) addItem(product, quantity);
  };
  const handleBuyNow = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!outOfStock) addItem(product, quantity);
  };

  return (
    <div
      onClick={() => onCardClick?.(product)}
      className={`group flex h-full flex-col overflow-hidden rounded-sm border border-gold/20 bg-navy-800/60 backdrop-blur-md transition-all duration-500 hover:border-gold/40 ${onCardClick ? 'cursor-pointer' : ''}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-navy-900">
        {product.badge && !outOfStock && (
          <span className="absolute left-4 top-4 z-10 rounded-sm bg-gradient-to-r from-gold to-gold-light px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-navy-900">
            {product.badge}
          </span>
        )}
        {outOfStock && (
          <span className="absolute left-4 top-4 z-10 rounded-sm bg-red-500/90 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
            Out of Stock
          </span>
        )}
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${outOfStock ? 'grayscale opacity-60' : ''}`}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
        </div>
      </div>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-aqua-light">
          {product.tagline}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-bold leading-tight text-offwhite">
          {product.name}
        </h3>

        {product.rating != null && (
          <div className="mt-2">
            <StarRating rating={product.rating} reviewCount={product.reviewCount} />
          </div>
        )}

        <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
          {product.description}
        </p>

        <div className="mt-4 flex items-baseline gap-2">
          <span className="font-display text-2xl font-bold text-gradient-gold">
            ₹{product.price.toFixed(2)}
          </span>
        </div>

        {/* Quantity + buttons */}
        <div className="mt-auto pt-5">
          <div className="mb-3 flex items-center gap-3">
            <div className={`flex items-center border ${outOfStock ? 'border-gold/10 opacity-50' : 'border-gold/25'}`}>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity((q) => Math.max(1, q - 1)); }}
                disabled={outOfStock}
                className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-gold disabled:cursor-not-allowed"
                aria-label="Decrease quantity"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>
              <span className="w-10 text-center text-sm font-semibold text-offwhite">{quantity}</span>
              <button
                onClick={(e) => { e.stopPropagation(); setQuantity((q) => q + 1); }}
                disabled={outOfStock}
                className="flex h-8 w-8 items-center justify-center text-muted transition-colors hover:text-gold disabled:cursor-not-allowed"
                aria-label="Increase quantity"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              disabled={outOfStock}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-sm border border-aqua/50 px-4 py-2.5 text-xs font-bold text-aqua-light transition-all duration-300 hover:border-aqua hover:bg-aqua/10 disabled:cursor-not-allowed disabled:border-muted/20 disabled:text-muted/50 disabled:hover:bg-transparent"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              {outOfStock ? 'Sold Out' : 'Add'}
            </button>
            <button
              onClick={handleBuyNow}
              disabled={outOfStock}
              className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-4 py-2.5 text-xs font-bold text-white transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,159,227,0.35)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:shadow-none"
            >
              <Zap className="h-3.5 w-3.5" />
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
