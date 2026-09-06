/*
# Create product-images storage bucket

## Purpose
Creates a public Supabase Storage bucket so the admin panel can upload product
images directly from the device gallery, and the storefront can display them.

## Changes
1. New storage bucket:
   - `product-images` (public = true) — anyone can read uploaded images via the
     public URL; only authenticated admins can upload or overwrite files.

2. Storage policies (RLS on storage.objects):
   - SELECT (public read): anon + authenticated can read any object in the bucket.
   - INSERT (upload): authenticated only — admin must be signed in.
   - UPDATE (overwrite): authenticated only.
   - DELETE: authenticated only.

## Notes
1. The bucket is public, so uploaded image URLs are accessible without a signed
   URL — the frontend stores the public URL in `products.image_url`.
2. Uploads are restricted to authenticated sessions (admin only).
*/

INSERT INTO storage.buckets (id, name, public)
VALUES ('product-images', 'product-images', true)
ON CONFLICT (id) DO NOTHING;

-- Public read: anyone can view product images
DROP POLICY IF EXISTS "public_read_product_images" ON storage.objects;
CREATE POLICY "public_read_product_images"
ON storage.objects FOR SELECT
TO anon, authenticated
USING (bucket_id = 'product-images');

-- Authenticated upload: only signed-in admins can upload
DROP POLICY IF EXISTS "auth_upload_product_images" ON storage.objects;
CREATE POLICY "auth_upload_product_images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images');

-- Authenticated update: only signed-in admins can overwrite
DROP POLICY IF EXISTS "auth_update_product_images" ON storage.objects;
CREATE POLICY "auth_update_product_images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images') WITH CHECK (bucket_id = 'product-images');

-- Authenticated delete: only signed-in admins can delete
DROP POLICY IF EXISTS "auth_delete_product_images" ON storage.objects;
CREATE POLICY "auth_delete_product_images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images');