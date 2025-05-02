import { Model } from '@nozbe/watermelondb';
import { relation } from '@nozbe/watermelondb/decorators';
import ClothingItem from './ClothingItem';
import Cut from './Cut';

export default class ClothingItemCut extends Model {
  static table = 'item_cuts';

  @relation('items', 'item_id') Item!: Item;
  @relation('cuts', 'cut_id') cut!: Cut;
}
