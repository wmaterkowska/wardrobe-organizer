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

  const theme = useTheme();

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
              {data.name ? (
                <>
                  <Text style={styles.subtitle}>{data.name}</Text>
                  <ColorDot colorCode={data.color_code}/>
                </>
                ) : <Text style={styles.subtitle}>?</Text>
              }
            </View>
          </>
        );

      case 'recentlyAdded':
        return (
          <>
            <Text style={styles.title}>Recently Added</Text>
            {data.image_uri ? (
              <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
              ) : <Text style={styles.subtitle}>{data.item_name}</Text>
            }
          </>
        );

      case 'declutterPrompt':
        return (
          <>
            <Text style={styles.title}>Time to Declutter?</Text>
            <Text style={styles.caption}>Piece you almost forget about</Text>
            {data.image_uri ? (
              <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
              ) : <Text style={styles.subtitle}>{data.item_name}</Text>
            }
          </>
        );

      case 'favouriteFit':
        return (
          <>
            <Text style={styles.title}>Your favourite fit is </Text>
            {data.name ?
              <Text style={styles.subtitle}>{data.name}</Text>
              : <Text style={styles.subtitle}>?</Text>
            }
          </>
        );

      case 'theBestFeel':
        return (
          <>
            {data.image_uri || data.name ? (
              <>
                <Text style={styles.title}>You feel exactly like you in</Text>
                {data.image_uri ?
                  <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
                  : <Text style={styles.subtitle}>{data.item_name}</Text> }
              </>
              ) : <Text style={styles.title}>You haven't added a piece that truly feels like 'you' yet.</Text>
            }
          </>
        );

      case 'feelIn':
        return (
          <>
            {data.feelIn && data.item ? (
              <>
                <Text style={styles.title}>You feel <Text style={styles.subtitle}>{data.feelIn.name}</Text> in</Text>
                {data.item.image_uri ?
                  <Image source={data.item.image_uri ? {uri: data.item.image_uri} : ''} style={styles.image} />
                  : <Text style={styles.subtitle}>{data.item.item_name}</Text>
                }
              </>) : <Text style={styles.title}>Tag your clothes with how they make you feel!</Text>
            }
          </>
        );

      case 'recentOutfit':
        return (
        <>
          {data.image_uri || data.outfit_name ? (
            <>
              <Text style={styles.title}>Recently Added Outfit</Text>
              {data.image_uri ?
                <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={styles.image} />
                : <Text style={styles.subtitle}>{data.outfit_name}</Text>
              }
            </>
            ) : <Text style={styles.title}>Add your first outfit!</Text>
          }
        </>
        );

      default:
        return <Text>Unknown card type</Text>;
    }
  };

  return (
    <Card style={[styles.card, {borderLeftColor: theme.colors.secondary}]}>
      <Card.Content>
        {renderContent()}
      </Card.Content>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '45%',
    elevation: 1,
    borderLeftWidth: 4,
  },
  highlight: {
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 3,
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
