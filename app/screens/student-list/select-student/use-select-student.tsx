import { useRouter } from 'expo-router';

import { ADD_NEW_STUDENT_SCREEN } from '@/constants/navigation/path';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useGetStudentsByClassQuery } from '@/store/api/studentApi';

export const useSelectStudent = () => {
  const router = useRouter();
  const { selectedClass } = useAttendance();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const fabBackgroundColor = useThemeColor({}, 'tint');
  const fabIconColor = useThemeColor({ dark: '#000000', light: '#FFFFFF' }, 'text');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  const classId = selectedClass?.id;
  const { data: students = [] } = useGetStudentsByClassQuery(classId ?? '', {
    skip: !classId,
  });

  const navigateToAttendance = () => {
    router.push('/attendance');
  };
  const navigateToAddStudent = () => {
    router.push(ADD_NEW_STUDENT_SCREEN);
  };

  return {
    selectedClass,
    students,
    classId,
    backgroundColor,
    textColor,
    buttonBorderColor,
    fabBackgroundColor,
    fabIconColor,
    navigateToAttendance,
    navigateToAddStudent,
  };
};
