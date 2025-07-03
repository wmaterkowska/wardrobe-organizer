import { ObjectSchema } from 'realm';
import Realm from 'realm';

export class FeelIn extends Realm.Object {
  id!: string;
  name!: string;
  is_custom!: boolean;
  usage_count?: number;

  static schema: ObjectSchema = {
    name: 'FeelIn',
    primaryKey: 'id',
    properties: {
      id: 'string',
      name: 'string',
      is_custom: 'bool',
      usage_count: {type: 'int', optional: true, default: 0},
    },
  };

}

export default FeelIn;