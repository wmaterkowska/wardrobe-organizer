import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Fit extends Realm.Object {
  id!: string;
  name!: string;

  static schema: ObjectSchema = {
    name: 'Fit',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
    },
  };

}

export default Fit;