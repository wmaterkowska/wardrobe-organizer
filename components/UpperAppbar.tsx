import React, { useRef, useState } from 'react';
import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { useTranslation } from 'react-i18next';
import { useWardrobeContext } from '../context/WardrobeContext';
import { useTabNavigation } from '../context/TabNavigationContext';

import { Alert, StyleSheet, View } from 'react-native';
import { Appbar, Button, Divider, IconButton, Menu, SegmentedButtons, Switch, Text } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getHeaderTitle } from '@react-navigation/elements';
import ExportSummaryModal from './ExportSummaryModal';

import { useThemeToggle } from '../context/ThemeContext';
import { getTitle } from '../utility/screenTitle';
import {
  printCategorySummaryToJson,
  printWholeCategorySummary,
  printQuestionSummaryForCategoryToJson,
  printWholeQuestionSummary,
  generatePromptWrappedJson } from '../utility/printUtils';
import { typeQuestionMap } from '../constants/categoryArrays';

import { Item } from '../database/models/Item';
import { Category } from '../database/models/Category';

import * as Clipboard from 'expo-clipboard';

type Props = NativeStackScreenProps<RootStackParamList, 'UpperAppbar'>;
const UPPER_APPBAR_FOR_WARDROBE_HEIGHT = 60;

export default function UpperAppbar({ navigation, route, back }: Props) {

  const realm = useRealm();
  const { i18n, t } = useTranslation();
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
    categoryForPrint,
  } = useWardrobeContext();
  const { top } = useSafeAreaInsets();

  const [printModalVisible, setPrintModalVisible] = useState(false);
  const [printJson, setPrintJson] = useState('');

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

  const title = getTitle(route.name, route.params, currentTabKey, realm, t);
  const [menuVisible, setMenuVisible] = useState(false);
  const menuAnchorRef = useRef(null);

// change language =================================================================================
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const changeLanguage = async (lng: 'en' | 'pl') => {
    await i18n.changeLanguage(lng);
  }
  const onPressSwitchLanguage = () => {
    if(currentLanguage === 'en') {
      changeLanguage('pl');
      setCurrentLanguage('pl');
    } else {
      changeLanguage('en');
      setCurrentLanguage('en');
    }
  }

// go to description pages =========================================================================
  const goToAbout = () => {
    navigation.navigate('About');
  };

  const goToHelp = () => {
    console.log('Navigate to Help');
  };

// toggle themes ===================================================================================
  const { isDark, toggleTheme } = useThemeToggle();

// selection and delete handle =====================================================================
  const cancelSelection = () => {
    setIsSelectMode(false);
    setSelectedItems([]);
  }
  const confirmDelete = () => {
    Alert.alert(
      t('common:delete'),
      t('common:deleteQuestion'),
      [
        {
          text: t('common:cancel'),
          style: 'cancel',
        },
        {
          text: t('common:delete'),
          style: 'destructive',
          onPress: triggerDelete,
        },
      ]
    );
  };

// print summaries =================================================================================
  const items = useQuery(Item);
  const categories = useQuery(Category).map(cat => cat.name);

  const printAll = async () => {
    let summaryJson = '';
    if (route.name === 'SummaryDetail' && route.params.type === 'category') {
      summaryJson = printWholeCategorySummary(items, categories);
      try {
        await Clipboard.setStringAsync(summaryJson);
        console.log('✅ JSON copied to clipboard');
      } catch (err) {
        console.error('❌ Failed to copy JSON to clipboard:', err);
      }
    } else {
      const summary = typeQuestionMap[route.params.type];
      summaryJson = printWholeQuestionSummary(items, summary ,categories);
      try {
        await Clipboard.setStringAsync(summaryJson);
        console.log('✅ JSON copied to clipboard');
      } catch (err) {
        console.error('❌ Failed to copy JSON to clipboard:', err);
      }
    }

    setPrintModalVisible(true);
    setPrintJson(summaryJson);
  }

  const printForCategory = async () => {
    let summaryJson = '';
    if (route.name === 'SummaryDetail' && route.params.type === 'category') {
      if (categoryForPrint === 'All') {
        summaryJson = printCategorySummaryToJson(items, categoryForPrint);
        try {
          await Clipboard.setStringAsync(summaryJson);
          console.log('✅ JSON copied to clipboard');
        } catch (err) {
          console.error('❌ Failed to copy JSON to clipboard:', err);
        }
      } else {
        const itemsForCategory = items.filtered('category.name == $0', categoryForPrint)
        summaryJson = printCategorySummaryToJson(itemsForCategory, categoryForPrint);
        try {
          await Clipboard.setStringAsync(summaryJson);
          console.log('✅ JSON copied to clipboard');
        } catch (err) {
          console.error('❌ Failed to copy JSON to clipboard:', err);
        }
      }
    } else {
      if (categoryForPrint === 'All') {
        const summary = typeQuestionMap[route.params.type];
        summaryJson = printQuestionSummaryForCategoryToJson(items, summary, categoryForPrint);
        try {
          await Clipboard.setStringAsync(summaryJson);
          console.log('✅ JSON copied to clipboard');
        } catch (err) {
          console.error('❌ Failed to copy JSON to clipboard:', err);
        }
      } else {
        const summary = typeQuestionMap[route.params.type];
        const itemsForCategory = items.filtered('category.name == $0', categoryForPrint)
        summaryJson = printQuestionSummaryForCategoryToJson(itemsForCategory, summary, categoryForPrint);
        try {
          await Clipboard.setStringAsync(summaryJson);
          console.log('✅ JSON copied to clipboard');
        } catch (err) {
          console.error('❌ Failed to copy JSON to clipboard:', err);
        }
      }
    }

    setPrintModalVisible(true);
    setPrintJson(summaryJson);
  }

  const printWithPrompt = async () => {
    const withPrompt = generatePromptWrappedJson(printJson, route.params.type);
      try {
        await Clipboard.setStringAsync(withPrompt);
        console.log('✅ JSON with prompt copied to clipboard');
      } catch (err) {
        console.error('❌ Failed to copy JSON to clipboard:', err);
      }
    setPrintModalVisible(false);
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
      {!isSelectMode ?
        <Appbar.Content titleStyle={styles.title} title={title} accessibilityLabel={title}/> : null}

      {currentTabKey === 'home' ? (
      <View ref={menuAnchorRef}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="dots-vertical"
            accessibilityLabel={t('navigation:menu')}
            onPress={() => setMenuVisible(true)}
          />
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={toggleTheme}
          title={isDark ? t('common:lightTheme') : t('common:darkTheme')}
          leadingIcon={isDark ? 'white-balance-sunny' : 'weather-night'}
        />
        <Menu.Item
          onPress={onPressSwitchLanguage}
          title={currentLanguage === 'en' ? t('common:polishChange') : t('common:englishChange')} />
        <Divider />
        <Menu.Item onPress={goToHelp} title={t('navigation:help')} />
        <Menu.Item onPress={goToAbout} title={t('navigation:about')} />
      </Menu>
      </View>
      ) : null }
      {(currentTabKey === 'wardrobe' || currentTabKey === 'outfits') && isSelectMode === true ? (
        <View style={styles.selectModeButtons}>
          <Button
            mode="text"
            icon="trash-can"
            onPress={confirmDelete}
          >
            {t('common:delete')}
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
      {(currentTabKey === 'wardrobe' && viewType === 'grid' && route.name !== "ItemDetail") || (currentTabKey === "outfits" && route.name !== "OutfitDetail") ? (
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
      {route.name === "ItemDetail" || route.name === "OutfitDetail" ? (
        <Appbar.Action
          icon={isEditMode ? "check" : "pencil"}
          onPress={toggleEditMode}
        />
      ) : null }
      {route.name === 'SummaryDetail' ? (
      <View ref={menuAnchorRef}>
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <Appbar.Action
            icon="content-copy"
            accessibilityLabel="Copy Menu"
            onPress={() => setMenuVisible(true)}
          />
        }
        anchorPosition="bottom"
      >
        <Menu.Item
          onPress={printAll}
          title={t('copyWholeSummary')}
        />
        <Menu.Item
          onPress={printForCategory}
          title={t('copyCurrentScreen')}
        />
      </Menu>
      </View>
      ) : null}

      <ExportSummaryModal
        visible={printModalVisible}
        onDismiss={() => setPrintModalVisible(false)}
        jsonString={printJson}
        onAddPrompt={printWithPrompt}
        onConfirmJson={() => {
          setPrintModalVisible(false);
        }}
      />
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
  },
  title: {
    fontSize: 20,
  }
})
