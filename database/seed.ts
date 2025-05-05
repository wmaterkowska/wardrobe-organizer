import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';

import { Item } from './models/Item';
import { Color } from './models/Color';
import { Textile } from './models/Textile';
import { Occasion } from './models/Occasion';

export const seedDatabaseWithItem = (realm: Realm, properties: {colors: Color[], textiles: Textile[], occasions: Occasion[] }) => {

  const asset = Asset.fromModule(require('../assets/images/IMG_20250503_200847.jpg'));
  const imageUri = asset.localUri || asset.uri;

  realm.write(() => {

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'kimono',
      image_uri: imageUri,
//       category: dressesCategory,
      colors: [properties.colors.find(c => c.color_name === 'Gold')],
      textiles: [properties.textiles.find(t => t.textile_name === 'Silk')],
      comfort: 4,
      occasions: [properties.occasions.find(o => o.occasion_name === 'Everyday')],
    });
  });

//     realm.create(ItemCut, {
//       id: new Realm.BSON.UUID().toHexString(),
//       item: exampleItem,
//       cut: longCut,
//     });
}

export const seedDatabaseWithProperties = (realm: Realm) => {

  const categoriesToSeed = [

  ];

  const colorsToSeed = [
    { name: 'Black', color_code: '#000000' },
    { name: 'Red', color_code: '#FF0000' },
    { name: 'Blue', color_code: '#0000FF' },
    { name: 'Gold', color_code: '#FFD700' },
  ];

  const textilesToSeed = [
    'Cotton',
    'Linen',
    'Silk',
    'Wool',
    'Leather',
    'Viscose',
    'Polyester',
  ];

  const occasionsToSeed = [
    'Everyday',
    'Work',
    'Sport',
    'Wedding',
    'Date',
  ];

  let categories: Realm.Object<Category>[] = [];
  let colors: Realm.Object<Color>[] = [];
  let textiles: Realm.Object<Textile>[] = [];
  let occasions: Realm.Object<Occasion>[] = [];

  realm.write(() => {
    if (realm.objects('Color').length === 0) {
      colors = colorsToSeed.map(c =>
        realm.create('Color', {
          id: new Realm.BSON.UUID().toHexString(),
          color_name: c.name,
          color_code: c.color_code,
        })
      );
    } else {
      colors = Array.from(realm.objects('Color'));
    }

    if (realm.objects('Textile').length === 0) {
      textiles = textilesToSeed.map(name =>
        realm.create('Textile', {
          id: new Realm.BSON.UUID().toHexString(),
          textile_name: name,
        })
      );
    } else {
      textiles = Array.from(realm.objects('Textile'));
    }

    if (realm.objects('Occasion').length === 0) {
      occasions = occasionsToSeed.map(name =>
        realm.create('Occasion', {
          id: new Realm.BSON.UUID().toHexString(),
          occasion_name: name,
        })
      );
    } else {
      occasions = Array.from(realm.objects('Occasion'));
    }

  });

  return {
    colors,
    textiles,
    occasions,
    // add other properties like categories, cuts, etc.
  };

}

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
