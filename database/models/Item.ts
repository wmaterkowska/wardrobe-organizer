import { Model } from '@nozbe/watermelondb';
import { field, children } from '@nozbe/watermelondb/decorators';
import Color from './Color';

export default class Item extends Model {
  static table = 'items';

  @field('name') name!: string;
  @field('image_uri') imageUri!: string;

  @relation('categories', 'category_id') category!: Category;

  // Relation, e.g.: Item has many Colors
  @children('colors') colors!: Color[];
  @children('textiles') textiles!: Textile[];
  @children('occasions') occasions!: Occasion[];

  @children('item_cuts') cutLinks!: ItemCut[];
}
