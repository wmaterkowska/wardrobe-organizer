import React, { useState } from 'react';
import { useRealm } from '@realm/react';
import { useWardrobeContext } from '../context/WardrobeContext';
import { useTabNavigation } from '../context/TabNavigationContext';

import { StyleSheet, View } from 'react-native';
import { Appbar, SegmentedButtons, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';

import { getTitle } from '../utility/screenTitle';

type Props = NativeStackScreenProps<RootStackParamList, 'UpperAppbar'>;
const UPPER_APPBAR_FOR_WARDROBE_HEIGHT = 60;

export default function UpperAppbar({ navigation, route, options, back }) {

  const realm = useRealm();
  const { currentTabKey } = useTabNavigation();
  const {
    viewType,
    setViewType,
    numColumns,
    setNumColumns,
    isEditMode,
    setIsEditMode,
    saveChanges,
    isFilter,
    setIsFilter,
  } = useWardrobeContext();
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    setIsEditMode(false);
    setIsFilter(false);
    return navigation.goBack();
  };

  const cycleZoom = () => {
    setNumColumns(prev => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      if (prev === 3) return 4;
      if (prev === 4) return 1;
      return 4;
    });
  };

  const toggleEditMode = () => {
    if (isEditMode) { saveChanges() };
    setIsEditMode(!isEditMode)
  }

  const handleFilter = () => {
    setIsFilter(!isFilter);
  }

  const title = getTitle(route.name, route.params, currentTabKey, realm);

  return (
    <Appbar.Header
      style={{ height: UPPER_APPBAR_FOR_WARDROBE_HEIGHT + top }}
      safeAreaInsets={{ top }}
      elevated={true}
      statusBarHeight={0}
      >
      {back ?
        <Appbar.BackAction onPress={handleBack} /> : null }
      <Appbar.Content style={styles.title} title={title} accessibilityLabel={title}/>
      {currentTabKey === 'wardrobe' && route.name !== "ItemDetail" ? (
      <SegmentedButtons
        density='small'
        value={viewType}
        onValueChange={setViewType}
        buttons={[
          {
            value: 'grid',
            icon: 'align-vertical-top',
          },
          {
            value: 'list',
            icon: 'align-horizontal-left',
          }
        ]}
        style={styles.segmentedButtons}
      />) : null }
      {currentTabKey === 'wardrobe' && viewType === 'grid' && route.name !== "ItemDetail" ? (
        <Appbar.Action
          icon="view-grid-plus-outline"
          onPress={cycleZoom}
        />
        ) : null }
      {currentTabKey === 'wardrobe' && viewType === 'list' && route.name !== "ItemDetail" ? (
        <Appbar.Action
          icon={"filter-outline"}
          onPress={handleFilter}
        />
      ) : null }
      {route.name === "ItemDetail" ? (
        <Appbar.Action
          icon={isEditMode ? "check" : "pencil"}
          onPress={toggleEditMode}
        />
      ) : null }
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  segmentedButtons: {
    flex: 1,
    alignItems: 'center',
  },
})
