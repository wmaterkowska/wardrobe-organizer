import RootNavigator from '../navigation/RootNavigator'
import { PaperProvider } from 'react-native-paper'

import { useRealm } from '@realm/react'
import { useEffect } from 'react'

import { seedDatabaseWithItem, seedDatabaseWithProperties } from '../database/seed'
import { Item } from '../database/models/Item'

export default function Index() {

  const realm = useRealm();

  useEffect(()=> {
    const existingItems = realm.objects(Item);
    if (existingItems.length === 0 ) {
      // seedDatabaseWithProperties(realm);
      const properties = seedDatabaseWithProperties(realm);
      console.log(properties);
      if (properties) {
        seedDatabaseWithItem(realm, properties);
      }
    }
  }, [realm]);


  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
