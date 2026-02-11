import { Link } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function ModalScreen() {
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Card className="rounded-2xl w-full max-w-md">
        <View className="p-5 items-center">
          <Text variant="titleLarge" className="font-semibold mb-4">
            This is a modal
          </Text>
          <Link href="/" dismissTo asChild>
            <Button mode="contained" className="rounded-xl" style={{ borderColor: buttonBorderColor }}>
              Go to home screen
            </Button>
          </Link>
        </View>
      </Card>
    </View>
  );
}
