import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type AccountDetailsCardProps = {
  username?: string;
};

export function AccountDetailsCard({ username }: AccountDetailsCardProps) {
  return (
    <Card className="rounded-2xl mt-6">
      <View className="p-5">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Account Details
        </Text>
        <Text variant="bodySmall" className="text-slate-500">
          Username: {username ?? 'Not available'}
        </Text>
      </View>
    </Card>
  );
}
