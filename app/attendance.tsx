import { useMemo, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { Button, Card, Text } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import {
  advanceDate,
  countPresentTotals,
  filterMarksForMonth,
  filterMarksForWeek,
  formatDate,
  getGenderCount,
  getMonthKey,
  getMonthlyStudentTotal,
  getStatusForDate,
  getWeekIndex,
  monthLabels,
} from '@/utils/attendance';

export default function AttendanceScreen() {
  const router = useRouter();
  const theme = useTheme();
  const { students, marks, toggleAttendance } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const dateLabel = formatDate(selectedDate);
  const monthKey = getMonthKey(selectedDate);
  const monthLabel = monthLabels[selectedDate.getMonth()];
  const weekIndex = getWeekIndex(selectedDate);

  const dailyMarks = useMemo(
    () => marks.filter((mark) => mark.date === dateLabel),
    [marks, dateLabel],
  );
  const dailyTotals = countPresentTotals(students, dailyMarks);

  const weeklyTotals = countPresentTotals(
    students,
    filterMarksForWeek(marks, monthKey, weekIndex),
  );
  const monthlyMarks = filterMarksForMonth(marks, monthKey);
  const monthlyTotals = countPresentTotals(students, monthlyMarks);

  const daysTracked = new Set(monthlyMarks.map((mark) => mark.date)).size;
  const averageBoys = daysTracked ? (monthlyTotals.boys / daysTracked).toFixed(1) : '0';
  const averageGirls = daysTracked ? (monthlyTotals.girls / daysTracked).toFixed(1) : '0';
  const presentColor = theme.colors.primary;
  const presentText = theme.colors.onPrimary;
  const absentColor = theme.colors.error;
  const absentText = theme.colors.onError;

  return (
    <ScrollView contentContainerClassName="bg-slate-50 px-6 pt-6 pb-10">
      <Text variant="headlineSmall" className="font-semibold">
        Monthly Attendance
      </Text>
      <Text variant="bodyMedium" className="text-slate-500 mt-1 mb-3">
        {monthLabel}
      </Text>

      <Card className="rounded-2xl mb-4">
        <View className="p-4">
          <View className="flex-row items-center justify-between mb-2">
            <Button
              mode="outlined"
              compact
              onPress={() => setSelectedDate(advanceDate(selectedDate, -1))}
              className="rounded-lg"
            >
              Prev
            </Button>
            <Text variant="titleMedium" className="font-semibold">
              {dateLabel}
            </Text>
            <Button
              mode="outlined"
              compact
              onPress={() => setSelectedDate(advanceDate(selectedDate, 1))}
              className="rounded-lg"
            >
              Next
            </Button>
          </View>
          <Text variant="bodySmall" className="text-slate-500">
            Week {weekIndex} of {monthLabel}
          </Text>
        </View>
      </Card>

      <Card className="rounded-2xl mb-4">
        <View className="p-4">
          <Text variant="titleMedium" className="font-semibold mb-3">
            Mark Attendance
          </Text>
          {students.length === 0 ? (
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
                    onPress={() => toggleAttendance(student.id, dateLabel)}
                    buttonColor={status === 'P' ? presentColor : absentColor}
                    textColor={status === 'P' ? presentText : absentText}
                    className="rounded-lg"
                  >
                    {status === 'P' ? 'Present' : 'Absent'}
                  </Button>
                </View>
              );
            })
          )}
        </View>
      </Card>

      <Card className="rounded-2xl mb-4">
        <View className="p-4">
          <Text variant="titleMedium" className="font-semibold mb-3">
            Daily Totals
          </Text>
          <View className="flex-row justify-between">
            <Text variant="labelLarge">Boys: {dailyTotals.boys}</Text>
            <Text variant="labelLarge">Girls: {dailyTotals.girls}</Text>
            <Text variant="labelLarge">Total: {dailyTotals.total}</Text>
          </View>
        </View>
      </Card>

      <Card className="rounded-2xl mb-4">
        <View className="p-4">
          <Text variant="titleMedium" className="font-semibold mb-3">
            Weekly Totals (Week {weekIndex})
          </Text>
          <View className="flex-row justify-between">
            <Text variant="labelLarge">Boys: {weeklyTotals.boys}</Text>
            <Text variant="labelLarge">Girls: {weeklyTotals.girls}</Text>
            <Text variant="labelLarge">Total: {weeklyTotals.total}</Text>
          </View>
        </View>
      </Card>

      <Card className="rounded-2xl mb-4">
        <View className="p-4">
          <Text variant="titleMedium" className="font-semibold mb-3">
            Monthly Totals
          </Text>
          <View className="flex-row justify-between mb-2">
            <Text variant="labelLarge">Boys: {monthlyTotals.boys}</Text>
            <Text variant="labelLarge">Girls: {monthlyTotals.girls}</Text>
            <Text variant="labelLarge">Total: {monthlyTotals.total}</Text>
          </View>
          <Text variant="bodySmall" className="text-slate-500">
            Total days tracked: {daysTracked}
          </Text>
          <Text variant="bodySmall" className="text-slate-500">
            Average boys attendance: {averageBoys}
          </Text>
          <Text variant="bodySmall" className="text-slate-500">
            Average girls attendance: {averageGirls}
          </Text>
        </View>
      </Card>

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
                <Text
                  variant="labelMedium"
                  className="rounded-full bg-sky-100 px-3 py-1 text-sky-700"
                >
                  {getMonthlyStudentTotal(marks, student.id, monthKey)} days present
                </Text>
              </View>
            ))
          )}
        </View>
      </Card>

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

      <Button mode="outlined" onPress={() => router.push('/year-total')} className="rounded-xl mb-2">
        View Year Totals
      </Button>
      <Button mode="outlined" onPress={() => router.push('/summary')} className="rounded-xl">
        View Full Summary
      </Button>
    </ScrollView>
  );
}
