import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

import { localStorageKeys } from '../constants';

/**
 * method The HTTP method (e.g. GET, POST).
 * The URL to send the request to.
 * The data to send with the request (optional).
 * Additional configuration options (optional).
 * A promise that resolves with the response data or rejects with an error.
 */

interface HttpRequestProps {
  (
    method: AxiosRequestConfig['method'],
    url: AxiosRequestConfig['url'],
    data?: AxiosRequestConfig['data'],
    config?: Omit<AxiosRequestConfig, 'method' | 'url' | 'data'>,
    includeToken?: boolean
  ): Promise<AxiosResponse<any, any>>;
}

export const httpRequest: HttpRequestProps = (method = 'get', url, data = null, config, includeToken) => {
  const headers = {
    ...(includeToken && { Authorization: `Bearer ${localStorage.getItem(localStorageKeys.authToken)}` }),
    ...(config?.headers ?? {}),
  };

  return axios({
    method,
    url,
    data,
    headers,
    ...config,
  });
};

// Make a GET request to the /users endpoint with headers
// httpRequest('GET', '/users', null, { headers: { 'X-My-Header': 'My Value' } })
//   .then((data) => {
//     // Handle the response data
//   })
//   .catch((error) => {
//     // Handle the error
//   });
