import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Item from './Item';

export default class Occasion extends Model {
  static table = 'occasions';

  @field('occasion_name') name!: string;

  // Relation: belongs to Item
  @relation('items', 'item_id') item!: Item;
}