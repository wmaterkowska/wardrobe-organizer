import { Item } from './Item';
import { Occasion } from './Occasion';
import { FeelIn } from './FeelIn';

export class Outfit extends Realm.Object {
  id!: string;
  outfit_name?: string;
  image_uri?: string;
  items!: Realm.List<Item>; // many-to-many
  occasions?: Realm.List<Occasion>;
  comfort?: number;
  feel_in?: Realm.List<FeelIn>;
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
      outfit_name: 'string?',
      image_uri: 'string?',
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