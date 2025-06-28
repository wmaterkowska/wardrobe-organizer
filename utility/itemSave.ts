import Realm from 'realm';
import { usePropertyManager } from '../hooks/usePropertyManager';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn, Outfit } from '../database/index';

export const saveNewItem = ({
  realm,
  itemName,
  imageUri,
  selectedMainId,
  selectedCategoryId,
  selectedColorIds,
  selectedPatternIds,
  selectedFitIds,
  selectedCutIds,
  selectedTextileIds,
  selectedOccasionIds,
  comfort,
  selectedFeelInIds,
  likeMe,
  lookLevel,
  frequency,
  price,
  want,
  } : SaveNewParams & {realm: Realm}) => {

    realm.write(() => {
      const main = selectedMainId ? realm.objectForPrimaryKey(MainCategory, selectedMainId) : null;
      const category = selectedCategoryId ? realm.objectForPrimaryKey(Category, selectedCategoryId) : null;
      const selectedColors = selectedColorIds ? selectedColorIds
        .map((id) => realm.objectForPrimaryKey(Color, id))
        .filter(Boolean) : null;
      const selectedPatterns = selectedPatternIds ? selectedPatternIds
        .map((id) => realm.objectForPrimaryKey(Pattern, id))
        .filter(Boolean) : null;
      const selectedFits = selectedFitIds ? selectedFitIds
        .map((id) => realm.objectForPrimaryKey(Fit, id))
        .filter(Boolean) : null;
      const selectedCuts = selectedCutIds ? selectedCutIds
        .map((id) => realm.objectForPrimaryKey(Cut, id))
        .filter(Boolean) : null;
      const selectedTextiles = selectedTextileIds ? selectedTextileIds
        .map((id) => realm.objectForPrimaryKey(Textile, id))
        .filter(Boolean) : null;
      const selectedOccasions = selectedOccasionIds ? selectedOccasionIds
        .map((id) => realm.objectForPrimaryKey(Occasion, id))
        .filter(Boolean) : null;
      const selectedFeels = selectedFeelInIds ? selectedFeelInIds
        .map((id) => realm.objectForPrimaryKey(FeelIn, id))
        .filter(Boolean) : null;

      realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: itemName,
        image_uri: imageUri,
        main_category: main,
        category: category,
        colors: selectedColors,
        patterns: selectedPatterns,
        fits: selectedFits,
        cuts: selectedCuts,
        textiles: selectedTextiles,
        occasions: selectedOccasions,
        comfort: comfort,
        feel_in: selectedFeels,
        like_me: likeMe,
        look_level: lookLevel,
        frequency: frequency,
        price: price,
        want: want,
        created: new Date(),
      });
    });
};