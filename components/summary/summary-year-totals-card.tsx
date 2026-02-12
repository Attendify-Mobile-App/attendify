import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type SummaryYearTotalsCardProps = {
  totals: {
    boys: number;
    girls: number;
    total: number;
  };
  trackedDays: number;
  averages: {
    boys: string;
    girls: string;
    total: string;
  };
  mutedTextColor: string;
};

export function SummaryYearTotalsCard({
  totals,
  trackedDays,
  averages,
  mutedTextColor,
}: SummaryYearTotalsCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-2">
          Year Totals
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Boys Attendance: {totals.boys}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Girls Attendance: {totals.girls}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Overall Attendance: {totals.total}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Tracked Days: {trackedDays}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Avg/Day: Boys {averages.boys}, Girls {averages.girls}, Total {averages.total}
        </Text>
      </View>
    </Card>
  );
}
