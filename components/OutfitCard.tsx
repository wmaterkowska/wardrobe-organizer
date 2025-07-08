import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Card } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { resolveAssetSource, Dimensions } from 'react-native';

import { Outfit } from '../database/models/Outfit';

type Props = {
  outfit: Outfit;
  onPress: () => void;
}

export default function OutfitCard({outfit, onPress}: Props) {

  const { colors: themeColors } = useTheme();

  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!outfit.image_uri) return;
    Image.getSize(
      outfit.image_uri,
      (width, height) => {
        ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6);
        setImageWidth(screenWidth /ratio * 0.4);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [outfit.image_uri]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.outfitContainer} >
    <Card mode='outlined' style={outfit.image_uri ? { borderColor: 'transparent' } : { backgroundColor: themeColors.surfaceVariant, borderColor: 'transparent' } } >
      {outfit.image_uri ? (
      <Card.Cover
        source={{uri: outfit.image_uri}}
        style={{height: imageHeight}}
        resizeMode="cover"
      /> ) : null }
      {outfit.outfit_name ? (
        <Card.Title title={outfit.outfit_name} titleStyle={outfit.image_uri ? {marginLeft: -16} : {} }/>
      ) : null}
    </Card>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  outfitContainer: {
    width: "100%",
    padding: 4,
  }
});