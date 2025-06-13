import React from 'react';
import { useTabNavigation } from '../context/TabNavigationContext';
import { BottomNavigation } from 'react-native-paper';
import { TAB_INDEX_MAP } from './tabRoutes';

import HomeView from '../views/HomeView';
import WardrobeView from '../views/WardrobeView';
import SummaryView from '../views/SummaryView';
// import OutfitsView from '../views/OutfitsView';
import UpperAppbar from '../components/UpperAppbar';

type Props = {
  index: number;
  steIndex: (i: number) => void;
  routes: { key: TabRouteKey; title: string; focusedIcon: string; unfocusedIcon: string }[];
};

export default function MainTabs({ index, setIndex, routes }: Props) {

  const renderScene = BottomNavigation.SceneMap({
    home: HomeView,
    wardrobe: WardrobeView,
    summary: SummaryView,
//    outfits: OutfitsView,
  });

  return (
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
  );
}
