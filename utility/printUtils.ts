import { summarizeItems } from './summaryUtils';
import { Item } from '../database/models/Item';

import { isRealmList } from '../hooks/useGroupedItems';

export function printCategorySummaryToJson(itemsKeep: Item[], itemsLetGo: Item[]) {

  const keepPropertiesMap = summarizeItems(itemsKeep);
  const keepPropertiesObject = createPropertiesObject(keepPropertiesMap);

  const letGoPropertiesMap = summarizeItems(itemsLetGo);
  const letGoPropertiesObject = createPropertiesObject(letGoPropertiesMap);

  const result = {
    'Let Go': {
      ...letGoPropertiesObject,
    },
    'Keep': {
      ...keepPropertiesObject
    },
  }

  return JSON.stringify(result, 2);
};

function createPropertiesObject(propertiesMap) {

  let result = {};
  for (const [key, value] of Object.entries(propertiesMap)) {
      result[key] = value.map(v => v.name ?? v);
  }

  return result;
};