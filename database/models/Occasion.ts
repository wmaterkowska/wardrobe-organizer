import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Occasion extends Realm.Object {
  id!: string;
  name!: string;
  is_custom!: boolean;
  usage_count?: number;

  static schema: ObjectSchema = {
    name: 'Occasion',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      is_custom: 'bool',
      usage_count: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Occasion;