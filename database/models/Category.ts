import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Item from './Item';

export default class Category extends Model {
  static table = 'categories';

  @field('category_name') name!: string;

  // Relation: belongs to Item
  @relation('items', 'item_id') item!: Item;
}