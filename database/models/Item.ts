import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Item extends Realm.Object {
  id!: string;
  item_name!: string;
  image_uri?: string;
//   category?: Realm.Object & { category_name: string };
//   colors!: Realm.List<Realm.Object>;
//   textiles!: Realm.List<Realm.Object>;
//   comfort?: number;
//   occasions!: Realm.List<Realm.Object>;
//   cuts!: Realm.List<Realm.Object>; // via linkingObjects

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: 'string',
      item_name: 'string',
      image_uri: 'string?',
//       category: 'Category?',
//       colors: 'Color[]',
//       textiles: 'Textile[]',
//       comfort: 'int?',
//       occasions: 'Occasion[]',
//       cuts: {
//         type: 'linkingObjects',
//         objectType: 'ItemCut',
//         property: 'item',
//       },
    },
  };

}

export default Item;