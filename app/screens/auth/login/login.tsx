import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { Text } from '@/components/ui/paper';
import { LoginForm } from '@/components/auth/login-form';
import { useLoginLogic } from './useLogin';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function LoginScreen() {

  const {
    backgroundColor,
    textColor,
    tintColor,
    buttonBorderColor,
    username,
    setUsername,
    password,
    setPassword,
    error,
    showPassword,
    setShowPassword,
    isLoading,
    handleLogin,
    goToResetPassword,
    goToSignup,
  } = useLoginLogic();

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
                Sign in
              </Text>
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                Use your account to continue
              </Text>
            </View>

            {/* Form */}
            <LoginForm
              username={username}
              setUsername={setUsername}
              password={password}
              setPassword={setPassword}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              error={error}
              tintColor={tintColor}
              buttonBorderColor={buttonBorderColor}
              isLoading={isLoading}
              handleLogin={handleLogin}
              goToResetPassword={goToResetPassword}
              goToSignup={goToSignup}
            />
          
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
