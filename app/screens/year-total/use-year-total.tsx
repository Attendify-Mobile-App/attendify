import { useMemo } from 'react';

import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetAttendanceMarksQuery } from '@/store/api/attendanceApi';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';
import { monthLabels } from '@/utils/attendance';

const buildMonthKeys = (year: number) => monthLabels.map((_, index) => `${year}-${index}`);

export function useYearTotalLogic() {
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

  const monthKeys = useMemo(() => buildMonthKeys(year), [year]);

  return {
    selectedClass,
    year,
    students,
    marks,
    monthKeys,
    backgroundColor,
    textColor,
  };
}
