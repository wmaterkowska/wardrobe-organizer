import React, { useState, useEffect, useMemo } from 'react';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Button } from 'react-native-paper';
import ImageSection from '../components/ImageSection';
import NameSection from '../components/NameSection';

import { Item } from '../database/models/Item'

import { pickOrCaptureImage } from '../utility/photoUtils';

type Props = {
  onDismiss: () => void;
  selectedItems: Item[];
}

export default function AddOutfitForm() {

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