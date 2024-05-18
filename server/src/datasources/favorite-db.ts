import { Favorite } from '../models';
import type { IFavoriteModel } from '../models';

export class FavoriteDataSource {
  getFavorites(user: string) {
    return Favorite.find({ user });
  }

  createFavorite(favoriteItem: IFavoriteModel) {
    return Favorite.create(favoriteItem);
  }

  deleteFavorite(id: string) {
    return Favorite.deleteOne({ _id: id });
  }
}
