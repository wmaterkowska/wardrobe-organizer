import Realm from 'realm';
import { Color, Item } from '../database/index';

export const shuffleArray = (array) => {
  return [...array].sort(() => Math.random() - 0.5);
};

export const getRandomCards = (array) => {
  const shuffled = shuffleArray(array);
  // const count = Math.random() < 0.5 ? 3 : 4;
  return shuffled.slice(0, 4);
};

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

export const findRecentlyAddedItem = ({realm}: {realm: Realm}) => {

  const recentlyAddedItems = realm.objects('Item').sorted('created', true).slice(0, 3);
  return recentlyAddedItems[0];
};

export const findItemYouForgotAbout = ({realm}: {realm: Realm}) => {

  const itemsYouForgotAbout = realm.objects('Item').filtered('frequency = $0', 'Forgot I had it');

  if (itemsYouForgotAbout.length > 0) {
    const randomIndex = Math.floor(Math.random() * itemsYouForgotAbout.length);
    return itemsYouForgotAbout[randomIndex];
  }
  return null;
};

export const findFavouriteFit = ({realm}: {realm: Realm}) => {
  const favouriteFit = realm.objects('Fit').sorted('usage_count', true)[0];
  return favouriteFit;
};

export const findTheBestLikeMe = ({realm}: {realm: Realm}) => {
  const likeMeItems = realm.objects('Item').filtered('like_me = $0', 'This is me!');
  const randomIndex = Math.floor(Math.random() * likeMeItems.length);

  return likeMeItems[randomIndex];
};

// export const findFellIn = ({realm}: {realm: Realm}) => {
//   const feelIns = realm.objects('FeelIn');
//   const randomIndex = Math.floor(Math.random() * feelIns.length);
//
//   const chosenFeelIn = feelIns[randomIndex];
//
//   const feelInItems = realm.objects('Item').filtered('feel_in.includes()')
//
// }
