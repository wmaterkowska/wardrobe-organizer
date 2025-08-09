import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CustomSegmentedButton from './CustomSegmentedButton';

import { COMFORT_LEVELS } from '../constants';

import  { useWardrobeContext }  from '../context/WardrobeContext';

type Props = {
  comfortLevel: int;
  isEditable: boolean;
  onChange?: () => void;
}

export default function ComfortSection({comfortLevel, isEditable, onChange}: Props) {

  const { isEditMode } = useWardrobeContext();

  return (
  <View>
    <CustomSegmentedButton
      property={'comfort'}
      levels={COMFORT_LEVELS}
      value={comfortLevel}
      isEditable={isEditable}
      onChange={onChange} />
  </View>
  )
}