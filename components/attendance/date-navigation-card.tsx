import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';

type DateNavigationCardProps = {
  dateLabel: string;
  monthLabel: string;
  weekIndex: number;
  buttonBorderColor: string;
  onPrevious: () => void;
  onNext: () => void;
};

export function DateNavigationCard({
  dateLabel,
  monthLabel,
  weekIndex,
  buttonBorderColor,
  onPrevious,
  onNext,
}: DateNavigationCardProps) {
  return (
    <Card className="rounded-2xl mt-6 mb-4">
      <View className="p-4">
        <View className="flex-row items-center justify-between mb-2">
          <Button
            mode="outlined"
            compact
            onPress={onPrevious}
            className="rounded-lg"
            style={{ borderColor: buttonBorderColor }}
          >
            Prev
          </Button>
          <Text variant="titleMedium" className="font-semibold">
            {dateLabel}
          </Text>
          <Button
            mode="outlined"
            compact
            onPress={onNext}
            className="rounded-lg"
            style={{ borderColor: buttonBorderColor }}
          >
            Next
          </Button>
        </View>
        <Text variant="bodySmall" className="text-slate-500">
          Week {weekIndex} of {monthLabel}
        </Text>
      </View>
    </Card>
  );
}
