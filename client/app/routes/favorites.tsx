import {json, type LoaderFunctionArgs} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import {
  CacheShort,
  CacheNone,
  Pagination,
  getPaginationVariables,
} from '@shopify/hydrogen';
import {ProductsGrid} from '~/components/ProductsGrid';
import {PRODUCT_ITEM_FRAGMENT} from '~/lib/fragments';
import {FAVORITES_QUERY} from '~/lib/queries';
import type {ProductItemFragment} from 'storefrontapi.generated';
import type {Favorite} from '~/__generated__/graphql';
import {userId} from '~/utils/user-cookie';
import {readCookie} from '~/utils/cookie';

// Fetch and return API data with a Remix loader function
export async function loader({request, context}: LoaderFunctionArgs) {
  const {storefront, favoritesAPI} = context;

  // Get all Cookies and read the cookie value called user-id
  const cookieHeader = request.headers.get('Cookie');
  const identifier = await readCookie(userId, cookieHeader);

  // We pull all the favorites products from the Nodejs microservice
  const {favorites} = (await favoritesAPI.query(FAVORITES_QUERY, {
    variables: {
      user: identifier,
    },
    cache: CacheNone(),
  })) as {favorites: Favorite[]};

  // From here, we employs Array.reduce to build the inputs for our GraphQL
  // mutation which was build through GraphQL Aliases approach
  const ids = favorites.map((el) => el.productId);

  if (!ids.length) {
    return json({products: []});
  }

  const variables = ids.reduce((a, v, i) => {
    return {
      ...a,
      [`productId${i}`]: v,
    };
  }, {});

  // we employ GraphQL aliases for executing one single request to pull the
  // rest of the favorite product data instead of multiple single requests,
  // it'd mean one request per each favorite product to get the rest of the data
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
      {products.length > 0 ? (
        <ProductsGrid products={products} />
      ) : (
        <>
          <p>Opps! You have no favorites</p>
        </>
      )}
    </div>
  );
}

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
