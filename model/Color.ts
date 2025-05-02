import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Item from './Item';

export default class Color extends Model {
  static table = 'colors';

  @field('color_name') name!: string;
  @field('RGB_code') RGBCode!: string;

  // Relation: belongs to Item
  @relation('items', 'item_id') item!: Item;
}
