import React from 'react';
import { Image, View, StyleSheet } from 'react-native';
import { Card, Text, useTheme } from 'react-native-paper';
import { Icon } from 'react-native-vector-icons/MaterialCommunityIcons';
import ColorDot from './ColorDot';

import { useTranslation, Trans } from 'react-i18next';

type CardType =
  | 'itemsInWardrobe'
  | 'mostWornColor'
  | 'recentlyAdded'
  | 'declutterPrompt'
  | 'favouriteFit'
  | 'theBestFeel'
  | 'feelIn'
  | 'recentOutfit';

type Props = {
  type: CardType;
  data: any;
};

export default function InsightCard({ type, data }: Props) {

  const { colors } = useTheme();
  const themedStyles = styles(colors);

  const { t } = useTranslation();

  const renderContent = () => {
    switch (type) {

      case 'itemsInWardrobe':
        return (
          <Text style={themedStyles.title} variant="bodyLarge" >
            <Trans
              ns="insights"
              i18nKey="itemsInWardrobe"
              values={{ count: data }}
              components={{
                highlight: <Text style={themedStyles.highlight} variant="bodySmall" />
              }}
            />
          </Text>
        )

      case 'mostWornColor':
        return (
          <>
            <Text variant="bodyLarge" style={themedStyles.title}>{t('insights:mostWornColor')}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Text style={themedStyles.subtitle} variant="bodySmall">{t(`properties:${data.name}`)}</Text>
              <ColorDot colorCode={data.color_code}/>
            </View>
          </>
        );

      case 'recentlyAdded':
        return (
          <View style={themedStyles.cardWithImage}>
            <Text style={themedStyles.title} variant="bodyLarge" >{t('insights:recentlyAdded')}</Text>
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
              <Text style={themedStyles.title} variant="bodyLarge">{t('insights:declutterTitle')}</Text>
              <Text style={themedStyles.subtitle} variant="bodySmall">{t('insights:declutterSubtitle')}</Text>
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
            <Text style={themedStyles.title} variant="bodyLarge">{t('insights:favouriteFit')}</Text>
            {data.name ?
              <Text style={themedStyles.highlight} variant="bodySmall">{t(`properties:${data.name}`)}</Text>
              : <Text style={themedStyles.highlight} variant="bodySmall">?</Text>
            }
          </>
        );

      case 'theBestFeel':
        return (
          <View style={themedStyles.cardWithImage}>
            {data.image_uri || data.name ? (
              <>
                <Text style={themedStyles.title} variant="bodyLarge">{t('insights:theBestFeel')}</Text>
                {data.image_uri ?
                  <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
                  : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item_name}</Text> }
              </>
              ) : <Text style={themedStyles.title} variant="bodyLarge">{t('insights:theBestFeelNone')}</Text>
            }
          </View>
        );

      case 'feelIn':
        return (
          <View style={themedStyles.cardWithImage}>
            {data.feelIn && data.item ? (
              <>
                <Text style={themedStyles.title} variant="bodyLarge">
                  <Trans
                    ns="insights"
                    i18nKey="feelIn"
                    values={{ feel: t(`properties:${data.feelIn.name}`) }}
                    components={{
                      highlight: <Text style={themedStyles.subtitle} variant="bodySmall" />
                    }}
                    />
                </Text>
                {data.item.image_uri ?
                  <Image source={data.item.image_uri ? {uri: data.item.image_uri} : ''} style={themedStyles.image} />
                  : <Text style={themedStyles.subtitle} variant="bodySmall">{data.item.item_name}</Text>
                }
              </>) : <Text style={themedStyles.title} variant="bodyLarge">{t('insights:feelInAdd')}</Text>
            }
          </View>
        );

      case 'recentOutfit':
        return (
        <View style={themedStyles.cardWithImage}>
          {data.image_uri || data.outfit_name ? (
            <>
              <Text style={themedStyles.title} variant="bodyLarge">{t('insights:recentOutfit')}</Text>
              {data.image_uri ?
                <Image source={data.image_uri ? {uri: data.image_uri} : ''} style={themedStyles.image} />
                : <Text style={themedStyles.subtitle} variant="bodySmall">{data.outfit_name}</Text>
              }
            </>
            ) : <Text style={themedStyles.title} variant="bodyLarge">{t('insights:recentOutfitNone')}</Text>
          }
        </View>
        );

      default:
        return <Text>{t('insights:unknownCard')}</Text>;
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
