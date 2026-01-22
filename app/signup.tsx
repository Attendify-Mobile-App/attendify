import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, HelperText, Text, TextInput } from '@/components/ui/paper';
import { useSignupMutation } from '@/store/api/authApi';

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

export default function SignupScreen() {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSignup = async () => {
    setError('');
    setSuccess('');

    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password) {
      setError('Username and password are required.');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      await signup({ username: trimmedUsername, password }).unwrap();
      setSuccess('Account created. Please log in.');
      setTimeout(() => {
        router.replace('/login' as any);
      }, 350);
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  return (
    <View className="flex-1 justify-center bg-slate-50 px-6">
      <Text variant="headlineMedium" className="text-center font-semibold">
        Create Account
      </Text>
      <Text variant="bodyMedium" className="text-center text-slate-500 mt-1 mb-6">
        Sign up to get started
      </Text>

      <Card className="rounded-2xl">
        <View className="p-5">
          <TextInput
            mode="outlined"
            label="Username"
            placeholder="Enter username"
            autoCapitalize="none"
            value={username}
            onChangeText={setUsername}
            className="mb-3"
          />

          <TextInput
            mode="outlined"
            label="Password"
            placeholder="Enter password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            className="mb-3"
          />

          <TextInput
            mode="outlined"
            label="Confirm Password"
            placeholder="Confirm password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            className="mb-3"
          />

          {error ? (
            <HelperText type="error" className="mb-2">
              {error}
            </HelperText>
          ) : null}
          {success ? (
            <HelperText type="info" className="mb-2">
              {success}
            </HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleSignup}
            disabled={isLoading}
            loading={isLoading}
            className="rounded-xl"
          >
            {isLoading ? 'Creating...' : 'Sign Up'}
          </Button>

          <Button mode="text" onPress={() => router.replace('/login' as any)} className="mt-2">
            Already have an account? Log in
          </Button>
        </View>
      </Card>
    </View>
  );
}
