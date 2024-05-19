import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Session, User } from '@supabase/auth-js';

export interface UserProps {
  session?: Session | null;
  setSession: (session: Session | null) => void;
}

export const useUser = create<UserProps>()(
  persist(
    (set) => ({
      setSession: (session) => {
        set({
          session,
        });
      },
    }),
    {
      name: 'user',
    }
  )
);
