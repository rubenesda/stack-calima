import { Schema, model } from 'mongoose';

export interface IFavoriteModel {
  productId: string;
  user: string;
}

const FavoriteSchema = new Schema<IFavoriteModel>({
  productId: {
    type: String,
  },
  user: {
    type: String,
  },
}, {
  timestamps: true,
});

export const Favorite = model('favorite', FavoriteSchema);