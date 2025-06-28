import { Item } from './Item';

export class Outfit extends Realm.Object {
  id!: string;
  outfit_name?: string;
  items!: Realm.List<Item>; // many-to-many
  occasions?: Realm.List<Occasion>;
  comfort?: number;
  feel_in?: Realm.Object<FeelIn>;
  like_me?: string;
  look_level?: string;
  frequency?: string;
  want?: string;
  created: Date;

  static schema: ObjectSchema = {
    name: 'Outfit',
    primaryKey: 'id',
    properties: {
      id: 'string',
      outfit_name: 'string',
      items: 'Item[]',
      occasions: 'Occasion[]',
      comfort: 'int?',
      feel_in: 'FeelIn[]',
      like_me: 'string?',
      look_level: 'string?',
      frequency: 'string?',
      want: 'string?',
      created: 'date'
    },
  };

}

export default Outfit;