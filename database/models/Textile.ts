import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Textile extends Realm.Object {
  id!: string;
  name!: string;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Textile',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Textile;