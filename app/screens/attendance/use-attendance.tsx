import { useMemo, useState } from 'react';
import { useRouter } from 'expo-router';
import { useTheme } from 'react-native-paper';

import { SUMMARY_SCREEN, YEAR_TOTAL_SCREEN } from '@/constants/navigation/path';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetAttendanceMarksQuery, useMarkAttendanceMutation } from '@/store/api/attendanceApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import {
  advanceDate,
  countPresentTotals,
  filterMarksForMonth,
  filterMarksForWeek,
  formatDate,
  getMonthKey,
  getStatusForDate,
  getWeekIndex,
  monthLabels,
} from '@/utils/attendance';

const buildMonthRange = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const paddedMonth = String(month).padStart(2, '0');
  const startDate = `${year}-${paddedMonth}-01`;
  const daysInMonth = new Date(year, month, 0).getDate();
  const endDate = `${year}-${paddedMonth}-${String(daysInMonth).padStart(2, '0')}`;
  return { startDate, endDate };
};

export function useAttendanceScreenLogic() {
  const router = useRouter();
  const theme = useTheme();
  const { selectedClass } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  const classId = selectedClass?.id ?? '';
  const { data: students = [] } = useGetStudentsByClassQuery(classId, { skip: !classId });

  const { startDate, endDate } = buildMonthRange(selectedDate);
  const { data: marks = [] } = useGetAttendanceMarksQuery(
    { classId, startDate, endDate },
    { skip: !classId },
  );
  const [markAttendance] = useMarkAttendanceMutation();

  const dateLabel = formatDate(selectedDate);
  const monthKey = getMonthKey(selectedDate);
  const monthLabel = monthLabels[selectedDate.getMonth()];
  const weekIndex = getWeekIndex(selectedDate);

  const dailyMarks = useMemo(
    () => marks.filter((mark) => mark.date === dateLabel),
    [marks, dateLabel],
  );
  const dailyTotals = countPresentTotals(students, dailyMarks);
  const weeklyTotals = countPresentTotals(students, filterMarksForWeek(marks, monthKey, weekIndex));
  const monthlyMarks = filterMarksForMonth(marks, monthKey);
  const monthlyTotals = countPresentTotals(students, monthlyMarks);

  const daysTracked = new Set(monthlyMarks.map((mark) => mark.date)).size;
  const averageBoys = daysTracked ? (monthlyTotals.boys / daysTracked).toFixed(1) : '0';
  const averageGirls = daysTracked ? (monthlyTotals.girls / daysTracked).toFixed(1) : '0';

  const presentColor = theme.colors.primary;
  const presentTextColor = theme.colors.onPrimary;
  const absentColor = theme.colors.error;
  const absentTextColor = theme.colors.onError;

  const handleToggle = async (studentId: string) => {
    if (!classId) {
      return;
    }

    const current = getStatusForDate(marks, studentId, dateLabel);
    const nextStatus = current === 'P' ? 'A' : 'P';

    await markAttendance({
      classId,
      studentId,
      date: dateLabel,
      status: nextStatus,
    }).unwrap();
  };

  return {
    selectedClass,
    students,
    marks,
    backgroundColor,
    textColor,
    buttonBorderColor,
    dateLabel,
    monthLabel,
    monthKey,
    weekIndex,
    dailyTotals,
    weeklyTotals,
    monthlyTotals,
    daysTracked,
    averageBoys,
    averageGirls,
    presentColor,
    presentTextColor,
    absentColor,
    absentTextColor,
    getStatusForDate,
    goToPreviousDate: () => setSelectedDate((current) => advanceDate(current, -1)),
    goToNextDate: () => setSelectedDate((current) => advanceDate(current, 1)),
    handleToggle,
    goToYearTotals: () => router.push(YEAR_TOTAL_SCREEN),
    goToSummary: () => router.push(SUMMARY_SCREEN),
  };
}
