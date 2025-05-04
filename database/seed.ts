import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';
import { Item } from './models/Item';

export function seedDatabase (realm: Realm) {

//
//   const existingCategories = realm.Object('Category');
//   if (existingCategories.length > 0) return;
//
//   const existingCuts = realm.Object('Cut');
//   if (existingCuts.length > 0) return;
//
//   const existingColors = realm.Object('Color');
//   if (existingColors.length > 0) return;
//
//   const existingTextiles = realm.Object('Textile');
//   if (existingTextiles.length > 0) return;
//
//   const existingOccasions = realm.Object('Occasion');
//   if (existingOccasions.length > 0) return;

  const asset = Asset.fromModule(require('../assets/images/IMG_20250503_200847.jpg'));
  // await asset.downloadAsync();
  const imageUri = asset.localUri || asset.uri;


  realm.write(() => {

  // Items ===================================================================
    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'kimono',
      image_uri: imageUri,
//       category: dressesCategory,
//       colors: [gold],
//       textiles: [silk],
//       comfort: 4,
//       occasions: [everyday],
    });
  });

//     realm.create(ItemCut, {
//       id: new Realm.BSON.UUID().toHexString(),
//       item: exampleItem,
//       cut: longCut,
//     });

//   // Categories ==============================================================
//     const longSleevesCategory = realm.create('Category', {
//       id: new Realm.BSON.UUID().toHexString(),
//       category_name: 'Long-sleeves',
//       cuts: [],
//     });
//
//     const shortSleevesCategory = realm.create('Category', {
//       id: new Realm.BSON.UUID().toHexString(),
//       category_name: 'Short-sleeves',
//       cuts: [],
//     });
//
//     const bottomsCategory = realm.create('Category', {
//       id: new Realm.BSON.UUID().toHexString(),
//       category_name: 'Bottoms',
//       cuts: [],
//     });
//
//     const dressesCategory = realm.create('Category', {
//       id: new Realm.BSON.UUID().toHexString(),
//       category_name: 'Dresses',
//       cuts: [],
//     });
//
//   // Cuts ====================================================================
//     const slimFitLongSleevesCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Slim-Fit',
//       category: longSleevesCategory,
//     });
//
//     const oversizedLongSleevesCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Oversized',
//       category: longSleevesCategory,
//     });
//
//     const slimFitShortSleevesCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Slim Fit',
//       category: shortSleevesCategory,
//     });
//
//     const oversizedShortSleevesCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Oversized',
//       category: shortSleevesCategory,
//     });
//
//     const regularCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Regular',
//       category: bottomsCategory,
//     });
//
//     const wideCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Wide',
//       category: bottomsCategory,
//     });
//
//     const longCut = realm.create('Cut', {
//       id: new Realm.BSON.UUID().toHexString(),
//       cut_name: 'Long',
//       category: dressesCategory,
//     });
//
//   // Colors ================================================================
//   const black = realm.create('Color', {
//     id: new Realm.BSON.UUID().toHexString(),
//     name: 'Black',
//     rgb_code: 'rgb(0,0,0)'
//   });
//
//   const gold = realm.create('Color', {
//     id: new Realm.BSON.UUID().toHexString(),
//     name: 'Gold',
//     rgb_code: 'rgb(255,215,0)'
//   });
//
//   // Textiles ==============================================================
//   const silk = realm.create('Textile',{
//     id: new Realm.BSON.UUID().toHexString(),
//     name: 'Silk',
//   });
//
//   // Occasions =============================================================
//   const everyday = realm.create('Occasion', {
//     id: new Realm.BSON.UUID().toHexString(),
//     name: 'Everyday',
//   });
//
//   });

  console.log('Database seeded')

}
