import { TouchableOpacity, View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';
import type { SchoolClass } from '@/types/attendance';

type SummaryClassSelectorProps = {
  selectedClass: SchoolClass | null;
  classes: SchoolClass[];
  isOpen: boolean;
  textColor: string;
  tintColor: string;
  cardAccentColor: string;
  mutedTextColor: string;
  onToggle: () => void;
  onSelectClass: (schoolClass: SchoolClass) => void;
};

export function SummaryClassSelector({
  selectedClass,
  classes,
  isOpen,
  textColor,
  tintColor,
  cardAccentColor,
  mutedTextColor,
  onToggle,
  onSelectClass,
}: SummaryClassSelectorProps) {
  return (
    <View className="mt-3 relative">
      <TouchableOpacity
        onPress={onToggle}
        className="rounded-xl px-3 py-2 border"
        style={{ borderColor: tintColor, backgroundColor: cardAccentColor }}
      >
        <Text variant="labelLarge" style={{ color: textColor }}>
          {selectedClass
            ? `Class: ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
            : 'Select Class'}
        </Text>
      </TouchableOpacity>

      {isOpen ? (
        <Card className="rounded-xl mt-2">
          <View className="p-2">
            {classes.length === 0 ? (
              <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                No classes available
              </Text>
            ) : (
              classes.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  onPress={() => onSelectClass(item)}
                  className="px-2 py-2 rounded-lg"
                  style={{
                    backgroundColor: selectedClass?.id === item.id ? cardAccentColor : 'transparent',
                  }}
                >
                  <Text variant="bodySmall" style={{ color: textColor }}>
                    {item.schoolName} • {item.className}-{item.division} ({item.academicYear})
                  </Text>
                </TouchableOpacity>
              ))
            )}
          </View>
        </Card>
      ) : null}
    </View>
  );
}
