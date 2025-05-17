import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class FeelIn extends Realm.Object {
  id!: string;
  name!: string;

  static schema: ObjectSchema = {
    name: 'FeelIn',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
    },
  };

}

export default FeelIn;