import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Category } from './Category';

export class MainCategory extends Realm.Object {
  id!: string;
  name!: string;
  categories: Realm.List<Category>;

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
      }
    },
  };

}

export default MainCategory;