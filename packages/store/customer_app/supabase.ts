import { create } from 'zustand';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { envConfig } from '@core/envconfig';

export interface supabaseProps {
  supabase: SupabaseClient;
}

export const useSupabase = create<supabaseProps>((set, get) => ({
  supabase: createClient(envConfig.supabaseUrl, envConfig.supabaseApiKey),
}));
