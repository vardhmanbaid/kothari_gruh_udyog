import { envConfig } from '@core/envconfig';
import { FETCH_ITEM_LIST } from '@core/graphql';
import { httpRequest } from '@core/utils';

export const fetchProducts = async ({ pageParam = null, queryKey }: any) => {
  try {
    let [_key, { search, is_admin }] = queryKey;
    let filter: any = {
      is_active: {
        eq: true,
      },
    };
    if (is_admin) delete filter.is_active;
    if (search) {
      filter['name'] = {
        ilike: `%${search}%`,
      };
    }
    let response = await httpRequest(
      'post',
      envConfig.api_url,
      {
        query: FETCH_ITEM_LIST,
        variables: {
          limit: 20,
          filter,
          order: [{ name: 'AscNullsLast' }],
          cursor: pageParam,
        },
      },
      {
        headers: {
          Apikey: import.meta.env.VITE_SUPABASE_API_KEY,
        },
      }
    );
    const { data, errors } = response.data;
    if (Array.isArray(errors)) return Promise.reject(new Error(errors?.[0]?.message ?? 'Something went wrong!'));
    return data;
  } catch (err: any) {
    throw new Error(err?.message);
  }
};
