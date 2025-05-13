import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../views/HomeView';
// import CreateItemView from '../views/CreateItemView';
import WardrobeView from '../views/WardrobeView';
import ItemDetailView from '../views/ItemDetailView';
import UpperAppbarForWardrobeView from '../components/UpperAppbarForWardrobeView';

export type RootStackParamList = {
  Home: undefined;
//   'Create Item': undefined;
   Wardrobe: undefined;
   ItemDetail: {itemId: string};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <UpperAppbarForWardrobeView {...props}/>
      }}>
      <Stack.Screen name="Home" component={HomeView} />
      {/*<Stack.Screen name="Create Item" component={CreateItemView} /> */}
      <Stack.Screen name="Wardrobe" component={WardrobeView} />
      <Stack.Screen name="ItemDetail" component={ItemDetailView} />
    </Stack.Navigator>
  );
}
