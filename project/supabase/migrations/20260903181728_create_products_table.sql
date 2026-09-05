/*
# Create products table for AQUAVITA e-commerce

## Purpose
Stores product catalog data for the AQUAVITA aquatic nutrition store.
The public homepage reads products to display in the featured product section.
Admins manage products (add, edit, delete, stock/pricing) through the /admin panel.

## New Tables
- `products`
  - `id` (uuid, primary key, auto-generated)
  - `name` (text, not null) — product display name
  - `tagline` (text, not null) — short subtitle shown above product name
  - `description` (text, not null) — full product description
  - `price` (numeric, not null, default 0) — product price in USD
  - `image_url` (text, not null) — URL to product image
  - `badge` (text, nullable) — optional badge label e.g. "Best Seller"
  - `stock` (integer, not null, default 0) — available inventory count
  - `is_active` (boolean, not null, default true) — soft-delete / visibility toggle
  - `created_at` (timestamptz, default now())
  - `updated_at` (timestamptz, default now())

## Security (RLS)
- RLS enabled on `products`.
- SELECT: public (anon + authenticated) — anyone can view active products on the storefront.
- INSERT / UPDATE / DELETE: authenticated only — admin operations require a signed-in session.
  These write policies use `TO authenticated` so only logged-in admins can modify the catalog.
  There is no per-user ownership restriction since this is an admin-managed catalog, not user-scoped data.

## Notes
1. The public storefront reads via the anon key, so the SELECT policy MUST include `anon`.
2. Admin write operations go through the authenticated Supabase client (after email/password sign-in).
3. `is_active = false` acts as a soft delete — inactive products won't show on the storefront.
*/

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  tagline text NOT NULL,
  description text NOT NULL,
  price numeric(10, 2) NOT NULL DEFAULT 0,
  image_url text NOT NULL,
  badge text,
  stock integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Public can read all products (storefront display)
DROP POLICY IF EXISTS "public_read_products" ON products;
CREATE POLICY "public_read_products"
ON products FOR SELECT
TO anon, authenticated
USING (true);

-- Only authenticated admins can insert
DROP POLICY IF EXISTS "admin_insert_products" ON products;
CREATE POLICY "admin_insert_products"
ON products FOR INSERT
TO authenticated
WITH CHECK (true);

-- Only authenticated admins can update
DROP POLICY IF EXISTS "admin_update_products" ON products;
CREATE POLICY "admin_update_products"
ON products FOR UPDATE
TO authenticated
USING (true) WITH CHECK (true);

-- Only authenticated admins can delete
DROP POLICY IF EXISTS "admin_delete_products" ON products;
CREATE POLICY "admin_delete_products"
ON products FOR DELETE
TO authenticated
USING (true);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS products_updated_at ON products;
CREATE TRIGGER products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
