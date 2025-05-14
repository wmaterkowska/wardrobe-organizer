import React from 'react';

import Item from '../database/models/Item';

import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PropertyChip from './PropertyChip';

type Props = {
  property: string;
  propertiesArray?: [];
}

export default function PropertyList({ property, propertiesArray }: Props) {

  return (
  <View style={styles.listContainer} >
    <Text variant="bodyLarge" >{property}</Text>
    {propertiesArray ? (
      <View style={styles.listView} >
        {propertiesArray?.map( (property, i) => <PropertyChip key={i} label={property.name} /> )}
      </View>
      ) : null
    }
  </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
  },
  listView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
})