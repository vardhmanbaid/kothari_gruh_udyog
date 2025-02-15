import { webRoutes } from '@core/routes';
import { useSupabase, useUser } from '@core/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  const supabase = useSupabase((state) => state.supabase);
  const [checkSession, setSession] = useUser((state) => [state.checkSession, state.setSession]);

  useEffect(() => {
    const sessionChecker = async () => {
      try {
        if (await checkSession()) {
          setShowComponent(true);
          navigate(webRoutes.editableProducts);
        } else {
          navigate(webRoutes.admin);
        }
      } catch (error) {
        console.error('Error checking session:', error);
        navigate(webRoutes.admin);
      }
    };

    sessionChecker();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, supaSession) => {
      if (event === 'SIGNED_OUT') {
        navigate(webRoutes.admin);
      } else if (supaSession) {
        setSession(supaSession);
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
