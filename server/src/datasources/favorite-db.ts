import { Favorite } from '../models';
import type { IFavoriteModel } from '../models';

export class FavoriteDataSource {
  async getFavorites() {
    return await Favorite.find({});
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
