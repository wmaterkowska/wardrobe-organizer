import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
  primary: '#D9005F',               // Vibrant magenta-pink
  onPrimary: '#FFFFFF',
  primaryContainer: '#FFD2E6',
  onPrimaryContainer: '#380019',

  secondary: '#008A72',             // Teal-green
  onSecondary: '#FFFFFF',
  secondaryContainer: '#C3F5EB',
  onSecondaryContainer: '#00372D',

  tertiary: '#FFB800',              // Bold amber
  onTertiary: '#2E2000',
  tertiaryContainer: '#FFEFA9',
  onTertiaryContainer: '#3A2D00',

  background: '#FFFEFD',            // Warm near-white
  onBackground: '#202020',

  surface: '#FFFFFF',
  onSurface: '#202020',

  surfaceVariant: '#F2F2F2',
  onSurfaceVariant: '#404040',

  outline: '#8A8A8A',
  outlineVariant: '#D0D0D0',

  error: '#D70040',
  onError: '#FFFFFF',
  errorContainer: '#FFD5DB',
  onErrorContainer: '#520016',

  inverseSurface: '#2A2A2A',
  inverseOnSurface: '#FDFDFD',
  inversePrimary: '#FF4B9B',

  elevation: {
    level0: 'transparent',
    level1: '#FFFFFF',
    level2: '#FFFFFF',
    level3: '#F9F9F9',
    level4: '#F2F2F2',
    level5: '#EEEEEE',
  },

  surfaceDisabled: 'rgba(32, 32, 32, 0.12)',
  onSurfaceDisabled: 'rgba(32, 32, 32, 0.38)',

  backdrop: 'rgba(0, 0, 0, 0.4)',
}

const customColorsDark = {
  primary: '#FF4B9B',               // Bright pink-magenta
  onPrimary: '#49001F',
  primaryContainer: '#780038',
  onPrimaryContainer: '#FFD2E6',

  secondary: '#4CD6B0',             // Lively teal
  onSecondary: '#002017',
  secondaryContainer: '#005245',
  onSecondaryContainer: '#C3F5EB',

  tertiary: '#FFD54F',             // Bold amber
  onTertiary: '#3A2D00',
  tertiaryContainer: '#5B4200',
  onTertiaryContainer: '#FFEFA9',

  background: '#151515',
  onBackground: '#F5F5F5',

  surface: '#1A1A1A',
  onSurface: '#F5F5F5',

  surfaceVariant: '#2A2A2A',
  onSurfaceVariant: '#D2D2D2',

  outline: '#A0A0A0',
  outlineVariant: '#444444',

  error: '#FF99AC',
  onError: '#520016',
  errorContainer: '#8C1E3C',
  onErrorContainer: '#FFD5DB',

  inverseSurface: '#F5F5F5',
  inverseOnSurface: '#1E1E1E',
  inversePrimary: '#D9005F',

  elevation: {
    level0: 'transparent',
    level1: '#1E1E1E',
    level2: '#232323',
    level3: '#2A2A2A',
    level4: '#303030',
    level5: '#373737',
  },

  surfaceDisabled: 'rgba(245, 245, 245, 0.12)',
  onSurfaceDisabled: 'rgba(245, 245, 245, 0.38)',

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
