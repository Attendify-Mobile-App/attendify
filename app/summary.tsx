import { useEffect, useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Card, Chip, Text } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetClassesQuery } from '@/store/api/classApi';
import { useGetAttendanceMarksQuery } from '@/store/api/attendanceApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import {
  countPresentTotals,
  filterMarksForMonth,
  filterMarksForWeek,
  monthLabels,
} from '@/utils/attendance';

const buildMonthKey = (year: number, monthIndex: number) => `${year}-${monthIndex}`;
const toPercent = (value: number, total: number) => (total ? Math.round((value / total) * 100) : 0);
const safeClassLabel = (value: string) => value.replace(/[^a-z0-9]/gi, '_');
const getAverage = (value: number, count: number) => (count ? (value / count).toFixed(1) : '0.0');

export default function SummaryScreen() {
  const { selectedClass, setSelectedClass } = useAttendance();
  const year = new Date().getFullYear();
  const [selectedMonthIndex, setSelectedMonthIndex] = useState(new Date().getMonth());
  const [isClassMenuOpen, setIsClassMenuOpen] = useState(false);
  const { data: classes = [] } = useGetClassesQuery();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const cardAccentColor = useThemeColor({ light: '#E0F2FE', dark: '#102735' }, 'background');
  const mutedTextColor = useThemeColor({ light: '#64748B', dark: '#94A3B8' }, 'text');
  const classId = selectedClass?.id ?? '';

  useEffect(() => {
    if (selectedClass || !classes.length) {
      return;
    }
    setSelectedClass(classes[0]);
  }, [classes, selectedClass, setSelectedClass]);

  const { data: students = [] } = useGetStudentsByClassQuery(classId, { skip: !classId });
  const { data: marks = [] } = useGetAttendanceMarksQuery(
    { classId, startDate: `${year}-01-01`, endDate: `${year}-12-31` },
    { skip: !classId },
  );

  const monthlySummaries = useMemo(
    () =>
      monthLabels.map((label, index) => {
        const monthMarks = filterMarksForMonth(marks, buildMonthKey(year, index));
        const totals = countPresentTotals(students, monthMarks);
        const uniqueDays = new Set(monthMarks.map((mark) => mark.date)).size;
        return {
          label,
          totals,
          uniqueDays,
        };
      }),
    [marks, students, year],
  );

  const yearlyTotals = useMemo(
    () =>
      monthlySummaries.reduce(
        (acc, summary) => {
          acc.boys += summary.totals.boys;
          acc.girls += summary.totals.girls;
          acc.total += summary.totals.total;
          return acc;
        },
        { boys: 0, girls: 0, total: 0 },
      ),
    [monthlySummaries],
  );

  const selectedMonthSummary = monthlySummaries[selectedMonthIndex];
  const selectedMonthKey = buildMonthKey(year, selectedMonthIndex);
  const daysInSelectedMonth = new Date(year, selectedMonthIndex + 1, 0).getDate();
  const weeksInSelectedMonth = Math.ceil(daysInSelectedMonth / 7);

  const weeklySummary = useMemo(
    () =>
      Array.from({ length: weeksInSelectedMonth }, (_, index) => {
        const week = index + 1;
        const weekMarks = filterMarksForWeek(marks, selectedMonthKey, week);
        const totals = countPresentTotals(students, weekMarks);
        const uniqueDays = new Set(weekMarks.map((mark) => mark.date)).size;
        return { week, totals, uniqueDays };
      }),
    [marks, selectedMonthKey, students, weeksInSelectedMonth],
  );

  const monthPeakTotal = Math.max(...weeklySummary.map((item) => item.totals.total), 1);
  const yearTrackedDays = useMemo(() => new Set(marks.map((mark) => mark.date)).size, [marks]);
  const selectedMonthAverages = {
    boys: getAverage(selectedMonthSummary?.totals.boys ?? 0, selectedMonthSummary?.uniqueDays ?? 0),
    girls: getAverage(selectedMonthSummary?.totals.girls ?? 0, selectedMonthSummary?.uniqueDays ?? 0),
    total: getAverage(selectedMonthSummary?.totals.total ?? 0, selectedMonthSummary?.uniqueDays ?? 0),
  };
  const yearlyAverages = {
    boys: getAverage(yearlyTotals.boys, yearTrackedDays),
    girls: getAverage(yearlyTotals.girls, yearTrackedDays),
    total: getAverage(yearlyTotals.total, yearTrackedDays),
  };
  const studentGenderCounts = {
    boys: students.filter((s) => s.gender === 'Male').length,
    girls: students.filter((s) => s.gender === 'Female').length,
  };

  const handleExport = async () => {
    if (!selectedClass) {
      return;
    }

    const monthlyRows = monthlySummaries
      .map((summary) =>
        [
          summary.label,
          summary.totals.boys,
          summary.totals.girls,
          summary.totals.total,
          summary.uniqueDays,
          getAverage(summary.totals.boys, summary.uniqueDays),
          getAverage(summary.totals.girls, summary.uniqueDays),
          getAverage(summary.totals.total, summary.uniqueDays),
        ].join(','),
      )
      .join('\n');

    const weeklyRows = weeklySummary
      .map((item) =>
        [
          item.week,
          item.totals.boys,
          item.totals.girls,
          item.totals.total,
          item.uniqueDays,
          getAverage(item.totals.boys, item.uniqueDays),
          getAverage(item.totals.girls, item.uniqueDays),
          getAverage(item.totals.total, item.uniqueDays),
        ].join(','),
      )
      .join('\n');

    const csv = [
      `Full Summary Report - ${selectedClass.schoolName} ${selectedClass.className}-${selectedClass.division}`,
      `Year,${year}`,
      '',
      'YearTotalsBoys,YearTotalsGirls,YearTotalsOverall,TrackedDays,AvgBoysPerDay,AvgGirlsPerDay,AvgTotalPerDay',
      `${yearlyTotals.boys},${yearlyTotals.girls},${yearlyTotals.total},${yearTrackedDays},${yearlyAverages.boys},${yearlyAverages.girls},${yearlyAverages.total}`,
      '',
      'Monthly Summary',
      'Month,Boys,Girls,Total,TrackedDays,AvgBoysPerDay,AvgGirlsPerDay,AvgTotalPerDay',
      monthlyRows,
      '',
      `Weekly Summary (${monthLabels[selectedMonthIndex]})`,
      'Week,Boys,Girls,Total,TrackedDays,AvgBoysPerDay,AvgGirlsPerDay,AvgTotalPerDay',
      weeklyRows,
    ].join('\n');

    if (Platform.OS === 'web') {
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `summary_${safeClassLabel(selectedClass.className)}_${year}_${
        selectedMonthIndex + 1
      }.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      return;
    }

    await Share.share({
      message: csv,
      title: `${selectedClass.className} Summary ${year}`,
    });
  };

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

              <View className="mt-3 relative">
                <TouchableOpacity
                  onPress={() => setIsClassMenuOpen((prev) => !prev)}
                  className="rounded-xl px-3 py-2 border"
                  style={{ borderColor: tintColor, backgroundColor: cardAccentColor }}
                >
                  <Text variant="labelLarge" style={{ color: textColor }}>
                    {selectedClass
                      ? `Class: ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
                      : 'Select Class'}
                  </Text>
                </TouchableOpacity>
                {isClassMenuOpen ? (
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
                            onPress={() => {
                              setSelectedClass(item);
                              setIsClassMenuOpen(false);
                            }}
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
            </View>

            <Card className="rounded-2xl mt-6 mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Class Overview
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Total Students: {students.length}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Total Boys: {studentGenderCounts.boys}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Total Girls: {studentGenderCounts.girls}
                </Text>
                <View className="flex-row mt-3">
                  <Chip compact className="mr-2">
                    Year: {year}
                  </Chip>
                  <Chip compact>Month: {monthLabels[selectedMonthIndex]}</Chip>
                </View>
              </View>
            </Card>

            <Card className="rounded-2xl mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Monthly Total ({monthLabels[selectedMonthIndex]})
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Boys: {selectedMonthSummary?.totals.boys ?? 0}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Girls: {selectedMonthSummary?.totals.girls ?? 0}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Total: {selectedMonthSummary?.totals.total ?? 0}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Tracked Days: {selectedMonthSummary?.uniqueDays ?? 0}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Avg/Day: Boys {selectedMonthAverages.boys}, Girls {selectedMonthAverages.girls},
                  Total {selectedMonthAverages.total}
                </Text>
                <ScrollView
                  horizontal
                  className="mt-4"
                  contentContainerStyle={{ paddingRight: 6 }}
                  showsHorizontalScrollIndicator={false}
                >
                  {monthLabels.map((label, index) => (
                    <TouchableOpacity
                      key={label}
                      onPress={() => setSelectedMonthIndex(index)}
                      className="mr-2 px-3 py-2 rounded-full border"
                      style={{
                        borderColor: index === selectedMonthIndex ? tintColor : '#CBD5E1',
                        backgroundColor: index === selectedMonthIndex ? cardAccentColor : 'transparent',
                      }}
                    >
                      <Text variant="bodySmall" style={{ color: textColor }}>
                        {label.slice(0, 3)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Card>

            <Card className="rounded-2xl mb-4">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Weekly Summary ({monthLabels[selectedMonthIndex]})
                </Text>
                {weeklySummary.map((item, index) => (
                  <View key={item.week} className={index ? 'border-t border-slate-200 py-3' : 'py-2'}>
                    <View className="flex-row items-center justify-between mb-2">
                      <Text variant="bodyMedium" className="font-semibold" style={{ color: textColor }}>
                        Week {item.week}
                      </Text>
                      <Text variant="labelMedium" style={{ color: textColor }}>
                        Total: {item.totals.total}
                      </Text>
                    </View>
                    <View
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: '#E2E8F0' }}
                    >
                      <View
                        className="h-2 rounded-full"
                        style={{
                          width: `${toPercent(item.totals.total, monthPeakTotal)}%`,
                          backgroundColor: tintColor,
                        }}
                      />
                    </View>
                    <Text variant="bodySmall" style={{ color: mutedTextColor }} className="mt-2">
                      Boys: {item.totals.boys} | Girls: {item.totals.girls}
                    </Text>
                    <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                      Avg/Day: Boys {getAverage(item.totals.boys, item.uniqueDays)}, Girls{' '}
                      {getAverage(item.totals.girls, item.uniqueDays)}, Total{' '}
                      {getAverage(item.totals.total, item.uniqueDays)}
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
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Boys Attendance: {yearlyTotals.boys}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Girls Attendance: {yearlyTotals.girls}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Overall Attendance: {yearlyTotals.total}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Tracked Days: {yearTrackedDays}
                </Text>
                <Text variant="bodySmall" style={{ color: mutedTextColor }}>
                  Avg/Day: Boys {yearlyAverages.boys}, Girls {yearlyAverages.girls}, Total{' '}
                  {yearlyAverages.total}
                </Text>
              </View>
            </Card>

            <Card className="rounded-2xl">
              <View className="p-4">
                <Text variant="titleMedium" className="font-semibold mb-2">
                  Next Step
                </Text>
                <TouchableOpacity
                  onPress={handleExport}
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
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
