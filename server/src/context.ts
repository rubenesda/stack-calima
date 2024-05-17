import { FavoriteDataSource } from './datasources/favorite-db';

export type DataSourceContext = {
  dataSources: {
    favoritesDB: FavoriteDataSource;
  };
};