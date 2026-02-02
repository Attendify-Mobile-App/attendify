import { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';

import { useThemeColor } from '@/hooks/use-theme-color';
import { useLoginMutation } from '@/store/api/authApi';
import { useAppDispatch } from '@/store/hooks';
import { setCredentials } from '@/store/slices/authSlice';
import { RESET_PASSWORD_SCREEN, SIGNUP_SCREEN , SELECT_CLASS_SCREEN } from '@/constants/navigation/path';

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

export function useLoginLogic() {
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
			router.replace(SELECT_CLASS_SCREEN);
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

	return {
		backgroundColor,
		textColor,
		tintColor,
		username,
		setUsername,
		password,
		setPassword,
		error,
		showPassword,
		setShowPassword,
		isLoading,
		handleLogin,
		goToResetPassword: () => router.push(RESET_PASSWORD_SCREEN),
		goToSignup: () => router.push(SIGNUP_SCREEN),
	};
}
