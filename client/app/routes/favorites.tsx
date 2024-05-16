import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  CacheShort,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {ProductsGrid} from '~/components/ProductsGrid';
import {PRODUCT_ITEM_FRAGMENT} from '~/lib/fragments';
import type {ProductItemFragment} from 'storefrontapi.generated';
import type {Favorite} from '~/__generated__/graphql';

// Fetch and return API data with a Remix loader function
export async function loader({context}: any) {
  const {storefront, thirdParty} = context;

  const {favorites} = (await thirdParty.query(FAVORITES_QUERY, {
    cache: CacheShort(),
  })) as {favorites: Favorite[]};

  const ids = favorites.map((el) => el.productId);

  const variables = ids.reduce((a, v, i) => {
    return {
      ...a,
      [`productId${i}`]: v,
    };
  }, {});

  const result = await storefront.query(PRODUCT_FAVORITES_QUERY(ids), {
    variables: {...variables},
  });

  const products = Object.values<ProductItemFragment>(result);

  return json({products});
}

export default function Favorites() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div>
      <h1>Favorites List Page</h1>
      <p className="collection-description">
        This is a collection of favorites added by the customer
      </p>
      <ProductsGrid products={products} />
    </div>
  );
}

// Query the API for a list of characters
const FAVORITES_QUERY = `#graphql:thirdParty
  query {
    favorites {
      id
      productId
    }
  }
`;

// Query with aliases
const PRODUCT_FAVORITES_QUERY = (productIds: string[]) => `#graphql
  ${PRODUCT_ITEM_FRAGMENT}
  query productsQuery(
    ${productIds.map((_, idx) => `$productId${idx}: ID!`).join(',\n')}
  ) {
    ${productIds.map(
      (_, idx) => `
        product${idx}: product(id: $productId${idx}) {
          ...ProductItem
        }
      `,
    )}
  }
`;
