import { View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import PropertyList from './PropertyList';

import { Item } from '../database/models/Item';
import { PROPERTIES_ARRAY_FOR_SUMMARY } from '../constants/index';
import { Color, Pattern, Fit, Cut, Textile, FeelIn } from '../database/index';


type Props = {
  items: Item[];
}

type PropertyMap = {
  colors: Color[];
  patterns: Pattern[];
  fits: Fit[];
  cuts: Cut[];
  textiles: Textile[];
  comfort: int[];
  feel_in: FeelIn[];
}

export default function SummarySectionList({items}: Props) {

  const propertiesMap = summarizeItems(items);

  return (
    <View>
      <ScrollView>
        <View>
          {Object.keys(propertiesMap).map((key) => (
            <View>
              <Text>key</Text>
              <PropertyList
                title={key}
                properties={propertiesMap[key]}
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

      if (Array.isArray(value)) {
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
  console.log(summaryMap);
  return summaryMap;
}