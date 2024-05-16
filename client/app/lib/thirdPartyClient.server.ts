import {createWithCache, CacheLong} from '@shopify/hydrogen';

export function createThirdPartyClient({cache, waitUntil}: any) {
  const withCache = createWithCache({cache, waitUntil});

  async function query(
    query: any,
    options = {variables: {}, cache: CacheLong()},
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

        const json = (await response.json()) as any;

        return json.data;
      },
    );
  }

  return {query};
}
