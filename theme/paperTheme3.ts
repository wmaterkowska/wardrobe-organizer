import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    "primary": "rgb(156, 66, 59)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 218, 214)",
    "onPrimaryContainer": "rgb(65, 0, 3)",
    "secondary": "rgb(73, 104, 13)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(201, 240, 136)",
    "onSecondaryContainer": "rgb(18, 31, 0)",
    "tertiary": "rgb(113, 91, 46)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(254, 223, 166)",
    "onTertiaryContainer": "rgb(38, 25, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 26, 25)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 26, 25)",
    "surfaceVariant": "rgb(245, 221, 219)",
    "onSurfaceVariant": "rgb(83, 67, 65)",
    "outline": "rgb(133, 115, 113)",
    "outlineVariant": "rgb(216, 194, 191)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(54, 47, 46)",
    "inverseOnSurface": "rgb(251, 238, 236)",
    "inversePrimary": "rgb(255, 180, 172)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(250, 242, 245)",
      "level2": "rgb(247, 236, 239)",
      "level3": "rgb(244, 231, 233)",
      "level4": "rgb(243, 229, 232)",
      "level5": "rgb(241, 225, 228)"
    },
    "surfaceDisabled": "rgba(32, 26, 25, 0.12)",
    "onSurfaceDisabled": "rgba(32, 26, 25, 0.38)",
    "backdrop": "rgba(59, 45, 44, 0.4)"
}

const customColorsDark = {
    "primary": "rgb(255, 180, 172)",
    "onPrimary": "rgb(95, 20, 18)",
    "primaryContainer": "rgb(126, 43, 38)",
    "onPrimaryContainer": "rgb(255, 218, 214)",
    "secondary": "rgb(174, 211, 111)",
    "onSecondary": "rgb(35, 54, 0)",
    "secondaryContainer": "rgb(52, 78, 0)",
    "onSecondaryContainer": "rgb(201, 240, 136)",
    "tertiary": "rgb(224, 195, 140)",
    "onTertiary": "rgb(63, 45, 4)",
    "tertiaryContainer": "rgb(88, 68, 25)",
    "onTertiaryContainer": "rgb(254, 223, 166)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(32, 26, 25)",
    "onBackground": "rgb(237, 224, 222)",
    "surface": "rgb(32, 26, 25)",
    "onSurface": "rgb(237, 224, 222)",
    "surfaceVariant": "rgb(83, 67, 65)",
    "onSurfaceVariant": "rgb(216, 194, 191)",
    "outline": "rgb(160, 140, 138)",
    "outlineVariant": "rgb(83, 67, 65)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(237, 224, 222)",
    "inverseOnSurface": "rgb(54, 47, 46)",
    "inversePrimary": "rgb(156, 66, 59)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(43, 34, 32)",
      "level2": "rgb(50, 38, 37)",
      "level3": "rgb(57, 43, 41)",
      "level4": "rgb(59, 45, 43)",
      "level5": "rgb(63, 48, 46)"
    },
    "surfaceDisabled": "rgba(237, 224, 222, 0.12)",
    "onSurfaceDisabled": "rgba(237, 224, 222, 0.38)",
    "backdrop": "rgba(59, 45, 43, 0.4)"
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
