import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Category } from './Category';

export class Cut extends Realm.Object {
  id!: string;
  name!: string;
  categories: Realm.List<Category>;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Cut',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      categories: 'Category[]',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Cut;