import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import AddItemModal from '../components/AddItemModal';
import AddItemForm from '../components/AddItemForm';

import { Strings } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const theme = useTheme();

  const handleAddButton = () => {
    setAddModalVisible(true);
  }

  return (
    <View style={styles.container, {backgroundColor: theme.colors.surface}}>
      <View style={styles.textContainer}>
        <Text variant="headlineLarge" style={styles.appName}>
          {Strings.appName}
        </Text>
        <Text variant="titleLarge" style={styles.welcome}>
          {Strings.welcome}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={handleAddButton}
          style={styles.button}
          contentStyle={{ margin: 'auto'}}
        >
          <Text variant="titleLarge"> Add New Piece </Text>
        </Button>
      </View>
      <AddItemModal visible={addModalVisible} onClose={() => {
        setAddModalVisible(false);
         navigation.replace('Main');
      }} >
        {<AddItemForm onClose={() => setAddModalVisible(false)}/>}
      </AddItemModal>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    textAlign: 'left',
    margin: '15%',
  },
  button: {
    height: '100%',
    borderTopRightRadius: 0,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomWidth: 0,
    display: 'flex',
    justifyContent: 'center',
  },
  buttonContainer: {
    flexGrow: 0,
    height: '50%',
  },
  container: {
    flex: 1,
    margin: 0,
    padding: 0,
    justifyContent: 'center',
  },
  textContainer: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  welcome: {
    textAlign: 'left',
    marginHorizontal: '15%',
  }
})
