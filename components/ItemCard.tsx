import React, { useState, useEffect } from 'react';
import { Card, Chip } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { resolveAssetSource, Dimensions } from 'react-native';

import  { useWardrobeContext }  from '../context/WardrobeContext';

import ColorList from './ColorList';

import { Item } from '../database/models/Item';

type Props = {
  item: Item;
  onPress?: () => void;
  zoom?: Int;
}

export default function ItemCard({ item, onPress, zoom = 2 }: Props) {

  const { viewType } = useWardrobeContext();

  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!item.image_uri) return;
    Image.getSize(
      item.image_uri,
      (width, height) => {
        const ratio = height / width;
        setImageHeight(screenWidth * ratio * 0.6 / zoom);
        setImageWidth(screenWidth / ratio * 0.4);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [item.image_uri, zoom]);

    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.itemContainer, viewType === 'list' ? {width: 200} : {}]}>
        <Card mode='elevated'>
            {item.image_uri ? (
              <Card.Cover
                source={{ uri: item.image_uri }}
                style={viewType === 'list' ? {height: 200} : {height: imageHeight}}
                resizeMode="contain"
                />
              ) : null}
            {item.item_name ? (
              <Card.Title title={item.item_name}/>
             ) : null}
            {(!item.image_uri && item.colors) ? (
              <ColorList colors={item.colors} size={45 /zoom}/>) : null}
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