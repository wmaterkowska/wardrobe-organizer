import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';

import { Item } from './models/Item';
import { Color } from './models/Color';
import { Textile } from './models/Textile';
import { Occasion } from './models/Occasion';

export const seedDatabaseWithItems = (realm: Realm, properties: {categories: Category[], colors: Color[], cuts: Cut[], textiles: Textile[], occasions: Occasion[] }) => {

  const kimono = Asset.fromModule(require('../assets/images/photos/kimono.jpg'));
  const kimonoUri = kimono.localUri || kimono.uri;

  const body = Asset.fromModule(require('../assets/images/photos/body.jpg'));
  const bodyUri = body.localUri || body.uri;

  const dress = Asset.fromModule(require('../assets/images/photos/dress.jpg'));
  const dressUri = dress.localUri || dress.uri;

  const outer = Asset.fromModule(require('../assets/images/photos/outer.jpg'));
  const outerUri = outer.localUri || outer.uri;

  const pants = Asset.fromModule(require('../assets/images/photos/pants.jpg'));
  const pantsUri = pants.localUri || pants.uri;

  const skirt = Asset.fromModule(require('../assets/images/photos/skirt.jpg'));
  const skirtUri = skirt.localUri || skirt.uri;

  const tshirt = Asset.fromModule(require('../assets/images/photos/tshirt.jpg'));
  const tshirtUri = tshirt.localUri || tshirt.uri;

  realm.write(() => {

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'kimono',
      image_uri: kimonoUri,
      category: properties.categories.find(c => c.name === 'Dresses'),
      colors: properties.colors.filter(c => c.name === 'Gold'),
      cuts: properties.cuts.filter(c => c.name === 'Long'),
      textiles: properties.textiles.filter(t => t.name === 'Silk'),
      comfort: 4,
      occasions: properties.occasions.filter(o => o.name === 'Everyday'),
    });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'body',
        image_uri: bodyUri,
        category: properties.categories.find(c => c.name === 'Long-sleeves'),
        colors: properties.colors.filter(c => c.name === 'Brown' || c.name === 'Beige'),
        cuts: properties.cuts.filter(c => c.name === 'Slim-Fit'),
        textiles: properties.textiles.filter(t => t.name === 'Cotton'),
        comfort: 4,
        occasions: properties.occasions.filter(o => o.name === 'Everyday'),
      });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'dress',
        image_uri: dressUri,
        category: properties.categories.find(c => c.name === 'Dresses'),
        colors: properties.colors.filter(c => c.name === 'Black' || c.name === 'Gold' || c.name === 'Silver'),
        cuts: properties.cuts.filter(c => c.name === 'A-Line'),
        textiles: properties.textiles.filter(t => t.name === 'Cotton' || t.name === 'Polyester'),
        comfort: 3,
        occasions: properties.occasions.filter(o => o.name === 'Wedding' || o.name === 'Date'),
      });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'outer',
        image_uri: outerUri,
        category: properties.categories.find(c => c.name === 'Outwears'),
        colors: properties.colors.filter(c => c.name === 'Black' || c.name === 'White'),
        cuts: properties.cuts.filter(c => c.name === 'Regular'),
        textiles: properties.textiles.filter(t => t.name === 'Polyester'),
        comfort: 3,
        occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Date'),
      });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'pants',
        image_uri: pantsUri,
        category: properties.categories.find(c => c.name === 'Bottoms'),
        colors: properties.colors.filter(c => c.name === 'Black'),
        cuts: properties.cuts.filter(c => c.name === 'Regular'),
        textiles: properties.textiles.filter(t => t.name === 'Jeans'),
        comfort: 5,
        occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Date' || o.name === 'Work'),
      });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'skirt',
        image_uri: skirtUri,
        category: properties.categories.find(c => c.name === 'Bottoms'),
        colors: properties.colors.filter(c => c.name === 'Blue' || c.name === 'Pink'),
        cuts: properties.cuts.filter(c => c.name === 'Long'),
        textiles: properties.textiles.filter(t => t.name === 'Linen'),
        comfort: 4,
        occasions: properties.occasions.filter(o => o.name === 'Everyday'),
      });

    realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: 'tshirt',
        image_uri: tshirtUri,
        category: properties.categories.find(c => c.name === 'Short-sleeves'),
        colors: properties.colors.filter(c => c.name === 'Olive'),
        cuts: properties.cuts.filter(c => c.name === 'Regular'),
        textiles: properties.textiles.filter(t => t.name === 'Cotton'),
        comfort: 5,
        occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Work'),
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
  { name: 'Red', color_code: '#FF0000' },
  { name: 'Orange', color_code: '#FFA500' },
  { name: 'Coral', color_code: '#FF7F50' },
  { name: 'Pink', color_code: '#FFC0CB' },
  { name: 'Maroon', color_code: '#800000' },
  { name: 'Brown', color_code: '#8B4513' },
  { name: 'Gold', color_code: '#FFD700' },
  { name: 'Beige', color_code: '#F5F5DC' },
  { name: 'Yellow', color_code: '#FFFF00' },
  { name: 'Olive', color_code: '#808000' },
  { name: 'Green', color_code: '#008000' },
  { name: 'Teal', color_code: '#008080' },
  { name: 'Turquoise', color_code: '#40E0D0' },
  { name: 'Blue', color_code: '#0000FF' },
  { name: 'Navy', color_code: '#000080' },
  { name: 'Violet', color_code: '#8A2BE2' },
  { name: 'Lavender', color_code: '#E6E6FA' },
  { name: 'Black', color_code: '#000000' },
  { name: 'Gray', color_code: '#808080' },
  { name: 'Silver', color_code: '#C0C0C0' },
  { name: 'White', color_code: '#FFFFFF' },
];

const cutsToSeed = [
  { name: 'Slim-Fit', categories: ['Long-sleeves', 'Short-sleeves', 'Bottoms'] },
  { name: 'Regular', categories: ['Long-sleeves', 'Short-sleeves', 'Bottoms', 'Outwears'] },
  { name: 'Oversized', categories: ['Long-sleeves', 'Short-sleeves', 'Outwears'] },
  { name: 'Long', categories: ['Dresses'] },
  { name: 'Cropped', categories: ['Short-sleeves', 'Long-sleeves', 'Outwears', 'Bottoms'] },
  { name: 'High-Waisted', categories: ['Bottoms'] },
  { name: 'Wide-Leg', categories: ['Bottoms'] },
  { name: 'Tapered', categories: ['Bottoms'] },
  { name: 'A-Line', categories: ['Dresses', 'Bottoms'] },
  { name: 'Bodycon', categories: ['Dresses'] },
  { name: 'Flared', categories: ['Dresses', 'Bottoms'] },
  { name: 'Boxy', categories: ['Short-sleeves', 'Outwears'] },
  { name: 'Peplum', categories: ['Long-sleeves', 'Dresses'] },
  { name: 'Wrap', categories: ['Dresses', 'Long-sleeves'] },
  { name: 'Hooded', categories: ['Outwears', 'Long-sleeves'] },
  { name: 'Double-Breasted', categories: ['Outwears'] },
];


  const textilesToSeed = [
    'Cotton',
    'Linen',
    'Silk',
    'Wool',
    'Jeans',
    'Leather',
    'Viscose',
    'Polyester',
    'Acrylic',
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
          name: cat,
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
          name: c.name,
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
          name: cut.name,
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
          name: name,
        })
      );
    } else {
      textiles = Array.from(realm.objects('Textile'));
    }

    if (realm.objects('Occasion').length === 0) {
      occasions = occasionsToSeed.map(name =>
        realm.create('Occasion', {
          id: new Realm.BSON.UUID().toHexString(),
          name: name,
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

