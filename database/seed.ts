import { getRealm } from './index';
import { v4 as uuidv4 } from 'uuid';

export const seedDatabase = async () => {
  const realm = await getRealm();

  const existingItems = realm.Object('Item');
  if (existingItems.length > 0 ) return;

  const existingCategories = realm.Object('Category');
  if (existingCategories.length > 0) return;

  const existingCuts = realm.Object('Cut');
  if (existingCuts.length > 0) return;

  const existingColors = realm.Object('Color');
  if (existingColors.length > 0) return;

  const existingTextiles = realm.Object('Textile');
  if (existingTextiles.length > 0) return;

  const existingOccasions = realm.Object('Occasion');
  if (existingOccasions.length > 0) return;

  realm.write(() => {

  // Items ===================================================================
//     const exampleItem = realm.create('Item', {
//       id: uuidv4(),
//       item_name: 'kimono',
//       image_uri: '',
//       category: '',
//       cuts: [],
//     });

  // Categories ==============================================================
    const longSleevesCategory = realm.create('Category', {
      id: uuidv4(),
      category_name: 'Long-sleeves',
      cuts: [],
    });

    const shortSleevesCategory = realm.create('Category', {
      id: uuidv4(),
      category_name: 'Short-sleeves',
      cuts: [],
    });

    const bottomsCategory = realm.create('Category', {
      id: uuidv4(),
      category_name: 'Bottoms',
      cuts: [],
    });

    const dressesCategory = realm.create('Category', {
      id: uuidv4(),
      category_name: 'Dresses',
      cuts: [],
    });

  // Cuts ====================================================================
    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Slim-Fit',
      category: longSleevesCategory,
    });

    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Oversized',
      category: longSleevesCategory,
    });

    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Slim Fit',
      category: shortSleevesCategory,
    });

    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Oversized',
      category: shortSleevesCategory,
    });

    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Regular',
      category: bottomsCategory,
    });

    realm.create('Cut', {
      id: uuidv4(),
      cut_name: 'Wide',
      category: bottomsCategory,
    });
  });
};