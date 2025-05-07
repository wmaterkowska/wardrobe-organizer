import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
  "primary": "rgb(0, 103, 126)",
  "onPrimary": "rgb(255, 255, 255)",
  "primaryContainer": "rgb(181, 235, 255)",
  "onPrimaryContainer": "rgb(0, 31, 40)",
  "secondary": "rgb(155, 64, 82)",
  "onSecondary": "rgb(255, 255, 255)",
  "secondaryContainer": "rgb(255, 217, 221)",
  "onSecondaryContainer": "rgb(64, 0, 19)",
  "tertiary": "rgb(0, 108, 73)",
  "onTertiary": "rgb(255, 255, 255)",
  "tertiaryContainer": "rgb(139, 247, 196)",
  "onTertiaryContainer": "rgb(0, 33, 19)",
  "error": "rgb(186, 26, 26)",
  "onError": "rgb(255, 255, 255)",
  "errorContainer": "rgb(255, 218, 214)",
  "onErrorContainer": "rgb(65, 0, 2)",
  "background": "rgb(251, 252, 254)",
  "onBackground": "rgb(25, 28, 29)",
  "surface": "rgb(251, 252, 254)",
  "onSurface": "rgb(25, 28, 29)",
  "surfaceVariant": "rgb(219, 228, 232)",
  "onSurfaceVariant": "rgb(64, 72, 76)",
  "outline": "rgb(112, 120, 124)",
  "outlineVariant": "rgb(191, 200, 204)",
  "shadow": "rgb(0, 0, 0)",
  "scrim": "rgb(0, 0, 0)",
  "inverseSurface": "rgb(46, 49, 50)",
  "inverseOnSurface": "rgb(239, 241, 242)",
  "inversePrimary": "rgb(91, 213, 250)",
  "elevation": {
    "level0": "transparent",
    "level1": "rgb(238, 245, 248)",
    "level2": "rgb(231, 240, 244)",
    "level3": "rgb(223, 236, 240)",
    "level4": "rgb(221, 234, 239)",
    "level5": "rgb(216, 231, 236)"
  },
  "surfaceDisabled": "rgba(25, 28, 29, 0.12)",
  "onSurfaceDisabled": "rgba(25, 28, 29, 0.38)",
  "backdrop": "rgba(41, 50, 53, 0.4)"
}

const customColorsDark = {
  "primary": "rgb(91, 213, 250)",
  "onPrimary": "rgb(0, 53, 67)",
  "primaryContainer": "rgb(0, 78, 96)",
  "onPrimaryContainer": "rgb(181, 235, 255)",
  "secondary": "rgb(255, 178, 188)",
  "onSecondary": "rgb(95, 17, 38)",
  "secondaryContainer": "rgb(125, 41, 59)",
  "onSecondaryContainer": "rgb(255, 217, 221)",
  "tertiary": "rgb(111, 219, 169)",
  "onTertiary": "rgb(0, 56, 36)",
  "tertiaryContainer": "rgb(0, 82, 54)",
  "onTertiaryContainer": "rgb(139, 247, 196)",
  "error": "rgb(255, 180, 171)",
  "onError": "rgb(105, 0, 5)",
  "errorContainer": "rgb(147, 0, 10)",
  "onErrorContainer": "rgb(255, 180, 171)",
  "background": "rgb(25, 28, 29)",
  "onBackground": "rgb(225, 227, 228)",
  "surface": "rgb(25, 28, 29)",
  "onSurface": "rgb(225, 227, 228)",
  "surfaceVariant": "rgb(64, 72, 76)",
  "onSurfaceVariant": "rgb(191, 200, 204)",
  "outline": "rgb(138, 146, 150)",
  "outlineVariant": "rgb(64, 72, 76)",
  "shadow": "rgb(0, 0, 0)",
  "scrim": "rgb(0, 0, 0)",
  "inverseSurface": "rgb(225, 227, 228)",
  "inverseOnSurface": "rgb(46, 49, 50)",
  "inversePrimary": "rgb(0, 103, 126)",
  "elevation": {
    "level0": "transparent",
    "level1": "rgb(28, 37, 40)",
    "level2": "rgb(30, 43, 47)",
    "level3": "rgb(32, 48, 53)",
    "level4": "rgb(33, 50, 56)",
    "level5": "rgb(34, 54, 60)"
  },
  "surfaceDisabled": "rgba(225, 227, 228, 0.12)",
  "onSurfaceDisabled": "rgba(225, 227, 228, 0.38)",
  "backdrop": "rgba(41, 50, 53, 0.4)"
}



export const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...customColorsLight,
  },
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...customColorsDark,
  },
};

export const navigationThemes = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});
