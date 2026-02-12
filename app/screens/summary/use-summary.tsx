import { useEffect, useMemo, useState } from 'react';
import { Platform, Share } from 'react-native';

import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetAttendanceMarksQuery } from '@/store/api/attendanceApi';
import { useGetClassesQuery } from '@/store/api/classApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import {
  countPresentTotals,
  filterMarksForMonth,
  filterMarksForWeek,
  monthLabels,
} from '@/utils/attendance';

const buildMonthKey = (year: number, monthIndex: number) => `${year}-${monthIndex}`;
export const toPercent = (value: number, total: number) => (total ? Math.round((value / total) * 100) : 0);
const safeClassLabel = (value: string) => value.replace(/[^a-z0-9]/gi, '_');
export const getAverage = (value: number, count: number) => (count ? (value / count).toFixed(1) : '0.0');

export function useSummaryLogic() {
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

  const handleSelectClass = (nextClassId: string) => {
    const next = classes.find((item) => item.id === nextClassId);
    if (!next) {
      return;
    }

    setSelectedClass(next);
    setIsClassMenuOpen(false);
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
      link.download = `summary_${safeClassLabel(selectedClass.className)}_${year}_${selectedMonthIndex + 1}.csv`;

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

  return {
    year,
    selectedClass,
    classes,
    students,
    backgroundColor,
    textColor,
    tintColor,
    cardAccentColor,
    mutedTextColor,
    isClassMenuOpen,
    selectedMonthIndex,
    selectedMonthLabel: monthLabels[selectedMonthIndex],
    monthLabels,
    selectedMonthSummary,
    selectedMonthAverages,
    studentGenderCounts,
    weeklySummary,
    monthPeakTotal,
    yearlyTotals,
    yearlyAverages,
    yearTrackedDays,
    setSelectedMonthIndex,
    toggleClassMenu: () => setIsClassMenuOpen((prev) => !prev),
    handleSelectClass,
    handleExport,
  };
}
