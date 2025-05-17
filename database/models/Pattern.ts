import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Pattern extends Realm.Object {
  id!: string;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Pattern',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
    },
  };

}

export default Pattern;