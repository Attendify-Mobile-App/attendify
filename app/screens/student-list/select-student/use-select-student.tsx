import { useRouter } from 'expo-router';

import { ADD_NEW_STUDENT_SCREEN } from '@/constants/navigation/path';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useDeleteStudentMutation, useGetStudentsByClassQuery } from '@/store/api/studentApi';
import type { Student } from '@/types/attendance';
import { useState } from 'react';

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
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
  const [deleteStudent] = useDeleteStudentMutation();

  const navigateToAttendance = () => {
    router.push('/attendance');
  };
  const navigateToAddStudent = () => {
    router.push(ADD_NEW_STUDENT_SCREEN);
  };

  const handleEditStudent = (student: Student) => {
    router.push({
      pathname: ADD_NEW_STUDENT_SCREEN,
      params: {
        id: student.id,
        admissionNo: student.admissionNo,
        studentNo: student.studentNo,
        name: student.name,
        dob: student.dateOfBirth,
        gender: student.gender,
      },
    });
  };

  const handleDeleteStudent = async (studentId: string) => {
    if (!classId) {
      return;
    }
    setDeletingStudentId(studentId);
    try {
      await deleteStudent({ id: studentId, classId }).unwrap();
    } finally {
      setDeletingStudentId(null);
    }
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
    handleEditStudent,
    handleDeleteStudent,
    deletingStudentId,
  };
};
