import React, { useState, useEffect } from 'react';
import { Card, Chip, IconButton } from 'react-native-paper';
import { TouchableOpacity, StyleSheet, Image, View } from 'react-native';
import { resolveAssetSource, Dimensions } from 'react-native';

import  { useWardrobeContext }  from '../context/WardrobeContext';

import ColorList from './ColorList';

import { Item } from '../database/models/Item';

type Props = {
  item: Item;
  onPress?: () => void;
  onLongPress?: () => void;
  zoom?: Int;
  selectionMode: {type: 'none' | 'delete' | 'select'};
  selected: boolean;
  onSelectToggle: () => void;
}

export default function ItemCard({ item, onPress, onLongPress, zoom = 2, selectionMode, selected, onSelectToggle }: Props) {

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
        onLongPress={onLongPress}
        style={[styles.itemContainer, viewType === 'list' ? {width: 200} : {}]}>
        <Card mode='elevated'>
            {selectionMode !== 'none' && (
              <IconButton
                icon={selectionMode === 'delete' ? 'close' : selected ? 'check-circle' : 'circle-outline'}
                onPress={() => onSelectToggle(item.id)}
                style={styles.overlayIcon}
              />
            )}
            {item.image_uri ? (
              <Card.Cover
                source={{ uri: item.image_uri }}
                style={viewType === 'list' ? {height: 200} : {height: imageHeight}}
                resizeMode="cover"
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