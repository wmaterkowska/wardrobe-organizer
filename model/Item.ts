import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';
import Color from './Color';

export default class Item extends Model {
  static table = 'items';

  @field('name') name!: string;
  @field('image_uri') imageUri!: string;
  @field('comfort') createdAt!: number;

  // Relation: Item has many Colors
  @children('colors') colors!: Color[];
}
