import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { Button, HelperText, Text, TextInput } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';

function getErrorMessage(error: unknown): string {
  if (!error) return 'Something went wrong.';
  if (typeof error === 'string') return error;

  const maybeAny = error as any;
  if (maybeAny?.data?.message) {
    return Array.isArray(maybeAny.data.message)
      ? maybeAny.data.message.join('\n')
      : String(maybeAny.data.message);
  }

  if (maybeAny?.error) return String(maybeAny.error);
  return 'Something went wrong.';
}

export default function LoginScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [login, { isLoading, isError, error: loginError }] = useLoginMutation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const handleLogin = async () => {
    try {
      setError('');
      const result = await login({ username: username.trim(), password }).unwrap();

      console.log('Login successful:', result);
      dispatch(setCredentials({ accessToken: result.accessToken, user: result.user }));
      router.replace('/select-class');
    } catch (e) {
      console.log('Login failed:', e);
      setError(getErrorMessage(e));
    }
  };

  useEffect(() => {
    if (isError && !error) {
      setError('Login failed. Please check your credentials and try again.');
      console.log('Login failed: Unknown error', loginError);
    }
  }, [isError, error, loginError]);

  return (
    <SafeAreaView className="flex-1" style={{ backgroundColor }}>
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
            <View className="mt-8">
              <TextInput
                mode="outlined"
                label="Username"
                placeholder="Enter your username"
                autoCapitalize="none"
                value={username}
                onChangeText={setUsername}
                left={<PaperTextInput.Icon icon="account" />}
                className="mb-4"
                outlineStyle={{ borderRadius: 12 }}
              />

              <TextInput
                mode="outlined"
                label="Password"
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                value={password}
                onChangeText={setPassword}
                left={<PaperTextInput.Icon icon="lock" />}
                right={
                  <PaperTextInput.Icon
                    icon={showPassword ? 'eye-off' : 'eye'}
                    onPress={() => setShowPassword((prev) => !prev)}
                    forceTextInputFocus={false}
                  />
                }
                className="mb-2"
                outlineStyle={{ borderRadius: 12 }}
              />

              {error ? (
                <HelperText type="error" className="mb-2">
                  {error}
                </HelperText>
              ) : null}

              <Button
                mode="text"
                onPress={() => router.push('/reset-password' as any)}
                textColor={tintColor}
                compact
                className="self-end"
              >
                Forgot password?
              </Button>

              <Button
                mode="contained"
                onPress={handleLogin}
                disabled={isLoading}
                loading={isLoading}
                className="rounded-xl mt-4"
                contentStyle={{ paddingVertical: 8 }}
                buttonColor={tintColor}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <Button
                mode="text"
                onPress={() => router.push('/signup' as any)}
                className="mt-3"
                textColor={tintColor}
              >
                Create new account
              </Button>
            </View>

          
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
}