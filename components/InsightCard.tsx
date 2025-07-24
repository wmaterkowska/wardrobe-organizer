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
  const themedStyles = styles(colors);

  const renderContent = () => {
    switch (type) {

      case 'itemsInWardrobe':
        return (
          <Text style={themedStyles.title} variant="bodyLarge" >
            You have <Text style={themedStyles.highlight} variant="bodySmall">{data} </Text>
            pieces in your wardrobe.
          </Text>
        )

      case 'mostWornColor':
        return (
          <>
            <Text variant="bodyLarge" style={themedStyles.title}>Most Worn Color</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              {data.name ? (
                <>
                  <Text style={themedStyles.subtitle} variant="bodySmall">{data.name}</Text>
                  <ColorDot colorCode={data.color_code}/>
                </>
                ) : <Text style={themedStyles.subtitle} variant="bodySmall">?</Text>
              }
            </View>
          </>
        );

      case 'recentlyAdded':
        return (
          <View style={themedStyles.cardWithImage}>
            <Text style={themedStyles.title} variant="bodyLarge" >Recently Added</Text>
            {data.image_uri ? (
              <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
              ) : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item_name}</Text>
            }
          </View>
        );

      case 'declutterPrompt':
        return (
          <View style={themedStyles.cardWithImage}>
            <View>
              <Text style={themedStyles.title} variant="bodyLarge">Time to Declutter?</Text>
              <Text style={themedStyles.subtitle} variant="bodySmall">Piece you almost forget about</Text>
            </View>
            {data.image_uri ? (
              <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
              ) : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item_name}</Text>
            }
          </View>
        );

      case 'favouriteFit':
        return (
          <>
            <Text style={themedStyles.title} variant="bodyLarge">Your favourite fit is </Text>
            {data.name ?
              <Text style={themedStyles.highlight} variant="bodySmall">{data.name}</Text>
              : <Text style={themedStyles.highlight} variant="bodySmall">?</Text>
            }
          </>
        );

      case 'theBestFeel':
        return (
          <View style={themedStyles.cardWithImage}>
            {data.image_uri || data.name ? (
              <>
                <Text style={themedStyles.title} variant="bodyLarge">You feel exactly like you in</Text>
                {data.image_uri ?
                  <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
                  : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item_name}</Text> }
              </>
              ) : <Text style={themedStyles.title} variant="bodyLarge">You haven't added a piece that truly feels like 'you' yet.</Text>
            }
          </View>
        );

      case 'feelIn':
        return (
          <View style={themedStyles.cardWithImage}>
            {data.feelIn && data.item ? (
              <>
                <Text style={themedStyles.title} variant="bodyLarge">You feel <Text style={themedStyles.subtitle} variant="bodySmall">{data.feelIn.name}</Text> in</Text>
                {data.item.image_uri ?
                  <Image source={data.item.image_uri ? {uri: data.item.image_uri} : ''} style={themedStyles.image} />
                  : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item.item_name}</Text>
                }
              </>) : <Text style={themedStyles.title} variant="bodyLarge">Tag your clothes with how they make you feel!</Text>
            }
          </View>
        );

      case 'recentOutfit':
        return (
        <View style={themedStyles.cardWithImage}>
          {data.image_uri || data.outfit_name ? (
            <>
              <Text style={themedStyles.title} variant="bodyLarge">Recently Added Outfit</Text>
              {data.image_uri ?
                <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
                : <Text style={themedStyles.subtitle} variant="bodySmall">{data.outfit_name}</Text>
              }
            </>
            ) : <Text style={themedStyles.title} variant="bodyLarge">Add your first outfit!</Text>
          }
        </View>
        );

      default:
        return <Text>Unknown card type</Text>;
    }
  };

  return (
    <Card style={themedStyles.card} mode='outlined'>
      <Card.Content style={themedStyles.cardContent}>
        {renderContent()}
      </Card.Content>
    </Card>
  );
};

const styles = (colors) => StyleSheet.create({
  card: {
    width: '100%',
    borderRadius: 0,
    borderTopLeftRadius: 20,
    borderWidth: 0,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
    margin: 0,
    padding: 0,
  },
  cardContent: {
    marginBottom: 20,
    marginLeft: 16,
    marginTop: 12,
  },
  cardWithImage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  highlight: {
    fontWeight: 'bold',
    color: colors.onTertiary,
    marginBottom: 12,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 3,
    marginBottom: 12,
  },
  title: {
    fontWeight: '600',
    marginBottom: 6,
    color: colors.onTertiary,
  },
  subtitle: {
    fontWeight: '500',
    marginBottom: 4,
    color: colors.onTertiary,
  },
  item: {
    marginVertical: 2,
  },
});
