import { useContext, useEffect, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

import { ThemePreferenceContext } from '@/context/theme-preference-context';

/**
 * To support static rendering, this value needs to be re-calculated on the client side for web
 */
export function useColorScheme() {
  const themePreference = useContext(ThemePreferenceContext);
  const [hasHydrated, setHasHydrated] = useState(false);

  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const colorScheme = useRNColorScheme();

  if (themePreference) {
    if (themePreference.preference === 'system') {
      return hasHydrated ? colorScheme : 'light';
    }

    return themePreference.colorScheme;
  }

  if (hasHydrated) {
    return colorScheme;
  }

  return 'light';
}
