import {
  MD3DarkTheme,
  MD3LightTheme,
  adaptNavigationTheme,
} from 'react-native-paper';
import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';

const customColorsLight = {
    "primary": "rgb(161, 63, 29)",
    "onPrimary": "rgb(255, 255, 255)",
    "primaryContainer": "rgb(255, 219, 208)",
    "onPrimaryContainer": "rgb(57, 11, 0)",
    "secondary": "rgb(156, 65, 64)",
    "onSecondary": "rgb(255, 255, 255)",
    "secondaryContainer": "rgb(255, 218, 215)",
    "onSecondaryContainer": "rgb(65, 0, 5)",
    "tertiary": "rgb(122, 89, 0)",
    "onTertiary": "rgb(255, 255, 255)",
    "tertiaryContainer": "rgb(255, 222, 163)",
    "onTertiaryContainer": "rgb(38, 25, 0)",
    "error": "rgb(186, 26, 26)",
    "onError": "rgb(255, 255, 255)",
    "errorContainer": "rgb(255, 218, 214)",
    "onErrorContainer": "rgb(65, 0, 2)",
    "background": "rgb(255, 251, 255)",
    "onBackground": "rgb(32, 26, 24)",
    "surface": "rgb(255, 251, 255)",
    "onSurface": "rgb(32, 26, 24)",
    "surfaceVariant": "rgb(245, 222, 215)",
    "onSurfaceVariant": "rgb(83, 67, 63)",
    "outline": "rgb(133, 115, 110)",
    "outlineVariant": "rgb(216, 194, 188)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(54, 47, 45)",
    "inverseOnSurface": "rgb(251, 238, 234)",
    "inversePrimary": "rgb(255, 181, 158)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(250, 242, 244)",
      "level2": "rgb(248, 236, 237)",
      "level3": "rgb(245, 230, 230)",
      "level4": "rgb(244, 228, 228)",
      "level5": "rgb(242, 225, 223)"
    },
    "surfaceDisabled": "rgba(32, 26, 24, 0.12)",
    "onSurfaceDisabled": "rgba(32, 26, 24, 0.38)",
    "backdrop": "rgba(59, 45, 41, 0.4)"
}

const customColorsDark = {
    "primary": "rgb(255, 181, 158)",
    "onPrimary": "rgb(93, 24, 0)",
    "primaryContainer": "rgb(129, 40, 6)",
    "onPrimaryContainer": "rgb(255, 219, 208)",
    "secondary": "rgb(255, 179, 175)",
    "onSecondary": "rgb(95, 19, 22)",
    "secondaryContainer": "rgb(126, 42, 42)",
    "onSecondaryContainer": "rgb(255, 218, 215)",
    "tertiary": "rgb(245, 190, 72)",
    "onTertiary": "rgb(64, 45, 0)",
    "tertiaryContainer": "rgb(93, 66, 0)",
    "onTertiaryContainer": "rgb(255, 222, 163)",
    "error": "rgb(255, 180, 171)",
    "onError": "rgb(105, 0, 5)",
    "errorContainer": "rgb(147, 0, 10)",
    "onErrorContainer": "rgb(255, 180, 171)",
    "background": "rgb(32, 26, 24)",
    "onBackground": "rgb(237, 224, 220)",
    "surface": "rgb(32, 26, 24)",
    "onSurface": "rgb(237, 224, 220)",
    "surfaceVariant": "rgb(83, 67, 63)",
    "onSurfaceVariant": "rgb(216, 194, 188)",
    "outline": "rgb(160, 141, 135)",
    "outlineVariant": "rgb(83, 67, 63)",
    "shadow": "rgb(0, 0, 0)",
    "scrim": "rgb(0, 0, 0)",
    "inverseSurface": "rgb(237, 224, 220)",
    "inverseOnSurface": "rgb(54, 47, 45)",
    "inversePrimary": "rgb(161, 63, 29)",
    "elevation": {
      "level0": "transparent",
      "level1": "rgb(43, 34, 31)",
      "level2": "rgb(50, 38, 35)",
      "level3": "rgb(57, 43, 39)",
      "level4": "rgb(59, 45, 40)",
      "level5": "rgb(63, 48, 43)"
    },
    "surfaceDisabled": "rgba(237, 224, 220, 0.12)",
    "onSurfaceDisabled": "rgba(237, 224, 220, 0.38)",
    "backdrop": "rgba(59, 45, 41, 0.4)"
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
