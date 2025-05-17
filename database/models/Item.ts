import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { MainCategory } from './MainCategory';
import { Category } from './Category';
import { Color } from './Color';
import { Cut } from './Cut';
import { Textile } from './Textile';
import { Occasion } from './Occasion';

export class Item extends Realm.Object {
  id!: string;
  item_name?: string;
  image_uri?: string;
  main_category?: Realm.Object<MainCategory>;
  category?: Realm.Object<Category>;
  colors?: Realm.List<Color>;
  cuts?: Realm.List<Cut>;
  textiles?: Realm.List<Textile>;
  comfort?: number;
  occasions?: Realm.List<Occasion>;

  static schema: ObjectSchema = {
    name: 'Item',
    primaryKey: 'id',
    properties: {
      id: 'string',
      item_name: 'string?',
      image_uri: 'string?',
      main_category: 'MainCategory?',
      category: 'Category?',
      colors: 'Color[]',
      cuts: 'Cut[]',
      textiles: 'Textile[]',
      comfort: 'int?',
      occasions: 'Occasion[]',
    },
  };

}

export default Item;