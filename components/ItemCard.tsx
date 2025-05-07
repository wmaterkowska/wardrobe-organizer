import React, { useState, useEffect } from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { resolveAssetSource, Dimensions } from 'react-native';

import { Item } from '../database/models/Item';

export default function ItemCard({ item, onPress }: { item: Item; onPress: () => void }) {

  const [imageHeight, setImageHeight] = useState(200);
  const screenWidth = Dimensions.get('window').width;
  useEffect(() => {
    if (!item.image_uri) return;

    Image.getSize(
      item.image_uri,
      (width, height) => {
        const ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [item.image_uri]);

    return (
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <Card mode='elevated'>
            {item.image_uri ? (
              <Card.Cover
                source={{ uri: item.image_uri }}
                style={[styles.image, {height: imageHeight}]}
                resizeMode="contain"
                />
              ) : null}
            {item.item_name ? (
              <Card.Title title={item.item_name} style={styles.title}/>
             ) : null}
        </Card>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  image: {
    width: "100%",
    borderRadius: 25,
  },
  itemContainer: {
    width: "100%",
    padding: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    margin: 5,
  },
});