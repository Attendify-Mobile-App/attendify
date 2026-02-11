import { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateStudentMutation, useUpdateStudentMutation } from '@/store/api/studentApi';
import type { Gender } from '@/types/attendance';

export const useAddNewStudent = () => {
  const router = useRouter();
  const params = useLocalSearchParams<{
    id?: string;
    admissionNo?: string;
    studentNo?: string;
    name?: string;
    dob?: string;
    gender?: Gender;
  }>();
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
  const studentId = typeof params.id === 'string' ? params.id : '';
  const isEditMode = Boolean(studentId);
  const [createStudent, { isLoading: isCreating }] = useCreateStudentMutation();
  const [updateStudent, { isLoading: isUpdating }] = useUpdateStudentMutation();
  const isSubmitting = isCreating || isUpdating;

  useEffect(() => {
    if (!isEditMode) {
      return;
    }
    setAdmissionNo(typeof params.admissionNo === 'string' ? params.admissionNo : '');
    setStudentNo(typeof params.studentNo === 'string' ? params.studentNo : '');
    setName(typeof params.name === 'string' ? params.name : '');
    setDob(typeof params.dob === 'string' ? params.dob : '');
    setGender(params.gender === 'Female' ? 'Female' : 'Male');
  }, [isEditMode, params.admissionNo, params.dob, params.gender, params.name, params.studentNo]);

  const handleAdd = async () => {
    if (!classId || !name || !admissionNo || !studentNo || !dob) {
      return;
    }

    if (isEditMode) {
      await updateStudent({
        id: studentId,
        classId,
        admissionNo,
        studentNo,
        name,
        dateOfBirth: dob,
        gender,
      }).unwrap();
    } else {
      await createStudent({
        classId,
        admissionNo,
        studentNo,
        name,
        dateOfBirth: dob,
        gender,
      }).unwrap();
    }

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
    isCreating: isSubmitting,
    isEditMode,
    handleAdd,
    handleCancel: () => router.back(),
  };
};
