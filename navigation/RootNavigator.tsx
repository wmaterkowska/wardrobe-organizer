import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { TabNavigationContext } from '../context/TabNavigationContext';
import { TAB_INDEX_MAP } from './tabRoutes';

import MainTabs from './MainTabs';
import ItemDetailView from '../views/ItemDetailView';
import SummaryDetailView from '../views/SummaryDetailView';
import UpperAppbar from '../components/UpperAppbar';
import AboutView from '../views/AboutView';

export type RootStackParamList = {
  Home: undefined;
  Wardrobe: undefined;
  ItemDetail: {itemId: string};
  Summary: undefined;
  SummaryDetail: {type: 'category' | 'feel' | 'frequency' | 'appearance'};
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

  const tabKeys: TabRouteKey[] = ['home', 'wardrobe', 'summary',]

  const [index, setIndex] = React.useState(0);
  const currentTabKey = tabKeys[index];

  const setTabByKey = (key: keyof typeof TAB_INDEX_MAP) => {
    const tabIndex = TAB_INDEX_MAP[key];
    if (typeof tabIndex === 'number') {
      setIndex(tabIndex);
    }
  };

  const mainRoutes = [
    { key: 'home', title: 'Home', focusedIcon: 'home-outline', unfocusedIcon: 'home-outline' },
    { key: 'wardrobe', title: 'Wardrobe', focusedIcon: 'hanger', unfocusedIcon: 'hanger' },
    { key: 'summary', title: 'Summary', focusedIcon: 'chart-bar', unfocusedIcon: 'chart-bar' },
//    { key: 'outfits', title: 'Outfits', icon: 'tshirt-crew' },
  ];

  return (
    <TabNavigationContext.Provider value={{ setTabByKey, currentTabKey }}>
    <Stack.Navigator
      initialRouteName="Main"
      screenOptions={{
        header: (props) => <UpperAppbar {...props}/>
      }}>
      <Stack.Screen name="Main">
        {() => (
          <MainTabs
            index={index}
            setIndex={setIndex}
            routes={mainRoutes}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="ItemDetail" component={ItemDetailView} />
      <Stack.Screen name="SummaryDetail" component={SummaryDetailView} />
      {/* }<Stack.Screen name="OutfitDetail" component={OutfitDetailView} /> */}
      <Stack.Screen name="About" component={AboutView} />
    </Stack.Navigator>
    </TabNavigationContext.Provider>
  );
}
