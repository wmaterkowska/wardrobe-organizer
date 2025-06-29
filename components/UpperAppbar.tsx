import React, { useRef, useState } from 'react';
import { useRealm } from '@realm/react';
import { useWardrobeContext } from '../context/WardrobeContext';
import { useTabNavigation } from '../context/TabNavigationContext';

import { Alert, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, IconButton, Menu, SegmentedButtons, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';

import { useThemeToggle } from '../context/ThemeContext';
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
    isSelectMode,
    setIsSelectMode,
    selectedItems,
    setSelectedItems,
    deleteItems,
    triggerDelete,
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
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnchorRef = useRef(null);

  const goToAbout = () => {
    navigation.navigate('About');
  };

  const goToHelp = () => {
    console.log('Navigate to Help');
  };

  const goToLicenses = () => {
    console.log('Navigate to Licenses');
  };

  const { isDark, toggleTheme } = useThemeToggle();

  const handleCreateOutfit = () => {}
  const cancelSelection = () => {
    setIsSelectMode(false);
    setSelectedItems([]);
  }
  const confirmDelete = () => {
    Alert.alert(
      'Delete Items',
      `Are you sure you want to delete item(s)?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: triggerDelete,
        },
      ]
    );
  };

  return (
    <Appbar.Header
      style={{ height: UPPER_APPBAR_FOR_WARDROBE_HEIGHT + top }}
      safeAreaInsets={{ top }}
      elevated={true}
      statusBarHeight={0}
      >
      {back ?
        <Appbar.BackAction onPress={handleBack} /> : null }
      {!isSelectMode ?
        <Appbar.Content style={styles.title} title={title} accessibilityLabel={title}/> : null}

      {currentTabKey === 'wardrobe' && isSelectMode === true ? (
        <View style={styles.selectModeButtons}>
          <Button
            mode="text"
            icon="trash-can"
            onPress={confirmDelete}
          >
            Delete Items
          </Button>
          <IconButton
            icon="close"
            onPress={cancelSelection}
            accessibilityLabel="Cancel selection"
          />
        </View>
      ) : (
      <>
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
      </>
      )}

      {route.name === "ItemDetail" ? (
        <Appbar.Action
          icon={isEditMode ? "check" : "pencil"}
          onPress={toggleEditMode}
        />
      ) : null }
      {currentTabKey === 'home' ? (
      <View ref={menuAnchorRef}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            accessibilityLabel="Menu"
            onPress={() => setMenuVisible(true)}
          />
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={toggleTheme}
          title={isDark ? 'Light theme' : 'Dark theme'}
          leadingIcon={isDark ? 'white-balance-sunny' : 'weather-night'}
        />
        <Menu.Item title="polish/english" />
        <Divider />
        <Menu.Item onPress={goToHelp} title="Help / Guide" />
        <Menu.Item onPress={goToAbout} title="About" />
      </Menu>
      </View>
      ) : null }
    </Appbar.Header>
  )
}

const styles = StyleSheet.create({
  segmentedButtons: {
    flex: 1,
    alignItems: 'center',
  },
  selectModeButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    gap: 8,
  }
})
