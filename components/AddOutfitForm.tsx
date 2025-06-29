import React, { useState, useEffect, useMemo } from 'react';
import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, SegmentedButtons, Text } from 'react-native-paper';
import ImageSection from './ImageSection';
import NameSection from './NameSection';
import ItemList from './ItemList';
import PropertySection from './PropertySection';
import QuestionsSection from './QuestionsSection';
import ComfortSection from './ComfortSection';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { useItemFormData } from '../hooks/useItemFormData';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { saveNewOutfit } from '../utility/outfitSave';

import { Item } from '../database/models/Item'
import { COMFORT_LEVELS, WANT_ARRAY, LEVELS, Want, Questions } from '../constants';

import { pickOrCaptureImage } from '../utility/photoUtils';

type Props = {
  onDismiss: () => void;
}

export default function AddOutfitForm({ onDismiss }: Props) {

  const realm = useRealm();
  const { occasions, feels } = useItemFormData();

  const { selectedItems, setSelectedItems } = useWardrobeContext();
  const outfitItems = selectedItems.map((id) => {
    const item = realm.objectForPrimaryKey<Item>('Item', id);
    return item;
  });

  const [outfitName, setOutfitName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>([]);
  const [comfort, setComfort] = useState<int | null>(null);
  const [selectedFeelInIds, setSelectedFeelInIds] = useState<string[]>([]);

  const [likeMe, setLikeMe] = useState<string | null>(null);
  const [lookLevel, setLookLevel] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);

  const [want, setWant] = useState<string | null>(null);

  const {
    occasion: { getSorted: getSortedOccasions, incrementOrCreate: incrementOrCreateOccasion },
    feels: { getSorted: getSortedFeelIns, incrementOrCreate: incrementOrCreateFeelIn },
  } = useAllPropertyManagers();

  const sortedOccasions = getSortedOccasions(occasions.map(o => o.id));
  const sortedFeelIns = getSortedFeelIns(feels.map(f => f.id));

// handle toggle functions =========================================================================
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  }
  const toggleOccasion = (id: string) => {
    setSelectedOccasionIds((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };
  const handleComfortSelect = (comfortLevel) => {setComfort(comfortLevel)};
  const toggleFeelIn = (id: string) => {
    setSelectedFeelInIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };
  const handleLikeMeSelect = (likeMe) => {setLikeMe(likeMe)};
  const handleLookLevelSelect = (lookLevel) => {setLookLevel(lookLevel)};
  const handleFrequencySelect = (frequency) => {setFrequency(frequency)};
  const handleWantSelect = (want) => {setWant(want)};

// save outfit to database =========================================================================
  const handleSave = () => {
    if (!outfitName && !imageUri) return;

    saveNewOutfit({
      realm,
      outfitName,
      imageUri,
      selectedItems,
      selectedOccasionIds,
      comfort,
      selectedFeelInIds,
      likeMe,
      lookLevel,
      frequency,
      want,
    });

    setSelectedItems([]);
    setSelectedFeelInIds([]);
    setSelectedOccasionIds([]);

    onDismiss();
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      showsVerticalScrollIndicator={false} >
    <View style={styles.form} onStartShouldSetResponder={() => true}>
      <ItemList items={outfitItems}/>

      <ImageSection imageUri={imageUri} onAdd={handlePickImage} isEditable={true} />

      <NameSection itemName={outfitName} isEditable={true} onChange={setOutfitName} />

      { outfitName || imageUri ? (
      <>
      <PropertySection
        title="occasions"
        properties={sortedOccasions}
        selectedPropertyIds={selectedOccasionIds}
        handleSelect={toggleOccasion}
        isEditable={true}
      />

      <ComfortSection
        value={comfort}
        isEditable={true}
        onChange={handleComfortSelect}
      />

      <PropertySection
        title="feel_in"
        properties={sortedFeelIns}
        selectedPropertyIds={selectedFeelInIds}
        handleSelect={toggleFeelIn}
        isEditable={true}
      />

      <QuestionsSection
        likeMe={likeMe}
        handleLikeMeSelect={handleLikeMeSelect}
        lookLevel={lookLevel}
        handleLookLevelSelect={handleLookLevelSelect}
        frequency={frequency}
        handleFrequencySelect={handleFrequencySelect}
        />

      <Text variant="bodyLarge" style={styles.wantText} >{Want.wantQuestion}</Text>
      <SegmentedButtons
        value={want}
        onValueChange={setWant}
        buttons={
          WANT_ARRAY.map((w) => {
            return {
              value: w,
              label: w,
            };
          })
        }
      />
      </>
      ) : null }

      <Button
        onPress={handleSave}
        style={styles.saveButton}
        disabled={!outfitName && !imageUri} >Save Outfit</Button>
    </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 16,
  },
  saveButton: {
    position: 'absolut',
    marginTop: 20,
    padding: 20,
  },
  wantText: {
    marginTop: 32,
  },
});