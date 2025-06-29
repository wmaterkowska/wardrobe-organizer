import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';

import { Outfit } from '../database/models/Outfit';

import { ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import OutfitCard from '../components/OutfitCard';

export default function OutfitsView() {

  const outfits = useQuery(Outfit);

  const handleCardPress = () => {};

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
      {outfits.map((o) =>
        <OutfitCard outfit={o} onPress={handleCardPress}/>
        )
      }
    </ScrollView>
  )
}

