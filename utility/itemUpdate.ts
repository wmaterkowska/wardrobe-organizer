import { Item } from '../database/models/Item';

export const updateItemField = (realm: Realm, item: Item, updates: Partial<Item>) => {
  realm.write(() => {
    Object.assign(item, updates);
  });
};
