import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

import { Category } from './Category';

export class Cut extends Realm.Object {
  id!: string;
  name!: string;
  categories: Realm.List<Category>;
  is_custom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Cut',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      categories: 'Category[]',
      is_custom: 'bool',
      usage_count: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Cut;