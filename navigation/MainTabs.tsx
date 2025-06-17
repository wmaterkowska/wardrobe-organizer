import React, { useState } from 'react';
import { useTabNavigation } from '../context/TabNavigationContext';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, FAB } from 'react-native-paper';
import { TAB_INDEX_MAP } from './tabRoutes';

import HomeView from '../views/HomeView';
import WardrobeView from '../views/WardrobeView';
import SummaryView from '../views/SummaryView';
import OutfitsView from '../views/OutfitsView';
// import UpperAppbar from '../components/UpperAppbar';
import AddItemModal from '../components/AddItemModal';
import AddItemForm from '../components/AddItemForm';

type Props = {
  index: number;
  steIndex: (i: number) => void;
  routes: { key: TabRouteKey; title: string; focusedIcon: string; unfocusedIcon: string }[];
};

export default function MainTabs({ index, setIndex, routes }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeView,
    wardrobe: WardrobeView,
    outfits: OutfitsView,
    summary: SummaryView,
  });

  const handleAddPress = () => {
    setAddModalVisible(true);
  };

  return (
    <View style={{ flex: 1 }}>
      <BottomNavigation
        navigationState={{ index, routes }}
        onIndexChange={setIndex}
        renderScene={renderScene}
      />
      <FAB
        icon="plus"
        onPress={handleAddPress}
        style={styles.fab}
      />
      <AddItemModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} >
        {<AddItemForm onClose={() => setAddModalVisible(false)}/>}
      </AddItemModal>
    </View>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 60,
    alignSelf: 'center',
    zIndex: 999,
  },
});