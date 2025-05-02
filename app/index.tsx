import { Text, View } from "react-native";
import { Platform } from "react-native";
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'

import schema from '../model/schema'
import migrations from '../model/migrations'

const adapter = new SQLiteAdapter({
    schema,
    migrations,
    dbName: 'wardrobe',
    jsi: true,
    onSetUpError: error => {
        "Database failed to load"
    },
})

const database = new Database({
    adapter,
    modelClasses: [Item, Category, Color, Cut, Textile, Occasion],
})

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}
