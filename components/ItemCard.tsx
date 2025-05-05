import { Image, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';

import { Item } from '../database/models/Item';

type Props = {
    item: Item;
}

export default function ItemCard({ item }: Props) {

   console.log(item);

    return (
        <Card style={{ marginBottom: 16 }}>
            {item.image_uri ? (
              <Image
                source={{ uri: item.image_uri }}
                style={{ height: 200, width: 200 }}
                />
              ) : null}
            <Card.Content>
              {item.item_name ? (
                  <Text variant="titleMedium">{item.item_name}</Text>
                  ) : null}
              {item.category ? (
                <Text>{item.category.category_name}</Text>
              ) : null}
              {item.colors?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {item.colors.map((color, i) => (
                    <Chip key={i} style={{ marginRight: 4, marginTop: 4, backgroundColor: color.color_code }}>{color.color_name}</Chip>
                  ))}
                </View>
              ) : null}
              {item.cuts?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {item.cuts.map((cut, i) => (
                    <Chip key={i} style={{ marginRight: 4, marginTop: 4 }}>{cut.cut_name}</Chip>
                  ))}
                </View>
              ) : null}
              {item.textiles?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {item.textiles.map((textile, i) => (
                    <Chip key={i} style={{ marginRight: 4, marginTop: 4 }}>{textile.textile_name}</Chip>
                  ))}
                </View>
              ) : null}
              {item.comfort ? (
                <Text>{item.comfort}</Text>
              ): null}
              {item.occasions?.length ? (
                <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {item.occasions.map((occasion, i) => (
                    <Chip key={i} style={{ marginRight: 4, marginTop: 4 }}>{occasion.occasion_name}</Chip>
                    ))}
                  </View>
              ) : null}
            </Card.Content>
        </Card>
    );
}