/*
# Refresh schema cache for store_settings table

The store_settings table already exists but the Supabase schema cache
may be stale, causing "Could not find the table" errors from the client.
This migration touches the table's comment to force a schema cache refresh.
*/

COMMENT ON TABLE store_settings IS 'Store-wide admin settings: UPI payment, QR code, and social media links. Single-row table (id=1).';
