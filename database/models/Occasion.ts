import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Occasion extends Realm.Object {
  id!: string;
  occasion_name!: string;

  static schema: ObjectSchema = {
    name: 'Occasion',
    primaryKey: 'id',
    properties: {
      id: 'string',
      occasion_name: 'string',
    },
  };

}

export default Occasion;