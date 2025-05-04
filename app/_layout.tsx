import { Stack } from "expo-router";
import { RealmProvider } from '@realm/react';
import { Item } from '../database/models/Item';


export default function RootLayout() {

  return (
    <RealmProvider schema={[Item]}>
        <Stack />
    </RealmProvider>
    )
}
