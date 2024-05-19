import { webRoutes } from '@core/routes';
import { useUser } from '@core/store';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PrivateRouter(props: { children: JSX.Element }) {
  const { children } = props;
  const navigate = useNavigate();
  const [showComponent, setShowComponent] = useState(false);
  const session = useUser((state) => state.session);

  useEffect(() => {
    // Not logged in
    if (!session?.access_token) {
      navigate(webRoutes.admin);
    }
    // Already logged in
    if (session?.access_token) {
      navigate(webRoutes.editableProducts);
    }
    setShowComponent(true);
  }, []);

  if (showComponent) {
    return children;
  }
  return null;
}

export { PrivateRouter };
