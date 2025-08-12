import { View, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import CustomSegmentedButton from './CustomSegmentedButton';

import { COMFORT_LEVELS } from '../constants';

import  { useWardrobeContext }  from '../context/WardrobeContext';
import { useTranslation } from 'react-i18next';

type Props = {
  comfortLevel: int;
  isEditable: boolean;
  onChange?: () => void;
}

export default function ComfortSection({comfortLevel, isEditable, onChange}: Props) {

  const { t } = useTranslation();
  const { isEditMode } = useWardrobeContext();

  return (
  <View>
    <CustomSegmentedButton
      property={t('properties:Comfort')}
      levels={COMFORT_LEVELS}
      value={comfortLevel}
      isEditable={isEditable}
      onChange={onChange} />
  </View>
  )
}