import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { configureFonts, MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

const paperFonts = configureFonts({
  config: {
    fontFamily: 'JosefinSans_400Regular',
    fontWeight: '400',
  },
});

// Central place to customize app themes for React Navigation and React Native Paper.
export const paperLightTheme = {
  ...MD3LightTheme,
  fonts: paperFonts,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#37C8C3',
    secondary: '#5E8EAE',
    tertiary: '#7E7BBA',
    surface: '#FFFFFF',
    background: '#FFFFFF',
    surfaceVariant: '#F3F6F8',
    elevation: {
      level0: '#FFFFFF',
      level1: '#F8FBFD',
      level2: '#F2F7FA',
      level3: '#ECF3F7',
      level4: '#E8F0F5',
      level5: '#E3EDF3',
    },
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  fonts: paperFonts,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#37C8C3',
    onPrimary: '#FFFFFF',
    primaryContainer: '#00504D',
    onPrimaryContainer: '#8DF4EE',
    secondary: '#A9C3D6',
    onSecondary: '#10202B',
    secondaryContainer: '#273744',
    onSecondaryContainer: '#D1E5F5',
    tertiary: '#7EC8AE',
    onTertiary: '#0D201A',
    tertiaryContainer: '#1F3A31',
    onTertiaryContainer: '#B6F1DB',
    surface: '#161A1D',
    background: '#181818',
    surfaceVariant: '#1D2327',
    surfaceTint: '#37C8C3',
    inversePrimary: '#006A67',
    elevation: {
      level0: '#181818',
      level1: '#333333',
      level2: '#1B2024',
      level3: '#20262B',
      level4: '#242B31',
      level5: '#293138',
    },
  },
};

export const navigationLightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: '#37C8C3',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#11181C',
    border: '#CCDCDC',
  },
};

export const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#37C8C3',
    background: '#181818',
    card: '#161A1D',
    text: '#ECEDEE',
    border: '#CCDCDC',
  },
};
