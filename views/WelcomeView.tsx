import React, { useState } from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useTheme } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import AddModal from '../components/AddModal';
import AddItemForm from '../components/AddItemForm';

import { Strings } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const theme = useTheme();

  const handleAddButton = () => {
    setAddModalVisible(true);
  }

  return (
    <View style={styles.container, {backgroundColor: theme.colors.surface}}>
      <View style={styles.textContainer}>
        <View>
          <Image
            source={require("../assets/logo/SetMyStyle-logo.png")}
            resizeMode="contain"
            style={styles.logo}
            onError={() => setLogoFailed(true)} />
        </View>
        {logoFailed ? (
        <Text variant="headlineLarge" style={styles.appName}>
          {Strings.appName}
        </Text>
        ) : null }
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
      <AddModal visible={addModalVisible} onClose={() => {
        setAddModalVisible(false);
         navigation.replace('Main');
      }} >
        {<AddItemForm onClose={() => setAddModalVisible(false)}/>}
      </AddModal>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    textAlign: 'left',
    margin: '15%',
  },
  button: {
    margin: 16,
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
  logo: {
    width: 200,
    height: 200,
    margin: 16,
    alignSelf: 'center',
  },
  textContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    marginBottom: 16,
  },
  welcome: {
    textAlign: 'left',
    marginHorizontal: '15%',
  }
})
