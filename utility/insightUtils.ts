import Realm from 'realm';
import { Color } from '../database/index';

export const findMostWornColor = ({realm}: {realm : Realm}) => {

  const topColors = realm.objects('Color').sorted('usage_count', true).slice(0, 5);
  const maxCount = topColors[0].usage_count;
  const allColorsWithMaxCount = topColors.filter(color => color.usage_count === maxCount);

  if (allColorsWithMaxCount.length > 1) {
    const randomIndex = Math.floor(Math.random() * allColorsWithMaxCount.length);
    return topColors.slice(0, allColorsWithMaxCount.length)[randomIndex];
  } else {
    return topColors[0];
  }
};