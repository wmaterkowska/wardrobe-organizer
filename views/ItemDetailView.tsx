import React from 'react';
import { ScrollView, View, Image } from 'react-native';
import { Text, Chip, Card } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useRealm } from '@realm/react';
import { BSON } from 'realm';

import { Item } from '../database/models/Item';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'ItemDetail'>;

export default function ItemDetailView({ route, navigation }: Props) {

  const realm = useRealm();

  const { itemId } = route.params;
  const item = realm.objectForPrimaryKey<Item>('Item', itemId);

  if (!item) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Item not found.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Card>
        {item.image_uri ? (
          <Image
            source={{ uri: item.image_uri }}
            style={{ width: '100%', height: 200 }}
            resizeMode="cover"
          />
        ) : null}

        <Card.Content>
          <Text variant="titleLarge">{item.item_name}</Text>
          <Text variant="bodyMedium" style={{ marginTop: 8 }}>
            Category: {item.category?.category_name || '—'}
          </Text>

          {item.colors?.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {item.colors.map((color, index) => (
                <Chip key={index} style={{ backgroundColor: color.color_code, marginRight: 6, marginBottom: 6 }}>
                  {color.name}
                </Chip>
              ))}
            </View>
          ) : null}

          {item.cuts?.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 8 }}>
              {item.cuts.map((cut, index) => (
                <Chip key={index} style={{ marginRight: 6, marginBottom: 6 }}>
                  {cut.cut_name}
                </Chip>
              ))}
            </View>
          ) : null}
          {item.textiles?.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
              {item.textiles.map((textile, i) => (
                <Chip key={i} style={{ marginRight: 4, marginTop: 4 }}>{textile.textile_name}</Chip>
              ))}
            </View>
          ) : null}
          {item.comfort ? (
            <Text style={{ marginTop: 8 }}>Comfort: {item.comfort ?? '—'}</Text>
          ): null}
          {item.occasions?.length ? (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
              {item.occasions.map((occasion, i) => (
                <Chip key={i} style={{ marginRight: 4, marginTop: 4 }}>{occasion.occasion_name}</Chip>
              ))}
            </View>
          ) : null}
        </Card.Content>
      </Card>
    </ScrollView>
  );
}
