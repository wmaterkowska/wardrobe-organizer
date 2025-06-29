import Realm from 'realm';
import { usePropertyManager } from '../hooks/usePropertyManager';

import { Item, Occasion, FeelIn, Outfit } from '../database/index';

export const saveNewOutfit = ({
  realm,
  outfitName,
  imageUri,
  selectedItems,
  selectedOccasionIds,
  comfort,
  selectedFeelInIds,
  likeMe,
  lookLevel,
  frequency,
  want,
  } : SaveNewParams & {realm: Realm}) => {

    realm.write(() => {
      const selectedOutfitItems = selectedItems ? selectedItems
        .map((id) => realm.objectForPrimaryKey(Item, id))
        .filter(Boolean) : null;
      const selectedOccasions = selectedOccasionIds ? selectedOccasionIds
        .map((id) => realm.objectForPrimaryKey(Occasion, id))
        .filter(Boolean) : null;
      const selectedFeels = selectedFeelInIds ? selectedFeelInIds
        .map((id) => realm.objectForPrimaryKey(FeelIn, id))
        .filter(Boolean) : null;

      console.log('items', selectedOutfitItems);
      console.log('occasions', selectedOccasions);
      console.log('feels', selectedFeels);

      realm.create('Outfit', {
        id: new Realm.BSON.UUID().toHexString(),
        outfit_name: outfitName,
        image_uri: imageUri,
        items: selectedOutfitItems,
        occasions: selectedOccasions,
        comfort: comfort,
        feel_in: selectedFeels,
        like_me: likeMe,
        look_level: lookLevel,
        frequency: frequency,
        want: want,
        created: new Date(),
      });
    });
};