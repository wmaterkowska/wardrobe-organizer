import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';

import { Outfit } from '../database/models/Outfit';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import OutfitCard from '../components/OutfitCard';

export default function OutfitsView() {

  const outfits = useQuery(Outfit);

  const handleCardPress = () => {};

  return (
    <View style={{flex: 1}}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={styles.outfitsContainer}>
        {Array.from(Array(2)).map((_, colIndex) => (
          <View style={styles.outfitColumn} key={colIndex}>
            {outfits.filter((outfit, idx) => idx % 2 === colIndex ).map((o) => (
              <OutfitCard key={o.id} outfit={o} onPress={handleCardPress}/>
              )
            )}
          </View>
        ))}
        </View>
    </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  outfitsContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: "row",
  },
  outfitColumn: {
    flex: 1,
  },
});
