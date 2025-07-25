import React, { useState } from 'react';
import Realm from 'realm';
import { useTabNavigation } from '../context/TabNavigationContext';
import { View, StyleSheet } from 'react-native';
import { BottomNavigation, FAB, useTheme } from 'react-native-paper';
import { TAB_INDEX_MAP } from './tabRoutes';

import HomeView from '../views/HomeView';
import WardrobeView from '../views/WardrobeView';
import SummaryView from '../views/SummaryView';
import OutfitsView from '../views/OutfitsView';
import AddModal from '../components/AddModal';
import AddItemForm from '../components/AddItemForm';
import AddOutfitForm from '../components/AddOutfitForm';

import { useWardrobeContext } from '../context/WardrobeContext';

type Props = {
  index: number;
  setIndex: (i: number) => void;
  routes: { key: TabRouteKey; title: string; focusedIcon: string; unfocusedIcon: string }[];
};

export default function MainTabs({ index, setIndex, routes }: Props) {

  const theme = useTheme();

  const { isSelectMode } = useWardrobeContext();
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
        labeled={true}
        activeIndicatorStyle={[styles.highlight, {borderColor: theme.colors.onBackground}]}
      />
      <FAB
        icon="plus"
        onPress={handleAddPress}
        style={styles.fab}
        variant={(index === 3 && isSelectMode) ? 'surface' : 'tertiary'}
        mode='flat'
      />
      <AddModal visible={addModalVisible} onClose={() => setAddModalVisible(false)} >
        {isSelectMode ?
          <AddOutfitForm onDismiss={() => setAddModalVisible(false)} />
          : <AddItemForm />}
      </AddModal>
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
  highlight: {
    backgroundColor: 'transparent',
    borderTopWidth: 3,
    borderRadius: 0,
    paddingTop: 5,
    marginTop: -5,
  }
});