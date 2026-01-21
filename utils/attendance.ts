import type { AttendanceMark, AttendanceStatus, Gender, Student } from '@/context/attendance-context';

export const monthLabels = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const formatDate = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export const getMonthKey = (date: Date) => `${date.getFullYear()}-${date.getMonth()}`;

export const parseMonthKey = (key: string) => {
  const [year, month] = key.split('-').map(Number);
  return { year, month };
};

export const advanceDate = (date: Date, days: number) => {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
};

export const isSameMonth = (date: Date, compareKey: string) => {
  return getMonthKey(date) === compareKey;
};

export const filterMarksForMonth = (marks: AttendanceMark[], monthKey: string) => {
  const { year, month } = parseMonthKey(monthKey);
  return marks.filter((mark) => {
    const [markYear, markMonth] = mark.date.split('-').map(Number);
    return markYear === year && markMonth === month + 1;
  });
};

export const getStudentById = (students: Student[], studentId: string) =>
  students.find((student) => student.id === studentId);

export type Totals = {
  boys: number;
  girls: number;
  total: number;
};

export const countPresentTotals = (students: Student[], marks: AttendanceMark[]) => {
  return marks.reduce<Totals>(
    (acc, mark) => {
      if (mark.status !== 'P') {
        return acc;
      }
      const student = getStudentById(students, mark.studentId);
      if (!student) {
        return acc;
      }
      if (student.gender === 'Male') {
        acc.boys += 1;
      } else {
        acc.girls += 1;
      }
      acc.total += 1;
      return acc;
    },
    { boys: 0, girls: 0, total: 0 },
  );
};

export const getStatusForDate = (
  marks: AttendanceMark[],
  studentId: string,
  date: string,
): AttendanceStatus => {
  const mark = marks.find((entry) => entry.studentId === studentId && entry.date === date);
  return mark?.status ?? 'A';
};

export const getMonthlyStudentTotal = (
  marks: AttendanceMark[],
  studentId: string,
  monthKey: string,
) => {
  const monthMarks = filterMarksForMonth(marks, monthKey);
  return monthMarks.filter((mark) => mark.studentId === studentId && mark.status === 'P').length;
};

export const getWeekIndex = (date: Date) => Math.floor((date.getDate() - 1) / 7) + 1;

export const filterMarksForWeek = (
  marks: AttendanceMark[],
  monthKey: string,
  weekIndex: number,
) => {
  const { year, month } = parseMonthKey(monthKey);
  return marks.filter((mark) => {
    const [markYear, markMonth, markDay] = mark.date.split('-').map(Number);
    if (markYear !== year || markMonth !== month + 1) {
      return false;
    }
    const markWeek = Math.floor((markDay - 1) / 7) + 1;
    return markWeek === weekIndex;
  });
};

export const getGenderCount = (students: Student[], gender: Gender) =>
  students.filter((student) => student.gender === gender).length;
