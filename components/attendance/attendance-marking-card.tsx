import { View } from 'react-native';

import { Button, Card, Text } from '@/components/ui/paper';
import type { AttendanceMark, Student } from '@/types/attendance';

type AttendanceMarkingCardProps = {
  selectedClassExists: boolean;
  students: Student[];
  marks: AttendanceMark[];
  dateLabel: string;
  presentColor: string;
  presentTextColor: string;
  absentColor: string;
  absentTextColor: string;
  buttonBorderColor: string;
  onToggle: (studentId: string) => void;
  getStatusForDate: (marks: AttendanceMark[], studentId: string, date: string) => 'P' | 'A';
};

export function AttendanceMarkingCard({
  selectedClassExists,
  students,
  marks,
  dateLabel,
  presentColor,
  presentTextColor,
  absentColor,
  absentTextColor,
  buttonBorderColor,
  onToggle,
  getStatusForDate,
}: AttendanceMarkingCardProps) {
  return (
    <Card className="rounded-2xl mb-4">
      <View className="p-4">
        <Text variant="titleMedium" className="font-semibold mb-3">
          Mark Attendance
        </Text>
        {!selectedClassExists ? (
          <Text variant="bodyMedium" className="text-slate-400">
            Select a class to start marking attendance.
          </Text>
        ) : students.length === 0 ? (
          <Text variant="bodyMedium" className="text-slate-400">
            Add students to start marking attendance.
          </Text>
        ) : (
          students.map((student, index) => {
            const status = getStatusForDate(marks, student.id, dateLabel);
            return (
              <View key={student.id} className="flex-row items-center justify-between mb-3">
                <View className="flex-1 mr-3">
                  <Text variant="bodyLarge" className="font-semibold">
                    {index + 1}. {student.name}
                  </Text>
                  <Text variant="bodySmall" className="text-slate-500">
                    Adm #{student.admissionNo} - {student.gender}
                  </Text>
                </View>
                <Button
                  mode="contained"
                  onPress={() => onToggle(student.id)}
                  buttonColor={status === 'P' ? presentColor : absentColor}
                  textColor={status === 'P' ? presentTextColor : absentTextColor}
                  className="rounded-lg"
                  style={{ borderColor: buttonBorderColor }}
                >
                  {status === 'P' ? 'Present' : 'Absent'}
                </Button>
              </View>
            );
          })
        )}
      </View>
    </Card>
  );
}
