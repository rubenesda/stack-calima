import {describe, test} from 'vitest';
import {json} from '@remix-run/node';
import {createRemixStub} from '@remix-run/testing';
import {render, screen, waitFor} from '@testing-library/react';
import Favorites from '~/routes/favorites';
import {favoriteProductsSample} from '../../fixtures/loader-data';

describe('Favorites List Page Test Suite', () => {
  test('Render successfully with 0 favorites', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Favorites,
        loader() {
          return json({products: []});
        },
      },
    ]);

    render(<RemixStub />);

    await waitFor(() => screen.findByText(/favorites\slist\spage/i));
    await waitFor(() => screen.findByText(/you have no favorites/i));
  });

  test('Render successfully 1 favorite', async () => {
    const RemixStub = createRemixStub([
      {
        path: '/',
        Component: Favorites,
        loader() {
          return json({products: favoriteProductsSample});
        },
      },
    ]);

    render(<RemixStub />);

    await waitFor(() => screen.findByText(/product01/i));
  });
});
