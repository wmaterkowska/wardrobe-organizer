import React, { useState, useCallback, useMemo } from 'react';
import { Item } from '../database/models/Item';

type ItemKey = keyof Item;

export function useGroupedItems(items: Item[], groupByKey: ItemKey | null) {
  const groupedItems = useMemo(() => {
    if (!groupByKey) return {};

    const groups: Record<string, Item[]> = {};

    for (const item of items) {
      const value = item[groupByKey];

      if (!value) continue;

      if (isRealmList(value)) {
        for (const v of value) {
          const name = getName(v);
          if (!groups[name]) groups[name] = [];
          groups[name].push(item);
        }
      } else {
        const name = getName(value);
        if (!groups[name]) groups[name] = [];
        groups[name].push(item);
      }
    }

    return groups;
  }, [items, groupByKey]);

  return groupedItems;
}

function isRealmList(obj: any): boolean {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    typeof obj.length === 'number' &&
    typeof obj[Symbol.iterator] === 'function'
  );
}

function getName(val: any): string {
  if (!val) return 'Other';
  if (typeof val === 'string') return val;
  return val.name ?? 'Other';
};
