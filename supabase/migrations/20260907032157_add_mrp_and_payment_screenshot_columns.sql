-- Add MRP column to products for strikethrough pricing
ALTER TABLE products ADD COLUMN IF NOT EXISTS mrp numeric DEFAULT 0;

-- Add payment screenshot URL column to orders
ALTER TABLE orders ADD COLUMN IF NOT EXISTS payment_screenshot_url text;
