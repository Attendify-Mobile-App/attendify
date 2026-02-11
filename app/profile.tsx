import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Button, Card, Text } from '@/components/ui/paper';
import { useThemePreference } from '@/context/theme-preference-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { logout } from '@/store/slices/authSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

export default function ProfileScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);
  const { preference, setPreference } = useThemePreference();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');
  

  const handleLogout = () => {
    dispatch(logout());
    router.replace('/screens/auth/login/login');
  };

  return (
    <SafeAreaProvider className="flex-1" style={{ backgroundColor }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, backgroundColor }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-20">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Profile
              </Text>
              <Text
                variant="bodyMedium"
                className="mt-2"
                style={{ color: textColor, opacity: 0.7 }}
              >
                Manage your account and security settings.
              </Text>
            </View>

            <Card className="rounded-2xl mt-6">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Account Details
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Username: {user?.username ?? 'Not available'}
                </Text>
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Appearance
                </Text>
                <Text variant="bodySmall" className="mb-3" style={{ color: textColor, opacity: 0.7 }}>
                  Default mode is Light. You can also switch to Dark or System mode.
                </Text>
                <View className="flex-row">
                  <Button
                    mode={preference === 'light' ? 'contained' : 'outlined'}
                    onPress={() => setPreference('light')}
                    className="rounded-xl flex-1 mr-2"
                    style={{ borderColor: buttonBorderColor }}
                  >
                    Light
                  </Button>
                  <Button
                    mode={preference === 'dark' ? 'contained' : 'outlined'}
                    onPress={() => setPreference('dark')}
                    className="rounded-xl flex-1 mr-2"
                    style={{ borderColor: buttonBorderColor }}
                  >
                    Dark
                  </Button>
                  <Button
                    mode={preference === 'system' ? 'contained' : 'outlined'}
                    onPress={() => setPreference('system')}
                    className="rounded-xl flex-1"
                    style={{ borderColor: buttonBorderColor }}  
                  >
                    System
                  </Button>
                </View>
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Security
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => router.push('/screens/auth/reset-password/reset-password')}
                  className="rounded-xl mb-3"
                  style={{ borderColor: buttonBorderColor }}
                >
                  Reset Password
                </Button>
                <Button
                  mode="contained"
                  onPress={handleLogout}
                  className="rounded-xl"
                  style={{ borderColor: buttonBorderColor }}
                >
                  Logout
                </Button>
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
