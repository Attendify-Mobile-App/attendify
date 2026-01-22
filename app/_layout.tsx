import { ThemeProvider } from '@react-navigation/native';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import '../global.css';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AttendanceProvider } from '@/context/attendance-context';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { persistor, store } from '@/store/store';
import {
  navigationDarkTheme,
  navigationLightTheme,
  paperDarkTheme,
  paperLightTheme,
} from '@/constants/app-themes';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? paperDarkTheme : paperLightTheme;
  const navigationTheme = colorScheme === 'dark' ? navigationDarkTheme : navigationLightTheme;

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AttendanceProvider>
              <Slot />
            </AttendanceProvider>
          </PersistGate>
        </Provider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
