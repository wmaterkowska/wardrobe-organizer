import React, { useState, useEffect } from 'react';
import { Card, Chip } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { resolveAssetSource, Dimensions } from 'react-native';

import { Item } from '../database/models/Item';

export default function ItemCard({ item, onPress, zoom }: { item: Item; onPress: () => void, zoom: Int }) {

  const [imageHeight, setImageHeight] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!item.image_uri) return;
    Image.getSize(
      item.image_uri,
      (width, height) => {
        const ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6 / zoom);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [item.image_uri, zoom]);

    return (
      <TouchableOpacity onPress={onPress} style={styles.itemContainer}>
        <Card mode='elevated'>
            {item.image_uri ? (
              <Card.Cover
                source={{ uri: item.image_uri }}
                style={{height: imageHeight}}
                resizeMode="contain"
                />
              ) : null}
            {item.item_name ? (
              <Card.Title title={item.item_name}/>
             ) : null}
            {(!item.image_uri && item.colors) ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                {item.colors.map((color, index) => (
                  <Chip key={index} style={{ backgroundColor: color.color_code}}>
                    {color.name}
                  </Chip>)
                )}
              </View>) : null}
        </Card>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    padding: 4,
  },
});