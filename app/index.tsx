import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootNavigator from '../navigation/RootNavigator';
import { PaperProvider } from 'react-native-paper';
import { WardrobeProvider } from '../context/WardrobeContext';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme, navigationThemes } from '../theme/paperTheme6';

import Realm from 'realm';
import { useRealm } from '@realm/react';
import { useEffect } from 'react';
import { useThemeToggle } from '../context/ThemeContext';

import { seedDatabaseWithItems, seedDatabaseWithProperties } from '../database/seed';
import { Item } from '../database/models/Item';

export default function Index() {

  const realm = useRealm();
  const { isDark } = useThemeToggle();

  const scheme = useColorScheme();
  const paperTheme = isDark ? darkTheme : lightTheme;
  const navigationTheme =
    isDark
      ? navigationThemes.DarkTheme
      : navigationThemes.LightTheme;

  useEffect(()=> {
    const existingItems = realm.objects(Item);
    const properties = seedDatabaseWithProperties(realm);
    if (existingItems.length === 0 ) {
      if (properties) {
        seedDatabaseWithItems(realm, properties);
      }
    }
  }, [realm]);


  return (
    <PaperProvider theme={paperTheme}>
    <WardrobeProvider>
        <RootNavigator theme={navigationTheme}/>
    </WardrobeProvider>
    </PaperProvider>
  );
}
