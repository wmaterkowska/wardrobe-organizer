import { View, ScrollView, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper';
import PropertyList from './PropertyList';

import { isRealmList } from '../hooks/useGroupedItems';
import { useAllPropertyManagers } from '../hooks/useAllPropertyManagers';

import { summarizeItems } from '../utility/summaryUtils';

import { Item } from '../database/models/Item';
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
    'comfort': propertiesMap['comfort'].sort(),
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

const styles = StyleSheet.create({
  propertiesContainer: {
    display: 'flex',
    padding: 10,
  },
})