import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Cut } from './Cut';
import { MainCategory } from './MainCategory';

export class Category extends Realm.Object {
  id!: string;
  name!: string;
  main_category: Realm.Object<MainCategory>;
  cuts: Realm.List<Cut>;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      main_category: 'MainCategory',
      cuts: 'Cut[]',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Category;