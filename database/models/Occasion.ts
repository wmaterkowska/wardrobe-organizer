import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Occasion extends Realm.Object {
  id!: string;
  name!: string;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Occasion',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Occasion;