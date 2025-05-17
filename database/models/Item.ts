import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { MainCategory } from './MainCategory';
import { Category } from './Category';
import { Color } from './Color';
import { Pattern } from './Pattern';
import { Fit } from './Fit';
import { Cut } from './Cut';
import { Textile } from './Textile';
import { Occasion } from './Occasion';
import { FeelIn } from './FeelIn';

export class Item extends Realm.Object {
  id!: string;
  item_name?: string;
  image_uri?: string;
  main_category?: Realm.Object<MainCategory>;
  category?: Realm.Object<Category>;
  colors?: Realm.List<Color>;
  patterns?: RealmList<Pattern>;
  fits?: RealmList<Fit>;
  cuts?: Realm.List<Cut>;
  textiles?: Realm.List<Textile>;
  comfort?: number;
  occasions?: Realm.List<Occasion>;
  feel_in?: Realm.Object<FeelIn>;

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
      patterns: 'Pattern[]',
      fits: 'Fit[]',
      cuts: 'Cut[]',
      textiles: 'Textile[]',
      comfort: 'int?',
      occasions: 'Occasion[]',
      feel_in: 'FeelIn[]',
    },
  };

}

export default Item;