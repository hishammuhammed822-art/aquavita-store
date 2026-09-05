import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://juihvxzbjxyoewgvwivh.supabase.co';
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp1aWh2eHpianh5b2V3Z3Z3aXZoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg0NDE3NzYsImV4cCI6MjEwNDAxNzc3Nn0.hIaMfge4RNkDeS4biphPdOwF-pg-RcToSU5BnoCi_P0';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});
