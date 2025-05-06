import React from 'react';
import { Card } from 'react-native-paper';
import { TouchableOpacity } from 'react-native';

import { Item } from '../database/models/Item';

export default function ItemCard({ item, onPress }: { item: Item; onPress: () => void }) {

    return (
      <TouchableOpacity onPress={onPress}>
        <Card style={{ marginBottom: 16 }}>
            {item.image_uri ? (
              <Card.Cover
                source={{ uri: item.image_uri }}
                />
              ) : null}
            {item.item_name ? (
              <Card.Title title={item.item_name}/>
             ) : null}
        </Card>
      </TouchableOpacity>
    );
}