import { Text, View } from "react-native";
import { Platform } from "react-native";

import { RootNavigator } from '../navigation/RootNavigator'

import { database } from '../database'
import { seedDatabase } from '../database/seed'

export default function Index() {

  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <PaperProvider>
        <NavigationContainer>
            <RootNavigator />
        </NavigationContainer>
    </PaperProvider>
  );
}

export default { Index };