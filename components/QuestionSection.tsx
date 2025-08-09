import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import CustomSegmentedButton from './CustomSegmentedButton';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { Questions, Titles, LEVELS } from '../constants/index';

type Props = {
  property: string;
  value: string;
  isEditable?: boolean;
  handleSelect?: () => void;
}

export default function QuestionSection({property, value, isEditable, handleSelect}: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View>
    {isEditMode && isEditable ? (
      <CustomSegmentedButton
        property={Questions[property]}
        levels={LEVELS[property]}
        value={value}
        isEditable={true}
        onChange={handleSelect}
      />
    ) : (
      <View style={styles.questionContainer}>
        <Text variant="bodyLarge">{Titles[property]}</Text>
        <Button mode='outlined'>{value}</Button>
      </View>
    )}
  </View>
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 16,
  }
})