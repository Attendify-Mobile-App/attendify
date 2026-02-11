import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type WeeklySummaryItem = {
  week: number;
  totals: {
    boys: number;
    girls: number;
    total: number;
  };
  uniqueDays: number;
};

type SummaryWeeklySummaryCardProps = {
  selectedMonthLabel: string;
  weeklySummary: WeeklySummaryItem[];
  monthPeakTotal: number;
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  toPercent: (value: number, total: number) => number;
  getAverage: (value: number, count: number) => string;
};

export function SummaryWeeklySummaryCard({
  selectedMonthLabel,
  weeklySummary,
  monthPeakTotal,
  textColor,
  mutedTextColor,
  tintColor,
  toPercent,
  getAverage,
}: SummaryWeeklySummaryCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Weekly Summary ({selectedMonthLabel})
        </Text>

        {weeklySummary.map((item, index) => (
          <View key={item.week} className={index ? 'border-t border-slate-200 py-3' : 'py-2'}>
            <View className="flex-row items-center justify-between mb-2">
              <Text variant="bodyMedium" className="font-semibold" style={{ color: textColor }}>
                Week {item.week}
              </Text>
              <Text variant="labelMedium" style={{ color: textColor }}>
                Total: {item.totals.total}
              </Text>
            </View>
            <View className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E2E8F0' }}>
              <View
                className="h-2 rounded-full"
                style={{
                  width: `${toPercent(item.totals.total, monthPeakTotal)}%`,
                  backgroundColor: tintColor,
                }}
              />
            </View>
            <Text variant="bodySmall" style={{ color: mutedTextColor }} className="mt-2">
              Boys: {item.totals.boys} | Girls: {item.totals.girls}
            </Text>
            <Text variant="bodySmall" style={{ color: mutedTextColor }}>
              Avg/Day: Boys {getAverage(item.totals.boys, item.uniqueDays)}, Girls{' '}
              {getAverage(item.totals.girls, item.uniqueDays)}, Total{' '}
              {getAverage(item.totals.total, item.uniqueDays)}
            </Text>
          </View>
        ))}
      </View>
    </Card>
  );
}
