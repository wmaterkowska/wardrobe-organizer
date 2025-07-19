import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import  { useWardrobeContext }  from '../context/WardrobeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';

import { Outfit } from '../database/models/Outfit';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import OutfitCard from '../components/OutfitCard';

export default function OutfitsView() {

  const { numColumns, setNumColumns } = useWardrobeContext();
  const zoom = (numColumns == 1) ? 1 : numColumns-1;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const outfits = useQuery(Outfit);

  const handleCardPress = () => {};

  if (!outfits.length) {
    return (
      <View>
        <Text>No outfits found. Add your first outfit!</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={styles.outfitsContainer}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View style={styles.outfitColumn} key={colIndex}>
            {outfits.filter((outfit, idx) => idx % numColumns === colIndex ).map((o) => (
              <OutfitCard
                key={o.id}
                outfit={o}
                onPress={() =>
                navigation.navigate('OutfitDetail', {
                  outfitId: o.id,
                })}
                zoom={zoom} />
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
