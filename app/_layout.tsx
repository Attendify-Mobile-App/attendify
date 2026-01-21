import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { AttendanceProvider } from '@/context/attendance-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AttendanceProvider>
        <Stack screenOptions={{ headerBackTitle: 'Back' }}>
          <Stack.Screen name="index" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login' }} />
          <Stack.Screen name="select-class" options={{ title: 'Select Class' }} />
          <Stack.Screen name="students" options={{ title: 'Student List' }} />
          <Stack.Screen name="attendance" options={{ title: 'Monthly Attendance' }} />
          <Stack.Screen name="year-total" options={{ title: 'Year Totals' }} />
          <Stack.Screen name="summary" options={{ title: 'Full Summary' }} />
        </Stack>
      </AttendanceProvider>
      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
