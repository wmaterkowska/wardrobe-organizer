import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { resolveAssetSource, Dimensions } from 'react-native';

import  { useWardrobeContext }  from '../context/WardrobeContext';

import { Outfit } from '../database/models/Outfit';

type Props = {
  outfit: Outfit;
  onPress: () => void;
  onLongPress: () => void;
  zoom: int;
}

export default function OutfitCard({outfit, onPress, onLongPress, zoom}: Props) {

  const { colors: themeColors } = useTheme();
  const { isSelectMode, selectedOutfits, setSelectedOutfits } = useWardrobeContext();

  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!outfit.image_uri) return;
    Image.getSize(
      outfit.image_uri,
      (width, height) => {
        ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6 / zoom);
        setImageWidth(screenWidth /ratio * 0.4);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [outfit.image_uri, zoom]);

  const addOutfit = (id: string) => {
    setSelectedOutfits((prevArray) => prevArray.includes(id) ? prevArray.filter((o) => o !== id) : [...prevArray, id]);
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.outfitContainer} >
    <Card mode='outlined' style={outfit.image_uri ? { borderColor: 'transparent', marginBottom: -20 } : { backgroundColor: themeColors.surfaceVariant, borderColor: 'transparent' } } >
      {isSelectMode && (
        <IconButton
          icon={isSelectMode && selectedOutfits.includes(outfit.id) ? 'check' : 'circle-outline' }
          onPress={() => addOutfit(outfit.id)}
          style={styles.selectionIcon}
        />
      )}
      {outfit.image_uri ? (
      <Card.Cover
        source={{uri: outfit.image_uri}}
        style={{height: imageHeight}}
        resizeMode="cover"
      /> ) : null }
      {outfit.outfit_name ? (
        <Card.Title
          title={outfit.outfit_name}
          titleStyle={outfit.image_uri ? {marginLeft: -16, marginTop: -16} : {} }
          titleVariant="bodyMedium"/>
      ) : null}
    </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outfitContainer: {
    width: "100%",
    padding: 4,
  },
  selectionIcon: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: 'white',
    borderRadius: 10,
    zIndex: 99,
  },
});