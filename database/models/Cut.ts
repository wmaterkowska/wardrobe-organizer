import { Model } from '@nozbe/watermelondb';
import { field, relation } from '@nozbe/watermelondb/decorators';
import Item from './Item';

export default class Cut extends Model {
  static table = 'cuts';

  @field('cut_name') name!: string;

  // Relation: belongs to Item
  @relation('categories', 'category_id') category!: Category;
}