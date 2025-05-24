import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { useRealm } from '@realm/react';
import { View, StyleSheet, TextInput, ScrollView, Image } from 'react-native';
import { Text, Button, SegmentedButtons } from 'react-native-paper';

import { usePropertyManager } from '../hooks/usePropertyManager';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';
import { useItemFormData } from '../hooks/useItemFormData';
import { saveNewItem } from '../utility/itemSave';

import PropertyList from './PropertyList';
import ColorList from './ColorList';
import CustomSegmentedButton from './CustomSegmentedButton';
import ImageSection from './ImageSection';
import ItemNameSection from './ItemNameSection';
import PropertySection from './PropertySection';
import ColorSection from './ColorSection';
import QuestionSection from './QuestionSection';

import { COMFORT_LEVELS, WANT_ARRAY, LEVELS, Want, Questions } from '../constants';
import { pickOrCaptureImage } from '../utility/photoUtils'

type Props = {
  onDismiss: () => void;
};

export default function AddItemForm({ onDismiss }: Props) {
  const realm = useRealm();
  const { mains, categories, colors, patterns, fits, cuts, textiles, occasions, feels } = useItemFormData();

// Set state for all Item properties ===============================================================
  const [itemName, setItemName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [selectedPatternIds, setSelectedPatternIds] = useState<string[]>([]);
  const [selectedFitIds, setSelectedFitIds] = useState<string[]>([]);
  const [selectedCutIds, setSelectedCutIds] = useState<string[]>([]);
  const [filteredCuts, setFilteredCuts] = useState<Realm.Results<Cut> | Cut[] | null>(null);
  const [sortedCuts, setSortedCuts] = useState<Realm.Results<Cut> | Cut[] >([]);
  const [selectedTextileIds, setSelectedTextileIds] = useState<string[]>([]);
  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>([]);
  const [comfort, setComfort] = useState<int | null>(null);
  const [selectedFeelInIds, setSelectedFeelInIds] = useState<string[]>([]);

  const [likeMe, setLikeMe] = useState<string | null>(null);
  const [lookLevel, setLookLevel] = useState<string | null>(null);
  const [frequency, setFrequency] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const [want, setWant] = useState<string | null>(null);

// id for category: Clothes, need for UI ===========================================================
  const accessoriesMainId = mains.find((m) => m.name === 'Accessories').id;

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

// use Effect to show only cuts connected with choose category =====================================
  useEffect(() => {
    if (selectedCategoryId) {
      const cutsForCategory = cuts.filtered('ANY categories.id == $0', selectedCategoryId);
      setFilteredCuts(cutsForCategory);
      setSortedCuts(getSortedCuts(cutsForCategory.map(c => c.id)));
    } else {
     setFilteredCuts([]);
     setSortedCuts([]);
    }

  }, [selectedCategoryId, cuts, selectedMainId, itemName]);

// handle toggle functions =========================================================================
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  }
  const handleMainCategorySelect = (id: string) => {
    setSelectedMainId(id);
    setSelectedCategoryId(null)
  };
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

// save item to the database =======================================================================
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

    if (selectedCategoryId) { incrementOrCreateCategory(selectedCategoryId) };
    selectedColorIds.forEach(colorId => {incrementOrCreateColor(colorId)});
    selectedPatternIds.forEach(patternId => {incrementOrCreatePattern(patternId)});
    selectedFitIds.forEach(fitId => {incrementOrCreateFit(fitId)});
    selectedCutIds.forEach(cutId => {incrementOrCreateCut(cutId)});
    selectedTextileIds.forEach(textileId => {incrementOrCreateTextile(textileId)});
    selectedOccasionIds.forEach(occasionId => {incrementOrCreateOccasion(occasionId)});
    selectedFeelInIds.forEach(feelInId => {incrementOrCreateFeelIn(feelInId)});

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

      <ImageSection imageUri={imageUri} onAdd={handlePickImage} isEditable={true} />

      <ItemNameSection itemName={itemName} isEditable={true} onChange={setItemName} />

      { itemName || imageUri ? (
        <PropertySection
          title={'main category'}
          properties={mains}
          selectedPropertyIds={[selectedMainId]}
          selectedPropertyIds={selectedMainId ? [selectedMainId] : []}
          handleSelect={handleMainCategorySelect}
          isSingleSelect={true}
          isEditable={true}
        /> ) : null }


      { selectedMainId ? (
        <PropertySection
          title={'category'}
          properties={sortedCategories.filter((c) => c.main_category.id === selectedMainId.toString())}
          selectedPropertyIds={selectedCategoryId ? [selectedCategoryId] : []}
          handleSelect={handleCategorySelect}
          isSingleSelect={true}
          isEditable={true}
        /> ) : null }


      { selectedCategoryId ? (
      <View>

      <ColorSection
        colors={sortedColors}
        selectedColorIds={selectedColorIds}
        handleSelect={toggleColor}
        isEditable={true}
      />

      <PropertySection
        title="patterns"
        properties={sortedPatterns}
        selectedPropertyIds={selectedPatternIds}
        handleSelect={togglePattern}
        isEditable={true}
      />

      { selectedMainId !== accessoriesMainId ? (
      <View>
        <PropertyList
          title="fit"
          properties={sortedFits}
          selectable={true}
          selectedIds={selectedFitIds}
          onToggle={toggleFit}
        />

        {selectedCategoryId ? (
          <PropertyList
            title="cut"
            properties={sortedCuts}
            selectable={true}
            selectedIds={selectedCutIds}
            onToggle={toggleCut}
          />) : null}
        </View>
      ) : null}

      <PropertyList
        title="textile"
        properties={sortedTextiles}
        selectable={true}
        selectedIds={selectedTextileIds}
        onToggle={toggleTextile}
      />

      <PropertyList
        title="occasion"
        properties={sortedOccasions}
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
        properties={sortedFeelIns}
        selectable={true}
        selectedIds={selectedFeelInIds}
        onToggle={toggleFeelIn}
      />

      <QuestionSection
        likeMe={likeMe}
        handleLikeMeSelect={handleLikeMeSelect}
        lookLevel={lookLevel}
        handleLookLevelSelect={handleLookLevelSelect}
        frequency={frequency}
        handleFrequencySelect={handleFrequencySelect}
        price={price}
        handlePriceSelect={handlePriceSelect}
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
