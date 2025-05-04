import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';

import { Item } from './models/Item';
import { Color } from './models/Color';

export const seedDatabaseWithItem = (realm: Realm, properties: {gold: Color}) => {

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
      colors: [properties.gold],
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
}

export const seedDatabaseWithProperties = (realm: Realm) => {

  if (realm.objects('Color').length > 0) return {};

  const seededColors: {
    black?: Color;
    gold?: Color;
    red?: Color;
    blue?: Color;
  } = {}

  realm.write(() => {
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
  // Colors ================================================================
  seededColors.black = realm.create('Color', {
    id: new Realm.BSON.UUID().toHexString(),
    color_name: 'Black',
    color_code: '#000000'
  });

  seededColors.gold = realm.create('Color', {
    id: new Realm.BSON.UUID().toHexString(),
    color_name: 'Gold',
    color_code: '#FFD700'
  });

  seededColors.red = realm.create('Color', {
    id: new Realm.BSON.UUID().toHexString(),
    color_name: 'Red',
    color_code: '#FF0000',
  });

  seededColors.blue = realm.create('Color', {
    id: new Realm.BSON.UUID().toHexString(),
    color_name: 'Blue',
    color_code: '#0000FF',
  });

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
  });

  console.log('Database seeded')
  return seededColors;
}
