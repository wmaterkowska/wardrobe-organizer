import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';

import { Strings } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  return (
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text variant="headlineLarge" style={styles.appName}>
        {Strings.appName}
      </Text>
      <Text variant="titleLarge" style={styles.welcome}>
        {Strings.welcome}
      </Text>

      <Button
        mode="outlined"
        onPress={() => {}}
        style={{ marginBottom: 16 }}
      >
        Add New Piece
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    textAlign: 'left',
    marginLeft: 52,
  },
  welcome: {
    textAlign: 'left',
    margin: 32,
    padding: 20,
  }
})
