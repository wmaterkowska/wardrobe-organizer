import i18n from 'i18next';

beforeAll(async () => {
  await i18n.init({
    fallbackLng: 'en',
    compatibilityJSON: 'v3',
    interpolation: { escapeValue: false },
    resources: {
      pl: {
        translation: {
          wardrobe_pieces_one: "one_pl",
          wardrobe_pieces_few: "few_pl",
          wardrobe_pieces_many: "many_pl",
          wardrobe_pieces_other: "other_pl"
        }
      },
      en: {
        translation: {
          wardrobe_pieces_one: "one_en",
          wardrobe_pieces_other: "other_en"
        }
      }
    }
  });
});

describe('Polish pluralization', () => {
  const cases: Record<number, string> = {
    1: 'one_pl',
    2: 'few_pl',
    5: 'many_pl',
    22: 'few_pl',
    25: 'many_pl',
    0: 'many_pl'
  };

  for (const [count, expected] of Object.entries(cases)) {
    test(`count ${count} → ${expected}`, () => {
      i18n.changeLanguage('pl');
      const result = i18n.t('wardrobe_pieces', { count: Number(count) });
      expect(result).toBe(expected);
    });
  }
});

describe('English pluralization', () => {
  const cases: Record<number, string> = {
    1: 'one_en',
    2: 'other_en',
    5: 'other_en',
    0: 'other_en'
  };

  for (const [count, expected] of Object.entries(cases)) {
    test(`count ${count} → ${expected}`, () => {
      i18n.changeLanguage('en');
      const result = i18n.t('wardrobe_pieces', { count: Number(count) });
      expect(result).toBe(expected);
    });
  }
});
