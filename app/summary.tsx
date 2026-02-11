import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Card, Text } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetAttendanceMarksQuery } from '@/store/api/attendanceApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import { countPresentTotals, filterMarksForMonth, monthLabels } from '@/utils/attendance';

const buildMonthKey = (year: number, monthIndex: number) => `${year}-${monthIndex}`;

export default function SummaryScreen() {
  const { selectedClass } = useAttendance();
  const year = new Date().getFullYear();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const classId = selectedClass?.id ?? '';
  const { data: students = [] } = useGetStudentsByClassQuery(classId, { skip: !classId });
  const { data: marks = [] } = useGetAttendanceMarksQuery(
    { classId, startDate: `${year}-01-01`, endDate: `${year}-12-31` },
    { skip: !classId },
  );

  const monthlySummaries = monthLabels.map((label, index) => {
    const monthMarks = filterMarksForMonth(marks, buildMonthKey(year, index));
    const totals = countPresentTotals(students, monthMarks);
    return {
      label,
      totals,
    };
  });

  const yearlyTotals = monthlySummaries.reduce(
    (acc, summary) => {
      acc.boys += summary.totals.boys;
      acc.girls += summary.totals.girls;
      acc.total += summary.totals.total;
      return acc;
    },
    { boys: 0, girls: 0, total: 0 },
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
          <View className="flex-1 px-6 py-8 pt-20">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Full Summary Report
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

            <Card className="rounded-2xl mt-6 mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Class Overview
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Total Students: {students.length}
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Total Boys: {students.filter((s) => s.gender === 'Male').length}
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Total Girls: {students.filter((s) => s.gender === 'Female').length}
                </Text>
              </View>
            </Card>

            <Card className="rounded-2xl mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Monthly Attendance Summary
                </Text>
                {monthlySummaries.map((summary, index) => (
                  <View
                    key={summary.label}
                    className={index ? 'border-t border-slate-200 py-3' : 'py-2'}
                  >
                    <Text variant="bodyMedium" className="font-semibold mb-1">
                      {summary.label}
                    </Text>
                    <Text variant="bodySmall" className="text-slate-500">
                      Boys: {summary.totals.boys}
                    </Text>
                    <Text variant="bodySmall" className="text-slate-500">
                      Girls: {summary.totals.girls}
                    </Text>
                    <Text variant="bodySmall" className="text-slate-500">
                      Total: {summary.totals.total}
                    </Text>
                  </View>
                ))}
              </View>
            </Card>

            <Card className="rounded-2xl mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Year Totals
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Boys Attendance: {yearlyTotals.boys}
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Girls Attendance: {yearlyTotals.girls}
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  Overall Attendance: {yearlyTotals.total}
                </Text>
              </View>
            </Card>

            <Card className="rounded-2xl">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Next Steps
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  - Export this report to PDF once data is ready.
                </Text>
                <Text variant="bodySmall" className="text-slate-500">
                  - Add edit/delete for students and marks.
                </Text>
              </View>
            </Card>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
