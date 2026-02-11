import { View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';

import { Button, HelperText, TextInput } from '@/components/ui/paper';

type ResetPasswordFormProps = {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  newPassword: string;
  setNewPassword: (value: string) => void;
  confirmNewPassword: string;
  setConfirmNewPassword: (value: string) => void;
  showPassword: boolean;
  setShowPassword: (value: boolean) => void;
  showNewPassword: boolean;
  setShowNewPassword: (value: boolean) => void;
  showConfirmPassword: boolean;
  setShowConfirmPassword: (value: boolean) => void;
  error: string;
  success: string;
  tintColor: string;
  buttonBorderColor: string;
  isLoading: boolean;
  handleResetPassword: () => void;
  goToLogin: () => void;
};

export function ResetPasswordForm({
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
  tintColor,
  buttonBorderColor,
  isLoading,
  handleResetPassword,
  goToLogin,
}: ResetPasswordFormProps) {
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
        label="Current Password"
        placeholder="Enter current password"
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
        label="New Password"
        placeholder="Enter new password"
        secureTextEntry={!showNewPassword}
        value={newPassword}
        onChangeText={setNewPassword}
        left={<PaperTextInput.Icon icon="lock-reset" />}
        right={
          <PaperTextInput.Icon
            icon={showNewPassword ? 'eye-off' : 'eye'}
            onPress={() => setShowNewPassword(!showNewPassword)}
            forceTextInputFocus={false}
          />
        }
        className="mb-4"
        outlineStyle={{ borderRadius: 12 }}
      />

      <TextInput
        mode="outlined"
        label="Confirm New Password"
        placeholder="Confirm new password"
        secureTextEntry={!showConfirmPassword}
        value={confirmNewPassword}
        onChangeText={setConfirmNewPassword}
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
        onPress={handleResetPassword}
        disabled={isLoading}
        loading={isLoading}
        className="rounded-xl mt-2"
        contentStyle={{ paddingVertical: 8 }}
        buttonColor={tintColor}
        style={{ borderColor: buttonBorderColor }}
      >
        {isLoading ? 'Updating...' : 'Reset Password'}
      </Button>

      <Button
        mode="text"
        onPress={goToLogin}
        className="mt-3"
        textColor={tintColor}
        style={{ borderColor: buttonBorderColor }}
      >
        Back to login
      </Button>
    </View>
  );
}
