import React, { useState, useEffect } from 'react';
import Realm from 'realm';
import { Card, Chip, IconButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
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
}

export default function ItemCard({ item, onPress, onLongPress, zoom = 2 }: Props) {

  const { viewType, isSelectMode, selectedItems, setSelectedItems } = useWardrobeContext();

  const { colors: themeColors } = useTheme();

  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (!item.image_uri) return;
    Image.getSize(
      item.image_uri,
      (width, height) => {
        const ratio = height / width;
        if (zoom !== -1) {
          setImageHeight(screenWidth * ratio * 0.6 / zoom);
          setImageWidth(screenWidth / ratio * 0.4);
        }
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [item.image_uri, zoom]);

  const addItem = (id: string) => {
    setSelectedItems((prevArray) => prevArray.includes(id) ? prevArray.filter((i) => i !== id) : [...prevArray, id]);
  };

    return (
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        style={[styles.itemContainer, viewType === 'list' ? {width: 200} : {}, zoom === -1 ? styles.addOutfit : {}]} >
        <Card
          mode='outlined'
          style={item.image_uri ? { borderColor: 'transparent' } : { backgroundColor: themeColors.surfaceVariant, borderColor: 'transparent'} }
          >
            {isSelectMode && zoom !== -1 && (
              <IconButton
                icon={isSelectMode && selectedItems.includes(item.id) ? 'check' : 'circle-outline' }
                onPress={() => addItem(item.id)}
                style={styles.selectionIcon}
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
              <Card.Title
                title={item.item_name}
                titleStyle={item.image_uri ? {marginLeft: -16, marginTop: -16} : {} }
                titleVariant="bodyMedium"/>
             ) : null}
            <Card.Content style={item.item_name ? styles.content : {marginTop: -16}}>
            {(!item.image_uri && item.colors) ? (
              <View style={styles.colorSection}>
                <ColorList colors={item.colors} size={45 /zoom}/>
              </View>) : null}
            </Card.Content>
        </Card>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  addOutfit: {
    width: '30%',
  },
  content: {
    margin: -20,
    padding: 0,
  },
  colorSection: {
    padding: 12,
  },
  itemContainer: {
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