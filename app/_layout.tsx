import { ThemeProvider } from '@react-navigation/native';
import { Slot, useSegments } from 'expo-router';
import { useFonts } from 'expo-font';
import { JosefinSans_400Regular } from '@expo-google-fonts/josefin-sans';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { View } from 'react-native';
import '../global.css';
import { PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { FooterTabs } from '@/components/footer-tabs';
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
  const [fontsLoaded] = useFonts({
    JosefinSans_400Regular,
  });
  const colorScheme = useColorScheme();
  const paperTheme = colorScheme === 'dark' ? paperDarkTheme : paperLightTheme;
  const navigationTheme = colorScheme === 'dark' ? navigationDarkTheme : navigationLightTheme;
  const segments = useSegments();
  const isAuthRoute = segments[0] === 'screens' && segments[1] === 'auth';

  if (!fontsLoaded) {
    return null;
  }

  return (
    <PaperProvider theme={paperTheme}>
      <ThemeProvider value={navigationTheme}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <AttendanceProvider>
              <View className="flex-1">
                <View className="flex-1">
                  <Slot />
                </View>
                {!isAuthRoute ? <FooterTabs /> : null}
              </View>
            </AttendanceProvider>
          </PersistGate>
        </Provider>
        <StatusBar style="auto" />
      </ThemeProvider>
    </PaperProvider>
  );
}
