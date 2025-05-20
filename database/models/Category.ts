import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Cut } from './Cut';
import { MainCategory } from './MainCategory';

export class Category extends Realm.Object {
  id!: string;
  name!: string;
  main_category: Realm.Object<MainCategory>;
  cuts: Realm.List<Cut>;
  is_custom!: boolean;
  usage_count?: number;

  static schema: ObjectSchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      main_category: 'MainCategory',
      cuts: 'Cut[]',
      is_custom: 'bool',
      usage_count: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Category;