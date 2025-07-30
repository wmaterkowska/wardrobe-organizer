import { summarizeItems } from './summaryUtils';
import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';

import { isRealmList } from '../hooks/useGroupedItems';


export function printWholeCategorySummary(items : Item[], categories: string[]) {

  const itemsKeep = items.filtered('want == $0', 'Keep');
  const itemsLetGo = items.filtered('want == $0', 'Let go');

  const categoriesItemsObject = {}
  categories.forEach((cat) => {
    const filteredKeep = itemsKeep.filtered('category.name == $0', cat);
    const filteredLetGo = itemsLetGo.filtered('category.name == $0', cat);
    categoriesItemsObject[cat] = {
      'Keep': filteredKeep,
      'Let Go': filteredLetGo,
    }
  });

  const result = {};
  for (const [key, value] of Object.entries(categoriesItemsObject)) {
    const keepPropertiesMap = summarizeItems(value['Keep']);
    const keepPropertiesObject = createPropertiesObject(keepPropertiesMap);

    const letGoPropertiesMap = summarizeItems(value['Let Go']);
    const letGoPropertiesObject = createPropertiesObject(letGoPropertiesMap);

    result[key] = {
      'Let Go': { ...letGoPropertiesObject },
      'Keep': { ...keepPropertiesObject },
    }
  }

  return safeStringify(result);
}

export function printCategorySummaryToJson(items: Item[], category: string) {

  const itemsKeep = items.filtered('want == $0', 'Keep');
  const itemsLetGo = items.filtered('want == $0', 'Let go');

  const keepPropertiesMap = summarizeItems(itemsKeep);
  const keepPropertiesObject = createPropertiesObject(keepPropertiesMap);

  const letGoPropertiesMap = summarizeItems(itemsLetGo);
  const letGoPropertiesObject = createPropertiesObject(letGoPropertiesMap);

  const result = {
    'Category': category,
    'Let Go': {
      ...letGoPropertiesObject,
    },
    'Keep': {
      ...keepPropertiesObject
    },
  }

  return JSON.stringify(result, null, 2);
};

export function generatePromptWrappedJson(jsonData: string) {
  return `This is a summary of my wardrobe decisions. Please help analyze my personal style based on what I want to KEEP and LET GO.\n\n${jsonData}`;
};

// help functions ==================================================================================
function createPropertiesObject(propertiesMap) {

  let result = {};
  for (const [key, value] of Object.entries(propertiesMap)) {
      result[key] = value.map(v => v.name ?? v);
  }

  return result;
};

function safeStringify(obj: any, space = 2) {
  const seen = new WeakSet();
  return JSON.stringify(obj, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return "[Circular]";
      seen.add(value);
    }
    return value;
  }, space);
}
