import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Cut } from './Cut';

export class Category extends Realm.Object {
  id!: string;
  name!: string;
  cuts: Realm.List<Cut>;

  static schema: ObjectSchema = {
    name: 'Category',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      cuts: 'Cut[]'
    },
  };

}

export default Category;