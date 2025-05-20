import { useRealm, useQuery } from '@realm/react';
import Realm from 'realm';
import { useCallback, useMemo } from 'react';
import { Color } from '../database/models/Color';

export function useColorManager() {
  const realm = useRealm();
  const allColors = useQuery(Color);

  const addOrIncrementColor = useCallback((colorId: string) => {
    const existing = allColors.filtered('id == $0', colorId)[0];

    realm.write(() => {
      if (existing) {
        existing.usage_count = (existing.usage_count ?? 0) + 1;
      } else {
        realm.create('Color', {
          id: new Realm.BSON.UUID().toHexString(),
          name: color.name,
          color_code: color.code,
          is_custom: true,
          usage_count: 1,
        });
      }
    });
  }, [allColors, realm]);

  const getSortedColors = useCallback((selectedIds: string[] = []) => {
    return [...allColors]
      .sort((a, b) => {
        const aSelected = selectedIds.includes(a.id.toString());
        const bSelected = selectedIds.includes(b.id.toString());
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;

        return (b.usage_count ?? 0) - (a.usage_count ?? 0);
      });
  }, [allColors]);

  return {
    allColors,
    getSortedColors,
    addOrIncrementColor,
  };
}
