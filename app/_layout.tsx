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

export default function RootLayout() {

  return (
    <RealmProvider schema={[Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn]}>
        <Stack screenOptions={{headerShown: false}} />
    </RealmProvider>
    )
}
