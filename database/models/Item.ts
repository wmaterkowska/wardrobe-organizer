import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Color } from './Color';
import { Textile } from './Textile'
import { Occasion } from './Occasion';

export class Item extends Realm.Object {
  id!: string;
  item_name?: string;
  image_uri?: string;
//   category?: Realm.Object & { category_name: string };
   colors: Realm.List<Color>;
//   cuts!: Realm.List<Realm.Object>; // via linkingObjects
  textiles: Realm.List<Textile>;
  comfort?: number;
  occasions: Realm.List<Occasion>;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: 'string',
      item_name: 'string?',
      image_uri: 'string?',
//       category: 'Category?',
      colors: 'Color[]',
//       cuts: {
//         type: 'linkingObjects',
//         objectType: 'ItemCut',
//         property: 'item',
//       },
      textiles: 'Textile[]',
      comfort: 'int?',
      occasions: 'Occasion[]',

    },
  };

}

export default Item;