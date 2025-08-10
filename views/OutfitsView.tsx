import Realm from 'realm';
import { useRealm, useQuery } from '@realm/react';
import { useCallback, useEffect, useState } from 'react';
import { useWardrobeContext, useRegisterDelete  }  from '../context/WardrobeContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/RootNavigator';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { isRealmList } from '../hooks/useGroupedItems';

import { Outfit } from '../database/models/Outfit';
import { ALL_OUTFIT_PROPERTIES, propertyModelDictionary, LEVELS, WANT_ARRAY, COMFORT_LEVELS } from '../constants/index';

import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Surface, Text, useTheme } from 'react-native-paper';
import OutfitCard from '../components/OutfitCard';
import PropertyChip from '../components/PropertyChip';

export default function OutfitsView() {

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const { numColumns, setNumColumns, isSelectMode, setIsSelectMode, selectedOutfits, setSelectedOutfits } = useWardrobeContext();
  const zoom = (numColumns == 1) ? 1 : numColumns-1;

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const realm = useRealm();
  const outfits = useQuery(Outfit);

  const { occasion, feels } = useAllPropertyManagers();
  const modelPropertyArrayDictionary = {
    'occasions': occasion,
    'feel_in': feels,
  };

  const [filteredOutfits, setFilteredOutfits ] = useState<Outfit[]>(outfits);
  const [chosenProperty, setChosenProperty] = useState<string | null>('occasions');
  const [propertyArray, setPropertyArray] = useState<string[] | int[] | double[]>(modelPropertyArrayDictionary['occasions'].allProperties);
  const [filter, setFilter] = useState<string | null>(null);
  const [uniqueUsedProperties, setUniqueUsedProperties] = useState([]);

  useEffect(() => {
    if (!chosenProperty) return;
    if (modelPropertyArrayDictionary[chosenProperty]) {
      setPropertyArray(modelPropertyArrayDictionary[chosenProperty].allProperties);
    } else if (LEVELS[chosenProperty]) {
      const levelsArray = LEVELS[chosenProperty];
      setPropertyArray(levelsArray);
    } else {
      setPropertyArray(WANT_ARRAY)
    }
  }, [propertyArray, chosenProperty, filteredOutfits, filter]);

  useEffect(() => {
    if (!filter) return;
    const newOutfitsSet =  outfits.filter((o) => {
      if(!o[chosenProperty]) return;
      if (isRealmList(o[chosenProperty])) {
        return o[chosenProperty].map((p) => p.name).includes(filter);
      } else if (typeof o[chosenProperty] === 'string' || typeof o[chosenProperty] === 'number') {
        return o[chosenProperty] === filter || o[chosenProperty] === parseInt(filter);
      } else {
        return o[chosenProperty].name === filter;
      }
    });
    setFilteredOutfits(newOutfitsSet);
  }, [filter, chosenProperty, propertyArray]);

  const handlePropertyChoose = (property) => {
    setChosenProperty(property);
  };

  const handleFilter = (prop) => {
    if (filter === prop) {setFilteredOutfits(outfits)};
    setFilter((prev) => prev === prop ? null : prop);
  };

  useEffect(() => {
    const usedProperties = outfits.flatMap((o) => {
      if (isRealmList(o[chosenProperty])) {
        return o[chosenProperty].map((p) => p.name) ?? []
      } else {
        return LEVELS[chosenProperty];
      }
    }).filter((v): v is string => v != undefined);

    setUniqueUsedProperties(Array.from(new Set(usedProperties)));
  }, [chosenProperty])

// card selection and delete outfit functionality ==================================================
  const onLongPressOutfit = () => {
    setIsSelectMode(true);
  };

  const deleteFn = useCallback(() => {
    realm.write(() => {
      selectedOutfits.forEach((id) => {
        const outfitToDelete = realm.objectForPrimaryKey(Outfit, id);
        if (outfitToDelete) realm.delete(outfitToDelete);
      });
     });

    setSelectedOutfits([]);
  }, [selectedOutfits, realm]);

  useRegisterDelete(deleteFn);

  if (!outfits.length) {
    return (
      <View>
        <Text>No outfits found. Add your first outfit!</Text>
      </View>
    )
  }

  return (
    <View style={{flex: 1}}>

    <View>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }} >
        <Surface style={themedStyles.propertyButtonsContainer} elevation={0}>
          {Object.keys(ALL_OUTFIT_PROPERTIES).map((k, idx) => (
            <Button
              style={[themedStyles.propertyButton, chosenProperty === k ? themedStyles.propertyButtonSelected : null]}
              textColor={colors.onBackground}
              rippleColor='transparent'
              key={idx}
              onPress={() => handlePropertyChoose(k)}
            >{ALL_OUTFIT_PROPERTIES[k]}</Button>
          ))}
        </Surface>
      </ScrollView>
      {uniqueUsedProperties.length > 0 && (
        <View>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 5 }} >
            <Surface style={themedStyles.propertyButtonsContainer} elevation={0}>
              {uniqueUsedProperties.map((p, idx) => (
                <PropertyChip
                  label={p.name || p}
                  onPress={() => handleFilter(p.name || p)}
                  selected={filter === p || filter === p.name ? true : false}
                  color={p.color_code ? p.color_code : null}
                  colorSize={p.color_code ? 16 : null}
                  key={idx}
                />
              ))}
            </Surface>
          </ScrollView>
        </View>
      )}
    </View>

    <View style={{ flex: 1 }}>
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={themedStyles.outfitsContainer}>
        {Array.from(Array(numColumns)).map((_, colIndex) => (
          <View style={themedStyles.outfitColumn} key={colIndex}>
            {filteredOutfits.filter((outfit, idx) => idx % numColumns === colIndex ).map((o) => (
              <OutfitCard
                key={o.id}
                outfit={o}
                onPress={() =>
                  navigation.navigate('OutfitDetail', {
                    outfitId: o.id,
                  })
                }
                onLongPress={onLongPressOutfit}
                zoom={zoom} />
              )
            )}
          </View>
        ))}
        </View>
    </ScrollView>
    </View>
    </View>
  )
}

const styles = (colors) => StyleSheet.create({
  outfitsContainer: {
    display: 'flex',
    padding: 10,
    flexDirection: "row",
  },
  outfitColumn: {
    flex: 1,
  },
  propertyButtonsContainer: {
    marginHorizontal: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  propertyButton: {
    padding: 0,
    margin: 0,
    color: colors.onBackground,
  },
  propertyButtonSelected: {
    borderTopWidth: 2,
    borderColor: colors.onBackground,
    borderRadius: 0,
    color: colors.onBackground,
  },
});
