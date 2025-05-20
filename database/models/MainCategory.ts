import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Category } from './Category';

export class MainCategory extends Realm.Object {
  id!: string;
  name!: string;
  categories: Realm.List<Category>;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'MainCategory',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      categories: {
        type: 'linkingObjects',
        objectType: 'Category',
        property: 'main_category',
      },
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default MainCategory;