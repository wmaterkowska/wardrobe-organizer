import { View, StyleSheet } from 'react-native';
import {Text, Switch } from 'react-native-paper';

type Props = {
  isSwitchOn: boolean;
  onToggleSwitch: () => void;
}

export default function EditAllButtonSection({isSwitchOn = false, onToggleSwitch}: Props) {

  return (
    <View style={styles.editAllButtonContainer}>
     <Text variant="bodyMedium">Edit All</Text>
     <Switch value={isSwitchOn} onValueChange={onToggleSwitch}/>
    </View>
  )
}

const styles = StyleSheet.create({
  editAllButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
});