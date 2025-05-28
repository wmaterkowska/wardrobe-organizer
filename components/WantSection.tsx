import { View, StyleSheet } from 'react-native';
import { Text, Button, IconButton } from 'react-native-paper';
import CustomSegmentedButton from './CustomSegmentedButton';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { Want, WANT_ARRAY } from '../constants/index';

type Props = {
  value: string;
  isEditable?: boolean;
  handleSelect?: () => void;
  onPressEditIcon?: () => void;
}

export default function WantSection({ value, isEditable, handleSelect, onPressEditIcon}: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View>
    {isEditMode && isEditable ? (
      <CustomSegmentedButton
        property={Want.wantQuestion}
        levels={WANT_ARRAY}
        value={value}
        isEditable={true}
        onChange={handleSelect}
      />
    ) : (
      <View style={styles.questionContainer}>
        <Text variant="bodyLarge">{Want.want}</Text>
        <Button mode='contained'>{value}</Button>
      </View>
    )}
    { isEditMode ? (
      <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
    ) : null }
  </View>
  )
}

const styles = StyleSheet.create({
  questionContainer: {
    marginTop: 16,
  }
})