import { log } from '@core/logger';
import { PageNotFound } from '@core/ui/components/pageNotFound';
import { useRouteError } from 'react-router-dom';

interface ErrorResponse {
  data: string;
  status?: number;
  statusText: string;
  error?: {
    message?: string;
  };
}

export default function ErrorBoundary(): JSX.Element {
  const error = useRouteError() as ErrorResponse;

  if (error?.error?.message && error?.error?.message?.includes('Failed to fetch dynamically imported module')) {
    log('info', 'Error Occured - Failed to fetch dynamically imported module');
    window.location.reload();
  }

  if (error?.status === 404) {
    return <PageNotFound />;
  }

  log('error', error);

  return (
    <div id='error-page'>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.data || error?.error?.message}</i>
      </p>
    </div>
  );
}
