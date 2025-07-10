import { Outfit } from '../database/models/Outfit';

export const updateOutfitField = (realm: Realm, outfit: Outfit, updates: Partial<Outfit>) => {
  realm.write(() => {
    Object.assign(outfit, updates);
  });
};
