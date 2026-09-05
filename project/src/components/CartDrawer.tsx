import { X, Plus, Minus, Trash2, ShoppingBag, Truck } from 'lucide-react';
import { useCart } from '@/cart/CartContext';

interface CartDrawerProps {
  onCheckout: () => void;
}

export function CartDrawer({ onCheckout }: CartDrawerProps) {
  const { items, isOpen, closeCart, updateQuantity, removeItem, totalPrice, totalItems } = useCart();

  const handleCheckout = () => {
    closeCart();
    onCheckout();
  };

  return (
    <div
      className={`fixed inset-0 z-[70] ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-navy-900/80 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={closeCart}
      />
      <aside
        className={`absolute right-0 top-0 flex h-full w-96 max-w-[90vw] flex-col border-l border-gold/20 bg-navy-800 transition-transform duration-400 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between border-b border-gold/15 px-5 py-5">
          <div className="flex items-center gap-3">
            <ShoppingBag className="h-5 w-5 text-gold" />
            <h3 className="font-display text-xl font-semibold text-offwhite">
              Your Cart {totalItems > 0 && `(${totalItems})`}
            </h3>
          </div>
          <button
            onClick={closeCart}
            className="flex h-9 w-9 items-center justify-center rounded-sm border border-gold/30 text-offwhite transition-colors hover:border-gold hover:bg-gold/10"
            aria-label="Close cart"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-gold/20">
              <ShoppingBag className="h-7 w-7 text-muted" />
            </div>
            <p className="text-muted">Your cart is empty.</p>
            <button
              onClick={closeCart}
              className="rounded-sm border border-aqua/50 px-6 py-2.5 text-sm font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <>
            <div className="scrollbar-hide flex-1 overflow-y-auto px-5 py-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="mb-4 flex gap-4 border-b border-gold/10 pb-4"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 rounded-sm border border-gold/15 object-cover"
                    loading="lazy"
                  />
                  <div className="flex flex-1 flex-col">
                    <h4 className="text-sm font-semibold text-offwhite">{item.product.name}</h4>
                    <p className="mt-0.5 text-xs text-muted">${item.product.price.toFixed(2)}</p>
                    <div className="mt-auto flex items-center justify-between">
                      <div className="flex items-center border border-gold/25">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-gold"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3 w-3" />
                        </button>
                        <span className="w-8 text-center text-sm text-offwhite">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-gold"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3 w-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted transition-colors hover:text-red-400"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Dispatch notice */}
            <div className="mx-5 mb-3 flex items-center gap-2 rounded-sm border border-aqua/20 bg-aqua/5 px-4 py-2.5">
              <Truck className="h-3.5 w-3.5 flex-shrink-0 text-aqua-light" />
              <p className="text-[11px] text-muted">
                Dispatched every <strong className="text-offwhite">Sun &amp; Wed</strong>
              </p>
            </div>

            <div className="border-t border-gold/15 px-5 py-5">
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm font-medium text-muted">Total</span>
                <span className="font-display text-2xl font-semibold text-gradient-gold">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleCheckout}
                className="w-full rounded-sm bg-gradient-to-r from-aqua to-aqua-light py-3.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(0,159,227,0.4)]"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
