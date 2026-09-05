import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import { supabase } from '@/lib/supabase';
import type { StoreSettings } from '@/types';

interface StoreSettingsContextValue {
  settings: StoreSettings | null;
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
}

const StoreSettingsContext = createContext<StoreSettingsContextValue | undefined>(undefined);

export function StoreSettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = useCallback(async () => {
    const { data, error: fetchError } = await supabase
      .from('store_settings')
      .select('*')
      .eq('id', 1)
      .maybeSingle();
    if (fetchError) {
      setError(fetchError.message);
    } else if (data) {
      setSettings(data as StoreSettings);
      setError(null);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <StoreSettingsContext.Provider value={{ settings, loading, error, refresh }}>
      {children}
    </StoreSettingsContext.Provider>
  );
}

export function useStoreSettings() {
  const ctx = useContext(StoreSettingsContext);
  if (!ctx) throw new Error('useStoreSettings must be used within StoreSettingsProvider');
  return ctx;
}
