import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import { useRealm } from '@realm/react';
import { Item } from '../database/models/Item';
import { MainCategory } from '../database/models/MainCategory';
import { Category } from '../database/models/Category';
import { Color } from '../database/models/Color';
import { Pattern } from '../database/models/Pattern';
import { Fit } from '../database/models/Fit';
import { Cut } from '../database/models/Cut';
import { Textile } from '../database/models/Textile';
import { Occasion } from '../database/models/Occasion';
import { FeelIn } from '../database/models/FeelIn';
import { useQuery } from '@realm/react';

import PropertyList from './PropertyList';
import ColorList from './ColorList';
import CustomSegmentedButton from './CustomSegmentedButton';

import { COMFORT_LEVELS } from '../constants';

type Props = {
  onDismiss: () => void;
};

export default function AddItemForm({ onDismiss }: Props) {
  const realm = useRealm();
  const mains = useQuery('MainCategory');
  const categories = useQuery('Category');
  const colors = useQuery('Color');
  const patterns = useQuery('Pattern');
  const fits = useQuery('Fit');
  const cuts = useQuery('Cut');
  const textiles = useQuery('Textile');
  const occasions = useQuery('Occasion');
  const feels = useQuery('FeelIn');

  const [itemName, setItemName] = useState('');
  const [selectedMainId, setSelectedMainId] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  const [selectedColorIds, setSelectedColorIds] = useState<string[]>([]);
  const [selectedPatternIds, setSelectedPatternIds] = useState<string[]>([]);
  const [selectedFitIds, setSelectedFitIds] = useState<string[]>([]);
  const [selectedCutIds, setSelectedCutIds] = useState<string[]>([]);
  const [filteredCuts, setFilteredCuts] = useState<Realm.Results<Cut> | Cut[] | null>(null);
  const [selectedTextileIds, setSelectedTextileIds] = useState<string[]>([]);
  const [selectedOccasionIds, setSelectedOccasionIds] = useState<string[]>([]);
  const [comfort, setComfort] = useState(3);
  const [selectedFeelInIds, setSelectedFeelInIds] = useState<string[]>([]);

  const clothesMainId = mains.find((m) => m.name === 'Clothes').id;

  useEffect(() => {
    if (selectedCategoryId) {
      const cutsForCategory = cuts.filtered('ANY categories.id == $0', selectedCategoryId);
      setFilteredCuts(cutsForCategory);
    } else {
     setFilteredCuts([]);
    }
  }, [selectedCategoryId, cuts]);

  const handleMainCategorySelect = (id: string) => {
    setSelectedMainId(id);
  }

  const handleCategorySelect = (id: string) => {
    setSelectedCategoryId(id);
  };

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

  const handleSave = () => {
    if (!itemName) return;

    realm.write(() => {
      const main = realm.objectForPrimaryKey(MainCategory, selectedMainId);
      const category = realm.objectForPrimaryKey(Category, selectedCategoryId);
      const selectedColors = selectedColorIds
        .map((id) => realm.objectForPrimaryKey(Color, id))
        .filter(Boolean);
      const selectedPatterns = selectedPatternIds
        .map((id) => realm.objectForPrimaryKey(Pattern, id))
        .filter(Boolean);
      const selectedFits = selectedFitIds
        .map((id) => realm.objectForPrimaryKey(Fit, id))
        .filter(Boolean);
      const selectedCuts = selectedCutIds
        .map((id) => realm.objectForPrimaryKey(Cut, id))
        .filter(Boolean);
      const selectedTextiles = selectedTextileIds
        .map((id) => realm.objectForPrimaryKey(Textile, id))
        .filter(Boolean);
      const selectedOccasions = selectedOccasionIds
        .map((id) => realm.objectForPrimaryKey(Occasion, id))
        .filter(Boolean);
      const selectedFeels = selectedFeelInIds
        .map((id) => realm.objectForPrimaryKey(FeelIn, id))
        .filter(Boolean);

      realm.create('Item', {
        id: new Realm.BSON.UUID().toHexString(),
        item_name: itemName,
        main_category: main,
        category: category,
        colors: selectedColors,
        patterns: selectedPatterns,
        fits: selectedFits,
        cuts: selectedCuts,
        textiles: selectedTextiles,
        occasions: selectedOccasions,
        comfort: comfort,
        feel_in: selectedFeels,
      });
    });

    setItemName('');
    setSelectedMainId(null);
    setSelectedCategoryId(null);
    setSelectedColorIds([]);
    setSelectedPatternIds([]);
    setSelectedFitIds([]);
    setSelectedCutIds([]);
    setSelectedTextileIds([]);
    setSelectedOccasionIds([]);
    setComfort(3);
    setSelectedFeelInIds([]);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      showsVerticalScrollIndicator={false} >
    <View style={styles.form} onStartShouldSetResponder={() => true}>
      <Text variant="bodyLarge">item name</Text>
      <TextInput
        style={styles.input}
        placeholder="e.g., Jacket"
        value={itemName}
        onChangeText={setItemName}
      />

      <PropertyList
        title={'main category'}
        properties={mains}
        selectable={true}
        selectedIds={selectedMainId ? [selectedMainId] : []}
        onToggle={handleMainCategorySelect}
        singleSelect={true}
      />

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
        colors={colors}
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
      </View> ) : null}
      <Button onPress={handleSave} style={styles.saveButton} >Save Piece</Button>
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
  saveButton: {
    marginTop: 20,
    padding: 20,
  }
});
