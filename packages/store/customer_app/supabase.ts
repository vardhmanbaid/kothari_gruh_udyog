import { create } from 'zustand';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { envConfig } from '@core/envconfig';

export interface supabaseProps {
  supabase: SupabaseClient;
}

export const supabaseClient = createClient(envConfig.supabaseUrl, envConfig.supabaseApiKey);

export const useSupabase = create<supabaseProps>((set, get) => {
  return { supabase: supabaseClient };
});
