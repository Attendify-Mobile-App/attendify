import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';
import type { Student } from '@/types/attendance';
import { getGenderCount } from '@/utils/attendance';

type ClassSnapshotCardProps = {
  students: Student[];
};

export function ClassSnapshotCard({ students }: ClassSnapshotCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-2">
          Class Snapshot
        </Text>
        <Text variant="bodySmall" className="text-slate-500">
          Total Boys: {getGenderCount(students, 'Male')}
        </Text>
        <Text variant="bodySmall" className="text-slate-500">
          Total Girls: {getGenderCount(students, 'Female')}
        </Text>
      </View>
    </Card>
  );
}
