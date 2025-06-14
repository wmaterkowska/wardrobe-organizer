import React, { useState, useEffect } from 'react';

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
  isExpandable?: Boolean;
}

export default function PropertyList({
  title,
  properties,
  selectable = false,
  selectedIds = [],
  onToggle,
  singleSelect = false,
  isExpandable = true,
  }: Props) {

  const { visibleItems, showToggle, toggle, expanded } = useExpandableList(properties, 10);
  const [ itemsToShow, setItemsToShow ] = useState(properties);

  useEffect(() => {
    if (isExpandable) {
      setItemsToShow(visibleItems)
    }
  }, [isExpandable, expanded])

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
  };

  return (
  <View style={styles.listContainer} >
    {title ? (<Text variant="bodyLarge" >{title}</Text>) : null }
    {properties ? (
      <View style={styles.listView} >
        {itemsToShow?.map( (property, idx) => (
          <PropertyChip
            key={property.id ?? idx}
            label={property.name ?? property.toString()}
            selectable={selectable}
            selected={selectedIds?.includes(property.id) || selectedIds === property.id}
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
    paddingTop: 10,
  },
  listView: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
})