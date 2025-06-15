import mockSafeAreaContext from 'react-native-safe-area-context/jest/mock';

jest.mock('react-native-safe-area-context', () => mockSafeAreaContext);

import '@testing-library/jest-native/extend-expect';

jest.mock('react-native-vector-icons', () => {
  const View = require('react-native').View;
  return {
    default: View,
  };
});

jest.mock('react-native-vector-icons/MaterialCommunityIcons', () => {
  const View = require('react-native').View;
  return {
    default: View,
  };
});
