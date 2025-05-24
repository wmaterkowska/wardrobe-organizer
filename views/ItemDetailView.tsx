import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { BSON } from 'realm';

import { useWardrobeContext, useRegisterSave }  from '../context/WardrobeContext';
import { useItemFormData } from '../hooks/useItemFormData';
import { pickOrCaptureImage } from '../utility/photoUtils';
import { updateItemField } from '../utility/itemUpdate';

import { Item, MainCategory } from '../database/index';
import { COMFORT_LEVELS, PROPERTIES_ARRAY, Titles, Want } from '../constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import ColorList from '../components/ColorList';
import PropertyList from '../components/PropertyList';
import CustomSegmentedButton from '../components/CustomSegmentedButton';
import ImageSection from '../components/ImageSection';
import ItemNameSection from '../components/ItemNameSection';
import PropertySection from '../components/PropertySection';
import ColorSection from '../components/ColorSection';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailView({ route, navigation }: Props) {

  const realm = useRealm();
  const { mains, categories, colors, patterns, fits, cuts, textiles, occasions, feels } = useItemFormData();
  const { itemId } = route.params;
  const item = realm.objectForPrimaryKey<Item>('Item', itemId);

  const questions = [];

// Find image width and height =====================================================================
  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width - 32;

  useEffect(() => {
    if (!imageUri) return;
    Image.getSize(
      imageUri,
      (width, height) => {
        const ratio = height / width;
        setImageWidth(screenWidth);
        setImageHeight(screenWidth * ratio);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [imageUri, main, category]);

  const { isEditMode, setIsEditMode, saveChanges } = useWardrobeContext();

// set state for item detail and edit item detail ==================================================
  const [imageUri, setImageUri] = useState<string | null>(item.image_uri);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [itemName, setItemName] = useState<string | null>(item.item_name);
  const [isItemNameEditable, setIsItemNameEditable] = useState(false);
  const [main, setMain] = useState< MainCategory | null>(item.main_category);
  const [isMainEditable, setIsMainEditable] = useState(false);
  const [category, setCategory] = useState<Category | null>(item.category);
  const [isCategoryEditable, setIsCategoryEditable] = useState(false);
  const [itemColors, setItemColors] = useState<Color[]>(item.colors);
  const [isColorsEditable, setIsColorsEditable] = useState(false);
  const [itemPatterns, setItemPatterns] = useState<Pattern[]>(item.patterns);
  const [isPatternsEditable, setIsPatternsEditable] = useState(false);

// functions to toggle edit buttons ================================================================
  const toggleEditAll = () => {
    setIsImageEditable(!isImageEditable);
    setIsItemNameEditable(!isItemNameEditable);
    setIsMainEditable(!isMainEditable);
    setIsCategoryEditable(!isCategoryEditable);
    setIsColorsEditable(!isColorsEditable);
    setIsPatternsEditable(!isPatternsEditable);
  };

  const toggleImageEdit = () => {
    setIsImageEditable(!isImageEditable);
    if (isImageEditable) { updateItemField(realm, item, {image_uri: imageUri }) };
  };
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  };

  const toggleNameEdit = () => {
    setIsItemNameEditable(!isItemNameEditable);
    if (isItemNameEditable) { updateItemField(realm, item, {item_name: itemName }) };
  };

  const toggleMainEdit = () => {
    setIsMainEditable(!isMainEditable);
    if (isMainEditable) { updateItemField(realm, item, {main_category: main})};
  };
  const handleMainCategorySelect = (id: string) => {
    const mainFromId = mains.find(m => m.id === id);
    setMain(mainFromId);
  };

  const toggleCategoryEdit = () => {
    setIsCategoryEditable(!isCategoryEditable);
    if (isCategoryEditable) { updateItemField(realm, item, {category: category})};
  };
  const handleCategorySelect = (id: string) => {
    const categoryFromId = categories.find(c => c.id === id);
    setCategory(categoryFromId);
  };

  const toggleColorEdit = () => {
    setIsColorsEditable(!isColorsEditable);
    if (isColorsEditable) { updateItemField(realm, item, {colors: itemColors})};
  };
  const handleColorSelect = (id: string) => {
    const colorFromId = colors.find((c) => c.id === id);
    setItemColors((prev) =>
      prev.includes(colorFromId) ? prev.filter((c) => c !== colorFromId) : [...prev, colorFromId]
      );
  };

  const togglePatternEdit = () => {
    setIsPatternsEditable(!isPatternsEditable);
    if (isPatternsEditable) { updateItemField(realm, item, {patterns: itemPatterns})};
  };
  const handlePatternSelect = (id: string) => {
    const patternFromId = patterns.find((p) => p.id === id);
    setItemPatterns((prev) =>
      prev.includes(patternFromId) ? prev.filter((p) => p !== patternFromId) : [...prev, patternFromId]
      );
  };

  useRegisterSave(updateItemField(realm, item, {
    image_uri: imageUri,
    item_name: itemName,
    main_category: main,
    category: category,
    colors: itemColors,
    patterns: itemPatterns,
  }));

// error when there is no item found ===============================================================
  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Item not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, padding: 16}}
      showsVerticalScrollIndicator={false} >
      <View>
        {isEditMode ? (
          <Button mode='outlined' onPress={toggleEditAll} style={styles.editAllButton}>
            Edit all
          </Button> ) : null }

        <ImageSection
          imageUri={imageUri}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          isEditable={isImageEditable}
          onChange={handlePickImage}
          onPressEditIcon={toggleImageEdit}
        />

        <ItemNameSection
          itemName={itemName}
          isEditable={isItemNameEditable}
          onPressEditIcon={toggleNameEdit}
          onChange={setItemName}
        />

        <View style={!isEditMode ? styles.categories : styles.editCategories} >
          <PropertySection
            title='main category'
            propertyName={main?.name}
            properties={mains}
            selectedPropertyIds={[main?.id]}
            handleSelect={handleMainCategorySelect}
            isSingleSelect={true}
            isEditable={isMainEditable}
            onPressEditIcon={toggleMainEdit}
          />
          {main ? <Text variant="bodyMedium"> > </Text> : null}
          <PropertySection
            title='category'
            propertyName={item?.category?.name}
            properties={categories?.filter((c) => c.main_category?.id === main?.id)}
            selectedPropertyIds={[item?.category?.id]}
            handleSelect={handleCategorySelect}
            isSingleSelect={true}
            isEditable={isCategoryEditable}
            onPressEditIcon={toggleCategoryEdit}
          />
        </View>

        { item.colors ?
          <ColorSection
            colors={isColorsEditable ? colors : item.colors}
            selectedColorIds={itemColors.map((c) => c.id)}
            handleSelect={handleColorSelect}
            isEditable={isColorsEditable}
            onPressEditIcon={toggleColorEdit}
          /> : null }

        <PropertySection
          title='patterns'
          properties={isPatternsEditable ? patterns : item.patterns}
          selectedPropertyIds={isPatternsEditable ? itemPatterns.map((p) => p.id) : []}
          handleSelect={handlePatternSelect}
          isEditable={isPatternsEditable}
          onPressEditIcon={togglePatternEdit}
        />



        { PROPERTIES_ARRAY.map( (property, i) => (
          <PropertyList key={i} title={property} properties={item[property]} />
        ) )}

        {item.comfort ? (
          <CustomSegmentedButton
            property={'comfort'}
            levels={COMFORT_LEVELS}
            value={item.comfort}
            isEditable={false} />
          ): null}

        {item.feel_in ? (
          <PropertyList title={'feel_in'} properties={item.feel_in} />
        ) : null}

        {Object.keys(Titles).map((title, i) => (
          item[title] ? (
          <View style={styles.questionContainer} key={i}>
            <Text variant="bodyLarge">{Titles[title]}</Text>
            <Button mode='outlined'>{item[title]}</Button>
          </View>
          ) : null )
        )}

        {item.want ? (
          <View style={styles.questionContainer}>
            <Text variant="bodyLarge">{Want.want}</Text>
            <Button mode='contained'>{item.want}</Button>
          </View>
          ) : null
        }
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    gap: 5,
  },
  editCategories: {
    flexDirection: 'column',
  },
  editAllButton: {
    marginBottom: 16,
  },
  questionContainer: {
    marginTop: 16,
  }
})