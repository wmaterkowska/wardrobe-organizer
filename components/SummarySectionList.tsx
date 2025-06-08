import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PropertyList from './PropertyList';

import { isRealmList } from '../hooks/useGroupedItems';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { Item } from '../database/models/Item';
import { PROPERTIES_ARRAY_FOR_SUMMARY } from '../constants/index';
import { Color, Pattern, Fit, Cut, Textile, FeelIn } from '../database/index';


type Props = {
  items: Item[];
};

type PropertyMap = {
  colors: Color[];
  patterns: Pattern[];
  fits: Fit[];
  cuts: Cut[];
  textiles: Textile[];
  comfort: int[];
  feel_in: FeelIn[];
};

export default function SummarySectionList({items}: Props) {

  const propertiesMap = summarizeItems(items);

  const {
    color: { getSorted: getSortedColors, incrementOrCreate: incrementOrCreateColor },
    pattern: { getSorted: getSortedPatterns, incrementOrCreate: incrementOrCreatePattern },
    fit: { getSorted: getSortedFits, incrementOrCreate: incrementOrCreateFit },
    cut: { getSorted: getSortedCuts, incrementOrCreate: incrementOrCreateCut },
    textile: { getSorted: getSortedTextiles, incrementOrCreate: incrementOrCreateTextile },
    feels: { getSorted: getSortedFeelIns, incrementOrCreate: incrementOrCreateFeelIn },
  } = useAllPropertyManagers();

  const sortedPropertiesMap = {
    'colors': getSortedColors(propertiesMap['colors']),
    'patterns': getSortedPatterns(propertiesMap['patterns']),
    'fits': getSortedFits(propertiesMap['fits']),
    'cuts': getSortedCuts(propertiesMap['cuts']),
    'textiles': getSortedTextiles(propertiesMap['textiles']),
    'feel_in': getSortedFeelIns(propertiesMap['feel_in']),
  };

  return (
    <View style={{ flex: 3 }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 50 }}>
        <View style={styles.propertiesContainer}>
          {Object.keys(sortedPropertiesMap).map((key, idx) => (
            <View key={idx}>
              <PropertyList
                title={key}
                properties={ propertiesMap[key].map((p) => {
                  if (!isRealmList(p)) { return p }
                  else { return p.name }
                } )}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

function summarizeItems(items: Item[]) {
  const summaryMap = PROPERTIES_ARRAY_FOR_SUMMARY.reduce((acc, key) => {
    acc[key] = [];
    return acc;
  }, {} as PropertyMap );

  for (const item of items) {
    for (const key of PROPERTIES_ARRAY_FOR_SUMMARY) {
      const value = item[key];

      if (isRealmList(value)) {
        for (const val of value) {
          if (!summaryMap[key]?.some((v) => v.id === val.id)) {
            summaryMap[key]?.push(val);
          }
        }
      } else if (value) {
        if (!summaryMap[key]?.includes(value)) {
          summaryMap[key]?.push(value);
        }
      }
    }
  }
  return summaryMap;
}

const styles= StyleSheet.create({
  propertiesContainer: {
    display: 'flex',
    padding: 10,
  },
})