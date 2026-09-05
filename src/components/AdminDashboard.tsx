import { useState, useEffect, useCallback, type FormEvent } from 'react';
import {
  Plus, Pencil, Trash2, X, LogOut, Droplet, Save, AlertCircle, Package, Search,
  Copy, ExternalLink, Clipboard, ShoppingCart, Settings, DollarSign, CheckCircle2,
  Instagram, Facebook, MessageCircle, Truck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/auth/AuthContext';
import { useStoreSettings } from '@/store/StoreSettingsContext';
import type { ProductRow, ProductCategory, OrderRow } from '@/types';

type Tab = 'products' | 'orders' | 'settings';

type EditingProduct = Partial<ProductRow> & { id?: string };

const EMPTY_PRODUCT: EditingProduct = {
  name: '',
  tagline: '',
  description: '',
  price: 0,
  image_url: '',
  badge: '',
  stock: 0,
  is_active: true,
  category: 'fish-food' as ProductCategory,
  supplier_link: '',
  meesho_price: 0,
  rating: 4.5,
  review_count: 0,
};

const ORDER_STATUS_COLORS: Record<string, string> = {
  pending: 'bg-gold/15 text-gold-light',
  confirmed: 'bg-aqua/15 text-aqua-light',
  shipped: 'bg-blue-500/15 text-blue-400',
  delivered: 'bg-green-500/15 text-green-400',
  cancelled: 'bg-red-500/15 text-red-400',
};

export function AdminDashboard() {
  const { signOut } = useAuth();
  const [tab, setTab] = useState<Tab>('products');

  return (
    <div className="min-h-screen bg-navy-900">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-gold/15 bg-navy-900/95 backdrop-blur-lg">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/40 bg-navy-800">
              <Droplet className="h-4 w-4 text-aqua-light" fill="currentColor" />
            </div>
            <div>
              <span className="font-display text-lg font-bold tracking-[0.15em] text-offwhite">AQUAVITA</span>
              <span className="ml-2 text-[9px] font-medium uppercase tracking-[0.3em] text-gold/80">Admin</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" className="text-sm text-muted transition-colors hover:text-offwhite">View Site</a>
            <button
              onClick={signOut}
              className="flex items-center gap-2 rounded-sm border border-gold/25 px-4 py-2 text-sm font-medium text-gold transition-all hover:border-gold hover:bg-gold/10"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="mx-auto flex max-w-7xl gap-1 px-5 lg:px-8">
          {([
            { id: 'products' as Tab, label: 'Products', icon: Package },
            { id: 'orders' as Tab, label: 'Orders', icon: ShoppingCart },
            { id: 'settings' as Tab, label: 'Store Settings', icon: Settings },
          ]).map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-semibold transition-all ${
                tab === t.id
                  ? 'border-gold text-gold'
                  : 'border-transparent text-muted hover:text-offwhite'
              }`}
            >
              <t.icon className="h-4 w-4" />
              {t.label}
            </button>
          ))}
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 lg:px-8">
        {tab === 'products' && <ProductsTab />}
        {tab === 'orders' && <OrdersTab />}
        {tab === 'settings' && <SettingsTab />}
      </div>
    </div>
  );
}

/* ============ PRODUCTS TAB ============ */

function ProductsTab() {
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editing, setEditing] = useState<EditingProduct | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<ProductRow | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setProducts(data as ProductRow[]);
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!editing) return;
    setSaving(true);
    setError(null);

    const payload = {
      name: editing.name,
      tagline: editing.tagline,
      description: editing.description,
      price: Number(editing.price),
      image_url: editing.image_url,
      badge: editing.badge || null,
      stock: Number(editing.stock),
      is_active: editing.is_active ?? true,
      category: editing.category || 'fish-food',
      supplier_link: editing.supplier_link || null,
      meesho_price: editing.meesho_price != null ? Number(editing.meesho_price) : null,
      rating: Number(editing.rating) || 4.5,
      review_count: Number(editing.review_count) || 0,
    };

    let result;
    if (editing.id) {
      result = await supabase.from('products').update(payload).eq('id', editing.id);
    } else {
      result = await supabase.from('products').insert(payload);
    }

    if (result.error) {
      setError(result.error.message);
      setSaving(false);
      return;
    }

    setEditing(null);
    setSaving(false);
    fetchProducts();
  };

  const handleDelete = async (id: string) => {
    const { error: deleteError } = await supabase.from('products').delete().eq('id', id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setConfirmDelete(null);
    fetchProducts();
  };

  const handleToggleStock = async (product: ProductRow) => {
    const newStock = product.stock > 0 ? 0 : 10;
    const { error: updateError } = await supabase
      .from('products')
      .update({ stock: newStock })
      .eq('id', product.id);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    fetchProducts();
  };

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const profitMargin = (p: ProductRow) => {
    if (p.meesho_price == null) return null;
    return Number(p.price) - Number(p.meesho_price);
  };

  return (
    <>
      {error && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
        </div>
      )}

      {/* Toolbar */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold text-offwhite">Products</h1>
          <p className="mt-1 text-sm text-muted">Manage your product catalog, pricing, and stock.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="rounded-sm border border-gold/20 bg-navy-800 py-2.5 pl-10 pr-4 text-sm text-offwhite placeholder-muted/60 outline-none focus:border-gold/50"
            />
          </div>
          <button
            onClick={() => setEditing({ ...EMPTY_PRODUCT })}
            className="flex items-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-5 py-2.5 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(0,159,227,0.35)]"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        {[
          { label: 'Total Products', value: products.length, icon: Package },
          { label: 'Active', value: products.filter((p) => p.is_active).length, icon: Package },
          { label: 'Low Stock (<10)', value: products.filter((p) => p.stock > 0 && p.stock < 10).length, icon: Package },
          { label: 'Out of Stock', value: products.filter((p) => p.stock === 0).length, icon: Package },
        ].map((stat) => (
          <div key={stat.label} className="rounded-sm border border-gold/15 bg-navy-800/50 p-5">
            <stat.icon className="mb-3 h-5 w-5 text-gold" />
            <p className="font-display text-3xl font-bold text-offwhite">{stat.value}</p>
            <p className="mt-1 text-xs uppercase tracking-wider text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Table */}
      {loading ? (
        <div className="flex items-center justify-center py-20"><p className="text-muted">Loading products...</p></div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-gold/15 bg-navy-800/30 py-20">
          <Package className="mb-4 h-10 w-10 text-muted" />
          <p className="text-muted">No products found.</p>
          <button
            onClick={() => setEditing({ ...EMPTY_PRODUCT })}
            className="mt-4 flex items-center gap-2 rounded-sm border border-aqua/50 px-5 py-2.5 text-sm font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
          >
            <Plus className="h-4 w-4" />
            Add Your First Product
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-gold/15">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gold/15 bg-navy-800/60">
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Product</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Category</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Price</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Cost</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Profit</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Stock</th>
                <th className="px-4 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gold">Supplier</th>
                <th className="px-4 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((product) => {
                const profit = profitMargin(product);
                return (
                  <tr key={product.id} className="border-b border-gold/10 transition-colors hover:bg-navy-800/30">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image_url} alt={product.name} className="h-12 w-12 rounded-sm border border-gold/15 object-cover" loading="lazy" />
                        <div>
                          <p className="text-sm font-semibold text-offwhite">{product.name}</p>
                          <p className="text-xs text-muted">{product.tagline}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-medium ${product.category === 'fish-food' ? 'bg-gold/15 text-gold-light' : 'bg-aqua/15 text-aqua-light'}`}>
                        {product.category === 'fish-food' ? 'Fish Food' : 'Accessories'}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm font-semibold text-gradient-gold">₹{Number(product.price).toFixed(2)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-muted">{product.meesho_price != null ? `₹${Number(product.meesho_price).toFixed(2)}` : '—'}</span>
                    </td>
                    <td className="px-4 py-4">
                      {profit != null ? (
                        <span className={`text-sm font-semibold ${profit > 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ₹{profit.toFixed(2)}
                        </span>
                      ) : (
                        <span className="text-sm text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <span className={`text-sm font-semibold ${product.stock === 0 ? 'text-red-400' : product.stock < 10 ? 'text-gold-light' : 'text-offwhite'}`}>
                          {product.stock}
                        </span>
                        <button
                          onClick={() => handleToggleStock(product)}
                          className={`rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase transition-all ${
                            product.stock === 0
                              ? 'border border-green-500/30 text-green-400 hover:bg-green-500/10'
                              : 'border border-red-500/30 text-red-400 hover:bg-red-500/10'
                          }`}
                        >
                          {product.stock === 0 ? 'Mark In' : 'Mark Out'}
                        </button>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      {product.supplier_link ? (
                        <a
                          href={product.supplier_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-xs text-aqua-light transition-colors hover:text-aqua"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                          Meesho
                        </a>
                      ) : (
                        <span className="text-sm text-muted">—</span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setEditing({ ...product })}
                          className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/25 text-gold transition-all hover:border-gold hover:bg-gold/10"
                          aria-label="Edit product"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => setConfirmDelete(product)}
                          className="flex h-8 w-8 items-center justify-center rounded-sm border border-red-500/25 text-red-400 transition-all hover:border-red-500 hover:bg-red-500/10"
                          aria-label="Delete product"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit / Create modal */}
      {editing && (
        <ProductEditModal
          editing={editing}
          setEditing={setEditing}
          onSave={handleSave}
          saving={saving}
        />
      )}

      {/* Delete confirmation */}
      {confirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
          <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={() => setConfirmDelete(null)} />
          <div className="relative w-full max-w-md rounded-sm border border-red-500/25 bg-navy-800 p-8">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-red-500/30">
              <Trash2 className="h-6 w-6 text-red-400" />
            </div>
            <h3 className="font-display text-xl font-bold text-offwhite">Delete Product?</h3>
            <p className="mt-2 text-sm text-muted">Are you sure you want to delete "{confirmDelete.name}"? This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button onClick={() => setConfirmDelete(null)} className="flex-1 rounded-sm border border-gold/25 py-3 text-sm font-semibold text-muted transition-all hover:border-gold/50 hover:text-offwhite">Cancel</button>
              <button onClick={() => handleDelete(confirmDelete.id)} className="flex-1 rounded-sm bg-red-500 py-3 text-sm font-bold text-white transition-all hover:bg-red-600">Delete</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function ProductEditModal({
  editing,
  setEditing,
  onSave,
  saving,
}: {
  editing: EditingProduct;
  setEditing: (v: EditingProduct | null) => void;
  onSave: (e: FormEvent<HTMLFormElement>) => void;
  saving: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-5">
      <div className="absolute inset-0 bg-navy-900/80 backdrop-blur-sm" onClick={() => setEditing(null)} />
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto scrollbar-hide rounded-sm border border-gold/25 bg-navy-800">
        <div className="sticky top-0 flex items-center justify-between border-b border-gold/15 bg-navy-800 px-6 py-4">
          <h2 className="font-display text-xl font-bold text-offwhite">{editing.id ? 'Edit Product' : 'Add Product'}</h2>
          <button onClick={() => setEditing(null)} className="flex h-8 w-8 items-center justify-center rounded-sm border border-gold/25 text-offwhite hover:border-gold">
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSave} className="space-y-5 p-6">
          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Name</label>
            <input type="text" required value={editing.name ?? ''} onChange={(e) => setEditing({ ...editing, name: e.target.value })}
              className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="AQUAVITA Premium Prawn Bites" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Tagline</label>
            <input type="text" required value={editing.tagline ?? ''} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })}
              className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="100% Natural Dried Prawns" />
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Description</label>
            <textarea required rows={3} value={editing.description ?? ''} onChange={(e) => setEditing({ ...editing, description: e.target.value })}
              className="w-full resize-none rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="Product description..." />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Customer Price (₹)</label>
              <input type="number" step="0.01" min="0" required value={editing.price ?? 0} onChange={(e) => setEditing({ ...editing, price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Meesho/Supplier Cost (₹)</label>
              <input type="number" step="0.01" min="0" value={editing.meesho_price ?? 0} onChange={(e) => setEditing({ ...editing, meesho_price: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="0.00" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Meesho / Supplier Product Link</label>
            <input type="url" value={editing.supplier_link ?? ''} onChange={(e) => setEditing({ ...editing, supplier_link: e.target.value })}
              className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="https://www.meesho.com/..." />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Stock Quantity</label>
              <input type="number" min="0" required value={editing.stock ?? 0} onChange={(e) => setEditing({ ...editing, stock: parseInt(e.target.value) || 0 })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Image URL</label>
              <input type="url" required value={editing.image_url ?? ''} onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="https://images.pexels.com/..." />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Badge (optional)</label>
              <input type="text" value={editing.badge ?? ''} onChange={(e) => setEditing({ ...editing, badge: e.target.value })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" placeholder="Best Seller" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Category</label>
              <select value={editing.category ?? 'fish-food'} onChange={(e) => setEditing({ ...editing, category: e.target.value as ProductCategory })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50">
                <option value="fish-food">Fish Food & Nutrition</option>
                <option value="accessories">Aquarium Accessories</option>
              </select>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Rating (0-5)</label>
              <input type="number" step="0.1" min="0" max="5" value={editing.rating ?? 4.5} onChange={(e) => setEditing({ ...editing, rating: parseFloat(e.target.value) || 0 })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Review Count</label>
              <input type="number" min="0" value={editing.review_count ?? 0} onChange={(e) => setEditing({ ...editing, review_count: parseInt(e.target.value) || 0 })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50" />
            </div>
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Visibility</label>
              <select value={editing.is_active ? 'true' : 'false'} onChange={(e) => setEditing({ ...editing, is_active: e.target.value === 'true' })}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50">
                <option value="true">Active</option>
                <option value="false">Hidden</option>
              </select>
            </div>
          </div>

          {editing.image_url && (
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Preview</label>
              <img src={editing.image_url} alt="Preview" className="h-32 w-32 rounded-sm border border-gold/15 object-cover" />
            </div>
          )}

          {editing.meesho_price != null && editing.meesho_price > 0 && editing.price != null && (
            <div className="flex items-center gap-2 rounded-sm border border-green-500/20 bg-green-500/5 px-4 py-3">
              <DollarSign className="h-4 w-4 text-green-400" />
              <span className="text-sm text-muted">
                Profit Margin: <strong className="text-green-400">₹{(Number(editing.price) - Number(editing.meesho_price)).toFixed(2)}</strong>
                {' '}per unit
              </span>
            </div>
          )}

          <div className="flex gap-3 border-t border-gold/15 pt-5">
            <button type="button" onClick={() => setEditing(null)} className="flex-1 rounded-sm border border-gold/25 py-3 text-sm font-semibold text-muted transition-all hover:border-gold/50 hover:text-offwhite">Cancel</button>
            <button type="submit" disabled={saving} className="flex flex-1 items-center justify-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(0,159,227,0.35)] disabled:opacity-60">
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* ============ ORDERS TAB ============ */

function OrdersTab() {
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    const { data, error: fetchError } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
    } else {
      setOrders((data as OrderRow[]).map((o) => ({ ...o, items: typeof o.items === 'string' ? JSON.parse(o.items as unknown as string) : o.items })));
    }
    setLoading(false);
  }, []);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const handleCopyAddress = (order: OrderRow) => {
    const text = `${order.customer_name}\n${order.shipping_address}\n${order.city ?? ''} ${order.pincode ?? ''}\nPhone: ${order.customer_phone}`;
    navigator.clipboard.writeText(text);
    setCopiedId(order.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleStatusChange = async (orderId: string, status: string) => {
    const { error: updateError } = await supabase.from('orders').update({ status }).eq('id', orderId);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    fetchOrders();
  };

  const calculateProfit = (order: OrderRow) => {
    return order.items.reduce((sum, item) => {
      const product = orders.find(() => true);
      return sum + item.price * item.quantity;
    }, 0);
  };

  return (
    <>
      {error && (
        <div className="mb-6 flex items-center justify-between gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-5 py-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
            <p className="text-sm text-red-400">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="text-red-400 hover:text-red-300"><X className="h-4 w-4" /></button>
        </div>
      )}

      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-offwhite">Orders</h1>
        <p className="mt-1 text-sm text-muted">View and manage customer orders.</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20"><p className="text-muted">Loading orders...</p></div>
      ) : orders.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-sm border border-gold/15 bg-navy-800/30 py-20">
          <ShoppingCart className="mb-4 h-10 w-10 text-muted" />
          <p className="text-muted">No orders yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-sm border border-gold/15 bg-navy-800/50 p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                {/* Left: order info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-gold">#{order.id.slice(0, 8).toUpperCase()}</span>
                    <span className={`inline-flex rounded-sm px-2.5 py-1 text-xs font-medium ${ORDER_STATUS_COLORS[order.status] || 'bg-muted/10 text-muted'}`}>
                      {order.status}
                    </span>
                    <span className="text-xs text-muted">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <div>
                      <p className="text-sm font-semibold text-offwhite">{order.customer_name}</p>
                      <p className="text-xs text-muted">{order.customer_phone}</p>
                      {order.customer_email && <p className="text-xs text-muted">{order.customer_email}</p>}
                    </div>
                    <div className="rounded-sm border border-gold/10 bg-navy-900/40 p-3">
                      <p className="text-xs text-muted">{order.shipping_address}</p>
                      <p className="text-xs text-muted">{order.city} {order.pincode}</p>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="mt-3 space-y-2">
                    {order.items.map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="text-offwhite">{item.name}</span>
                          <span className="text-xs text-muted">x{item.quantity}</span>
                          {item.supplier_link && (
                            <a
                              href={item.supplier_link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-1 text-xs text-aqua-light transition-colors hover:text-aqua"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Supplier
                            </a>
                          )}
                        </div>
                        <span className="text-muted">₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex items-center gap-4">
                    <span className="font-display text-lg font-bold text-gradient-gold">
                      Total: ₹{Number(order.total_amount).toFixed(2)}
                    </span>
                    <span className={`rounded-sm px-2 py-0.5 text-xs font-medium ${order.payment_method === 'upi' ? 'bg-aqua/15 text-aqua-light' : 'bg-gold/15 text-gold-light'}`}>
                      {order.payment_method === 'upi' ? 'UPI' : 'COD'}
                    </span>
                  </div>
                </div>

                {/* Right: actions */}
                <div className="flex flex-col gap-2 lg:w-48">
                  <button
                    onClick={() => handleCopyAddress(order)}
                    className={`flex items-center justify-center gap-2 rounded-sm border px-4 py-2.5 text-xs font-semibold transition-all ${
                      copiedId === order.id
                        ? 'border-green-500/40 bg-green-500/10 text-green-400'
                        : 'border-gold/25 text-gold hover:border-gold hover:bg-gold/10'
                    }`}
                  >
                    {copiedId === order.id ? <CheckCircle2 className="h-3.5 w-3.5" /> : <Clipboard className="h-3.5 w-3.5" />}
                    {copiedId === order.id ? 'Copied!' : 'Copy Address'}
                  </button>

                  {order.items.some((item) => item.supplier_link) && (
                    <button
                      onClick={() => {
                        const link = order.items.find((item) => item.supplier_link)?.supplier_link;
                        if (link) window.open(link, '_blank');
                      }}
                      className="flex items-center justify-center gap-2 rounded-sm border border-aqua/40 px-4 py-2.5 text-xs font-semibold text-aqua-light transition-all hover:border-aqua hover:bg-aqua/10"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open Meesho Link
                    </button>
                  )}

                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value)}
                    className="rounded-sm border border-gold/20 bg-navy-900/60 px-3 py-2 text-xs text-offwhite outline-none focus:border-gold/50"
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* ============ SETTINGS TAB ============ */

function SettingsTab() {
  const { settings, loading, refresh } = useStoreSettings();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const payload = {
      upi_id: (formData.get('upi_id') as string) || null,
      qr_code_url: (formData.get('qr_code_url') as string) || null,
      instagram_url: (formData.get('instagram_url') as string) || null,
      facebook_url: (formData.get('facebook_url') as string) || null,
      whatsapp_url: (formData.get('whatsapp_url') as string) || null,
      updated_at: new Date().toISOString(),
    };

    const { error: updateError } = await supabase.from('store_settings').update(payload).eq('id', 1);

    if (updateError) {
      setError(updateError.message);
      setSaving(false);
      return;
    }

    await refresh();
    setSaved(true);
    setSaving(false);
    setTimeout(() => setSaved(false), 3000);
  };

  if (loading) {
    return <div className="flex items-center justify-center py-20"><p className="text-muted">Loading settings...</p></div>;
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-offwhite">Store Settings</h1>
        <p className="mt-1 text-sm text-muted">Configure payment details and social media links.</p>
      </div>

      {error && (
        <div className="mb-6 flex items-center gap-3 rounded-sm border border-red-500/30 bg-red-500/10 px-5 py-4">
          <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-400" />
          <p className="text-sm text-red-400">{error}</p>
        </div>
      )}

      <form onSubmit={handleSave} className="max-w-2xl space-y-8">
        {/* Payment Settings */}
        <div className="rounded-sm border border-gold/15 bg-navy-800/50 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-offwhite">
            <DollarSign className="h-5 w-5 text-gold" />
            Payment Settings
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">UPI ID</label>
              <input
                name="upi_id"
                type="text"
                defaultValue={settings?.upi_id ?? ''}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50"
                placeholder="yourname@upi"
              />
              <p className="mt-1.5 text-xs text-muted">Customers will see this UPI ID during online checkout.</p>
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">QR Code Image URL</label>
              <input
                name="qr_code_url"
                type="url"
                defaultValue={settings?.qr_code_url ?? ''}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50"
                placeholder="https://..."
              />
              <p className="mt-1.5 text-xs text-muted">Upload your UPI QR code image and paste the URL here.</p>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="rounded-sm border border-gold/15 bg-navy-800/50 p-6">
          <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-bold text-offwhite">
            <Instagram className="h-5 w-5 text-gold" />
            Social Media Links
          </h2>

          <div className="space-y-4">
            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Instagram URL</label>
              <input
                name="instagram_url"
                type="url"
                defaultValue={settings?.instagram_url ?? ''}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50"
                placeholder="https://instagram.com/aquavita"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">Facebook URL</label>
              <input
                name="facebook_url"
                type="url"
                defaultValue={settings?.facebook_url ?? ''}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50"
                placeholder="https://facebook.com/aquavita"
              />
            </div>

            <div>
              <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted">WhatsApp URL</label>
              <input
                name="whatsapp_url"
                type="url"
                defaultValue={settings?.whatsapp_url ?? ''}
                className="w-full rounded-sm border border-gold/20 bg-navy-900/60 px-4 py-3 text-sm text-offwhite outline-none focus:border-gold/50"
                placeholder="https://wa.me/7559955088"
              />
            </div>
          </div>
        </div>

        {/* Dispatch notice info */}
        <div className="flex items-center gap-3 rounded-sm border border-aqua/20 bg-aqua/5 px-5 py-4">
          <Truck className="h-5 w-5 flex-shrink-0 text-aqua-light" />
          <p className="text-xs text-muted">
            The shipping dispatch schedule (Sunday &amp; Wednesday) is shown to customers during checkout and on the announcement bar.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 rounded-sm bg-gradient-to-r from-aqua to-aqua-light px-8 py-3 text-sm font-bold text-white transition-all hover:shadow-[0_0_25px_rgba(0,159,227,0.35)] disabled:opacity-60"
          >
            <Save className="h-4 w-4" />
            {saving ? 'Saving...' : 'Save Settings'}
          </button>
          {saved && (
            <span className="flex items-center gap-2 text-sm font-semibold text-green-400">
              <CheckCircle2 className="h-4 w-4" />
              Settings saved!
            </span>
          )}
        </div>
      </form>
    </>
  );
}
