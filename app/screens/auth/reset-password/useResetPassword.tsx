import { useState } from 'react';
import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useResetPasswordMutation } from '@/store/api/authApi';
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

export function useResetPasswordLogic() {
  const router = useRouter();
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  const goToLogin = () => router.replace(LOGIN_SCREEN);

  const handleResetPassword = async () => {
    setError('');
    setSuccess('');

    const trimmedUsername = username.trim();
    if (!trimmedUsername || !password || !newPassword) {
      setError('Username, current password, and new password are required.');
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setError('New passwords do not match.');
      return;
    }

    try {
      await resetPassword({ username: trimmedUsername, password, newPassword }).unwrap();
      setSuccess('Password updated. Please log in.');
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
    buttonBorderColor,
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
  };
}
