import { View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { Button, HelperText, TextInput } from '@/components/ui/paper';

type SignupFormProps = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  confirmPassword: string;
  setConfirmPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  error: string;
  success: string;
  tintColor: string;
  buttonBorderColor: string;
  isLoading: boolean;
  handleSignup: () => void;
  goToLogin: () => void;
};

export function SignupForm({
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
  tintColor,
  buttonBorderColor,
  isLoading,
  handleSignup,
  goToLogin,
}: SignupFormProps) {
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
        className="mb-4"
        outlineStyle={{ borderRadius: 12 }}
      />

      <TextInput
        mode="outlined"
        label="Confirm Password"
        placeholder="Confirm your password"
        secureTextEntry={!showConfirmPassword}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        left={<PaperTextInput.Icon icon="lock-check" />}
        right={
          <PaperTextInput.Icon
            icon={showConfirmPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
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
        className="rounded-xl mt-2"
        contentStyle={{ paddingVertical: 8 }}
        buttonColor={tintColor}
        style={{ borderColor: buttonBorderColor }}
      >
        {isLoading ? 'Creating...' : 'Sign Up'}
      </Button>

      <Button
        mode="text"
        onPress={goToLogin}
        className="mt-3"
        textColor={tintColor}
        style={{ borderColor: buttonBorderColor }}
      >
        Already have an account? Log in
      </Button>
    </View>
  );
}
