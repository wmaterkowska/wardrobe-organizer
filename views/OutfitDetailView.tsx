import React, { useState, useEffect, useCallback } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import Realm from 'realm';
import { useRealm } from '@realm/react';

import { useItemFormData } from '../hooks/useItemFormData';
import { useWardrobeContext }  from '../context/WardrobeContext';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { pickOrCaptureImage } from '../utility/photoUtils';

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
  const [imageUri, setImageUri] = useState<string | null>(outfit.image_uri);
  const [isImageEditable, setIsImageEditable] = useState(false);
  const [outfitName, setOutfitName] = useState<string | null>(outfit.outfit_name);
  const [isOutfitNameEditable, setIsOutfitNameEditable] = useState(false);
  const [outfitOccasions, setOutfitOccasions] = useState<Occasion[]>(outfit.occasions);
  const [isOccasionsEditable, setIsOccasionsEditable] = useState(false);
  const [outfitComfort, setOutfitComfort] = useState<int>(outfit.comfort);
  const [isComfortEditable, setIsComfortEditable] = useState(false);
  const [outfitFeelIn, setOutfitFeelIn] = useState<FeelIn[]>(outfit.feel_in);
  const [isFeelInEditable, setIsFeelInEditable] = useState(false);
  const [likeMe, setLikeMe] =  useState(outfit.like_me);
  const [isLikeMeEditable, setIsLikeMeEditable] = useState(false);
  const [lookLevel, setLookLevel] = useState(outfit.look_level);
  const [isLookLevelEditable, setIsLookLevelEditable] = useState(false);
  const [frequencyLevel, setFrequencyLevel] = useState(outfit.frequency);
  const [isFrequencyEditable, setIsFrequencyEditable] = useState(false);
  const [wantDecision, setWantDecision] = useState(outfit.want);
  const [isWantEditable, setIsWantEditable] = useState(false);

// use hook for sorting and incrementing/adding properties =========================================
  const {
    occasion: { getSorted: getSortedOccasions, incrementOrCreate: incrementOrCreateOccasion },
    feels: { getSorted: getSortedFeelIns, incrementOrCreate: incrementOrCreateFeelIn },
  } = useAllPropertyManagers();

  const sortedOccasions = getSortedOccasions(occasions.map(o => o.id));
  const sortedFeelIns = getSortedFeelIns(feels.map(f => f.id));

// functions to toggle edit all button =============================================================
  const [isEditAll, setIsEditAll] = useState(false);
  const toggleEditAll = () => {
    setIsEditAll(!isEditAll);
  }
  useEffect(() => {
    if (isEditAll) {
      setIsImageEditable(true);
      setIsOutfitNameEditable(true);
      setIsOccasionsEditable(true);
      setIsComfortEditable(true);
      setIsFeelInEditable(true);
      setIsLikeMeEditable(true);
      setIsLookLevelEditable(true);
      setIsFrequencyEditable(true);
      setIsWantEditable(true);
    } else {
      setIsImageEditable(false);
      setIsOutfitNameEditable(false);
      setIsOccasionsEditable(false);
      setIsComfortEditable(false);
      setIsFeelInEditable(false);
      setIsLikeMeEditable(false);
      setIsLookLevelEditable(false);
      setIsFrequencyEditable(false);
      setIsWantEditable(false);
    }
  }, [isEditAll]);

// functions to handle property sections ===========================================================
  const toggleImageEdit = () => {
    setIsImageEditable(!isImageEditable);
    if (isImageEditable) { updateOutfitField(realm, outfit, {image_uri: imageUri }) };
  };
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  };

  const toggleNameEdit = () => {
    setIsOutfitNameEditable(!isOutfitNameEditable);
    if (isOutfitNameEditable) { updateOutfitField(realm, outfit, {outfit_name: outfitName }) };
  };

  const toggleOccasionEdit = () => {
    setIsOccasionsEditable(!isOccasionsEditable);
    if (isOccasionsEditable) { updateOutfitField(realm, outfit, {occasions: outfitOccasions})};
  };
  const handleOccasionSelect = (id: string) => {
    const occasionFromId = occasions.find((o) => o.id === id);
    setOutfitOccasions((prev) => {
      const isSelected = prev.some((o) => o.id === occasionFromId.id);
      return isSelected ? prev.filter((o) => o.id !== occasionFromId.id) : [...prev, occasionFromId]; });
  };

  const toggleComfortEdit = () => {
    setIsComfortEditable(!isComfortEditable);
    if (isComfortEditable) { updateOutfitField(realm, outfit, {comfort: outfitComfort})};
  };
  const handleComfortSelect = (comfortLevel: int) => {
    setOutfitComfort(comfortLevel)
  };

  const toggleFeelInEdit = () => {
    setIsFeelInEditable(!isFeelInEditable);
    if (isFeelInEditable) { updateOutfitField(realm, outfit, {feel_in: outfitFeelIn})};
  };
  const handleFeelInSelect = (id: string) => {
    const feelInFromId = feels.find((f) => f.id === id);
    setOutfitFeelIn((prev) => {
      const isSelected = prev.some((f) => f.id === feelInFromId.id);
      return isSelected ? prev.filter((f) => f.id !== feelInFromId.id) : [...prev, feelInFromId]; });
  };

  const toggleLikeMeEdit = () => {
    setIsLikeMeEditable(!isLikeMeEditable);
    if (isLikeMeEditable) { updateOutfitField(realm, outfit, {like_me: likeMe})};
  };
  const handleLikeMeSelect = (likeMeLevel: string) => { setLikeMe(likeMeLevel) };

  const toggleLookLevelEdit = () => {
    setIsLookLevelEditable(!isLookLevelEditable);
    if (isLookLevelEditable) { updateOutfitField(realm, outfit, {look_level: lookLevel})};
  };
  const handleLookLevelSelect = (lookLvl: string) => { setLookLevel(lookLvl) };

  const toggleFrequencyEdit = () => {
    setIsFrequencyEditable(!isFrequencyEditable);
    if (isFrequencyEditable) { updateOutfitField(realm, outfit, {frequency: frequencyLevel})};
  };
  const handleFrequencySelect = (freqLvl: string) => { setFrequencyLevel(freqLvl) };

  const toggleWantEdit = () => {
    setIsWantEditable(!isWantEditable);
    if (isWantEditable) { updateOutfitField(realm, outfit, {want: wantDecision})};
  };
  const handleWantSelect = (wantDec: string) => { setWantDecision(wantDec) };

// save to database function =======================================================================
  const saveFn = useCallback(() => {
    updateOutfitField(realm, outfit, {
      image_uri: imageUri,
      outfit_name: outfitName,
      occasions: outfitOccasions,
      comfort: outfitComfort,
      feel_in: outfitFeelIn,
      like_me: likeMeLevel,
      look_level: lookLevel,
      frequency: frequencyLevel,
      want: wantDecision,
    })
  }, []);

  //useRegisterSave(saveFn);

// toggle edit mode ================================================================================
  useEffect(() => {
    if (!isEditMode) {
      setIsImageEditable(false);
      setIsOutfitNameEditable(false);
      setIsOccasionsEditable(false);
      setIsComfortEditable(false);
      setIsFeelInEditable(false);
      setIsLikeMeEditable(false);
      setIsLookLevelEditable(false);
      setIsFrequencyEditable(false);
      setIsWantEditable(false);
    }
  }, [isEditMode, isEditAll])

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
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, padding: 16, backgroundColor: themeColors.background}}
      showsVerticalScrollIndicator={false}>
      <View>
        {isEditMode ? ( <>
          <EditAllButtonSection isSwitchOn={isEditAll} onToggleSwitch={toggleEditAll}/>
        </>) : null }

        <ImageSection
          imageUri={imageUri}
          imageHeight={imageHeight}
          imageWidth={imageWidth}
          isEditable={isImageEditable}
          onChange={handlePickImage}
          onPressEditIcon={toggleImageEdit}
        />

        <NameSection
          outfitName={outfitName}
          isEditable={isOutfitNameEditable}
          onPressEditIcon={toggleNameEdit}
          onChange={setOutfitName}
        />

        <ItemList
          items={outfit.items}
        />

        <PropertySection
          title='occasions'
          properties={(isOccasionsEditable && isEditMode) ? sortedOccasions : outfit.occasions}
          selectedPropertyIds={(isOccasionsEditable && isEditMode) ? outfitOccasions.map((o) => o.id) : []}
          handleSelect={handleOccasionSelect}
          isEditable={isOccasionsEditable}
          onPressEditIcon={toggleOccasionEdit}
        />

        <ComfortSection
          comfortLevel={outfit.comfort}
          isEditable={isComfortEditable}
          onChange={handleComfortSelect}
          onPressEditIcon={toggleComfortEdit}
        />

        <PropertySection
          title={'feel_in'}
          properties={(isFeelInEditable && isEditMode) ? sortedFeelIns : outfit.feel_in}
          selectedPropertyIds={(isFeelInEditable && isEditMode) ? outfitFeelIn.map((f) => f.id) : []}
          handleSelect={handleFeelInSelect}
          isEditable={isFeelInEditable}
          onPressEditIcon={toggleFeelInEdit}
        />

        <QuestionSection
          property={'like_me'}
          value={outfit.like_me}
          isEditable={isLikeMeEditable}
          handleSelect={handleLikeMeSelect}
          onPressEditIcon={toggleLikeMeEdit}
        />

        <QuestionSection
          property={'look_level'}
          value={outfit.look_level}
          isEditable={isLookLevelEditable}
          handleSelect={handleLookLevelSelect}
          onPressEditIcon={toggleLookLevelEdit}
        />

        <QuestionSection
          property={'frequency'}
          value={outfit.frequency}
          isEditable={isFrequencyEditable}
          handleSelect={handleFrequencySelect}
          onPressEditIcon={toggleFrequencyEdit}
        />

        <WantSection
          value={outfit.want}
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
    alignItems: 'center',
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