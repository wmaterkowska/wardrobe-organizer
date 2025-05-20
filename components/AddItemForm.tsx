import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { View, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { Text, Button, SegmentedButtons } from 'react-native-paper';

import { Item, MainCategory, Category, Color, Pattern, Fit, Cut, Textile, Occasion, FeelIn } from '../database/index';

import { usePropertyManager } from '../hooks/usePropertyManager';
import { useItemFormData } from '../hooks/useItemFormData';
import { saveNewItem } from '../utility/itemSave';

import PropertyList from './PropertyList';
import ColorList from './ColorList';
import CustomSegmentedButton from './CustomSegmentedButton';

import { COMFORT_LEVELS, WANT_ARRAY, LEVELS, Want, Questions } from '../constants';
import { pickOrCaptureImage } from '../utility/photoUtils'

type Props = {
  onDismiss: () => void;
};

export default function AddItemForm({ onDismiss }: Props) {
  const realm = useRealm();
  const { mains, categories, colors, patterns, fits, cuts, textiles, occasions, feels } = useItemFormData();

  const [itemName, setItemName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [selectedPatternIds, setSelectedPatternIds] = useState<string[]>([]);
  const [selectedFitIds, setSelectedFitIds] = useState<string[]>([]);
  const [selectedCutIds, setSelectedCutIds] = useState<string[]>([]);
  const [filteredCuts, setFilteredCuts] = useState<Realm.Results<Cut> | Cut[] | null>(null);
  const [selectedTextileIds, setSelectedTextileIds] = useState<string[]>([]);
  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>([]);
  const [comfort, setComfort] = useState<int | null>(null);
  const [selectedFeelInIds, setSelectedFeelInIds] = useState<string[]>([]);

  const [likeMe, setLikeMe] = useState<string | null>(null);
  const [lookLevel, setLookLevel] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const [want, setWant] = useState<string | null>(null);

  const clothesMainId = mains.find((m) => m.name === 'Clothes').id;

  const {
    allProperties: allColors,
    getSorted: getSortedColors,
    incrementOrCreate: incrementOrCreateColor } = usePropertyManager<Color>('Color');
  const sortedColors = getSortedColors(colors.map(c => c.id));

  useEffect(() => {
    if (selectedCategoryId) {
      const cutsForCategory = cuts.filtered('ANY categories.id == $0', selectedCategoryId);
      setFilteredCuts(cutsForCategory);
    } else {
     setFilteredCuts([]);
    }
  }, [selectedCategoryId, cuts]);

  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  }

  const handleMainCategorySelect = (id: string) => {setSelectedMainId(id)};

  const handleCategorySelect = (id: string) => {setSelectedCategoryId(id)};

  const toggleColor = (id: string) => {
    setSelectedColorIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const togglePattern = (id: string) => {
    setSelectedPatternIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const toggleFit = (id: string) => {
    setSelectedFitIds((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const toggleCut = (id: string) => {
    setSelectedCutIds((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const toggleTextile = (id: string) => {
    setSelectedTextileIds((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

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
  const handlePriceSelect = (price) => {setPrice(price)};

  const handleWantSelect = (want) => {setWant(want)};


  const handleSave = () => {
    if (!itemName && !imageUri) return;

    saveNewItem({
        realm,
        itemName,
        imageUri,
        selectedMainId,
        selectedCategoryId,
        selectedColorIds,
        selectedPatternIds,
        selectedFitIds,
        selectedCutIds,
        selectedTextileIds,
        selectedOccasionIds,
        comfort,
        selectedFeelInIds,
        likeMe,
        lookLevel,
        frequency,
        price,
        want,
      });

    selectedColorIds.forEach(colorId => {incrementOrCreateColor(colorId)});

    setItemName(null);
    setImageUri(null);
    setSelectedMainId(null);
    setSelectedCategoryId(null);
    setSelectedColorIds([]);
    setSelectedPatternIds([]);
    setSelectedFitIds([]);
    setSelectedCutIds([]);
    setSelectedTextileIds([]);
    setSelectedOccasionIds([]);
    setComfort(null);
    setSelectedFeelInIds([]);
    setLikeMe(null);
    setLookLevel(null);
    setFrequency(null);
    setPrice(null);
    setWant(null);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      showsVerticalScrollIndicator={false} >
    <View style={styles.form} onStartShouldSetResponder={() => true}>

      <Button onPress={handlePickImage}>Add Photo</Button>
      {imageUri && (
        <Image
          source={{ uri: imageUri }}
          style={{ width: 200, height: 200, borderRadius: 10, marginTop: 10 }}
        />
      )}

      <Text variant="bodyLarge">item name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Jacket"
        value={itemName}
        onChangeText={setItemName}
      />

      { itemName || imageUri ? (
      <PropertyList
        title={'main category'}
        properties={mains}
        selectable={true}
        selectedIds={selectedMainId ? [selectedMainId] : []}
        onToggle={handleMainCategorySelect}
        singleSelect={true}
      /> ) : null }

      {selectedMainId ? (
      <PropertyList
        title={'category'}
        properties={categories.filter((c) => c.main_category.id === selectedMainId.toString())}
        selectable={true}
        selectedIds={selectedCategoryId ? [selectedCategoryId] : []}
        onToggle={handleCategorySelect}
        singleSelect={true}
      /> ) : null }

      { selectedCategoryId ? (
      <View>
      <ColorList
        colors={sortedColors}
        selectable={true}
        selectedIds={selectedColorIds}
        onToggle={toggleColor}
      />

      <PropertyList
        title="patterns"
        properties={patterns}
        selectable={true}
        selectedIds={selectedPatternIds}
        onToggle={togglePattern}
      />

      { selectedMainId === clothesMainId ? (
      <View>
        <PropertyList
          title="fit"
          properties={fits}
          selectable={true}
          selectedIds={selectedFitIds}
          onToggle={toggleFit}
        />

        {selectedCategoryId ? (
          <PropertyList
            title="cut"
            properties={filteredCuts}
            selectable={true}
            selectedIds={selectedCutIds}
            onToggle={toggleCut}
          />) : null}
        </View>
      ) : null}

      <PropertyList
        title="textile"
        properties={textiles}
        selectable={true}
        selectedIds={selectedTextileIds}
        onToggle={toggleTextile}
      />

      <PropertyList
        title="occasion"
        properties={occasions}
        selectable={true}
        selectedIds={selectedOccasionIds}
        onToggle={toggleOccasion}
      />

      <CustomSegmentedButton
        property={'comfort'}
        levels={COMFORT_LEVELS}
        value={comfort}
        isEditable={true}
        onChange={handleComfortSelect}
      />

      <PropertyList
        title="feel_in"
        properties={feels}
        selectable={true}
        selectedIds={selectedFeelInIds}
        onToggle={toggleFeelIn}
      />

      <CustomSegmentedButton
        property={Questions.like_me}
        levels={LEVELS.like_me}
        value={likeMe}
        isEditable={true}
        onChange={handleLikeMeSelect}
      />

      <CustomSegmentedButton
        property={Questions.look_level}
        levels={LEVELS.look_level}
        value={lookLevel}
        isEditable={true}
        onChange={handleLookLevelSelect}
      />

      <CustomSegmentedButton
        property={Questions.frequency}
        levels={LEVELS.frequency}
        value={frequency}
        isEditable={true}
        onChange={handleFrequencySelect}
      />

      <CustomSegmentedButton
        property={Questions.price}
        levels={LEVELS.price}
        value={price}
        isEditable={true}
        onChange={handlePriceSelect}
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

      </View> ) : null}

      <Button
        onPress={handleSave}
        style={styles.saveButton}
        disabled={!itemName && !imageUri} >Save Piece</Button>
    </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    paddingTop: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  wantText: {
    marginTop: 32,
  },
  saveButton: {
    position: 'absolut',
    marginTop: 20,
    padding: 20,
  }
});
