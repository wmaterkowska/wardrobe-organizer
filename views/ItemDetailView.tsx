import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, Divider, Text  } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Realm from 'realm';
import { useRealm } from '@realm/react';

import { useWardrobeContext, useRegisterSave }  from '../context/WardrobeContext';
import { useItemFormData } from '../hooks/useItemFormData';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { pickOrCaptureImage } from '../utility/photoUtils';
import { updateItemField } from '../utility/itemUpdate';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import EditAllButtonSection from'../components/EditAllButtonSection';
import ImageSection from '../components/ImageSection';
import NameSection from '../components/NameSection';
import PropertySection from '../components/PropertySection';
import ColorSection from '../components/ColorSection';
import ComfortSection from '../components/ComfortSection';
import QuestionSection from '../components/QuestionSection';
import WantSection from '../components/WantSection';

import { useTranslation } from 'react-i18next';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailView({ route }: Props) {

  const { t } = useTranslation();

  const { colors: themeColors } = useTheme();

  const realm = useRealm();
  const { mains, categories, colors, patterns, fits, cuts, textiles, occasions, feels } = useItemFormData();
  const { itemId } = route.params;
  const item = realm.objectForPrimaryKey<Item>('Item', itemId);

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
  }, [imageUri]);

  const { isEditMode, setIsEditMode, saveChanges } = useWardrobeContext();
// set state for item detail and edit item detail ==================================================
  const [imageUri, setImageUri] = useState<string | null>(item.image_uri);
  const [itemName, setItemName] = useState<string | null>(item.item_name);
  const [main, setMain] = useState< MainCategory | null>(item.main_category);
  const [itemCategory, setItemCategory] = useState<Category | null>(item.category);
  const [filteredCategories, setFilteredCategories] = useState<Realm.Results<Category> | Category[] | null>(categories);
  const [itemColors, setItemColors] = useState<Color[]>(item.colors);
  const [itemPatterns, setItemPatterns] = useState<Pattern[]>(item.patterns);
  const [itemFits, setItemFits] = useState<Fit[]>(item.fits);
  const [itemCuts, setItemCuts] = useState<Cut[]>(item.cuts);
  const [filteredCuts, setFilteredCuts] = useState<Realm.Results<Cut> | Cut[] | null>(cuts);
  const [itemTextiles, setItemTextiles] = useState<Textile[]>(item.textiles);
  const [itemOccasions, setItemOccasions] = useState<Occasion[]>(item.occasions);
  const [itemComfort, setItemComfort] = useState<int>(item.comfort);
  const [itemFeelIn, setItemFeelIn] = useState<FeelIn[]>(item.feel_in);
  const [likeMe, setLikeMe] =  useState(item.like_me);
  const [lookLevel, setLookLevel] = useState(item.look_level);
  const [frequencyLevel, setFrequencyLevel] = useState(item.frequency);
  const [priceLevel, setPriceLevel] = useState(item.price);
  const [wantDecision, setWantDecision] = useState(item.want);

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

  const sortedColors = getSortedColors(colors.map(c => c.id));
  const sortedPatterns = getSortedPatterns(patterns.map(p => p.id));
  const sortedFits = getSortedFits(fits.map(f => f.id));
  const sortedTextiles = getSortedTextiles(textiles.map(t => t.id));
  const sortedOccasions = getSortedOccasions(occasions.map(o => o.id));
  const sortedFeelIns = getSortedFeelIns(feels.map(f => f.id));

// use Effect to show categories for main ==========================================================
  useEffect(() => {
    if (main) {
      const sortedCategories = getSortedCategories(categories.map(c => c.id));
      const categoriesForMain = sortedCategories.filter(cat => cat.main_category.id === main.id);
      setFilteredCategories(categoriesForMain);
    } else {
      setFilteredCategories(categories);
    }
  }, [main, categories, itemCategory])

// use Effect to show only cuts connected with chosen category =====================================
  useEffect(() => {
    if (itemCategory) {
      const sortedCuts = getSortedCuts(cuts.map(c => c.id));
      const cutsForCategory = sortedCuts.filter(cut => cut.categories.some(cat => cat.id === itemCategory.id));
      setFilteredCuts(cutsForCategory);
    } else {
     setFilteredCuts([]);
    }
  }, [itemCategory, categories, cuts, itemCuts]);

// functions to handle property sections ===========================================================
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  };

  const handleMainCategorySelect = (id: string) => {
    const mainFromId = mains.find(m => m.id === id);
    setMain(mainFromId);
  };

  const handleCategorySelect = (id: string) => {
    const categoryFromId = categories.find(c => c.id === id);
    setItemCategory(categoryFromId);
  };

  const handleColorSelect = (id: string) => {
    const colorFromId = colors.find((c) => c.id === id);
    setItemColors((prev) => {
      const isSelected = prev.some((c) => c.id === colorFromId.id);
      return isSelected ? prev.filter((c) => c.id !== colorFromId.id) : [...prev, colorFromId]; });
  };

  const handlePatternSelect = (id: string) => {
    const patternFromId = patterns.find((p) => p.id === id);
    setItemPatterns((prev) => {
      const isSelected = prev.some((p) => p.id === patternFromId.id);
      return isSelected ? prev.filter((p) => p.id !== patternFromId.id) : [...prev, patternFromId]; });
  };

  const handleFitSelect = (id: string) => {
    const fitFromId = fits.find((f) => f.id === id);
    setItemFits((prev) => {
      const isSelected = prev.some((f) => f.id === fitFromId.id);
      return isSelected ? prev.filter((f) => f.id !== fitFromId.id) : [...prev, fitFromId]; });
  };

  const handleCutSelect = (id: string) => {
    const cutFromId = cuts.find((c) => c.id === id);
    setItemCuts((prev) => {
      const isSelected = prev.some((c) => c.id === cutFromId.id);
      return isSelected ? prev.filter((c) => c.id !== cutFromId.id) : [...prev, cutFromId]; });
  };

  const handleTextileSelect = (id: string) => {
    const textileFromId = textiles.find((t) => t.id === id);
    setItemTextiles((prev) => {
      const isSelected = prev.some((t) => t.id === textileFromId.id);
      return isSelected ? prev.filter((t) => t.id !== textileFromId.id) : [...prev, textileFromId]; });
  };

  const handleOccasionSelect = (id: string) => {
    const occasionFromId = occasions.find((o) => o.id === id);
    setItemOccasions((prev) => {
      const isSelected = prev.some((o) => o.id === occasionFromId.id);
      return isSelected ? prev.filter((o) => o.id !== occasionFromId.id) : [...prev, occasionFromId]; });
  };

  const handleComfortSelect = (comfortLevel: int) => {
    setItemComfort(comfortLevel)
  };

  const handleFeelInSelect = (id: string) => {
    const feelInFromId = feels.find((f) => f.id === id);
    setItemFeelIn((prev) => {
      const isSelected = prev.some((f) => f.id === feelInFromId.id);
      return isSelected ? prev.filter((f) => f.id !== feelInFromId.id) : [...prev, feelInFromId]; });
  };

  const handleLikeMeSelect = (likeMeLevel: string) => { setLikeMe(likeMeLevel) };

  const handleLookLevelSelect = (lookLvl: string) => { setLookLevel(lookLvl) };

  const handleFrequencySelect = (freqLvl: string) => { setFrequencyLevel(freqLvl) };

  const handlePriceSelect = (priceLvl: string) => { setPriceLevel(priceLvl) };

  const handleWantSelect = (wantDec: string) => { setWantDecision(wantDec) };

// save to database function =======================================================================
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
  }, [imageUri, itemName, main, itemCategory, itemColors, itemPatterns, itemFits, itemTextiles, itemOccasions, itemComfort, itemFeelIn, likeMe, lookLevel, frequencyLevel, priceLevel, wantDecision, isEditMode]);
  useRegisterSave(saveFn);

// error when there is no item found ===============================================================
  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Item not found. Add your first item!</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, padding: 16, backgroundColor: themeColors.background}}
      showsVerticalScrollIndicator={false}>
      <View>

      <ImageSection
        imageUri={imageUri}
        imageHeight={imageHeight}
        imageWidth={imageWidth}
        isEditable={isEditMode}
        onChange={handlePickImage}
      />

        <NameSection
          name={itemName}
          isEditable={isEditMode}
          onChange={setItemName}
        />

        <View style={isEditMode ? styles.editCategories : styles.categories} >
          <PropertySection
            title={t('properties:MainCategory')}
            propertyName={main?.name}
            properties={mains}
            selectedPropertyIds={[main?.id]}
            handleSelect={handleMainCategorySelect}
            isSingleSelect={true}
            isEditable={isEditMode}
          />
          {main ? <Text variant="bodyMedium"> > </Text> : null}
          <PropertySection
            key={'categories'+main.id.toString()+filteredCategories[0].name}
            title={t('properties:Category')}
            propertyName={itemCategory?.name}
            properties={filteredCategories}
            selectedPropertyIds={[itemCategory?.id]}
            handleSelect={handleCategorySelect}
            isSingleSelect={true}
            isEditable={isEditMode}
          />
        </View>

        <Divider style={styles.divider}/>
        { item.colors ?
          <ColorSection
            colors={isEditMode ? sortedColors : item.colors}
            selectedColorIds={isEditMode ? itemColors.map((c) => c.id) : []}
            handleSelect={handleColorSelect}
            isEditable={isEditMode}
          /> : null }

        <Divider style={styles.divider}/>
        <PropertySection
          key={'patterns'+isEditMode.toString()}
          title={t('properties:Patterns')}
          properties={(isEditMode) ? sortedPatterns : item.patterns}
          selectedPropertyIds={(isEditMode) ? itemPatterns.map((p) => p.id) : []}
          handleSelect={handlePatternSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          key={'fits'+isEditMode.toString()}
          title={t('properties:Fits')}
          properties={isEditMode ? sortedFits : item.fits}
          selectedPropertyIds={isEditMode ? itemFits.map((f) => f.id) : []}
          handleSelect={handleFitSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          kay={'cuts'+isEditMode.toString()}
          title={t('properties:Cuts')}
          properties={(isEditMode) ? filteredCuts : item.cuts}
          selectedPropertyIds={(isEditMode) ? itemCuts.map((c) => c.id) : []}
          handleSelect={handleCutSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          key={'textiles'+isEditMode.toString()}
          title={t('properties:Textiles')}
          properties={(isEditMode) ? sortedTextiles : item.textiles}
          selectedPropertyIds={(isEditMode) ? itemTextiles.map((t) => t.id) : []}
          handleSelect={handleTextileSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          key={'occasions'+isEditMode.toString()}
          title={t('properties:Occasions')}
          properties={(isEditMode) ? sortedOccasions : item.occasions}
          selectedPropertyIds={(isEditMode) ? itemOccasions.map((o) => o.id) : []}
          handleSelect={handleOccasionSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <ComfortSection
          comfortLevel={item.comfort}
          isEditable={isEditMode}
          onChange={handleComfortSelect}
        />


        <Divider style={styles.divider}/>
        <PropertySection
          key={'feelIn'+isEditMode.toString()}
          title={t('properties:FeelIn')}
          properties={(isEditMode) ? sortedFeelIns : item.feel_in}
          selectedPropertyIds={(isEditMode) ? itemFeelIn.map((f) => f.id) : []}
          handleSelect={handleFeelInSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <QuestionSection
          property={'like_me'}
          value={item.like_me}
          isEditable={isEditMode}
          handleSelect={handleLikeMeSelect}
        />

        <QuestionSection
          property={'look_level'}
          value={item.look_level}
          isEditable={isEditMode}
          handleSelect={handleLookLevelSelect}
        />

        <QuestionSection
          property={'frequency'}
          value={item.frequency}
          isEditable={isEditMode}
          handleSelect={handleFrequencySelect}
        />

        <QuestionSection
          property={'price'}
          value={item.price}
          isEditable={isEditMode}
          handleSelect={handlePriceSelect}
        />

        <WantSection
          value={item.want}
          isEditable={isEditMode}
          handleSelect={handleWantSelect}
        />

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categories: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'center',
  },
  divider: {
    marginTop: 16,
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