import { Pressable, View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';

type Props = {
  title: string;
  description: string;
  onPress: () => void;
}

export default function SummaryCard({title, description, onPress}: Props) {

  return (
  <Pressable onPress={onPress}>
  <Card  style={styles.card}>
    <Card.Content style={styles.cardContent}>
      <View style={styles.textContainer}>
        <Text variant="titleMedium">{title}</Text>
        <Text variant="bodySmall" style={styles.description}>{description}</Text>
      </View>
      <IconButton icon="chevron-right" size={24} />
    </Card.Content>
  </Card>
  </Pressable>
  );
}


const styles = StyleSheet.create({
  card: {
    elevation: 1,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  description: {
    marginTop: 4,
    color: '#6c6c6c',
  },
});