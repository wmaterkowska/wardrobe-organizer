import React from 'react';
import { Stack } from "expo-router";
import { RealmProvider } from '@realm/react';
import { Item } from '../database/models/Item';
import { MainCategory } from '../database/models/MainCategory';
import { Category } from '../database/models/Category';
import { Color } from '../database/models/Color';
import { Pattern } from '../database/models/Pattern';
import { Fit } from '../database/models/Fit';
import { Cut } from '../database/models/Cut';
import { Textile } from '../database/models/Textile';
import { Occasion } from '../database/models/Occasion';
import { FeelIn } from '../database/models/FeelIn';
import { Outfit } from '../database/models/Outfit';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CustomThemeProvider } from '../context/ThemeContext';

export default function RootLayout() {

  return (
    <CustomThemeProvider>
    <SafeAreaProvider>
      <RealmProvider schema={[Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn, Outfit]}>
        <Stack screenOptions={{headerShown: false}} />
      </RealmProvider>
    </SafeAreaProvider>
    </CustomThemeProvider>
    )
}
