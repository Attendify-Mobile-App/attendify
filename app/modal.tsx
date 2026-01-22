import { Link } from 'expo-router';
import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';

export default function ModalScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-slate-50 px-6">
      <Card className="rounded-2xl w-full max-w-md">
        <View className="p-5 items-center">
          <Text variant="titleLarge" className="font-semibold mb-4">
            This is a modal
          </Text>
          <Link href="/" dismissTo asChild>
            <Button mode="contained" className="rounded-xl">
              Go to home screen
            </Button>
          </Link>
        </View>
      </Card>
    </View>
  );
}
