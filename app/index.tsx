import { Text, View } from "react-native";
import { Platform } from "react-native";

import RootNavigator from '../navigation/RootNavigator'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import { database } from '../database'
import { seedDatabase } from '../database/seed'

import React, { useEffect } from 'react'

export default function Index() {

  useEffect(() => {
    seedDatabase();
  }, []);

  return (
    <PaperProvider>
      <RootNavigator />
    </PaperProvider>
  );
}
