import Realm from 'realm';
import * from './schema';

export const getRealm = async () => {
  return await Realm.open({
    schema: [ItemSchema, CategorySchema, CutSchema, ColorSchema, TextileSchema, OccasionSchema],
    schemaVersion: 1,
  });
};
