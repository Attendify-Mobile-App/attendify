import { ScrollView, TouchableOpacity, View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type SummaryMonthlyTotalCardProps = {
  selectedMonthLabel: string;
  selectedMonthIndex: number;
  monthLabels: string[];
  monthTotals: { boys: number; girls: number; total: number };
  trackedDays: number;
  averages: { boys: string; girls: string; total: string };
  textColor: string;
  mutedTextColor: string;
  tintColor: string;
  cardAccentColor: string;
  onSelectMonth: (index: number) => void;
};

export function SummaryMonthlyTotalCard({
  selectedMonthLabel,
  selectedMonthIndex,
  monthLabels,
  monthTotals,
  trackedDays,
  averages,
  textColor,
  mutedTextColor,
  tintColor,
  cardAccentColor,
  onSelectMonth,
}: SummaryMonthlyTotalCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-2">
          Monthly Total ({selectedMonthLabel})
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Boys: {monthTotals.boys}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Girls: {monthTotals.girls}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Total: {monthTotals.total}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Tracked Days: {trackedDays}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Avg/Day: Boys {averages.boys}, Girls {averages.girls}, Total {averages.total}
        </Text>

        <ScrollView
          horizontal
          className="mt-4"
          contentContainerStyle={{ paddingRight: 6 }}
          showsHorizontalScrollIndicator={false}
        >
          {monthLabels.map((label, index) => (
            <TouchableOpacity
              key={label}
              onPress={() => onSelectMonth(index)}
              className="mr-2 px-3 py-2 rounded-full border"
              style={{
                borderColor: index === selectedMonthIndex ? tintColor : '#CBD5E1',
                backgroundColor: index === selectedMonthIndex ? cardAccentColor : 'transparent',
              }}
            >
              <Text variant="bodySmall" style={{ color: textColor }}>
                {label.slice(0, 3)}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </Card>
  );
}
