import { View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';
import type { AttendanceMark, Student } from '@/types/attendance';
import { getMonthlyStudentTotal } from '@/utils/attendance';

type AttendanceMonthlyStudentTotalsCardProps = {
  monthLabel: string;
  monthKey: string;
  students: Student[];
  marks: AttendanceMark[];
};

export function AttendanceMonthlyStudentTotalsCard({
  monthLabel,
  monthKey,
  students,
  marks,
}: AttendanceMonthlyStudentTotalsCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Student Totals for {monthLabel}
        </Text>
        {students.length === 0 ? (
          <Text variant="bodyMedium" className="text-slate-400">
            No student totals yet.
          </Text>
        ) : (
          students.map((student) => (
            <View key={student.id} className="flex-row items-center justify-between mb-2">
              <Text variant="bodyMedium">{student.name}</Text>
              <Text variant="labelMedium" className="rounded-full bg-sky-100 px-3 py-1 text-sky-700">
                {getMonthlyStudentTotal(marks, student.id, monthKey)} days present
              </Text>
            </View>
          ))
        )}
      </View>
    </Card>
  );
}
