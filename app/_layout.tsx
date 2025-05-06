import React from 'react';
import { Stack } from "expo-router";
import { RealmProvider } from '@realm/react';
import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';
import { Color } from '../database/models/Color';
import { Cut } from '../database/models/Cut';
import { Textile } from '../database/models/Textile';
import { Occasion } from '../database/models/Occasion';

export default function RootLayout() {

  return (
    <RealmProvider schema={[Item, Category, Color, Cut, Textile, Occasion]}>
        <Stack />
    </RealmProvider>
    )
}
