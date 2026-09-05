export type ProductCategory = 'fish-food' | 'accessories';

export interface Product {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image: string;
  badge?: string | null;
  stock?: number;
  is_active?: boolean;
  category: ProductCategory;
  supplierLink?: string | null;
  meeshoPrice?: number | null;
  rating?: number;
  reviewCount?: number;
}

export interface ProductRow {
  id: string;
  name: string;
  tagline: string;
  description: string;
  price: number;
  image_url: string;
  badge: string | null;
  stock: number;
  is_active: boolean;
  category: ProductCategory;
  supplier_link: string | null;
  meesho_price: number | null;
  rating: number;
  review_count: number;
  created_at: string;
  updated_at: string;
}

export function productRowToProduct(row: ProductRow): Product {
  return {
    id: row.id,
    name: row.name,
    tagline: row.tagline,
    description: row.description,
    price: Number(row.price),
    image: row.image_url,
    badge: row.badge,
    stock: row.stock,
    is_active: row.is_active,
    category: row.category,
    supplierLink: row.supplier_link,
    meeshoPrice: row.meesho_price != null ? Number(row.meesho_price) : null,
    rating: Number(row.rating),
    reviewCount: row.review_count,
  };
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface StoreSettings {
  id: number;
  upi_id: string | null;
  qr_code_url: string | null;
  instagram_url: string | null;
  facebook_url: string | null;
  whatsapp_url: string | null;
  updated_at: string;
}

export interface OrderRow {
  id: string;
  customer_name: string;
  customer_phone: string;
  customer_email: string | null;
  shipping_address: string;
  city: string | null;
  pincode: string | null;
  payment_method: string;
  items: OrderItem[];
  total_amount: number;
  status: string;
  created_at: string;
}

export interface OrderItem {
  product_id: string;
  name: string;
  price: number;
  quantity: number;
  supplier_link?: string | null;
}

export function isOutOfStock(product: Product): boolean {
  return (product.stock != null && product.stock <= 0) || product.is_active === false;
}
