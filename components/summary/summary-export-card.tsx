import { TouchableOpacity, View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';

type SummaryExportCardProps = {
  textColor: string;
  tintColor: string;
  cardAccentColor: string;
  mutedTextColor: string;
  onExport: () => void;
};

export function SummaryExportCard({
  textColor,
  tintColor,
  cardAccentColor,
  mutedTextColor,
  onExport,
}: SummaryExportCardProps) {
  return (
    <Card className="rounded-2xl">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-2">
          Next Step
        </Text>
        <TouchableOpacity
          onPress={onExport}
          className="rounded-xl px-4 py-3 border"
          style={{ borderColor: tintColor, backgroundColor: cardAccentColor }}
        >
          <Text variant="labelLarge" style={{ color: textColor }}>
            Download Full Summary (.csv)
          </Text>
        </TouchableOpacity>
        <Text variant="bodySmall" style={{ color: mutedTextColor }} className="mt-2">
          Includes selected class totals, monthly summary, and selected month weekly summary.
        </Text>
      </View>
    </Card>
  );
}
