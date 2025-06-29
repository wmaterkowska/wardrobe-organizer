import { TouchableOpacity } from 'react-native';
import { Card } from 'react-native-paper';

import { Outfit } from '../database/models/Outfit';

type Props = {
  outfit: Outfit;
  onPress: () => void;
}

export default function OutfitCard({outfit, onPress}: Props) {

  const coverUri = outfit.image_uri ? outfit.imageUri : outfit.items[0].image_uri;

  return (
    <TouchableOpacity
      onPress={onPress}>
    <Card>
      <Card.Cover
        source={{uri: coverUri}}
        resizeMode="cover"
      />
      {outfit.outfit_name ? (
        <Card.Title title={outfit.outfit_name}/>
      ) : null}
    </Card>
    </TouchableOpacity>
  );
}