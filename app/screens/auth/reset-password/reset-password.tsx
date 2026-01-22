import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { ResetPasswordForm } from '@/components/auth/reset-password-form';
import { useResetPasswordLogic } from './useResetPassword';

export default function ResetPasswordScreen() {
  const {
    backgroundColor,
    textColor,
    tintColor,
    username,
    setUsername,
    password,
    setPassword,
    newPassword,
    setNewPassword,
    confirmNewPassword,
    setConfirmNewPassword,
    showPassword,
    setShowPassword,
    showNewPassword,
    setShowNewPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    success,
    isLoading,
    handleResetPassword,
    goToLogin,
  } = useResetPasswordLogic();

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
          <View className="flex-1 px-6 py-8 justify-center">
            {/* Header */}
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Reset Password
              </Text>
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                Update your password to continue
              </Text>
            </View>

            {/* Form */}
            <ResetPasswordForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              newPassword={newPassword}
              setNewPassword={setNewPassword}
              confirmNewPassword={confirmNewPassword}
              setConfirmNewPassword={setConfirmNewPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showNewPassword={showNewPassword}
              setShowNewPassword={setShowNewPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              error={error}
              success={success}
              tintColor={tintColor}
              isLoading={isLoading}
              handleResetPassword={handleResetPassword}
              goToLogin={goToLogin}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
