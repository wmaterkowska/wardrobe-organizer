import { View } from 'react-native';
import CustomSegmentedButton from './CustomSegmentedButton';

import { LEVELS, Questions } from '../constants';

type Props = {
  likeMe: string;
  handleLikeMeSelect: () => void;
  lookLevel: string;
  handleLookLevelSelect: () => void;
  frequency: string;
  handleFrequencySelect: () => void;
  price: string;
  handlePriceSelect: () => void;
};

export default function QuestionSection({
  likeMe,
  handleLikeMeSelect,
  lookLevel,
  handleLookLevelSelect,
  frequency,
  handleFrequencySelect,
  price,
  handlePriceSelect,
} : Props) {


return (
  <View>
      <CustomSegmentedButton
        property={Questions.like_me}
        levels={LEVELS.like_me}
        value={likeMe}
        isEditable={true}
        onChange={handleLikeMeSelect}
      />

      <CustomSegmentedButton
        property={Questions.look_level}
        levels={LEVELS.look_level}
        value={lookLevel}
        isEditable={true}
        onChange={handleLookLevelSelect}
      />

      <CustomSegmentedButton
        property={Questions.frequency}
        levels={LEVELS.frequency}
        value={frequency}
        isEditable={true}
        onChange={handleFrequencySelect}
      />

      <CustomSegmentedButton
        property={Questions.price}
        levels={LEVELS.price}
        value={price}
        isEditable={true}
        onChange={handlePriceSelect}
      />
  </View>
);
}