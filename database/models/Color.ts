import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Color extends Realm.Object {
  id!: string;
  name?: string;
  color_code!: string;

  static schema: ObjectSchema = {
    name: 'Color',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string?',
      color_code: 'string',
    },
  };

}

export default Color;