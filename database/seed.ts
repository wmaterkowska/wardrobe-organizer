import { database } from '../index';

export const seedDatabase = async () => {
  const categoriesCollection = database.get('categories');
  const cutsCollection = database.get('cuts');

  const existingCategories = await categoriesCollection.query().fetch();
  if (existingCategories.length > 0) return; // already seeded

  await database.write(async () => {

  // Categories ==============================================================
    const longSleevesCategory = await categoriesCollection.create(cat => {
      cat.category_name = 'Long-sleeves' ;
    });

    const shortSleevesCategory = await categoriesCollection.create(cat => {
      cat.category_name = 'Short-sleeves';
    });

    const bottomsCategory = await categoriesCollection.create(cat => {
      cat.category_name = 'Bottoms';
    });

    const dressesCategory = await categoriesCollection.create(cat => {
      cat.category_name = 'Dresses';
    });

  // Cuts ====================================================================
    await cutsCollection.create(cut => {
      cut.cut_name = 'Slim Fit';
      cut._raw.category_id = longSleevesCategory.id;
    });

    await cutsCollection.create(cut => {
      cut.cut_name = 'Oversized';
      cut._raw.category_id = longSleevesCategory.id;
    });

    await cutsCollection.create(cut => {
      cut.cut_name = 'Slim Fit';
      cut._raw.category_id = shortSleevesCategory.id;
    });

    await cutsCollection.create(cut => {
      cut.cut_name = 'Oversized';
      cut._raw.category_id = shortSleevesCategory.id;
    });

    await cutsCollection.create(cut => {
      cut.cut_name = 'Regular';
      cut._raw.category_id = bottomsCategory.id;
    });

    await cutsCollection.create(cut => {
      cut.cut_name = 'Wide';
      cut._raw.category_id = bottomsCategory.id;
    });
  });
};
