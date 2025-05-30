import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    "primary": "rgb(0, 101, 142)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(199, 231, 255)",
    "onPrimaryContainer": "rgb(0, 30, 46)",
    "secondary": "rgb(0, 108, 75)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(138, 248, 197)",
    "onSecondaryContainer": "rgb(0, 33, 20)",
    "tertiary": "rgb(93, 99, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(226, 234, 116)",
    "onTertiaryContainer": "rgb(27, 29, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(252, 252, 255)",
    "onBackground": "rgb(25, 28, 30)",
    "surface": "rgb(252, 252, 255)",
    "onSurface": "rgb(25, 28, 30)",
    "surfaceVariant": "rgb(221, 227, 234)",
    "onSurfaceVariant": "rgb(65, 72, 77)",
    "outline": "rgb(113, 120, 126)",
    "outlineVariant": "rgb(193, 199, 206)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(46, 49, 51)",
    "inverseOnSurface": "rgb(240, 241, 243)",
    "inversePrimary": "rgb(133, 207, 255)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(239, 244, 249)",
      "level2": "rgb(232, 240, 246)",
      "level3": "rgb(224, 235, 243)",
      "level4": "rgb(222, 234, 241)",
      "level5": "rgb(217, 231, 239)"
    },
    "surfaceDisabled": "rgba(25, 28, 30, 0.12)",
    "onSurfaceDisabled": "rgba(25, 28, 30, 0.38)",
    "backdrop": "rgba(43, 49, 54, 0.4)"
}

const customColorsDark = {
    "primary": "rgb(133, 207, 255)",
    "onPrimary": "rgb(0, 52, 76)",
    "primaryContainer": "rgb(0, 76, 108)",
    "onPrimaryContainer": "rgb(199, 231, 255)",
    "secondary": "rgb(109, 219, 170)",
    "onSecondary": "rgb(0, 56, 37)",
    "secondaryContainer": "rgb(0, 81, 55)",
    "onSecondaryContainer": "rgb(138, 248, 197)",
    "tertiary": "rgb(198, 206, 91)",
    "onTertiary": "rgb(48, 51, 0)",
    "tertiaryContainer": "rgb(70, 74, 0)",
    "onTertiaryContainer": "rgb(226, 234, 116)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(25, 28, 30)",
    "onBackground": "rgb(226, 226, 229)",
    "surface": "rgb(25, 28, 30)",
    "onSurface": "rgb(226, 226, 229)",
    "surfaceVariant": "rgb(65, 72, 77)",
    "onSurfaceVariant": "rgb(193, 199, 206)",
    "outline": "rgb(139, 145, 152)",
    "outlineVariant": "rgb(65, 72, 77)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(226, 226, 229)",
    "inverseOnSurface": "rgb(46, 49, 51)",
    "inversePrimary": "rgb(0, 101, 142)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(30, 37, 41)",
      "level2": "rgb(34, 42, 48)",
      "level3": "rgb(37, 48, 55)",
      "level4": "rgb(38, 50, 57)",
      "level5": "rgb(40, 53, 62)"
    },
    "surfaceDisabled": "rgba(226, 226, 229, 0.12)",
    "onSurfaceDisabled": "rgba(226, 226, 229, 0.38)",
    "backdrop": "rgba(43, 49, 54, 0.4)"
}



export const lightTheme = {
  ...MD3LightTheme,
  colors: customColorsLight,
};

export const darkTheme = {
  ...MD3DarkTheme,
  colors: customColorsDark,
};

export const navigationThemes = adaptNavigationTheme({
  reactNavigationLight: NavigationLightTheme,
  reactNavigationDark: NavigationDarkTheme,
});
