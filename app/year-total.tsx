import { ScrollView, View } from 'react-native';

import { Card, Text } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { getMonthlyStudentTotal, monthLabels } from '@/utils/attendance';

const buildMonthKeys = () => {
  const year = new Date().getFullYear();
  return monthLabels.map((_, index) => `${year}-${index}`);
};

export default function YearTotalScreen() {
  const { students, marks } = useAttendance();
  const monthKeys = buildMonthKeys();

  return (
    <ScrollView horizontal contentContainerClassName="bg-slate-50 px-6 pt-6 pb-10">
      <View>
        <Text variant="headlineSmall" className="font-semibold mb-4">
          Year Totals
        </Text>
        <Card className="rounded-2xl">
          <View className="p-4">
            <View className="flex-row bg-slate-200 rounded-lg">
              <Text className="w-40 p-2 font-semibold">Student</Text>
              {monthLabels.map((label) => (
                <Text key={label} className="w-20 p-2 text-center font-semibold">
                  {label.slice(0, 3)}
                </Text>
              ))}
              <Text className="w-20 p-2 text-center font-semibold">Total</Text>
            </View>
            {students.length === 0 ? (
              <Text variant="bodyMedium" className="text-slate-400 p-3">
                No students added yet.
              </Text>
            ) : (
              students.map((student) => {
                const monthlyTotals = monthKeys.map((monthKey) =>
                  getMonthlyStudentTotal(marks, student.id, monthKey),
                );
                const yearTotal = monthlyTotals.reduce((sum, total) => sum + total, 0);

                return (
                  <View key={student.id} className="flex-row border-b border-slate-200">
                    <Text className="w-40 p-2">{student.name}</Text>
                    {monthlyTotals.map((total, index) => (
                      <Text key={`${student.id}-${index}`} className="w-20 p-2 text-center">
                        {total}
                      </Text>
                    ))}
                    <Text className="w-20 p-2 text-center font-semibold">{yearTotal}</Text>
                  </View>
                );
              })
            )}
          </View>
        </Card>
        <Text variant="bodySmall" className="text-slate-500 mt-3">
          Totals use the current year and saved attendance marks.
        </Text>
      </View>
    </ScrollView>
  );
}
