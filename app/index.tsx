import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { PaperProvider } from 'react-native-paper';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, navigationThemes } from '../theme/paperTheme';

import { useRealm } from '@realm/react';
import { useEffect } from 'react';

import { seedDatabaseWithItems, seedDatabaseWithProperties } from '../database/seed';
import { Item } from '../database/models/Item';

export default function Index() {

  const realm = useRealm();

  const scheme = useColorScheme();
  const paperTheme = scheme === 'dark' ? darkTheme : lightTheme;
  const navigationTheme =
    scheme === 'dark'
      ? navigationThemes.DarkTheme
      : navigationThemes.LightTheme;

  useEffect(()=> {
    const existingItems = realm.objects(Item);
    const properties = seedDatabaseWithProperties(realm);
    console.log(properties);
    if (existingItems.length === 0 ) {
      if (properties) {
        seedDatabaseWithItems(realm, properties);
      }
    }
  }, [realm]);


  return (
    <PaperProvider theme={paperTheme}>
        <RootNavigator theme={navigationTheme}/>
    </PaperProvider>
  );
}
