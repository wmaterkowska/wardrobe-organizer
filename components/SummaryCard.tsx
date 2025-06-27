import { Pressable, View, StyleSheet } from 'react-native';
import { Card, Text, IconButton } from 'react-native-paper';
import { useTheme } from 'react-native-paper';

type Props = {
  keyword: string;
  label: string;
  description: string;
  icon: string;
  onPress: () => void;
}

export default function SummaryCard({keyword, label, description, icon, onPress}: Props) {

  const theme = useTheme();

  return (
  <Pressable onPress={onPress}>
  <Card style={[styles.card, {borderLeftColor: theme.colors.secondary}]}>
    <View style={styles.titleContainer}>
      <IconButton icon={icon} iconColor={theme.colors.secondary} />
      <Text variant="titleMedium">
        {label}{' '}
        <Text style={{ color: theme.colors.secondary, fontWeight: 'bold' }}>{keyword}</Text>
      </Text>
    </View>
    <Card.Content
      style={styles.cardContent}>
      <View style={styles.textContainer}>
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
    borderLeftWidth: 4,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  description: {
    marginTop: 4,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});