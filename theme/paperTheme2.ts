import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    "primary": "rgb(99, 97, 0)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(235, 232, 110)",
    "onPrimaryContainer": "rgb(29, 29, 0)",
    "secondary": "rgb(139, 80, 0)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 220, 191)",
    "onSecondaryContainer": "rgb(45, 22, 0)",
    "tertiary": "rgb(156, 66, 58)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 218, 214)",
    "onTertiaryContainer": "rgb(65, 0, 2)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(28, 28, 22)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(28, 28, 22)",
    "surfaceVariant": "rgb(230, 227, 209)",
    "onSurfaceVariant": "rgb(72, 71, 58)",
    "outline": "rgb(121, 119, 105)",
    "outlineVariant": "rgb(202, 199, 182)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(49, 48, 43)",
    "inverseOnSurface": "rgb(244, 240, 231)",
    "inversePrimary": "rgb(207, 203, 85)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(247, 243, 242)",
      "level2": "rgb(243, 239, 235)",
      "level3": "rgb(238, 234, 227)",
      "level4": "rgb(236, 233, 224)",
      "level5": "rgb(233, 229, 219)"
    },
    "surfaceDisabled": "rgba(28, 28, 22, 0.12)",
    "onSurfaceDisabled": "rgba(28, 28, 22, 0.38)",
    "backdrop": "rgba(50, 49, 37, 0.4)"
}

const customColorsDark = {
    "primary": "rgb(207, 203, 85)",
    "onPrimary": "rgb(51, 50, 0)",
    "primaryContainer": "rgb(75, 73, 0)",
    "onPrimaryContainer": "rgb(235, 232, 110)",
    "secondary": "rgb(255, 184, 114)",
    "onSecondary": "rgb(74, 40, 0)",
    "secondaryContainer": "rgb(106, 59, 0)",
    "onSecondaryContainer": "rgb(255, 220, 191)",
    "tertiary": "rgb(255, 180, 171)",
    "onTertiary": "rgb(95, 20, 17)",
    "tertiaryContainer": "rgb(125, 43, 37)",
    "onTertiaryContainer": "rgb(255, 218, 214)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(28, 28, 22)",
    "onBackground": "rgb(230, 226, 217)",
    "surface": "rgb(28, 28, 22)",
    "onSurface": "rgb(230, 226, 217)",
    "surfaceVariant": "rgb(72, 71, 58)",
    "onSurfaceVariant": "rgb(202, 199, 182)",
    "outline": "rgb(147, 145, 129)",
    "outlineVariant": "rgb(72, 71, 58)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(230, 226, 217)",
    "inverseOnSurface": "rgb(49, 48, 43)",
    "inversePrimary": "rgb(99, 97, 0)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(37, 37, 25)",
      "level2": "rgb(42, 42, 27)",
      "level3": "rgb(48, 47, 29)",
      "level4": "rgb(50, 49, 30)",
      "level5": "rgb(53, 53, 31)"
    },
    "surfaceDisabled": "rgba(230, 226, 217, 0.12)",
    "onSurfaceDisabled": "rgba(230, 226, 217, 0.38)",
    "backdrop": "rgba(50, 49, 37, 0.4)"
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
