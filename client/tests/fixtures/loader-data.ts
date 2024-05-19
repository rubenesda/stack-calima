import type {
  ProductItemFragment,
  ProductQuery,
  ProductVariantsQuery,
} from 'storefrontapi.generated';
import type {Favorite} from '~/__generated__/graphql';

export const productSample: ProductQuery['product'] = {
  id: 'product01-id',
  description: 'Little description',
  descriptionHtml: '<p>Little description</p>',
  title: 'Product 01',
  handle: '/product-handle01',
  vendor: '',
  seo: {
    description: '',
    title: '',
  },
  options: [
    {
      name: 'Size',
      values: ['S'],
    },
  ],
  variants: {
    nodes: [
      {
        id: 'variant01-id',
        title: 'Variant 01',
        sku: 'variantsku01',
        availableForSale: true,
        price: {
          amount: '100.00',
          currencyCode: 'USD',
        },
        product: {
          title: 'Product01',
          handle: '/product-handle-01',
        },
        selectedOptions: [
          {
            name: 'Size',
            value: 'S',
          },
        ],
      },
    ],
  },
  selectedVariant: {
    id: 'variant01-id',
    sku: 'variantsku01',
    title: 'Variant 01',
    price: {
      amount: '100.00',
      currencyCode: 'USD',
    },
    product: {
      title: 'Product 01',
      handle: '/product-handle01',
    },
    selectedOptions: [
      {
        name: 'Size',
        value: 'S',
      },
    ],
    availableForSale: true,
  },
};

export const variantsSample: any = {
  nodes: [
    {
      id: 'variant01-id',
      title: 'Variant 01',
      sku: 'variantsku01',
      availableForSale: true,
      price: {
        amount: '100.00',
        currencyCode: 'USD',
      },
      product: {
        title: 'Product01',
        handle: '/product-handle-01',
      },
      selectedOptions: [
        {
          name: 'Size',
          value: 'S',
        },
      ],
    },
  ],
};

export const favoriteSample: Favorite = {
  id: 'favorite01-id',
  productId: 'product01-id',
  user: 'user01',
};

export const favoriteProductsSample: ProductItemFragment[] = [
  {
    id: 'product01-id',
    title: 'Product01',
    handle: '/product01-handle',
    priceRange: {
      minVariantPrice: {
        amount: '100.0',
        currencyCode: 'USD',
      },
      maxVariantPrice: {
        amount: '120.0',
        currencyCode: 'USD',
      },
    },
    variants: {
      nodes: [
        {
          selectedOptions: [
            {
              name: 'Size',
              value: 'S',
            },
          ],
        },
      ],
    },
  },
];
