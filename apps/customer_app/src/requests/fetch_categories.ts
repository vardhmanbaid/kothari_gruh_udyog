import { envConfig } from '@core/envconfig';
import { FETCH_CATEGORY_LIST } from '@core/graphql';
import { httpRequest } from '@core/utils';

export const fetchCategories = async () => {
  let response = await httpRequest(
    'post',
    envConfig.api_url,
    {
      query: FETCH_CATEGORY_LIST,
    },
    {
      headers: {
        Apikey: import.meta.env.VITE_SUPABASE_API_KEY,
      },
    }
  );
  return response.data.data?.categoriesCollection?.edges.map((i: any) => i.node).flat();
};
