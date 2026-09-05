import { useState, type FormEvent } from 'react';
import { X, Truck, CreditCard, Smartphone, CheckCircle2, Copy, AlertCircle } from 'lucide-react';
import { useCart } from '@/cart/CartContext';
import { useStoreSettings } from '@/store/StoreSettingsContext';
import { supabase } from '@/lib/supabase';
import type { OrderItem } from '@/types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Checkout({ isOpen, onClose }: CheckoutProps) {
  const { items, totalPrice, clearCart } = useCart();
  const { settings } = useStoreSettings();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'upi'>('cod');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [orderId, setOrderId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const orderItems: OrderItem[] = items.map((item) => ({
      product_id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      supplier_link: item.product.supplierLink ?? null,
    }));

    const payload = {
      customer_name: formData.get('name'),
      customer_phone: formData.get('phone'),
      customer_email: formData.get('email') || null,
      shipping_address: formData.get('address'),
      city: formData.get('city') || null,
      pincode: formData.get('pincode') || null,
      payment_method: paymentMethod,
      items: JSON.stringify(orderItems),
      total_amount: totalPrice,
      status: 'pending',
    };

    const { data, error: insertError } = await supabase
      .from('orders')
      .insert(payload)
      .select('id')
      .maybeSingle();

    if (insertError || !data) {
      setError('Unable to place order. Please try again.');
      setSubmitting(false);
      return;
    }

    setOrderId(data.id);
    setSuccess(true);
    setSubmitting(false);
    clearCart();
  };

  const handleCopyUpi = () => {
    if (settings?.upi_id) {
      navigator.clipboard.writeText(settings.upi_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleClose = () => {
    setSuccess(false);
    setOrderId(null);
    setError(null);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto scrollbar-hide rounded-sm border border-gold/25 bg-navy-800">
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gold/15 bg-navy-800 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-offwhite">Checkout</h2>
          <button
            onClick={handleClose}
            className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/25 text-offwhite hover:border-gold"
            aria-label="Close checkout"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {success ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-aqua/30 bg-aqua/10">
              <CheckCircle2 className="h-8 w-8 text-aqua-light" />
            </div>
            <h3 className="font-display text-2xl font-bold text-offwhite">Order Placed!</h3>
            <p className="mt-2 max-w-sm text-sm text-muted">
              Your order has been received. We dispatch orders every <strong className="text-offwhite">Sunday &amp; Wednesday</strong>.
              You'll receive a confirmation call shortly.
            </p>
            {orderId && (
              <p className="mt-4 rounded-sm border border-gold/15 bg-navy-900/50 px-4 py-2 text-xs text-muted">
                Order ID: <span className="font-mono text-gold">{orderId.slice(0, 8).toUpperCase()}</span>
              </p>
            )}
            <button
              onClick={handleClose}
              className="mt-6 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-8 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(0,159,227,0.35)]"
            >
              Continue Shopping
            </button>
          </div>
        ) : items.length === 0 ? (
          <div className="flex flex-col items-center justify-center px-6 py-16 text-center">
            <p className="text-muted">Your cart is empty.</p>
            <button
              onClick={handleClose}
              className="mt-4 rounded-sm border border-aqua/50 px-6 py-2.5 text-sm font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="p-6">
            {/* Dispatch notice */}
            <div className="mb-6 flex items-center gap-3 rounded-sm border border-aqua/20 bg-aqua/5 px-4 py-3">
              <Truck className="h-5 w-5 flex-shrink-0 text-aqua-light" />
              <p className="text-xs text-muted">
                Orders are dispatched twice a week — every <strong className="text-offwhite">Sunday &amp; Wednesday</strong>
              </p>
            </div>

            {/* Order summary */}
            <div className="mb-6 rounded-sm border border-gold/15 bg-navy-900/40 p-4">
              <h3 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gold">Order Summary</h3>
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center justify-between py-2 text-sm">
                  <div className="flex items-center gap-3">
                    <img src={item.product.image} alt={item.product.name} className="h-10 w-10 rounded-sm border border-gold/15 object-cover" />
                    <div>
                      <p className="font-medium text-offwhite">{item.product.name}</p>
                      <p className="text-xs text-muted">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="font-semibold text-offwhite">${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="mt-3 flex items-center justify-between border-t border-gold/10 pt-3">
                <span className="text-sm font-medium text-muted">Total</span>
                <span className="font-display text-xl font-bold text-gradient-gold">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="mb-4 flex items-center gap-2 rounded-sm border border-red-500/30 bg-red-500/10 px-4 py-3">
                <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-400" />
                <p className="text-sm text-red-400">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Shipping details */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Full Name</label>
                  <input name="name" type="text" required className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="John Doe" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Phone Number</label>
                  <input name="phone" type="tel" required className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="+1 234 567 890" />
                </div>
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Email (optional)</label>
                <input name="email" type="email" className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="you@example.com" />
              </div>

              <div>
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Shipping Address</label>
                <textarea name="address" rows={2} required className="w-full resize-none rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="House no, Street, Area..." />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">City</label>
                  <input name="city" type="text" className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="Mumbai" />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-muted">Pincode</label>
                  <input name="pincode" type="text" className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-2.5 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="400001" />
                </div>
              </div>

              {/* Payment method */}
              <div>
                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Payment Method</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cod')}
                    className={`flex items-center gap-2 rounded-sm border px-4 py-3 text-sm font-semibold transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/20 text-muted hover:border-gold/40'
                    }`}
                  >
                    <CreditCard className="h-4 w-4" />
                    Cash on Delivery
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('upi')}
                    className={`flex items-center gap-2 rounded-sm border px-4 py-3 text-sm font-semibold transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-gold bg-gold/10 text-gold'
                        : 'border-gold/20 text-muted hover:border-gold/40'
                    }`}
                  >
                    <Smartphone className="h-4 w-4" />
                    Online UPI
                  </button>
                </div>
              </div>

              {/* UPI payment details */}
              {paymentMethod === 'upi' && (
                <div className="rounded-sm border border-aqua/25 bg-aqua/5 p-5">
                  <h4 className="mb-3 text-sm font-bold text-offwhite">UPI Payment Details</h4>

                  {settings?.qr_code_url ? (
                    <div className="mb-4 flex justify-center">
                      <img
                        src={settings.qr_code_url}
                        alt="UPI QR Code"
                        className="h-48 w-48 rounded-sm border border-gold/20 bg-white p-2"
                      />
                    </div>
                  ) : null}

                  {settings?.upi_id ? (
                    <div className="flex items-center justify-between rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3">
                      <div>
                        <span className="block text-xs uppercase tracking-wider text-muted">UPI ID</span>
                        <span className="text-sm font-semibold text-offwhite">{settings.upi_id}</span>
                      </div>
                      <button
                        type="button"
                        onClick={handleCopyUpi}
                        className="flex items-center gap-1.5 rounded-sm border border-aqua/40 px-3 py-2 text-xs font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
                      >
                        {copied ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  ) : (
                    <p className="text-sm text-muted">
                      UPI payment details will be available soon. Please choose Cash on Delivery for now.
                    </p>
                  )}

                  {settings?.upi_id && (
                    <p className="mt-3 text-xs text-muted">
                      Pay ${totalPrice.toFixed(2)} to the UPI ID above, then place your order. We'll verify payment before dispatch.
                    </p>
                  )}
                </div>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="flex w-full items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light py-3.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_30px_rgba(0,159,227,0.35)] disabled:opacity-60"
              >
                {submitting ? 'Placing Order...' : `Place Order — $${totalPrice.toFixed(2)}`}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
