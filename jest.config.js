module.exports = {
  preset: 'react-native',
  transform: {
    '^.+\\.(js|ts|tsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/setup-jest.js'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native' +
      '|@react-native' +
      '|@react-navigation' +
      '|@react-native-community' +
      '|@realm' +
      '|react-native-paper' +
      '|react-clone-referenced-element' +
      '|react-native-safe-area-context' +
      ')/)',
  ],
};
