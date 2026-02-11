import { useContext } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { ThemePreferenceContext } from '@/context/theme-preference-context';

export function useColorScheme() {
  const themePreference = useContext(ThemePreferenceContext);
  const systemColorScheme = useRNColorScheme();

  if (themePreference) {
    return themePreference.colorScheme;
  }

  return systemColorScheme;
}
