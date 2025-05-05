import { Stack } from "expo-router";
import { RealmProvider } from '@realm/react';
import { Item } from '../database/models/Item';
import { Color } from '../database/models/Color';
import { Textile } from '../database/models/Textile';
import { Occasion } from '../database/models/Occasion';

export default function RootLayout() {

  return (
    <RealmProvider schema={[Item, Color, Textile, Occasion]}>
        <Stack />
    </RealmProvider>
    )
}
