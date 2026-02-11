import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { AccountDetailsCard } from '@/components/profile/account-details-card';
import { AppearanceCard } from '@/components/profile/appearance-card';
import { SecurityCard } from '@/components/profile/security-card';

import { useProfileLogic } from './use-profile';

export default function ProfileScreen() {
  const {
    user,
    preference,
    setPreference,
    backgroundColor,
    textColor,
    buttonBorderColor,
    goToResetPassword,
    handleLogout,
  } = useProfileLogic();

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
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                Manage your account and security settings.
              </Text>
            </View>

            <AccountDetailsCard username={user?.username} />

            <AppearanceCard
              preference={preference}
              buttonBorderColor={buttonBorderColor}
              onChangePreference={setPreference}
              textColor={textColor}
            />

            <SecurityCard
              buttonBorderColor={buttonBorderColor}
              onResetPassword={goToResetPassword}
              onLogout={handleLogout}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
