import React, { useState } from 'react';
import { useWardrobeContext } from '../context/WardrobeContext';

import { StyleSheet, View } from 'react-native';
import { Appbar, SegmentedButtons, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';

type Props = NativeStackScreenProps<RootStackParamList, 'UpperAppbar'>;
const UPPER_APPBAR_FOR_WARDROBE_HEIGHT = 60;

export default function UpperAppbar({ navigation, route, options, back }) {

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
  const title = getHeaderTitle(options, route.name);
  const { top } = useSafeAreaInsets();

  const handleBack = () => {
    setIsEditMode(false);
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

  return (
    <Appbar.Header
      style={{ height: UPPER_APPBAR_FOR_WARDROBE_HEIGHT + top }}
      safeAreaInsets={{ top }}
      elevated={true}
      statusBarHeight={0}
      >
      {back ?
        <Appbar.BackAction onPress={handleBack} /> : null}
      <Appbar.Content title={title} style={styles.title}/>
      {route.name === "Wardrobe" ? (
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
      {route.name === "Wardrobe" && viewType === 'grid' ? (
        <Appbar.Action
          icon="view-grid-plus-outline"
          onPress={cycleZoom}
        />
        ) : (
        <Appbar.Action
          icon={"filter-outline"}
          onPress={handleFilter}
        />
      )}
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
    marginRight: 30,
  },
})
