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

  const coverUri = outfit.image_uri ? outfit.image_uri : outfit.items[0].image_uri;

  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    Image.getSize(
      coverUri,
      (width, height) => {
        ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6);
        setImageWidth(screenWidth /ratio * 0.4);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [coverUri]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.outfitContainer}>
    <Card mode='outlined'  style={coverUri ? { borderColor: 'transparent' } : { backgroundColor: themeColors.surfaceVariant, borderColor: 'transparent' } } >
      <Card.Cover
        source={{uri: coverUri}}
        style={{height: imageHeight}}
        resizeMode="cover"
      />
      {outfit.outfit_name ? (
        <Card.Title title={outfit.outfit_name} titleStyle={coverUri ? {marginLeft: -16} : {} }/>
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