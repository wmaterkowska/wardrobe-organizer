import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';

import { Item } from './models/Item';
import { Color } from './models/Color';
import { Textile } from './models/Textile';
import { Occasion } from './models/Occasion';

export const seedDatabaseWithItem = (realm: Realm, properties: {categories: Category[], colors: Color[], cuts: Cut[], textiles: Textile[], occasions: Occasion[] }) => {

  const asset = Asset.fromModule(require('../assets/images/IMG_20250503_200847.jpg'));
  const imageUri = asset.localUri || asset.uri;

  realm.write(() => {

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'kimono',
      image_uri: imageUri,
      category: properties.categories.find(c => c.category_name === 'Dresses'),
      colors: [properties.colors.find(c => c.color_name === 'Gold')],
      cuts: [properties.cuts.find(c => c.cut_name === 'Long')],
      textiles: [properties.textiles.find(t => t.textile_name === 'Silk')],
      comfort: 4,
      occasions: [properties.occasions.find(o => o.occasion_name === 'Everyday')],
    });
  });
}

export const seedDatabaseWithProperties = (realm: Realm) => {

  const categoriesToSeed = [
    'Long-sleeves',
    'Short-sleeves',
    'Bottoms',
    'Dresses',
    'Outwears',
    'Sport',
  ];

  const colorsToSeed = [
    { name: 'Black', color_code: '#000000' },
    { name: 'Red', color_code: '#FF0000' },
    { name: 'Blue', color_code: '#0000FF' },
    { name: 'Gold', color_code: '#FFD700' },
  ];

  const cutsToSeed = [
    {name: 'Slim Fit', categories: ['Long-sleeves', 'Short-sleeves', 'Bottoms']},
    {name: 'Regular', categories: ['Long-sleeves', 'Short-sleeves', 'Bottoms', 'Outwears']},
    {name: 'Oversized', categories: ['Long-sleeves', 'Short-sleeves', 'Outwears']},
    {name: 'Long', categories: ['Dresses']},
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

  const categoryMap: Record<string, Realm.Object> = {};
  const cutMap: Record<string, Realm.Object> = {};

  let categories: Realm.Object<Category>[] = [];
  let colors: Realm.Object<Color>[] = [];
  let cuts: Realm.Object<Cut>[] = [];
  let textiles: Realm.Object<Textile>[] = [];
  let occasions: Realm.Object<Occasion>[] = [];

  realm.write(() => {
    if (realm.objects('Category').length === 0) {
      categoriesToSeed.forEach(cat => {
        const category = realm.create('Category', {
          id: new Realm.BSON.UUID().toHexString(),
          category_name: cat,
          cuts: [],
        });
      categoryMap[cat] = category;
      });
    } else {
      categories = Array.from(realm.objects('Category'));
    }

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

    if (realm.objects('Cut').length === 0) {
      cutsToSeed.forEach(cut => {
        const linkedCategories = cut.categories.map(catName => categoryMap[catName]);
        const cutObj = realm.create('Cut', {
          id: new Realm.BSON.UUID().toHexString(),
          cut_name: cut.name,
          categories: linkedCategories,
        });
        cutMap[cut.name] = cutObj;
        linkedCategories.forEach(category => {
          category.cuts.push(cutObj);
        });
      });
    } else {
      cuts = Array.from(realm.objects('Cut'));
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
    categories: Object.values(categoryMap),
    colors,
    cuts: Object.values(cutMap),
    textiles,
    occasions,
  };

}

