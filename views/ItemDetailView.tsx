import React, { useState, useEffect } from 'react';
import { View, Image, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { Text, Chip, Card } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { BSON } from 'realm';

import { Item } from '../database/models/Item';
import { COMFORT_LEVELS, PROPERTIES_ARRAY } from '../constants';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import ColorList from '../components/ColorList';
import PropertyList from '../components/PropertyList';
import CustomSegmentedButton from '../components/CustomSegmentedButton'

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailView({ route, navigation }: Props) {

  const realm = useRealm();
  const [imageHeight, setImageHeight] = useState(200);
  const [imageWidth, setImageWidth] = useState(200);
  const screenWidth = Dimensions.get('window').width - 32;

  const { itemId } = route.params;
  const item = realm.objectForPrimaryKey<Item>('Item', itemId);

  useEffect(() => {
    if (!item.image_uri) return;
    Image.getSize(
      item.image_uri,
      (width, height) => {
        const ratio = height / width;
        setImageWidth(screenWidth);
        setImageHeight(screenWidth * ratio);
      },
      (error) => {
        console.warn('Image.getSize failed:', error);
      }
    );
  }, [item.image_uri]);

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Item not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 60, padding: 16}}
      showsVerticalScrollIndicator={false} >
      <View>
        {item.image_uri ? (
          <Image
            source={{ uri: item.image_uri }}
            style={{ width: imageWidth, height: imageHeight, }}
          />
        ) : null}

        <Text variant="headlineLarge">{item.item_name}</Text>

        <View style={styles.category} >
          <Text variant="bodyMedium">{item.main_category?.name} ></Text>
          <Text variant="bodyMedium">{item.category?.name || '—'}</Text>
        </View>

        { item.colors ? <ColorList colors={item.colors} /> : null }

        { PROPERTIES_ARRAY.map( (property, i) => (
          <PropertyList key={i} title={property} properties={item[property]} />
        ) )}

        {item.comfort ? (
          <CustomSegmentedButton
            property={'comfort'}
            levels={COMFORT_LEVELS}
            value={item.comfort}
            isEditable={false} />
          ): null}

        {item.feel_in ? (
          <PropertyList title={'feel_in'} properties={item.feel_in} />
        ) : null}

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  category: {
    flexDirection: 'row',
    gap: 5,
  }
})