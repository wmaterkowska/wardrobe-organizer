import { Item } from '../database/models/Item';
import { Outfit } from '../database/models/Outfit';

export function getTitle(
  routeName: keyof RootStackParamList,
  params: RootStackParamList[keyof RootStackParamList] | undefined,
  currentTabKey: string,
  realm: Realm,
  t: undefined,
): string {

  if (routeName === 'ItemDetail' && params && 'itemId' in params) {
    const item = realm.objectForPrimaryKey(Item, params.itemId);
    return item?.item_name || t('navigation:itemDetail');
  }

  if (routeName === 'OutfitDetail' && params && 'outfitId' in params) {
    const outfit = realm.objectForPrimaryKey(Outfit, params.outfitId);
    return outfit?.outfit_name || t('navigation:outfitDetail');
  }

  if (routeName === 'SummaryDetail' && params && 'type' in params) {
    return summaryTypeLabel(params.type, t);
  }

  if (routeName === 'About') {
    return t('navigation:about');
  }

  if (routeName === 'Help') {
    return t('navigation:help');
  }

  // Tab screens
  switch (currentTabKey) {
    case 'home':
      return t('navigation:welcome');
    case 'wardrobe':
      return t('navigation:yourWardrobe');
    case 'summary':
      return t('navigation:summaries');
    case 'outfits':
      return t('navigation:outfits');
    default:
      return t('about_app:name');
  }
}

export function summaryTypeLabel(type: string, t: undefined): string {
  switch (type) {
    case 'feel':
      return t('navigation:feelSummary');
    case 'category':
      return t('navigation:categorySummary');
    case 'appearance':
      return t('navigation:appearanceSummary');
    case 'frequency':
      return t('navigation:frequencySummary');
    default:
      return t('navigation:defaultSummary');
  }
}