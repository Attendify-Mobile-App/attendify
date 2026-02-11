import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Card, Text } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetAttendanceMarksQuery } from '@/store/api/attendanceApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import { getMonthlyStudentTotal, monthLabels } from '@/utils/attendance';

const buildMonthKeys = () => {
  const year = new Date().getFullYear();
  return monthLabels.map((_, index) => `${year}-${index}`);
};

export default function YearTotalScreen() {
  const { selectedClass } = useAttendance();
  const monthKeys = buildMonthKeys();
  const year = new Date().getFullYear();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const classId = selectedClass?.id ?? '';
  const { data: students = [] } = useGetStudentsByClassQuery(classId, { skip: !classId });
  const { data: marks = [] } = useGetAttendanceMarksQuery(
    { classId, startDate: `${year}-01-01`, endDate: `${year}-12-31` },
    { skip: !classId },
  );

  return (
    <SafeAreaProvider className="flex-1" style={{ backgroundColor }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, backgroundColor }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-8">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Year Totals
              </Text>
              <Text
                variant="bodyMedium"
                className="mt-2"
                style={{ color: textColor, opacity: 0.7 }}
              >
                {selectedClass
                  ? `${selectedClass.schoolName} - ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
                  : 'No class selected yet.'}
              </Text>
            </View>

            <ScrollView horizontal className="mt-6">
              <Card className="rounded-2xl">
                <View className="p-4">
                  <View className="flex-row rounded-lg">
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
            </ScrollView>

            <Text variant="bodySmall" className="text-slate-500 mt-3">
              Totals use the current year and saved attendance marks.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
