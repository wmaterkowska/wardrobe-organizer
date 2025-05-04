import { Image, View } from 'react-native';
import { Card, Text, Chip } from 'react-native-paper';

import { Item } from '../database/models/Item';

type Props = {
    item: Item;
}

export default function ItemCard({ item }: Props) {

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

            {item.colors?.length ? (
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 4 }}>
                  {item.colors.map((color, i) => (
                    <Chip key={i} style={{ marginRight: 4, marginTop: 4, backgroundColor: color.color_code }}>{color.color_name}</Chip>
                    ))}
                  </View>
            ) : null}
            </Card.Content>
        </Card>
    );
}