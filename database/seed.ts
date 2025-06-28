import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

import Realm from 'realm';

import { Item } from './models/Item';
import { MainCategory } from './models/MainCategory';
import { Category } from './models/Category';
import { Color } from './models/Color';
import { Pattern } from './models/Pattern';
import { Fit } from './models/Fit';
import { Cut } from './models/Cut';
import { Textile } from './models/Textile';
import { Occasion } from './models/Occasion';
import { FeelIn } from './models/FeelIn';

export const seedDatabaseWithItems = (
  realm: Realm,
  properties: {
    main: MainCategory,
    categories: Category[],
    colors: Color[],
    patterns: Pattern[],
    fits: Fit[],
    cuts: Cut[],
    textiles: Textile[],
    occasions: Occasion[],
    feels: FeelIn[], }) => {

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

  const tShirt = Asset.fromModule(require('../assets/images/photos/tShirt.jpg'));
  const tShirtUri = tShirt.localUri || tShirt.uri;

  realm.write(() => {

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'kimono',
      image_uri: kimonoUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Dresses'),
      colors: properties.colors.filter(c => c.name === 'Gold'),
      patterns: properties.patterns.filter(p => p.name === 'Floral' || p.name === 'Solid'),
      fits: properties.fits.filter(f => f.name === 'Regular'),
      cuts: properties.cuts.filter(c => c.name === 'Long' || c.name === 'Long Sleeves' || c.name === 'V-Neck'),
      textiles: properties.textiles.filter(t => t.name === 'Silk'),
      comfort: 4,
      occasions: properties.occasions.filter(o => o.name === 'Everyday'),
      feel_in: properties.feels.filter(f => f.name === 'Feminine' || f.name === 'Too much'),
      like_me: 'Not really',
      look_level: 'Nice',
      frequency: 'Once in a while',
      price: 'I\'am fine',
      want: 'Keep',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'body',
      image_uri: bodyUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Long-Sleeves'),
      colors: properties.colors.filter(c => c.name === 'Brown' || c.name === 'Beige'),
      patterns: properties.patterns.filter(p => p.name === 'Solid'),
      fits: properties.fits.filter(f => f.name === 'Fitted'),
      cuts: properties.cuts.filter(c => c.name === 'Long-Sleeves' || c.name === 'Crew Neck'),
      textiles: properties.textiles.filter(t => t.name === 'Cotton'),
      comfort: 4,
      occasions: properties.occasions.filter(o => o.name === 'Everyday'),
      feel_in: properties.feels.filter(f => f.name === 'Relaxed'),
      like_me: 'It\'s okay',
      look_level: 'Okay',
      frequency: 'Now and then',
      price: 'I\'am fine',
      want: 'Unsure',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'dress',
      image_uri: dressUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Dresses'),
      colors: properties.colors.filter(c => c.name === 'Black' || c.name === 'Gold' || c.name === 'Silver'),
      patterns: properties.patterns.filter(p => p.name === 'Floral' || p.name === 'Textured'),
      fits: properties.fits.filter(f => f.name === 'Regular'),
      cuts: properties.cuts.filter(c => c.name === 'A-Line' || c.name === 'V-Neck' || c.name === 'Knee-Length'),
      textiles: properties.textiles.filter(t => t.name === 'Cotton' || t.name === 'Polyester'),
      comfort: 3,
      occasions: properties.occasions.filter(o => o.name === 'Wedding' || o.name === 'Date'),
      feel_in: properties.feels.filter(f => f.name === 'Attractive' || f.name === 'Tight'),
      like_me: 'I like it',
      look_level: 'Nice',
      frequency: 'Once in a while',
      price: 'Great value',
      want: 'Keep',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'outer',
      image_uri: outerUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Layers'),
      colors: properties.colors.filter(c => c.name === 'Black' || c.name === 'White'),
      patterns: properties.patterns.filter(p => p.name === 'Floral'),
      fits: properties.fits.filter(f => f.name === 'Regular'),
      cuts: properties.cuts.filter(c => c.name === 'Long-Sleeves' || c.name === 'Double-Breasted'),
      textiles: properties.textiles.filter(t => t.name === 'Polyester'),
      comfort: 3,
      occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Date'),
      feel_in: properties.feels.filter(f => f.name === 'Cute'),
      like_me: 'I like it',
      look_level: 'Perfect',
      frequency: 'Pretty often',
      price: 'Great value',
      want: 'Keep',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'pants',
      image_uri: pantsUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Bottoms'),
      colors: properties.colors.filter(c => c.name === 'Black'),
      patterns: properties.patterns.filter(p => p.name === 'Solid'),
      fits: properties.fits.filter(f => f.name === 'Relaxed'),
      cuts: properties.cuts.filter(c => c.name === 'High-Waisted' || c.name === 'Long'),
      textiles: properties.textiles.filter(t => t.name === 'Jeans'),
      comfort: 5,
      occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Date' || o.name === 'Work'),
      feel_in: properties.feels.filter(f => f.name === 'Relaxed' || f.name === 'Pretty'),
      like_me: 'This is me!',
      look_level: 'Perfect',
      frequency: 'It\'s a favourite',
      price: 'Great value',
      want: 'Keep',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'skirt',
      image_uri: skirtUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Bottoms'),
      colors: properties.colors.filter(c => c.name === 'Blue' || c.name === 'Pink'),
      patterns: properties.patterns.filter(p => p.name === 'Floral'),
      fits: properties.fits.filter(f => f.name === 'Loose'),
      cuts: properties.cuts.filter(c => c.name === '3/4'),
      textiles: properties.textiles.filter(t => t.name === 'Linen'),
      comfort: 4,
      occasions: properties.occasions.filter(o => o.name === 'Everyday'),
      feel_in: properties.feels.filter(f => f.name === 'Fun'),
      like_me: 'Not really',
      look_level: 'Okay',
      frequency: 'Forgot I had it',
      price: 'I\'am fine',
      want: 'Let go',
      created: new Date(),
    });

    realm.create('Item', {
      id: new Realm.BSON.UUID().toHexString(),
      item_name: 'tShirt',
      image_uri: tShirtUri,
      main_category: properties.main.find(c => c.name === 'Clothes'),
      category: properties.categories.find(c => c.name === 'Short-Sleeves'),
      colors: properties.colors.filter(c => c.name === 'Olive'),
      patterns: properties.patterns.filter(p => p.name === 'Solid'),
      fits: properties.fits.filter(f => f.name === 'Regular'),
      cuts: properties.cuts.filter(c => c.name === '3/4' || c.name === 'Crew Neck'),
      textiles: properties.textiles.filter(t => t.name === 'Cotton'),
      comfort: 5,
      occasions: properties.occasions.filter(o => o.name === 'Everyday' || o.name === 'Work'),
      feel_in: properties.feels.filter(f => f.name === 'Pretty' || f.name === 'Powerful'),
      like_me: 'This is me!',
      look_level: 'Perfect',
      frequency: 'It\'s a favourite',
      price: 'Great value',
      want: 'Keep',
      created: new Date(),
    });

  });
}

export const seedDatabaseWithProperties = (realm: Realm) => {

  const mainCategoriesToSeed = [
    'Clothes',
    'Accessories',
    'Other',
  ]

  const categoriesToSeed = [
    { name: 'Long-Sleeves', main_category: 'Clothes' },
    { name: 'Short-Sleeves', main_category: 'Clothes' },
    { name: 'Bottoms', main_category: 'Clothes' },
    { name: 'Dresses', main_category: 'Clothes' },
    { name: 'Layers', main_category: 'Clothes' },
    { name: 'Outerwear', main_category: 'Clothes' },
    { name: 'Shoes', main_category: 'Clothes' },
    { name: 'Carries', main_category: 'Accessories' },
    { name: 'Finishers', main_category: 'Accessories' },
    { name: 'Jewellery', main_category: 'Accessories' },
    { name: 'Pajamas', main_category: 'Other' },
    { name: 'Underwear', main_category: 'Other' },
    { name: 'Loungewear', main_category: 'Other' },
    { name: 'Sportswear', main_category: 'Other' },
    { name: 'Swimwear', main_category: 'Other' },
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

const patternsToSeed = [
  'Solid',
  'Striped',
  'Plaid',
  'Polka Dot',
  'Houndstooth',
  'Herringbone',
  'Nature-Inspired',
  'Floral',
  'Leaf',
  'Animal',
  'Snake',
  'Nature Print',
  'Geometric',
  'Abstract',
  'Paisley',
  'Tie-Dye',
  'Gradient/Ombre',
  'Marble',
  'Text Print',
  'Graphic',
  'Logo',
  'Slogan',
  'Pop Culture Print',
  'Knitted',
  'Crochet',
  'Lace',
  'Embroidered',
  'Patchwork',
  'Quilted',
  'Mixed',
  'Minimal',
];

const fitsToSeed = [
  'Fitted',
  'Regular',
  'Relaxed',
  'Loose',
  'Boxy',
  'Oversized',
  'Skinny',
  'Slim',
  'Baggy',
];

const cutsToSeed = [
  { name: 'Short', categories: ['Bottoms', 'Dresses','Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Long', categories: ['Bottoms', 'Dresses','Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Normal Length', categories: ['Bottoms', 'Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Short Sleeves', categories: ['Short-Sleeves', 'Dresses', 'Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Long Sleeves', categories: ['Long-Sleeves', 'Dresses', 'Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: '3/4', categories: ['Bottoms', 'Long-Sleeves', 'Dresses', 'Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: '7/8', categories: ['Bottoms', 'Long-Sleeves', 'Dresses', 'Layers', 'Outerwear', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'V-Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Deep V-Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Pajamas', ] },
  { name: 'Crew Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Square Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Boat Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'High Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Turtle Neck', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', ] },
  { name: 'Halter', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Off-the-Shoulder', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'One-Shoulder', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Asymmetrical', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Bottoms', 'Loungewear', 'Pajamas', ] },
  { name: 'Collared', categories: ['Long-Sleeves', 'Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Cropped', categories: ['Long-Sleeves', 'Short-Sleeves', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Flared', categories: ['Long-Sleeves', 'Short-Sleeves', 'Bottoms', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Puffed Sleeve', categories: ['Short-Sleeves', 'Long-Sleeves', 'Dresses', ] },
  { name: 'Bell Sleeves', categories: ['Short-Sleeves', 'Long-Sleeves', 'Dresses', 'Pajamas', ] },
  { name: 'Wide Straps', categories: ['Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Thin Straps', categories: ['Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Strapless', categories: ['Short-Sleeves', 'Dresses', 'Loungewear', 'Pajamas', ] },
  { name: 'Crisscross', categories: ['Short-Sleeves', 'Dresses', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Mini', categories: ['Dresses', 'Bottoms', ] },
  { name: 'Midi', categories: ['Dresses', 'Bottoms', ] },
  { name: 'Maxi', categories: ['Dresses', 'Bottoms', ] },
  { name: 'Knee-Length', categories: ['Dresses', 'Bottoms', ] },
  { name: 'A-Line', categories: ['Dresses', ] },
  { name: 'Wrap', categories: ['Dresses', 'Bottoms', 'Loungewear', ] },
  { name: 'High-Waisted', categories: ['Bottoms', 'Sportswear', 'Loungewear', ] },
  { name: 'Low-Rise', categories: ['Bottoms', 'Sportswear', 'Loungewear', ] },
  { name: 'Wide-Leg', categories: ['Bottoms', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Straight-Leg', categories: ['Bottoms', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Cargo', categories: ['Bottoms', 'Sportswear', 'Loungewear', ] },
  { name: 'Jogger', categories: ['Bottoms', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Chinos', categories: ['Bottoms', ] },
  { name: 'Leggings', categories: ['Bottoms', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Harem', categories: ['Bottoms', 'Sportswear', 'Loungewear', 'Pajamas', ] },
  { name: 'Hooded', categories: ['Layers', 'Long-Sleeves', 'Outerwear', 'Sportswear', 'Loungewear', ] },
  { name: 'Double-Breasted', categories: ['Layers', 'Outerwear', ] },
];

  const textilesToSeed = [
    'Cotton',
    'Linen',
    'Silk',
    'Wool',
    'Cashmere',
    'Jeans',
    'Leather',
    'Viscose',
    'Modal',
    'Polyester',
    'Acrylic',
  ];

  const occasionsToSeed = [
    'Everyday/casual',
    'Casual Lunch/Coffee',
    'School/University',
    'Vacation',
    'Travel',
    'Beach/Poolside',
    'Outdoor Activity',
    'Loungewear/Home',
    'Sport',
    'Religious',
    'Cultural Event',
    'Funeral',
    'Party/Night Out',
    'Wedding',
    'Date',
    'Holiday gathering',
    'Special event',
    'Work/Business',
    'Formal/Event',
    'Spring',
    'Summer',
    'Autumn',
    'Winter',
   ];

  const feelsToSeed = [
    'Confident',
    'Cool',
    'Feminine',
    'Masculine',
    'Cute',
    'Pretty',
    'Attractive',
    'Youthful',
    'Fun',
    'Relaxed',
    'Soft',
    'Sporty',
    'Elegant',
    'Polished',
    'Old',
    'Outdated',
    'Not Welcoming',
    'Ugly',
    'Business Woman',
    'Powerful',
    'Trendy',
    'Stylish',
    'Stuck Up',
    'Edgy',
    'Tomboy',
    'Fresh',
    'Comfy',
    'Too much',
    'Uncomfortable',
    'Tight',
  ];

  const categoryMap: Record<string, Realm.Object<Category>> = {};
  const cutMap: Record<string, Realm.Object<Cut>> = {};

  let main: Realm.Object<MainCategory>;
  let categories: Realm.Object<Category>[] = [];
  let colors: Realm.Object<Color>[] = [];
  let patterns: Realm.Object<Pattern>[] = [];
  let fits: Realm.Object<Fit>[] = [];
  let cuts: Realm.Object<Cut>[] = [];
  let textiles: Realm.Object<Textile>[] = [];
  let occasions: Realm.Object<Occasion>[] = [];
  let feels: Realm.Object<FeelIn>[] = [];

  realm.write(() => {
    if (realm.objects('MainCategory').length === 0) {
      main = mainCategoriesToSeed.map(c =>
        realm.create('MainCategory', {
          id: new Realm.BSON.UUID().toHexString(),
          name: c,
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      main = Array.from(realm.objects('MainCategory'));
    }

    if (realm.objects('Category').length === 0) {
      categoriesToSeed.forEach(cat => {
        const linkedMain = main.find(c => c.name === cat.main_category);
        const category = realm.create('Category', {
          id: new Realm.BSON.UUID().toHexString(),
          name: cat.name,
          main_category: linkedMain,
          cuts: [],
          is_custom: false,
          usage_count: 0,
        });
        categoryMap[cat.name] = category;
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
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      colors = Array.from(realm.objects('Color'));
    }

    if (realm.objects('Pattern').length === 0) {
      patterns = patternsToSeed.map(p =>
        realm.create('Pattern', {
          id: new Realm.BSON.UUID().toHexString(),
          name: p,
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      patterns = Array.from(realm.objects('Pattern'));
    }

    if (realm.objects('Fit').length === 0) {
      fits = fitsToSeed.map(f =>
        realm.create('Fit', {
          id: new Realm.BSON.UUID().toHexString(),
          name: f,
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      fits = Array.from(realm.objects('Fit'));
    }

    if (realm.objects('Cut').length === 0) {
      cutsToSeed.forEach(cut => {
        const linkedCategories = cut.categories.map(catName => categoryMap[catName]);
        const cutObj = realm.create('Cut', {
          id: new Realm.BSON.UUID().toHexString(),
          name: cut.name,
          categories: linkedCategories,
          is_custom: false,
          usage_count: 0,
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
          is_custom: false,
          usage_count: 0,
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
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      occasions = Array.from(realm.objects('Occasion'));
    }

    if (realm.objects('FeelIn').length === 0) {
      feels = feelsToSeed.map(name =>
        realm.create('FeelIn', {
          id: new Realm.BSON.UUID().toHexString(),
          name: name,
          is_custom: false,
          usage_count: 0,
        })
      );
    } else {
      feels = Array.from(realm.objects('FeelIn'));
    }

  });

  return {
    main,
    categories: Object.values(categoryMap),
    colors,
    patterns,
    fits,
    cuts: Object.values(cutMap),
    textiles,
    occasions,
    feels,
  };

}

