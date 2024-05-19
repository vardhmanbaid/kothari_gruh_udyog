import { QueryClient, QueryKey } from '@tanstack/react-query';
import { AxiosRequestConfig } from 'axios';

import { httpRequest } from './axios';

interface QueryFnProps {
  queryKey: QueryKey;
}

export const defaultQueryFn = async ({ queryKey }: QueryFnProps) => {
  const method = (queryKey[1] ? 'post' : undefined) as AxiosRequestConfig['method'];
  return httpRequest(
    method,
    queryKey[0] as AxiosRequestConfig['url'],
    queryKey[1],
    queryKey[3] as Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>,
    queryKey[2] as boolean
  );
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: defaultQueryFn,
    },
  },
});
