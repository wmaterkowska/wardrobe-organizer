
import { StyleSheet, View } from 'react-native';
import ItemCard from './ItemCard';

import { Item } from '../database/models/Item';

type Props = {
  items: Item[];
}

export default function ItemList({ items }: Props) {

  return (
    <View style={styles.listContainer}>
      {items.map(i => <ItemCard key={i.id} item={i} zoom={-1} />)}
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: '3%',
  }
});