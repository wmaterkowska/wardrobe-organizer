import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    primary: 'rgb(59, 178, 157)',                 // ocean green
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(181, 237, 227)',       // light mint
    onPrimaryContainer: 'rgb(8, 65, 55)',

    secondary: 'rgb(245, 215, 110)',              // soft yellow
    onSecondary: 'rgb(58, 46, 0)',
    secondaryContainer: 'rgb(255, 243, 192)',     // light warm yellow
    onSecondaryContainer: 'rgb(51, 40, 0)',

    tertiary: 'rgb(93, 99, 0)',                   // mossy green
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(226, 234, 116)',      // yellow-green
    onTertiaryContainer: 'rgb(27, 29, 0)',

    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',

    background: 'rgb(247, 253, 252)',             // soft minty white
    onBackground: 'rgb(29, 52, 47)',

    surface: 'rgb(255, 255, 255)',
    onSurface: 'rgb(29, 52, 47)',

    surfaceVariant: 'rgb(221, 238, 234)',
    onSurfaceVariant: 'rgb(63, 94, 87)',

    outline: 'rgb(125, 167, 158)',
    outlineVariant: 'rgb(188, 217, 210)',

    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',

    inverseSurface: 'rgb(46, 76, 70)',
    inverseOnSurface: 'rgb(224, 247, 243)',
    inversePrimary: 'rgb(122, 216, 197)',

    elevation: {
      level0: 'transparent',
      level1: 'rgb(239, 248, 246)',
      level2: 'rgb(232, 244, 240)',
      level3: 'rgb(224, 240, 237)',
      level4: 'rgb(222, 238, 235)',
      level5: 'rgb(217, 235, 232)',
    },

    surfaceDisabled: 'rgba(29, 52, 47, 0.12)',
    onSurfaceDisabled: 'rgba(29, 52, 47, 0.38)',

    backdrop: 'rgba(43, 65, 60, 0.4)',
}

const customColorsDark = {
    primary: 'rgb(122, 216, 197)',                  // bright ocean green
    onPrimary: 'rgb(0, 55, 48)',
    primaryContainer: 'rgb(0, 80, 70)',             // deep green
    onPrimaryContainer: 'rgb(181, 237, 227)',

    secondary: 'rgb(245, 215, 110)',                // soft yellow
    onSecondary: 'rgb(58, 46, 0)',
    secondaryContainer: 'rgb(102, 85, 0)',          // golden brown
    onSecondaryContainer: 'rgb(255, 243, 192)',

    tertiary: 'rgb(198, 210, 89)',                  // yellow-green
    onTertiary: 'rgb(46, 50, 0)',
    tertiaryContainer: 'rgb(66, 71, 0)',            // olive
    onTertiaryContainer: 'rgb(226, 234, 116)',

    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 218, 214)',

    background: 'rgb(14, 31, 28)',                  // very dark greenish
    onBackground: 'rgb(218, 244, 239)',

    surface: 'rgb(24, 46, 42)',
    onSurface: 'rgb(224, 247, 243)',

    surfaceVariant: 'rgb(63, 94, 87)',
    onSurfaceVariant: 'rgb(195, 228, 220)',

    outline: 'rgb(125, 167, 158)',
    outlineVariant: 'rgb(92, 126, 118)',

    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',

    inverseSurface: 'rgb(218, 244, 239)',
    inverseOnSurface: 'rgb(27, 53, 48)',
    inversePrimary: 'rgb(59, 178, 157)',

    elevation: {
      level0: 'transparent',
      level1: 'rgb(28, 53, 48)',
      level2: 'rgb(31, 59, 54)',
      level3: 'rgb(33, 65, 58)',
      level4: 'rgb(34, 67, 60)',
      level5: 'rgb(36, 71, 64)',
    },

    surfaceDisabled: 'rgba(224, 247, 243, 0.12)',
    onSurfaceDisabled: 'rgba(224, 247, 243, 0.38)',

    backdrop: 'rgba(50, 75, 69, 0.4)',
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
