import { useRealm, useQuery } from '@realm/react';
import Realm from 'realm';
import { useCallback, useMemo } from 'react';
import { Color } from '../database/models/Color';

type BaseProperty = {
  name: string;
  usage_count?: number;
  id: string;
};

export function usePropertyManager<T extends BaseProperty>(
  schemaName: string,
  idField: keyof T = 'id' as keyof T
  ) {
  const realm = useRealm();
  const all = useQuery<T>(schemaName);

  const incrementOrCreate = useCallback((propertyId: string) => {
    const existing = all.filtered('id == $0', propertyId)[0];

    realm.write(() => {
      if (existing) {
        existing.usage_count = (existing.usage_count ?? 0) + 1;
      } else {
        realm.create(schemaName, {
          [idFiled]: new Realm.BSON.UUID().toHexString(),
          name,
          is_custom: true,
          usage_count: 1,
          ...extraFields,
        });
      }
    });
  }, [all, realm]);

  const deleteById = useCallback((id: string) => {
    const item = all.find((prop) => (prop[idField] as any)?.toString() === id);
    if (!item) return;

    realm.write(() => {
      realm.delete(item);
    });
  }, [realm, all]);

  const getSorted = useCallback((selectedIds: string[] = []) : Cut[] => {
    return [...all]
      .sort((a, b) => {
        const aSelected = selectedIds.includes(a.id.toString());
        const bSelected = selectedIds.includes(b.id.toString());
        if (aSelected && !bSelected) return -1;
        if (!aSelected && bSelected) return 1;

        return (b.usage_count ?? 0) - (a.usage_count ?? 0);
      });
  }, [all]);

  return {
    allProperties: all,
    getSorted,
    incrementOrCreate,
    deleteById,
  };
}
