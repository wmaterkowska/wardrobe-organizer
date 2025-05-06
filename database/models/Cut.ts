import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Category } from './Category';

export class Cut extends Realm.Object {
  id!: string;
  cut_name!: string;
  categories: Realm.List<Category>;

  static schema: ObjectSchema = {
    name: 'Cut',
    primaryKey: 'id',
    properties: {
      id: 'string',
      cut_name: 'string',
      categories: 'Category[]'
    },
  };

}

export default Cut;