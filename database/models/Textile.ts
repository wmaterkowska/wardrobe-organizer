import { ObjectSchema } from 'realm';
import { Realm } from '@realm/react';

export class Textile extends Realm.Object {
  id!: string;
  textile_name!: string;

  static schema: ObjectSchema = {
    name: 'Textile',
    primaryKey: 'id',
    properties: {
      id: 'string',
      textile_name: 'string',
    },
  };

}

export default Textile;