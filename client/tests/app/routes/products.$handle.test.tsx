import {describe, test} from 'vitest';
import {json} from '@remix-run/node';
import {createRemixStub} from '@remix-run/testing';
import {render, screen, waitFor} from '@testing-library/react';
import Product from '~/routes/products.$handle';
import {
  favoriteSample,
  productSample,
  variantsSample,
} from '../../fixtures/loader-data';

describe('Product Detail Handle Test Suite', () => {
  test('Render successfully the button Add to Favorites', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Product,
        loader() {
          return json({
            product: productSample,
            variants: variantsSample,
            favorite: undefined,
          });
        },
      },
    ]);

    render(<RemixStub />);
    await waitFor(() => screen.findByText(/add to favorites/i));
  });

  test('Render successfully the button Remove from Favorites', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Product,
        loader() {
          return json({
            product: productSample,
            variants: variantsSample,
            favorite: favoriteSample,
          });
        },
      },
    ]);

    render(<RemixStub />);
    await waitFor(() => screen.findByText(/remove from favorites/i));
  });
});
