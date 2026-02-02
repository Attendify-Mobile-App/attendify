import { DarkTheme as NavigationDarkTheme, DefaultTheme as NavigationLightTheme } from '@react-navigation/native';
import { MD3DarkTheme, MD3LightTheme } from 'react-native-paper';

// Central place to customize app themes for React Navigation and React Native Paper.
export const paperLightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#37C8C3',
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
    primary: '#37C8C3',
    secondary: '#A9C3D6',
    tertiary: '#B7B4E8',
    surface: '#161A1D',
    background: '#181818',
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
