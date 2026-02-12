import { View } from 'react-native';

import { Card, Chip, Text } from '@/components/ui/paper';

type SummaryClassOverviewCardProps = {
  year: number;
  selectedMonthLabel: string;
  totalStudents: number;
  boys: number;
  girls: number;
  mutedTextColor: string;
};

export function SummaryClassOverviewCard({
  year,
  selectedMonthLabel,
  totalStudents,
  boys,
  girls,
  mutedTextColor,
}: SummaryClassOverviewCardProps) {
  return (
    <Card className="rounded-2xl mt-6 mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-2">
          Class Overview
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Total Students: {totalStudents}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Total Boys: {boys}
        </Text>
        <Text variant="bodySmall" style={{ color: mutedTextColor }}>
          Total Girls: {girls}
        </Text>
        <View className="flex-row mt-3">
          <Chip compact className="mr-2">
            Year: {year}
          </Chip>
          <Chip compact>Month: {selectedMonthLabel}</Chip>
        </View>
      </View>
    </Card>
  );
}
