 import { isRealmList } from '../hooks/useGroupedItems';

 import { PROPERTIES_ARRAY_FOR_SUMMARY } from '../constants/index';


 export function summarizeItems(items: Item[]) {
  const summaryMap = PROPERTIES_ARRAY_FOR_SUMMARY.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as PropertyMap );

  for (const item of items) {
    for (const key of PROPERTIES_ARRAY_FOR_SUMMARY) {
      const value = item[key];

      if (isRealmList(value)) {
        for (const val of value) {
          if (!summaryMap[key]?.some((v) => v.id === val.id)) {
            summaryMap[key]?.push(val);
          }
        }
      } else if (value) {
        if (!summaryMap[key]?.includes(value)) {
          summaryMap[key]?.push(value);
        }
      }
    }
  }
  return summaryMap;
}