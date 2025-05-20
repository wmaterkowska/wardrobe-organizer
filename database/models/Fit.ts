import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Fit extends Realm.Object {
  id!: string;
  name!: string;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Fit',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Fit;