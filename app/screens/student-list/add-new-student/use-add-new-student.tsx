import { useState } from 'react';
import { useRouter } from 'expo-router';

import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateStudentMutation } from '@/store/api/studentApi';
import type { Gender } from '@/types/attendance';

export const useAddNewStudent = () => {
  const router = useRouter();
  const { selectedClass } = useAttendance();

  const [admissionNo, setAdmissionNo] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');

  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const tintColor = useThemeColor({}, 'tint');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');

  const classId = selectedClass?.id;
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();

  const handleAdd = async () => {
    if (!classId || !name || !admissionNo || !studentNo || !dob) {
      return;
    }

    await createStudent({
      classId,
      admissionNo,
      studentNo,
      name,
      dateOfBirth: dob,
      gender,
    }).unwrap();

    setAdmissionNo('');
    setStudentNo('');
    setName('');
    setDob('');
    setGender('Male');
    router.back();
  };

  return {
    admissionNo,
    studentNo,
    name,
    dob,
    gender,
    setAdmissionNo,
    setStudentNo,
    setName,
    setDob,
    setGender,
    selectedClass,
    classId,
    backgroundColor,
    textColor,
    tintColor,
    buttonBorderColor,
    isCreating,
    handleAdd,
    handleCancel: () => router.back(),
  };
};
