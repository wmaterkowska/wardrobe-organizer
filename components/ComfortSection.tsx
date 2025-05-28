import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CustomSegmentedButton from './CustomSegmentedButton';

import { COMFORT_LEVELS } from '../constants';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  comfortLevel: int;
  isEditable: boolean;
  onChange?: () => void;
  onPressEditIcon?: () => void;
}

export default function ComfortSection({comfortLevel, isEditable, onChange, onPressEditIcon}: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View>
    <CustomSegmentedButton
      property={'comfort'}
      levels={COMFORT_LEVELS}
      value={comfortLevel}
      isEditable={isEditable}
      onChange={onChange} />
      { isEditMode ? (
        <IconButton icon={isEditable ? "check" : "pencil"} onPress={onPressEditIcon}/>
      ) : null }
  </View>
  )
}