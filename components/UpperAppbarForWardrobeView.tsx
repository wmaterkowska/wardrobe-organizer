import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { useWardrobeContext } from '../context/WardrobeContext';

import { Appbar, SegmentedButtons, IconButton } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';

type Props = NativeStackScreenProps<RootStackParamList, 'UpperMenuForWardrobeView'>;
const UPPER_APPBAR_FOR_WARDROBE_HEIGHT = 50;

export default function UpperAppbarForWardrobeView({ navigation, route, options, back }) {

  const { viewType, setViewType, numColumns, setNumColumns } = useWardrobeContext();
  const title = getHeaderTitle(options, route.name);
  const { top } = useSafeAreaInsets();

  const cycleZoom = () => {
    setNumColumns(prev => {
      if (prev === 1) return 2;
      if (prev === 2) return 3;
      if (prev === 3) return 4;
      if (prev === 4) return 1;
      return 4;
    });
  };

  return (
    <Appbar.Header
      style={[{height: UPPER_APPBAR_FOR_WARDROBE_HEIGHT + top,},]}
      safeAreaInsets={{ top }}
      elevated={true}
      statusBarHeight={0}
      >
      {back ?
        <Appbar.BackAction onPress={navigation.goBack} /> : null}
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
      />) : null}
      {route.name === "Wardrobe" && viewType === 'grid' ? (
        <Appbar.Action
          icon="magnify"
          onPress={cycleZoom}
        />
        ) : null}
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
