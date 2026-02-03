import { View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { Button, HelperText, TextInput } from '@/components/ui/paper';

type LoginFormProps = {
	username: string;
	setUsername: (value: string) => void;
	password: string;
	setPassword: (value: string) => void;
	showPassword: boolean;
	setShowPassword: (value: boolean) => void;
	error: string;
	tintColor: string;
	buttonBorderColor: string;
	isLoading: boolean;
	handleLogin: () => void;
	goToResetPassword: () => void;
	goToSignup: () => void;
};

export function LoginForm({
	username,
	setUsername,
	password,
	setPassword,
	showPassword,
	setShowPassword,
	error,
	tintColor,
	buttonBorderColor,
	isLoading,
	handleLogin,
	goToResetPassword,
	goToSignup,
}: LoginFormProps) {
	return (
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
						onPress={() => setShowPassword(!showPassword)}
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
				onPress={goToResetPassword}
				textColor={tintColor}
				compact
				className="self-end"
				style={{ borderColor: buttonBorderColor }}
			>
				Reset password?
			</Button>

			<Button
				mode="contained"
				onPress={handleLogin}
				disabled={isLoading}
				loading={isLoading}
				className="rounded-xl mt-4"
				contentStyle={{ paddingVertical: 8 }}
				buttonColor={tintColor}
				style={{ borderColor: buttonBorderColor }}
			>
				{isLoading ? 'Logging in...' : 'Login'}
			</Button>

			<Button
				mode="text"
				onPress={goToSignup}
				className="mt-3"
				textColor={tintColor}
				style={{ borderColor: buttonBorderColor }}
			>
				Create new account
			</Button>
		</View>
	);
}
