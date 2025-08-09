import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Button, Divider, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Realm from 'realm';
import { useRealm } from '@realm/react';

import { useItemFormData } from '../hooks/useItemFormData';
import { useWardrobeContext, useRegisterSave }  from '../context/WardrobeContext';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { pickOrCaptureImage } from '../utility/photoUtils';
import { updateOutfitField } from '../utility/outfitUpdate';

import { Item, Outfit, Occasion, FeelIn } from '../database/index';

import EditAllButtonSection from'../components/EditAllButtonSection';
import ImageSection from '../components/ImageSection';
import NameSection from '../components/NameSection';
import ItemList from '../components/ItemList';
import PropertySection from '../components/PropertySection';
import ComfortSection from '../components/ComfortSection';
import QuestionSection from '../components/QuestionSection';
import WantSection from '../components/WantSection';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'OutfitDetail'>;

export default function OutfitDetailView({ route, navigation }: Props) {

  const { colors: themeColors } = useTheme();

  const realm = useRealm();
  const { occasions, feels } = useItemFormData();
  const { outfitId } = route.params;
  const outfit = realm.objectForPrimaryKey<Outfit>('Outfit', outfitId);

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

  const { isEditMode, setIsEditMode } = useWardrobeContext();
// set state for outfit detail and edit outfit detail ==============================================
  const [outfitName, setOutfitName] = useState<string | null>(outfit.outfit_name);
  const [imageUri, setImageUri] = useState<string | null>(outfit.image_uri);
  const [outfitOccasions, setOutfitOccasions] = useState<Occasion[]>(outfit.occasions);
  const [outfitComfort, setOutfitComfort] = useState<int>(outfit.comfort);
  const [outfitFeelIn, setOutfitFeelIn] = useState<FeelIn[]>(outfit.feel_in);
  const [likeMe, setLikeMe] =  useState(outfit.like_me);
  const [lookLevel, setLookLevel] = useState(outfit.look_level);
  const [frequencyLevel, setFrequencyLevel] = useState(outfit.frequency);
  const [wantDecision, setWantDecision] = useState(outfit.want);

// use hook for sorting and incrementing/adding properties =========================================
  const {
    occasion: { getSorted: getSortedOccasions, incrementOrCreate: incrementOrCreateOccasion },
    feels: { getSorted: getSortedFeelIns, incrementOrCreate: incrementOrCreateFeelIn },
  } = useAllPropertyManagers();

  const sortedOccasions = getSortedOccasions(occasions.map(o => o.id));
  const sortedFeelIns = getSortedFeelIns(feels.map(f => f.id));

// functions to handle property sections ===========================================================
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  };

  const handleOccasionSelect = (id: string) => {
    const occasionFromId = occasions.find((o) => o.id === id);
    setOutfitOccasions((prev) => {
      const isSelected = prev.some((o) => o.id === occasionFromId.id);
      return isSelected ? prev.filter((o) => o.id !== occasionFromId.id) : [...prev, occasionFromId]; });
  };

  const handleComfortSelect = (comfortLevel: int) => {
    setOutfitComfort(comfortLevel)
  };

  const handleFeelInSelect = (id: string) => {
    const feelInFromId = feels.find((f) => f.id === id);
    setOutfitFeelIn((prev) => {
      const isSelected = prev.some((f) => f.id === feelInFromId.id);
      return isSelected ? prev.filter((f) => f.id !== feelInFromId.id) : [...prev, feelInFromId]; });
  };

  const handleLikeMeSelect = (likeMeLevel: string) => { setLikeMe(likeMeLevel) };

  const handleLookLevelSelect = (lookLvl: string) => { setLookLevel(lookLvl) };

  const handleFrequencySelect = (freqLvl: string) => { setFrequencyLevel(freqLvl) };

  const handleWantSelect = (wantDec: string) => { setWantDecision(wantDec) };

// save to database function =======================================================================
  const saveFn = useCallback(() => {
    updateOutfitField(realm, outfit, {
      image_uri: imageUri,
      outfit_name: outfitName,
      occasions: outfitOccasions,
      comfort: outfitComfort,
      feel_in: outfitFeelIn,
      like_me: likeMe,
      look_level: lookLevel,
      frequency: frequencyLevel,
      want: wantDecision,
    })
  }, [imageUri, outfitName, outfitOccasions, outfitComfort, outfitFeelIn, likeMe, lookLevel, frequencyLevel, wantDecision, isEditMode]);
  useRegisterSave(saveFn);

// error when there is no outfit found =============================================================
  if (!outfit) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Outfit not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 80, padding: 16, backgroundColor: themeColors.background}}
      showsVerticalScrollIndicator={false}>
      <View>

        <NameSection
          name={outfitName}
          isEditable={isEditMode}
          onChange={setOutfitName}
        />

        <ImageSection
          imageUri={imageUri}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          isEditable={isEditMode}
          onChange={handlePickImage}
        />

        <ItemList
          items={outfit.items}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          key={'occasions'+isEditMode.toString()}
          title='occasions'
          properties={(isEditMode) ? sortedOccasions : outfit.occasions}
          selectedPropertyIds={(isEditMode) ? outfitOccasions.map((o) => o.id) : []}
          handleSelect={handleOccasionSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <ComfortSection
          comfortLevel={outfit.comfort}
          isEditable={isEditMode}
          onChange={handleComfortSelect}
        />

        <Divider style={styles.divider}/>
        <PropertySection
          key={'feelIn'+isEditMode.toString()}
          title={'feel_in'}
          properties={(isEditMode) ? sortedFeelIns : outfit.feel_in}
          selectedPropertyIds={(isEditMode) ? outfitFeelIn.map((f) => f.id) : []}
          handleSelect={handleFeelInSelect}
          isEditable={isEditMode}
        />

        <Divider style={styles.divider}/>
        <QuestionSection
          property={'like_me'}
          value={outfit.like_me}
          isEditable={isEditMode}
          handleSelect={handleLikeMeSelect}
        />

        <QuestionSection
          property={'look_level'}
          value={outfit.look_level}
          isEditable={isEditMode}
          handleSelect={handleLookLevelSelect}
        />

        <QuestionSection
          property={'frequency'}
          value={outfit.frequency}
          isEditable={isEditMode}
          handleSelect={handleFrequencySelect}
        />

        <WantSection
          value={outfit.want}
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