import { Stack } from "expo-router";
import { RealmProvider } from '@realm/react';
import { Item } from '../database/models/Item';
import { Color } from '../database/models/Color';

export default function RootLayout() {

  return (
    <RealmProvider schema={[Item, Color]}>
        <Stack />
    </RealmProvider>
    )
}
