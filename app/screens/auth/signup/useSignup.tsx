import { useState } from 'react';
import { useRouter } from 'expo-router';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useSignupMutation } from '@/store/api/authApi';
import { LOGIN_SCREEN } from '@/constants/navigation/path';

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

export function useSignupLogic() {
  const router = useRouter();
  const [signup, { isLoading }] = useSignupMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');

  const goToLogin = () => router.replace(LOGIN_SCREEN);

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
        goToLogin();
      }, 350);
    } catch (e) {
      setError(getErrorMessage(e));
    }
  };

  return {
    backgroundColor,
    textColor,
    tintColor,
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
  };
}
