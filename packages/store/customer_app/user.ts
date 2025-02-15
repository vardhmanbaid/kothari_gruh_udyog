import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session } from '@supabase/auth-js';
import { supabaseClient } from './supabase';

export interface UserProps {
  session?: Session | null;
  setSession: (session: Session | null) => void;
  checkSession: () => Promise<Boolean>;
}

export const useUser = create<UserProps>()(
  persist(
    (set, get) => ({
      setSession: (session) => {
        set({
          session,
        });
      },
      checkSession: async () => {
        const {
          data: { session: supaSession },
          error,
        } = await supabaseClient.auth.getSession();

        if (supaSession) {
          get().setSession(supaSession);
          return true;
        }
        return false;
      },
    }),
    {
      name: 'user',
    }
  )
);
