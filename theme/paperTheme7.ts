import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
  primary: '#762303',
  onPrimary: '#FFFFFF',
  primaryContainer: '#FFD6C8',
  onPrimaryContainer: '#330E00',

  secondary: '#34684A',
  onSecondary: '#FFFFFF',
  secondaryContainer: '#C6E9D2',
  onSecondaryContainer: '#0F2C1D',

  tertiary: '#B47E2E',
  onTertiary: '#FFFFFF',
  tertiaryContainer: '#FEEEBF',
  onTertiaryContainer: '#3B2900',

  background: '#FFFCF9',
  onBackground: '#1E1E1E',

  surface: '#FFFBF6', // off-white with warm tint
  onSurface: '#1E1E1E',

  surfaceVariant: '#F3EFEA',
  onSurfaceVariant: '#4E4E4E',

  outline: '#A49C91',
  outlineVariant: '#D5CDC4',

  error: '#B3261E',
  onError: '#FFFFFF',
  errorContainer: '#F9DEDC',
  onErrorContainer: '#410E0B',

  inverseSurface: '#303030',
  inverseOnSurface: '#F6F6F6',
  inversePrimary: '#FF8A65',

  elevation: {
    level0: 'transparent',
    level1: '#FFF8F2', // slightly tinted
    level2: '#FFF3E9', // more depth
    level3: '#FFEEDD',
    level4: '#FFE8D0',
    level5: '#FFE0C0', // strong surface tone (but soft)
  },

  surfaceDisabled: 'rgba(30, 30, 30, 0.12)',
  onSurfaceDisabled: 'rgba(30, 30, 30, 0.38)',

  backdrop: 'rgba(0, 0, 0, 0.4)',
}

const customColorsDark = {
  primary: '#FFA38D',
  onPrimary: '#430C00',
  primaryContainer: '#762303',
  onPrimaryContainer: '#FFD6C8',

  secondary: '#9AD7B2',
  onSecondary: '#003821',
  secondaryContainer: '#34684A',
  onSecondaryContainer: '#C6E9D2',

  tertiary: '#F7CF7C',
  onTertiary: '#402D00',
  tertiaryContainer: '#B47E2E',
  onTertiaryContainer: '#FEEEBF',

  background: '#121210',
  onBackground: '#F5F0EB',

  surface: '#1A1A17', // warmer black, slightly softer
  onSurface: '#F5F0EB',

  surfaceVariant: '#2E2A25',
  onSurfaceVariant: '#D8D2CA',

  outline: '#8B8378',
  outlineVariant: '#3C3933',

  error: '#F2B8B5',
  onError: '#601410',
  errorContainer: '#8C1D18',
  onErrorContainer: '#F9DEDC',

  inverseSurface: '#F5F0EB',
  inverseOnSurface: '#2E2A25',
  inversePrimary: '#762303',

  elevation: {
    level0: 'transparent',
    level1: '#1E1B18', // subtle elevation tint
    level2: '#22201C',
    level3: '#26231F',
    level4: '#292620',
    level5: '#2E2A25', // darkest elevated card
  },

  surfaceDisabled: 'rgba(245, 240, 235, 0.12)',
  onSurfaceDisabled: 'rgba(245, 240, 235, 0.38)',

  backdrop: 'rgba(0, 0, 0, 0.6)',
}



export const lightTheme = {
  ...MD3LightTheme,
  colors: customColorsLight,
  roundness: 3,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: customColorsDark,
  roundness: 3,
};

export const navigationThemes = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});


const color="#FFFFFF";
