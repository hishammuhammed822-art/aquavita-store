/*
# Add dropshipping fields, store settings, and orders tables

## Purpose
Extends the AQUAVITA database to support dropshipping operations and customer orders.

## Changes to existing tables
- `products`: adds four new columns
  - `supplier_link` (text, nullable) — Meesho/supplier product URL for admin reference
  - `meesho_price` (numeric, nullable) — cost price from supplier, used to calculate profit margin
  - `rating` (numeric, default 4.5) — star rating shown on product cards (0-5)
  - `review_count` (integer, default 0) — number of customer reviews shown

## New tables
- `store_settings`: single-row table for admin-configurable store-wide settings
  - `id` (int, primary key, always 1)
  - `upi_id` (text, nullable) — UPI ID for online payments
  - `qr_code_url` (text, nullable) — URL to QR code image for UPI payments
  - `instagram_url` (text, nullable) — Instagram page link
  - `facebook_url` (text, nullable) — Facebook page link
  - `whatsapp_url` (text, nullable) — WhatsApp contact link
  - `updated_at` (timestamptz)

- `orders`: customer orders placed through checkout
  - `id` (uuid, primary key)
  - `customer_name` (text, not null)
  - `customer_phone` (text, not null)
  - `customer_email` (text, nullable)
  - `shipping_address` (text, not null)
  - `city` (text, nullable)
  - `pincode` (text, nullable)
  - `payment_method` (text, not null) — 'cod' or 'upi'
  - `items` (jsonb, not null) — array of {product_id, name, price, quantity, supplier_link}
  - `total_amount` (numeric, not null)
  - `status` (text, default 'pending') — pending, confirmed, shipped, delivered, cancelled
  - `created_at` (timestamptz, default now())

## Security
- `store_settings`: anon can read (needed for checkout UPI display and footer social links); only authenticated (admin) can update.
- `orders`: anon can insert (customers place orders without signing in) and read (for order confirmation); only authenticated (admin) can update/delete.
- No changes to existing product policies.
*/

-- Add new columns to products
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'supplier_link') THEN
    ALTER TABLE products ADD COLUMN supplier_link text;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'meesho_price') THEN
    ALTER TABLE products ADD COLUMN meesho_price numeric(10,2);
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'rating') THEN
    ALTER TABLE products ADD COLUMN rating numeric(2,1) NOT NULL DEFAULT 4.5;
  END IF;
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'review_count') THEN
    ALTER TABLE products ADD COLUMN review_count integer NOT NULL DEFAULT 0;
  END IF;
END $$;

-- Create store_settings table
CREATE TABLE IF NOT EXISTS store_settings (
  id integer PRIMARY KEY DEFAULT 1,
  upi_id text,
  qr_code_url text,
  instagram_url text,
  facebook_url text,
  whatsapp_url text,
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT single_row CHECK (id = 1)
);

ALTER TABLE store_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_store_settings" ON store_settings;
CREATE POLICY "anon_read_store_settings" ON store_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_store_settings" ON store_settings;
CREATE POLICY "auth_update_store_settings" ON store_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_store_settings" ON store_settings;
CREATE POLICY "auth_insert_store_settings" ON store_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- Seed a default settings row
INSERT INTO store_settings (id, upi_id, instagram_url, facebook_url, whatsapp_url)
VALUES (1, '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_phone text NOT NULL,
  customer_email text,
  shipping_address text NOT NULL,
  city text,
  pincode text,
  payment_method text NOT NULL DEFAULT 'cod',
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  total_amount numeric(10,2) NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_orders" ON orders;
CREATE POLICY "anon_read_orders" ON orders FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_orders" ON orders;
CREATE POLICY "anon_insert_orders" ON orders FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_orders" ON orders;
CREATE POLICY "auth_update_orders" ON orders FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_orders" ON orders;
CREATE POLICY "auth_delete_orders" ON orders FOR DELETE
  TO authenticated USING (true);

-- Create index for order sorting
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);
