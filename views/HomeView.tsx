import React, { useState } from 'react';
import { Image, View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import { useTabNavigation } from '../context/TabNavigationContext';

import Realm from 'realm';
import { useQuery } from '@realm/react';
import { Item } from '../database/models/Item';
import { Strings } from '../constants';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const items = useQuery(Item);
  const wardrobeCount = items.length;

  return (
    <SafeAreaView style={styles.container} >
    <View style={styles.view}>
      <View>
        <Image
          source={require("../assets/logo/SetMyStyle-logo.png")}
          resizeMode="contain"
          style={styles.logo}
          onError={() => setLogoFailed(true)} />
      </View>

      {logoFailed ? (
      <Text variant="headlineMedium" style={{ textAlign: 'center', marginBottom: 32 }}>
        {Strings.appName}
      </Text>
      ) : null }

      <View style={styles.cardContainer}>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.text}>
                You have <Text style={styles.highlight}>{wardrobeCount}</Text> pieces in your wardrobe.
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.card}>
            <Card.Content>
              <Text style={styles.title}>Your Most Worn Color</Text>
              <Text style={styles.text}>Olive green</Text>
            </Card.Content>
          </Card>
      </View>
    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    width: '45%',
  },
  cardContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    margin: '5%',
    gap: '10%',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 16,
    alignSelf: 'center',
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    padding: 24,
  },
});