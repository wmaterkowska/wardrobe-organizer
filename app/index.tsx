import React from 'react';
import RootNavigator from '../navigation/RootNavigator';
import { PaperProvider } from 'react-native-paper';
import { WardrobeProvider } from '../context/WardrobeContext';
import { CustomThemeProvider, useThemeToggle } from '../context/ThemeContext';
import { lightTheme, darkTheme, navigationThemes } from '../theme/paperTheme8';

import Realm from 'realm';
import { useRealm } from '@realm/react';
import { useEffect } from 'react';

import '../i18n/i18n';

import { seedDatabaseWithItems, seedDatabaseWithProperties } from '../database/seed';
import { Item } from '../database/models/Item';

export default function Index() {

  const realm = useRealm();
  useEffect(()=> {
    const existingItems = realm.objects(Item);
    const properties = seedDatabaseWithProperties(realm);
    if (existingItems.length === 0 ) {
      if (properties) {
        seedDatabaseWithItems(realm, properties);
      }
    }
  }, [realm]);

  const { isDark } = useThemeToggle();

  const paperTheme = isDark ? darkTheme : lightTheme;
  const navigationTheme =
    isDark
      ? navigationThemes.DarkTheme
      : navigationThemes.LightTheme;


  return (
    <PaperProvider theme={paperTheme}>
    <WardrobeProvider>
        <RootNavigator theme={navigationTheme}/>
    </WardrobeProvider>
    </PaperProvider>
  );
}
