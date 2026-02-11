import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';

type SecurityCardProps = {
  buttonBorderColor: string;
  onResetPassword: () => void;
  onLogout: () => void;
};

export function SecurityCard({ buttonBorderColor, onResetPassword, onLogout }: SecurityCardProps) {
  return (
    <Card className="rounded-2xl mt-4">
      <View className="p-5">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Security
        </Text>
        <Button
          mode="outlined"
          onPress={onResetPassword}
          className="rounded-xl mb-3"
          style={{ borderColor: buttonBorderColor }}
        >
          Reset Password
        </Button>
        <Button
          mode="contained"
          onPress={onLogout}
          className="rounded-xl"
          style={{ borderColor: buttonBorderColor }}
        >
          Logout
        </Button>
      </View>
    </Card>
  );
}
