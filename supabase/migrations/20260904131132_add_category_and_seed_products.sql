/*
# Add category column and seed catalog products

## Purpose
Adds a `category` column to the `products` table to support filtering products
by "fish-food" or "accessories" on the redesigned homepage. Seeds the catalog
with sample products in both categories so the storefront has content to display.

## Changes to existing tables
- `products`: adds `category` (text, not null, default 'fish-food')
  - Values: 'fish-food' (Fish Food & Nutrition) or 'accessories' (Aquarium Accessories)

## New data
- Inserts 8 products across both categories:
  - Fish Food: Premium Prawn Bites, Spirulina Flakes, Protein Pellets, Freeze-Dried Bloodworms
  - Accessories: AquaFilter Pro, LED Light Bar, Ultra-Quiet Pump, Aquarium Maintenance Kit

## Security
- No RLS policy changes. Existing policies remain valid — the new column is
  covered by the existing SELECT (public read) and authenticated write policies.
*/

-- Add category column
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM information_schema.columns
    WHERE table_name = 'products' AND column_name = 'category') THEN
    ALTER TABLE products ADD COLUMN category text NOT NULL DEFAULT 'fish-food';
  END IF;
END $$;

-- Create index for category filtering
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);

-- Seed products
-- Fish Food & Nutrition
INSERT INTO products (name, tagline, description, price, image_url, badge, stock, is_active, category)
VALUES
  (
    'AQUAVITA Premium Prawn Bites',
    '100% Natural Dried Prawns',
    '100% natural dried prawns, rich in protein and essential nutrients. Designed to support healthy growth, vibrant colors and overall vitality in aquarium fish.',
    24.99,
    'https://images.pexels.com/photos/33211050/pexels-photo-33211050.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'Best Seller',
    150,
    true,
    'fish-food'
  ),
  (
    'Spirulina Super Flakes',
    'Plant-Based Color Enhancer',
    'Premium spirulina flakes packed with natural color-enhancing pigments. Supports immune health and brings out vivid blues, reds, and yellows in tropical fish.',
    18.99,
    'https://images.pexels.com/photos/5537639/pexels-photo-5537639.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'New Arrival',
    200,
    true,
    'fish-food'
  ),
  (
    'High-Protein Daily Pellets',
    'Slow-Sinking Nutrition',
    'Nutrient-dense slow-sinking pellets formulated for mid-water and bottom-feeding fish. Balanced protein, vitamins, and minerals for daily feeding.',
    16.99,
    'https://images.pexels.com/photos/36186523/pexels-photo-36186523.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    null,
    180,
    true,
    'fish-food'
  ),
  (
    'Freeze-Dried Bloodworms',
    'Natural Treat, Protein-Rich',
    'Premium freeze-dried bloodworms — a high-protein natural treat that fish love. Cleaned and sterilized for safe daily or occasional feeding.',
    14.99,
    'https://images.pexels.com/photos/23692726/pexels-photo-23692726.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    null,
    120,
    true,
    'fish-food'
  )
ON CONFLICT DO NOTHING;

-- Aquarium Accessories
INSERT INTO products (name, tagline, description, price, image_url, badge, stock, is_active, category)
VALUES
  (
    'AquaFilter Pro 300',
    '3-Stage Canister Filter',
    'High-performance 3-stage canister filter with mechanical, biological, and chemical filtration. Ultra-quiet operation for tanks up to 75 gallons. Includes all filter media.',
    89.99,
    'https://images.pexels.com/photos/12726229/pexels-photo-12726229.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'Top Rated',
    45,
    true,
    'accessories'
  ),
  (
    'AquaGlow LED Light Bar',
    'Full-Spectrum Aquarium Light',
    'Full-spectrum LED light bar with adjustable brightness and color temperature. Promotes healthy plant growth and brings out the natural colors of your fish. Waterproof design.',
    54.99,
    'https://images.pexels.com/photos/5400775/pexels-photo-5400775.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    null,
    80,
    true,
    'accessories'
  ),
  (
    'Ultra-Quiet Air Pump',
    'Oxygen Booster for Healthy Tanks',
    'Energy-efficient air pump with ultra-quiet operation. Provides consistent oxygenation for tanks up to 50 gallons. Includes tubing and air stone.',
    29.99,
    'https://images.pexels.com/photos/10290625/pexels-photo-10290625.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    null,
    100,
    true,
    'accessories'
  ),
  (
    'Aquarium Maintenance Kit',
    'Everything You Need to Clean',
    'Complete maintenance kit includes gravel vacuum, algae scraper, glass cleaner, and trimming scissors. Keeps your aquarium crystal clear with minimal effort.',
    39.99,
    'https://images.pexels.com/photos/3971211/pexels-photo-3971211.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    'Value Pack',
    60,
    true,
    'accessories'
  )
ON CONFLICT DO NOTHING;
