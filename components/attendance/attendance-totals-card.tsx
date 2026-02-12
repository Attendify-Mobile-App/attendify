import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type AttendanceTotalsCardProps = {
  title: string;
  boys: number;
  girls: number;
  total: number;
  footerLines?: string[];
};

export function AttendanceTotalsCard({
  title,
  boys,
  girls,
  total,
  footerLines = [],
}: AttendanceTotalsCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-3">
          {title}
        </Text>
        <View className="flex-row justify-between mb-2">
          <Text variant="labelLarge">Boys: {boys}</Text>
          <Text variant="labelLarge">Girls: {girls}</Text>
          <Text variant="labelLarge">Total: {total}</Text>
        </View>
        {footerLines.map((line) => (
          <Text key={line} variant="bodySmall" className="text-slate-500">
            {line}
          </Text>
        ))}
      </View>
    </Card>
  );
}
