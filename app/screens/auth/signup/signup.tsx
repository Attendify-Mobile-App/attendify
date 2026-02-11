import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { SignupForm } from '@/components/auth/signup-form';
import { useSignupLogic } from './useSignup';

export default function SignupScreen() {
  const {
    backgroundColor,
    textColor,
    tintColor,
    buttonBorderColor,
    username,
    setUsername,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
    error,
    success,
    isLoading,
    handleSignup,
    goToLogin,
  } = useSignupLogic();

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
                Create Account
              </Text>
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                Sign up to get started
              </Text>
            </View>

            {/* Form */}
            <SignupForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              confirmPassword={confirmPassword}
              setConfirmPassword={setConfirmPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              showConfirmPassword={showConfirmPassword}
              setShowConfirmPassword={setShowConfirmPassword}
              error={error}
              success={success}
              tintColor={tintColor}
              buttonBorderColor={buttonBorderColor}
              isLoading={isLoading}
              handleSignup={handleSignup}
              goToLogin={goToLogin}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
