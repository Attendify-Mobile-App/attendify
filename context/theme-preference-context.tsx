import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useColorScheme as useRNColorScheme } from 'react-native';

type ThemePreference = 'light' | 'dark' | 'system';

type ThemePreferenceContextValue = {
  colorScheme: 'light' | 'dark';
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const THEME_PREFERENCE_KEY = '@attendify/theme-preference';

export const ThemePreferenceContext = createContext<ThemePreferenceContextValue | undefined>(
  undefined
);

export function useThemePreference() {
  const context = useContext(ThemePreferenceContext);

  if (!context) {
    throw new Error('useThemePreference must be used within a ThemePreferenceProvider.');
  }

  return context;
}

export function ThemePreferenceProvider({ children }: { children: React.ReactNode }) {
  const systemColorScheme = useRNColorScheme();
  const [preference, setPreferenceState] = useState<ThemePreference>('light');

  useEffect(() => {
    let isMounted = true;

    const loadThemePreference = async () => {
      try {
        const storedPreference = await AsyncStorage.getItem(THEME_PREFERENCE_KEY);
        if (
          isMounted &&
          (storedPreference === 'light' ||
            storedPreference === 'dark' ||
            storedPreference === 'system')
        ) {
          setPreferenceState(storedPreference);
        }
      } catch {
        // Keep default light mode if reading storage fails.
      }
    };

    loadThemePreference();

    return () => {
      isMounted = false;
    };
  }, []);

  const setPreference = useCallback((nextPreference: ThemePreference) => {
    setPreferenceState(nextPreference);
    AsyncStorage.setItem(THEME_PREFERENCE_KEY, nextPreference).catch(() => {
      // Ignore persistence failures and keep in-memory selection.
    });
  }, []);

  const colorScheme =
    preference === 'system' ? (systemColorScheme === 'dark' ? 'dark' : 'light') : preference;

  const value = useMemo(
    () => ({
      colorScheme,
      preference,
      setPreference,
    }),
    [colorScheme, preference, setPreference]
  );

  return <ThemePreferenceContext.Provider value={value}>{children}</ThemePreferenceContext.Provider>;
}
