import {createWithCache, CacheLong, type WithCache} from '@shopify/hydrogen';

type AllCacheOptions = Parameters<WithCache>[1];

/**
 * This creates a client for Favorite API
 * @param - This is an Obeject that will contains some Remix's elements
 * @returns - JSON Object with the Body data from Favorite API
 */
export function createFavoritesClient({
  cache,
  waitUntil,
  favoriteToken,
}: {
  cache: Cache;
  waitUntil: ExecutionContext['waitUntil'];
  favoriteToken: string;
}) {
  const withCache = createWithCache({cache, waitUntil});

  async function query<T = any>(
    query: `#graphql:favoritesAPI${string}`,
    options: {
      variables?: object;
      cache: AllCacheOptions;
    } = {variables: {}, cache: CacheLong()},
  ) {
    return withCache(
      ['r&m', query, JSON.stringify(options.variables)],
      options.cache,
      async function () {
        // call to the API
        const response = await fetch('http://localhost:4000', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${favoriteToken}`,
          },
          body: JSON.stringify({
            query,
            variables: options.variables,
          }),
        });

        if (!response.ok) {
          throw new Error(
            `Error fetching from third-party api: ${response.statusText}`,
          );
        }

        const json = await response.json<{data: T; error: string}>();

        return json.data;
      },
    );
  }

  return {query};
}
