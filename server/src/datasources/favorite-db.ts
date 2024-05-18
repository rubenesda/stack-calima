import { Favorite } from '../models';
import type { IFavoriteModel } from '../models';

export class FavoriteDataSource {
  async getFavorites(user: string) {
    return await Favorite.find({ user });
  }

  async createFavorite(favoriteItem: IFavoriteModel) {
    return await Favorite.create(favoriteItem);
  }

  async deleteFavorite(id: string) {
    try {
      await Favorite.deleteOne({ _id: id });
    } catch (error) {
      console.log('Error delete', error );
      return false;
    }
    return true;
  }
}
