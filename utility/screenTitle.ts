import { Item } from '../database/models/Item';

export function getTitle(
  routeName: keyof RootStackParamList,
  params: RootStackParamList[keyof RootStackParamList] | undefined,
  currentTabKey: string,
  realm: Realm
): string {
  // Stack views
  if (routeName === 'ItemDetail' && params && 'itemId' in params) {
    const item = realm.objectForPrimaryKey(Item, params.itemId);
    return item?.item_name || 'Item Detail';
  }

  if (routeName === 'SummaryDetail' && params && 'type' in params) {
    return summaryTypeLabel(params.type);
  }

  // Tab screens
  switch (currentTabKey) {
    case 'home':
      return 'Welcome';
    case 'wardrobe':
      return 'Your Wardrobe';
    case 'summary':
      return 'Summary';
    case 'outfits':
      return 'Outfits';
    default:
      return 'Set{My}Style';
  }
}

export function summaryTypeLabel(type: string): string {
  switch (type) {
    case 'feel':
      return 'Feel Summary';
    case 'category':
      return 'Category Summary';
    case 'appearance':
      return 'Appearance Summary';
    case 'frequency':
      return 'Frequency Summary';
    default:
      return 'Summary';
  }
}