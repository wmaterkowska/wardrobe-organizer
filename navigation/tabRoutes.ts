export const TAB_ROUTE_KEYS = {
  home: 'home',
  wardrobe: 'wardrobe',
  summary: 'summary',
  outfits: 'outfits',
} as const;

export const TAB_INDEX_MAP = {
  home: 0,
  wardrobe: 1,
  summary: 2,
  outfits: 3,
} as const;

export const TAB_KEY_BY_INDEX = Object.entries(TAB_INDEX_MAP).reduce((acc, [key, index]) => {
  acc[index] = key;
  return acc;
}, {} as Record<number, string>);