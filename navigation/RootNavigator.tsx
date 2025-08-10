import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';

import { useWardrobeContext } from '../context/WardrobeContext';

import { useTranslation } from 'react-i18next';

import { TabNavigationContext } from '../context/TabNavigationContext';
import { TAB_INDEX_MAP } from './tabRoutes';

import MainTabs from './MainTabs';
import ItemDetailView from '../views/ItemDetailView';
import OutfitDetailView from '../views/OutfitDetailView';
import SummaryDetailView from '../views/SummaryDetailView';
import UpperAppbar from '../components/UpperAppbar';
import AboutView from '../views/AboutView';
import WelcomeView from '../views/WelcomeView';

export type RootStackParamList = {
  Home: undefined;
  Wardrobe: undefined;
  ItemDetail: {itemId: string};
  Outfits: undefined;
  OutfitDetail: {outfitId: string};
  Summary: undefined;
  SummaryDetail: {type: 'category' | 'feel' | 'frequency' | 'appearance'};
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {

  const { t } = useTranslation();

  const items = useQuery(Item);
  const tabKeys: TabRouteKey[] = ['home', 'wardrobe', '', 'outfits', 'summary']

  const [index, setIndex] = useState(0);
  const currentTabKey = tabKeys[index];
  const { showOnboarding, setShowOnboarding } = useWardrobeContext();

  useEffect(() => {
    if (items.length !== 0) {setShowOnboarding(true)}
  }, [items])

  const setTabByKey = (key: keyof typeof TAB_INDEX_MAP) => {
    const tabIndex = TAB_INDEX_MAP[key];
    if (typeof tabIndex === 'number') {
      setIndex(tabIndex);
    }
  };

  const mainRoutes =[
    { key: 'home', title: t('navigation:home'), focusedIcon: 'home-outline' },
    { key: 'wardrobe', title: t('navigation:wardrobe'), focusedIcon: 'tshirt-crew-outline' },
    { key: 'add', title: '', focusedIcon: 'plus' }, // Placeholder for FAB
    { key: 'outfits', title: t('navigation:outfits'), focusedIcon: 'hanger' },
    { key: 'summary', title: t('navigation:summary'), focusedIcon: 'chart-pie' },
  ];

  return (
    <TabNavigationContext.Provider value={{ setTabByKey, currentTabKey }}>
    <Stack.Navigator
      screenOptions={{
        header: (props) => <UpperAppbar {...props}/>
      }}>
      {showOnboarding ? (
        <Stack.Screen name="Onboarding" component={WelcomeView} />
      ) : null }
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
      <Stack.Screen name="OutfitDetail" component={OutfitDetailView} />
      <Stack.Screen name="About" component={AboutView} />
    </Stack.Navigator>
    </TabNavigationContext.Provider>
  );
}
