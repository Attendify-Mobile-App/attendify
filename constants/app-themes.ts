import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Central place to customize app themes for React Navigation and React Native Paper.
export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#0A7EA4',
    secondary: '#5E8EAE',
    tertiary: '#7E7BBA',
    surface: '#FFFFFF',
    background: '#FFFFFF',
  },
};

export const paperDarkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#84D2EC',
    secondary: '#A9C3D6',
    tertiary: '#B7B4E8',
    surface: '#161A1D',
    background: '#0F1214',
  },
};

export const navigationLightTheme = {
  ...NavigationLightTheme,
  colors: {
    ...NavigationLightTheme.colors,
    primary: '#0A7EA4',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#11181C',
    border: '#E3E6E8',
  },
};

export const navigationDarkTheme = {
  ...NavigationDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    primary: '#84D2EC',
    background: '#0F1214',
    card: '#161A1D',
    text: '#ECEDEE',
    border: '#22262A',
  },
};
