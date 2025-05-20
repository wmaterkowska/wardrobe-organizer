import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Color extends Realm.Object {
  id!: string;
  name?: string;
  color_code!: string;
  isCustom!: boolean;
  usageCount?: number;

  static schema: ObjectSchema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string?',
      color_code: 'string',
      isCustom!: 'bool',
      usageCount?: {type: 'int', optional: true, default: 0},
    },
  };

}

export default Color;