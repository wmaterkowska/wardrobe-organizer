import { Text, View } from "react-native";
import { Platform } from "react-native";

import { database } from '../database'
import { seedDatabase } from '../database/seed'

export default function Index() {

  useEffect(() => {
    seedDatabase();
  }, []);

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
