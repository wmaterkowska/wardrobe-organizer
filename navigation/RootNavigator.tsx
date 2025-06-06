import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeView from '../views/HomeView';
import WardrobeView from '../views/WardrobeView';
import ItemDetailView from '../views/ItemDetailView';
import SummaryView from '../views/SummaryView';
import UpperAppbar from '../components/UpperAppbar';

export type RootStackParamList = {
  Home: undefined;
  Wardrobe: undefined;
  ItemDetail: {itemId: string};
  Summary: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        header: (props) => <UpperAppbar {...props}/>
      }}>
      <Stack.Screen name="Home" component={HomeView} />
      <Stack.Screen name="Wardrobe" component={WardrobeView} />
      <Stack.Screen name="ItemDetail" component={ItemDetailView} />
      <Stack.Screen name="Summary" component={SummaryView} />
    </Stack.Navigator>
  );
}
