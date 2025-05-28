import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { BSON } from 'realm';

import { useWardrobeContext, useRegisterSave }  from '../context/WardrobeContext';
import { useItemFormData } from '../hooks/useItemFormData';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { pickOrCaptureImage } from '../utility/photoUtils';
import { updateItemField } from '../utility/itemUpdate';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';
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
import ComfortSection from '../components/ComfortSection';
import QuestionSection from '../components/QuestionSection';
import WantSection from '../components/WantSection';

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
  }, [imageUri, main, itemCategory]);

  const { isEditMode, setIsEditMode, saveChanges } = useWardrobeContext();

// set state for item detail and edit item detail ==================================================
  const [imageUri, setImageUri] = useState<string | null>(item.image_uri);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [itemName, setItemName] = useState<string | null>(item.item_name);
  const [isItemNameEditable, setIsItemNameEditable] = useState(false);
  const [main, setMain] = useState< MainCategory | null>(item.main_category);
  const [isMainEditable, setIsMainEditable] = useState(false);
  const [itemCategory, setItemCategory] = useState<Category | null>(item.category);
  const [isCategoryEditable, setIsCategoryEditable] = useState(false);
  const [itemColors, setItemColors] = useState<Color[]>(item.colors);
  const [isColorsEditable, setIsColorsEditable] = useState(false);
  const [itemPatterns, setItemPatterns] = useState<Pattern[]>(item.patterns);
  const [isPatternsEditable, setIsPatternsEditable] = useState(false);
  const [itemFits, setItemFits] = useState<Fit[]>(item.fits);
  const [isFitsEditable, setIsFitsEditable] = useState(false);
  const [itemCuts, setItemCuts] = useState<Cut[]>(item.cuts);
  const [filteredCuts, setFilteredCuts] = useState<Realm.Results<Cut> | Cut[] | null>(null);
  const [isCutsEditable, setIsCutsEditable] = useState(false);
  const [itemTextiles, setItemTextiles] = useState<Textile[]>(item.textiles);
  const [isTextilesEditable, setIsTextilesEditable] = useState(false);
  const [itemOccasions, setItemOccasions] = useState<Occasion[]>(item.occasions);
  const [isOccasionsEditable, setIsOccasionsEditable] = useState(false);
  const [itemComfort, setItemComfort] = useState<int>(item.comfort);
  const [isComfortEditable, setIsComfortEditable] = useState(false);
  const [itemFeelIn, setItemFeelIn] = useState<FeelIn[]>(item.feel_in);
  const [isFeelInEditable, setIsFeelInEditable] = useState(false);
  const [likeMe, setLikeMe] =  useState(item.like_me);
  const [isLikeMeEditable, setIsLikeMeEditable] = useState(false);
  const [lookLevel, setLookLevel] = useState(item.look_level);
  const [isLookLevelEditable, setIsLookLevelEditable] = useState(false);
  const [frequencyLevel, setFrequencyLevel] = useState(item.frequency);
  const [isFrequencyEditable, setIsFrequencyEditable] = useState(false);
  const [priceLevel, setPriceLevel] = useState(item.price);
  const [isPriceEditable, setIsPriceEditable] = useState(false);
  const [wantDecision, setWantDecision] = useState(item.want);
  const [isWantEditable, setIsWantEditable] = useState(false);

// use hook for sorting and incrementing/adding properties =========================================
  const {
    category: {getSorted: getSortedCategories, incrementOrCreate: incrementOrCreateCategory},
    color: { getSorted: getSortedColors, incrementOrCreate: incrementOrCreateColor },
    pattern: { getSorted: getSortedPatterns, incrementOrCreate: incrementOrCreatePattern },
    fit: { getSorted: getSortedFits, incrementOrCreate: incrementOrCreateFit },
    cut: { getSorted: getSortedCuts, incrementOrCreate: incrementOrCreateCut },
    textile: { getSorted: getSortedTextiles, incrementOrCreate: incrementOrCreateTextile },
    occasion: { getSorted: getSortedOccasions, incrementOrCreate: incrementOrCreateOccasion },
    feels: { getSorted: getSortedFeelIns, incrementOrCreate: incrementOrCreateFeelIn },
  } = useAllPropertyManagers();

  const sortedCategories = getSortedCategories(categories.map(c => c.id));
  const sortedColors = getSortedColors(colors.map(c => c.id));
  const sortedPatterns = getSortedPatterns(patterns.map(p => p.id));
  const sortedFits = getSortedFits(fits.map(f => f.id));
  const sortedTextiles = getSortedTextiles(textiles.map(t => t.id));
  const sortedOccasions = getSortedOccasions(occasions.map(o => o.id));
  const sortedFeelIns = getSortedFeelIns(feels.map(f => f.id));

// use Effect to show only cuts connected with chosen category =====================================
  useEffect(() => {
    if (itemCategory) {
      const sortedCuts = getSortedCuts(cuts.map(c => c.id));
      const cutsForCategory = sortedCuts.filter(cut => cut.categories.some(cat => cat.id === itemCategory.id));
      setFilteredCuts(cutsForCategory);
    } else {
     setFilteredCuts([]);
     setSortedCuts([]);
    }
  }, [itemCategory, cuts, itemCuts]);

// functions to toggle edit buttons ================================================================
  const toggleEditAll = () => {
    setIsImageEditable(!isImageEditable);
    setIsItemNameEditable(!isItemNameEditable);
    setIsMainEditable(!isMainEditable);
    setIsCategoryEditable(!isCategoryEditable);
    setIsColorsEditable(!isColorsEditable);
    setIsPatternsEditable(!isPatternsEditable);
    setIsFitsEditable(!isFitsEditable);
    setIsCutsEditable(!isCutsEditable);
    setIsTextilesEditable(!isTextilesEditable);
    setIsOccasionsEditable(!isOccasionsEditable);
    setIsComfortEditable(!isComfortEditable);
    setIsFeelInEditable(!isFeelInEditable);
    setIsLikeMeEditable(!isLikeMeEditable);
    setIsLookLevelEditable(!isLookLevelEditable);
    setIsFrequencyEditable(!isFrequencyEditable);
    setIsPriceEditable(!isPriceEditable);
    setIsWantEditable(!isWantEditable);
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
    if (isCategoryEditable) { updateItemField(realm, item, {category: itemCategory})};
  };
  const handleCategorySelect = (id: string) => {
    const categoryFromId = categories.find(c => c.id === id);
    setItemCategory(categoryFromId);
  };

  const toggleColorEdit = () => {
    setIsColorsEditable(!isColorsEditable);
    if (isColorsEditable) { updateItemField(realm, item, {colors: itemColors})};
  };
  const handleColorSelect = (id: string) => {
    const colorFromId = colors.find((c) => c.id === id);
    setItemColors((prev) =>
      prev.includes(colorFromId) ? prev.filter((c) => c.id !== colorFromId.id) : [...prev, colorFromId]
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

  const toggleFitEdit = () => {
    setIsFitsEditable(!isFitsEditable);
    if (isFitsEditable) { updateItemField(realm, item, {fits: itemFits})};
  };
  const handleFitSelect = (id: string) => {
    const fitFromId = fits.find((f) => f.id === id);
    setItemFits((prev) =>
      prev.includes(fitFromId) ? prev.filter((f) => f !== fitFromId) : [...prev, fitFromId]
      );
  };

  const toggleCutEdit = () => {
    setIsCutsEditable(!isCutsEditable);
    if (isCutsEditable) { updateItemField(realm, item, {cuts: itemCuts})};
  };
  const handleCutSelect = (id: string) => {
    const cutFromId = cuts.find((c) => c.id === id);
    setItemCuts((prev) =>
      prev.includes(cutFromId) ? prev.filter((c) => c !== cutFromId) : [...prev, cutFromId]
      );
  };

  const toggleTextileEdit = () => {
    setIsTextilesEditable(!isTextilesEditable);
    if (isTextilesEditable) { updateItemField(realm, item, {textiles: itemTextiles})};
  };
  const handleTextileSelect = (id: string) => {
    const textileFromId = textiles.find((t) => t.id === id);
    setItemTextiles((prev) =>
      prev.includes(textileFromId) ? prev.filter((t) => t !== textileFromId) : [...prev, textileFromId]
      );
  };

  const toggleOccasionEdit = () => {
    setIsOccasionsEditable(!isOccasionsEditable);
    if (isOccasionsEditable) { updateItemField(realm, item, {occasions: itemOccasions})};
  };
  const handleOccasionSelect = (id: string) => {
    const occasionFromId = occasions.find((o) => o.id === id);
    setItemOccasions((prev) =>
      prev.includes(occasionFromId) ? prev.filter((o) => o !== occasionFromId) : [...prev, occasionFromId]
      );
  };

  const toggleComfortEdit = () => {
    setIsComfortEditable(!isComfortEditable);
    if (isComfortEditable) { updateItemField(realm, item, {comfort: itemComfort})};
  };
  const handleComfortSelect = (comfortLevel: int) => {
    setItemComfort(comfortLevel)
  };

  const toggleFeelInEdit = () => {
    setIsFeelInEditable(!isFeelInEditable);
    if (isFeelInEditable) { updateItemField(realm, item, {feel_in: itemFeelIn})};
  };
  const handleFeelInSelect = (id: string) => {
    const feelInFromId = feels.find((f) => f.id === id);
    setItemFeelIn((prev) =>
      prev.includes(feelInFromId) ? prev.filter((f) => f !== feelInFromId) : [...prev, feelInFromId]
      );
  };

  const toggleLikeMeEdit = () => {
    setIsLikeMeEditable(!isLikeMeEditable);
    if (isLikeMeEditable) { updateItemField(realm, item, {like_me: likeMe})};
  };
  const handleLikeMeSelect = (likeMeLevel: string) => { setLikeMe(likeMeLevel) };

  const toggleLookLevelEdit = () => {
    setIsLookLevelEditable(!isLookLevelEditable);
    if (isLookLevelEditable) { updateItemField(realm, item, {look_level: lookLevel})};
  };
  const handleLookLevelSelect = (lookLvl: string) => { setLookLevel(lookLvl) };

  const toggleFrequencyEdit = () => {
    setIsFrequencyEditable(!isFrequencyEditable);
    if (isFrequencyEditable) { updateItemField(realm, item, {frequency: frequencyLevel})};
  };
  const handleFrequencySelect = (freqLvl: string) => { setFrequencyLevel(freqLvl) };

  const togglePriceEdit = () => {
    setIsPriceEditable(!isPriceEditable);
    if (isPriceEditable) { updateItemField(realm, item, {price: priceLevel})};
  };
  const handlePriceSelect = (priceLvl: string) => { setPriceLevel(priceLvl) };

  const toggleWantEdit = () => {
    setIsWantEditable(!isWantEditable);
    if (isWantEditable) { updateItemField(realm, item, {want: wantDecision})};
  };
  const handleWantSelect = (wantDec: string) => { setWantDecision(wantDec) };

  const saveFn = useCallback(() => {
    updateItemField(realm, item, {
      image_uri: imageUri,
      item_name: itemName,
      main_category: main,
      category: itemCategory,
      colors: itemColors,
      patterns: itemPatterns,
      fits: itemFits,
      textiles: itemTextiles,
      occasions: itemOccasions,
      comfort: itemComfort,
      feel_in: itemFeelIn,
      like_me: likeMe,
      look_level: lookLevel,
      frequency: frequencyLevel,
      price: priceLevel,
      want: wantDecision,
    })
  }, []);

  useRegisterSave(saveFn);

  useEffect(() => {
    if (!isEditMode) {
      setIsImageEditable(false);
      setIsItemNameEditable(false);
      setIsMainEditable(false);
      setIsCategoryEditable(false);
      setIsColorsEditable(false);
      setIsPatternsEditable(false);
      setIsFitsEditable(false);
      setIsCutsEditable(false);
      setIsTextilesEditable(false);
      setIsOccasionsEditable(false);
      setIsComfortEditable(false);
      setIsFeelInEditable(false);
      setIsLikeMeEditable(false);
      setIsLookLevelEditable(false);
      setIsFrequencyEditable(false);
      setIsPriceEditable(false);
      setIsWantEditable(false);
    }
  }, [isEditMode])

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
            colors={isColorsEditable && isEditMode ? colors : item.colors}
            selectedColorIds={isEditMode ? itemColors.map((c) => c.id) : []}
            handleSelect={handleColorSelect}
            isEditable={isColorsEditable}
            onPressEditIcon={toggleColorEdit}
          /> : null }

        <PropertySection
          title='patterns'
          properties={isPatternsEditable && isEditMode ? patterns : item.patterns}
          selectedPropertyIds={isPatternsEditable && isEditMode ? itemPatterns.map((p) => p.id) : []}
          handleSelect={handlePatternSelect}
          isEditable={isPatternsEditable}
          onPressEditIcon={togglePatternEdit}
        />

        <PropertySection
          title='fits'
          properties={isFitsEditable && isEditMode ? fits : item.fits}
          selectedPropertyIds={isFitsEditable && isEditMode ? itemFits.map((f) => f.id) : []}
          handleSelect={handleFitSelect}
          isEditable={isFitsEditable}
          onPressEditIcon={toggleFitEdit}
        />

        <PropertySection
          title='cuts'
          properties={(isCutsEditable && isEditMode) ? filteredCuts : item.cuts}
          selectedPropertyIds={(isCutsEditable && isEditMode) ? itemCuts.map((c) => c.id) : []}
          handleSelect={handleCutSelect}
          isEditable={isCutsEditable}
          onPressEditIcon={toggleCutEdit}
        />

        <PropertySection
          title='textiles'
          properties={(isTextilesEditable && isEditMode) ? textiles : item.textiles}
          selectedPropertyIds={(isTextilesEditable && isEditMode) ? itemTextiles.map((t) => t.id) : []}
          handleSelect={handleTextileSelect}
          isEditable={isTextilesEditable}
          onPressEditIcon={toggleTextileEdit}
        />

        <PropertySection
          title='occasions'
          properties={(isOccasionsEditable && isEditMode) ? occasions : item.occasions}
          selectedPropertyIds={(isOccasionsEditable && isEditMode) ? itemOccasions.map((o) => o.id) : []}
          handleSelect={handleOccasionSelect}
          isEditable={isOccasionsEditable}
          onPressEditIcon={toggleOccasionEdit}
        />

        <ComfortSection
          comfortLevel={item.comfort}
          isEditable={isComfortEditable}
          onChange={handleComfortSelect}
          onPressEditIcon={toggleComfortEdit}
        />

        <PropertySection
          title={'feel_in'}
          properties={(isFeelInEditable && isEditMode) ? feels : item.feel_in}
          selectedPropertyIds={(isFeelInEditable && isEditMode) ? itemFeelIn.map((f) => f.id) : []}
          handleSelect={handleFeelInSelect}
          isEditable={isFeelInEditable}
          onPressEditIcon={toggleFeelInEdit}
        />

        <QuestionSection
          property={'like_me'}
          value={item.like_me}
          isEditable={isLikeMeEditable}
          handleSelect={handleLikeMeSelect}
          onPressEditIcon={toggleLikeMeEdit}
        />

        <QuestionSection
          property={'look_level'}
          value={item.look_level}
          isEditable={isLookLevelEditable}
          handleSelect={handleLookLevelSelect}
          onPressEditIcon={toggleLookLevelEdit}
        />

        <QuestionSection
          property={'frequency'}
          value={item.frequency}
          isEditable={isFrequencyEditable}
          handleSelect={handleFrequencySelect}
          onPressEditIcon={toggleFrequencyEdit}
        />

        <QuestionSection
          property={'price'}
          value={item.price}
          isEditable={isPriceEditable}
          handleSelect={handlePriceSelect}
          onPressEditIcon={togglePriceEdit}
        />

        <WantSection
          value={item.want}
          isEditable={isWantEditable}
          handleSelect={handleWantSelect}
          onPressEditIcon={toggleWantEdit}
        />

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