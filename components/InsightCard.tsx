import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
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
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text style={styles.subtitle}>{data.name}</Text>
              <ColorDot colorCode={data.color_code}/>
            </View>
          </>
        );

      case 'recentlyAdded':
        return (
          <>
            <Text style={styles.title}>Recently Added</Text>
            <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
          </>
        );

      case 'declutterPrompt':
        return (
          <>
            <Text style={styles.title}>Time to Declutter?</Text>
            <Text style={styles.caption}>Piece you almost forget about</Text>
            <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
          </>
        );
 //TODO =================================================================
      case 'favouriteFit':
        return (
          <>
            <Text style={styles.title}>{data.title}</Text>
            <Text style={styles.caption}>{data.description}</Text>
          </>
        );

      case 'theBestFeel':
        return (
          <>

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
  image: {
    width: 100,
    height: 100,
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
});
