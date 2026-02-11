import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';

type ThemePreferenceOption = 'light' | 'dark' | 'system';

type AppearanceCardProps = {
  preference: ThemePreferenceOption;
  buttonBorderColor: string;
  onChangePreference: (next: ThemePreferenceOption) => void;
  textColor: string;
};

export function AppearanceCard({
  preference,
  buttonBorderColor,
  onChangePreference,
  textColor,
}: AppearanceCardProps) {
  return (
    <Card className="rounded-2xl mt-4">
      <View className="p-5">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Appearance
        </Text>
        <Text variant="bodySmall" className="mb-3" style={{ color: textColor, opacity: 0.7 }}>
          Default mode is Light. You can also switch to Dark or System mode.
        </Text>
        <View className="flex-row">
          <Button
            mode={preference === 'light' ? 'contained' : 'outlined'}
            onPress={() => onChangePreference('light')}
            className="rounded-xl flex-1 mr-2"
            style={{ borderColor: buttonBorderColor }}
          >
            Light
          </Button>
          <Button
            mode={preference === 'dark' ? 'contained' : 'outlined'}
            onPress={() => onChangePreference('dark')}
            className="rounded-xl flex-1 mr-2"
            style={{ borderColor: buttonBorderColor }}
          >
            Dark
          </Button>
          <Button
            mode={preference === 'system' ? 'contained' : 'outlined'}
            onPress={() => onChangePreference('system')}
            className="rounded-xl flex-1"
            style={{ borderColor: buttonBorderColor }}
          >
            System
          </Button>
        </View>
      </View>
    </Card>
  );
}
