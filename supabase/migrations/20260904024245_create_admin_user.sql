/*
# Create admin user for AQUAVITA admin panel

## Purpose
Creates the initial admin user in auth.users so the /admin login works.
The auth.users table is currently empty, causing all login attempts to fail
with "Invalid login credentials."

## What this does
1. Inserts a user into auth.users with email admin@aquavita.com
2. Password is hashed using bcrypt (via Supabase's built-in auth schema)
3. Email confirmation is bypassed (email_confirmed_at is set to now())
4. Uses a DO block to avoid duplicate inserts on re-run

## Credentials
- Email: admin@aquavita.com
- Password: AquaVita2026!

## Security
- This only creates the initial admin. Additional admins should be created
  through the Supabase dashboard or the auth admin API.
*/

DO $$
BEGIN
  -- Only insert if the user doesn't already exist
  IF NOT EXISTS (SELECT 1 FROM auth.users WHERE email = 'admin@aquavita.com') THEN
    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      email_confirmed_at,
      encrypted_password,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token,
      email_change_token_new,
      email_change
    ) VALUES (
      '00000000-0000-0000-0000-000000000000',
      gen_random_uuid(),
      'authenticated',
      'authenticated',
      'admin@aquavita.com',
      now(),
      crypt('AquaVita2026!', gen_salt('bf', 10)),
      now(),
      now(),
      '',
      '',
      '',
      ''
    );
  END IF;
END $$;
