import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Card, useTheme } from 'react-native-paper';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorDot from './ColorDot';

type CardType =
  | 'mostWornColor'
  | 'unwornItems'
  | 'recentlyAdded'
  | 'seasonal'
  | 'declutterPrompt'
  | 'custom';

type Props = {
  type: CardType;
  data: any;
};

export default function InsightCard({ type, data }: Props) {
  const { colors } = useTheme();

  const renderContent = () => {
    switch (type) {

      case 'itemsInWardrobe':
        return (
          <Text style={styles.title}>
            You have <Text style={styles.highlight}>{data} </Text>
            pieces in your wardrobe.
          </Text>
        )

      case 'mostWornColor':
        return (
          <>
            <Text style={styles.title}>Most Worn Color</Text>
            <Text style={styles.subtitle}>{data.name}</Text>
            <ColorDot colorCode={data.color_code}/>
          </>
        );

//       case 'unwornItems':
//         return (
//           <>
//             <Text style={styles.title}>Items You Haven't Worn</Text>
//             {data.items.map((item: any, i: number) => (
//               <Text key={i} style={styles.item}>{item.name}</Text>
//             ))}
//           </>
//         );

      case 'recentlyAdded':
        return (
          <>
            <Text style={styles.title}>Recently Added</Text>
            {data.items.map((item: any, i: number) => (
              <Text key={i} style={styles.item}>{item.name}</Text>
            ))}
          </>
        );

//       case 'seasonal':
//         return (
//           <>
//             <Text style={styles.title}>Seasonal Picks</Text>
//             <Text style={styles.caption}>{data.season}</Text>
//             {data.items.map((item: any, i: number) => (
//               <Text key={i} style={styles.item}>{item.name}</Text>
//             ))}
//           </>
//         );

      case 'declutterPrompt':
        return (
          <>
            <Text style={styles.title}>Time to Declutter?</Text>
            <Text style={styles.caption}>{data.count} items haven't been worn in 3+ months</Text>
          </>
        );

      case 'custom':
        return (
          <>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.caption}>{data.description}</Text>
          </>
        );

      default:
        return <Text>Unknown card type</Text>;
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        {renderContent()}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
  },
  highlight: {
    fontWeight: 'bold',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  caption: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  item: {
    fontSize: 15,
    marginVertical: 2,
  },
  colorDot: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginVertical: 8,
  },
});
