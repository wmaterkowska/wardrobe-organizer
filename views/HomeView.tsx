import React, { useState } from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import { useTabNavigation } from '../context/TabNavigationContext';

import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Strings } from '../constants';

import WelcomeView from './WelcomeView';
import AddItemModal from '../components/AddItemModal';
import AddItemForm from '../components/AddItemForm';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const { setTabByKey } = useTabNavigation();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const items = useQuery(Item);

  if (items.length === 0) {
    return <WelcomeView />
  }

  return (
    <SafeAreaView style={styles.container} >
    <View style={{ flex: 1, justifyContent: 'center', padding: 24 }}>
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 32 }}>
        {Strings.appName}
      </Text>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});