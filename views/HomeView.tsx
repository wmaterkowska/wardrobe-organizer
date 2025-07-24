import React, { useState } from 'react';
import { Image, View, SafeAreaView, StyleSheet } from 'react-native';
import { Button, Card, Text, useTheme } from 'react-native-paper';
import InsightCard from '../components/InsightCard';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../navigation/RootNavigator';
import { useTabNavigation } from '../context/TabNavigationContext';

import Realm from 'realm';
import { useQuery, useRealm } from '@realm/react';
import { Item } from '../database/models/Item';
import { Strings } from '../constants';

import {
  getRandomCards,
  findMostWornColor,
  findRecentlyAddedItem,
  findItemYouForgotAbout,
  findFavouriteFit,
  findTheBestLikeMe,
  findFeelIn,
  findRecentOutfit } from '../utility/insightUtils';
import { generateShade } from '../utility/colorUtils';

type Props = NativeStackScreenProps<RootStackParamList, 'Home'>;

export default function HomeView({ navigation }: Props) {

  const theme = useTheme();

  const [addModalVisible, setAddModalVisible] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);

  const realm = useRealm();
  const items = useQuery(Item);
  const mostWornColor = findMostWornColor({realm});
  const recentlyAddedItem = findRecentlyAddedItem({realm});
  const itemYouForgotAbout = findItemYouForgotAbout({realm});
  const favouriteFit = findFavouriteFit({realm});
  const theBestFeel = findTheBestLikeMe({realm});
  const feelInData = findFeelIn({realm}) || {};
  const recentOutfit = findRecentOutfit({realm});

  const insightCards = [
    <InsightCard type={'itemsInWardrobe'} data={items.length} key={0}/>,
    <InsightCard type={'mostWornColor'} data={mostWornColor} key={1}/>,
    <InsightCard type={'recentlyAdded'} data={recentlyAddedItem} key={2}/>,
    <InsightCard type={'declutterPrompt'} data={itemYouForgotAbout} key={3}/>,
    <InsightCard type={'favouriteFit'} data={favouriteFit} key={4}/>,
    <InsightCard type={'theBestFeel'} data={theBestFeel} key={5} />,
    <InsightCard type={'feelIn'} data={feelInData} key={6} />,
    <InsightCard type={'recentOutfit'} data={recentOutfit} key={7} />,
  ];

  const randomCards = getRandomCards(insightCards);

  return (
    <SafeAreaView style={styles.container} >
    <View style={styles.innerView}>

      <Text variant="headlineMedium" style={styles.titleContainer}>
        {Strings.appName}
      </Text>

      {items.length > 0 ? (
      <View style={styles.cardContainer}>
          {randomCards.map((card, idx) => {
            const color = generateShade(theme.colors.tertiary, idx, randomCards.length);
            return ( <View style={[styles.card, {backgroundColor: color}]}
             key={idx} >
            {card}</View> )
            })
          }
      </View>
      ) : null }

    </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 0,
    padding: 0,
    width: '100%',
    borderRadius: 0,
    borderTopLeftRadius: 30,
    overflow: 'hidden',
    marginTop: -30,
  },
  cardContainer: {
    position: 'absolute',
    bottom: 0,
    padding: 0,
    margin: 0,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  titleContainer: {
    textAlign: 'center',
    marginVertical: 32,
  },
  innerView: {
    position: 'relative',
    flex: 1,
    height: '100%',
    flexDirection: 'column',
    alignItems: 'center',
  },
});