import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    "primary": "rgb(141, 67, 128)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 215, 242)",
    "onPrimaryContainer": "rgb(57, 0, 52)",
    "secondary": "rgb(0, 104, 117)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(157, 239, 255)",
    "onSecondaryContainer": "rgb(0, 31, 36)",
    "tertiary": "rgb(139, 80, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 220, 190)",
    "onTertiaryContainer": "rgb(44, 22, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(31, 26, 29)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(31, 26, 29)",
    "surfaceVariant": "rgb(238, 222, 231)",
    "onSurfaceVariant": "rgb(78, 68, 74)",
    "outline": "rgb(128, 116, 123)",
    "outlineVariant": "rgb(210, 194, 203)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(52, 47, 50)",
    "inverseOnSurface": "rgb(248, 238, 242)",
    "inversePrimary": "rgb(255, 172, 235)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(249, 242, 249)",
      "level2": "rgb(246, 236, 245)",
      "level3": "rgb(243, 231, 241)",
      "level4": "rgb(241, 229, 240)",
      "level5": "rgb(239, 225, 237)"
    },
    "surfaceDisabled": "rgba(31, 26, 29, 0.12)",
    "onSurfaceDisabled": "rgba(31, 26, 29, 0.38)",
    "backdrop": "rgba(55, 46, 52, 0.4)"
}

const customColorsDark = {
    "primary": "rgb(255, 172, 235)",
    "onPrimary": "rgb(86, 18, 79)",
    "primaryContainer": "rgb(113, 43, 103)",
    "onPrimaryContainer": "rgb(255, 215, 242)",
    "secondary": "rgb(80, 215, 237)",
    "onSecondary": "rgb(0, 54, 62)",
    "secondaryContainer": "rgb(0, 78, 89)",
    "onSecondaryContainer": "rgb(157, 239, 255)",
    "tertiary": "rgb(255, 184, 112)",
    "onTertiary": "rgb(74, 40, 0)",
    "tertiaryContainer": "rgb(105, 60, 0)",
    "onTertiaryContainer": "rgb(255, 220, 190)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(31, 26, 29)",
    "onBackground": "rgb(234, 224, 227)",
    "surface": "rgb(31, 26, 29)",
    "onSurface": "rgb(234, 224, 227)",
    "surfaceVariant": "rgb(78, 68, 74)",
    "onSurfaceVariant": "rgb(210, 194, 203)",
    "outline": "rgb(155, 141, 149)",
    "outlineVariant": "rgb(78, 68, 74)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(234, 224, 227)",
    "inverseOnSurface": "rgb(52, 47, 50)",
    "inversePrimary": "rgb(141, 67, 128)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(42, 33, 39)",
      "level2": "rgb(49, 38, 46)",
      "level3": "rgb(56, 42, 52)",
      "level4": "rgb(58, 44, 54)",
      "level5": "rgb(62, 46, 58)"
    },
    "surfaceDisabled": "rgba(234, 224, 227, 0.12)",
    "onSurfaceDisabled": "rgba(234, 224, 227, 0.38)",
    "backdrop": "rgba(55, 46, 52, 0.4)"
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
