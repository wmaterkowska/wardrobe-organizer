import React, { useState, useEffect, useMemo } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import ImageSection from './ImageSection';
import NameSection from './NameSection';
import ItemList from './ItemList';

import { useQuery, useRealm } from '@realm/react';
import  { useWardrobeContext }  from '../context/WardrobeContext';

import { Item } from '../database/models/Item'

import { pickOrCaptureImage } from '../utility/photoUtils';

export default function AddOutfitForm() {

  const realm = useRealm();

  const { selectedItems } = useWardrobeContext();
  const outfitItems = selectedItems.map((id) => {
    const item = realm.objectForPrimaryKey<Item>('Item', id);
    return item;
  });

  const [outfitName, setOutfitName] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);

// handle toggle functions =========================================================================
  const handlePickImage = async () => {
    const uri = await pickOrCaptureImage();
    if (uri) {
      setImageUri(uri);
    }
  }

// save outfit to database =========================================================================
  const handleSave = () => {
    console.log('save')
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 10 }}
      showsVerticalScrollIndicator={false} >
    <View style={styles.form} onStartShouldSetResponder={() => true}>
      <ItemList items={outfitItems}/>

      <ImageSection imageUri={imageUri} onAdd={handlePickImage} isEditable={true} />

      <NameSection itemName={outfitName} isEditable={true} onChange={setOutfitName} />

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
  }
});