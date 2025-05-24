import React from 'react';

import Item from '../database/models/Item';

import { View, StyleSheet } from 'react-native';
import { Text, IconButton } from 'react-native-paper';
import PropertyChip from './PropertyChip';

import { useExpandableList } from '../hooks/useExpandableList';

type Props = {
  title: string;
  properties?: [];
  selectable?: Boolean;
  selectedIds?: string[];
  onToggle?: (id: string) => void;
  singleSelect?: Boolean;
}

export default function PropertyList({
  title,
  properties,
  selectable = false,
  selectedIds = [],
  onToggle,
  singleSelect = false, }: Props) {

  const { visibleItems, showToggle, toggle, expanded } = useExpandableList(properties, 10);

  const handleToggle = (id: string) => {
    if (!onToggle) return;
    if (singleSelect) {
      onToggle(id);
    } else {
      const alreadySelected = selectedIds?.includes(id);
      onToggle(
        alreadySelected
          ? id
          : id
      )
    }
  }

  return (
  <View style={styles.listContainer} >
    {title ? (<Text variant="bodyLarge" >{title}</Text>) : null }
    {properties ? (
      <View style={styles.listView} >
        {visibleItems?.map( (property) => (
          <PropertyChip
            key={property.id}
            label={property.name}
            selectable={selectable}
            selected={selectedIds?.includes(property.id)}
            onPress={selectable ? () => handleToggle(property.id) : undefined }
          /> ) )}
      </View>
      ) : null }
      {showToggle && (
        <IconButton onPress={toggle} icon={expanded ? 'chevron-up' : 'chevron-down'}/>
      )}
  </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 16,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
})