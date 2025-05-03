import Realm from 'realm';
import { ItemSchema, CategorySchema, CutSchema, ColorSchema, TextileSchema, OccasionSchema } from './schema';

export const getRealm = async () => {
  return await Realm.open({
    schema: [ItemSchema, CategorySchema, CutSchema, ColorSchema, TextileSchema, OccasionSchema],
    schemaVersion: 1,
  });
};
