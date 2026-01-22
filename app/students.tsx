import { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Button, Card, Chip, Text, TextInput } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateStudentMutation, useGetStudentsByClassQuery } from '@/store/api/studentApi';
import type { Gender } from '@/types/attendance';

export default function StudentsScreen() {
  const router = useRouter();
  const { selectedClass } = useAttendance();
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const classId = selectedClass?.id;
  const { data: students = [] } = useGetStudentsByClassQuery(classId ?? '', {
    skip: !classId,
  });
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
          <View className="flex-1 px-6 py-8">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Student List
              </Text>
              <Text
                variant="bodyMedium"
                className="mt-2"
                style={{ color: textColor, opacity: 0.7 }}
              >
                {selectedClass
                  ? `${selectedClass.schoolName} - ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
                  : 'Select a class to begin.'}
              </Text>
            </View>

            <Card className="rounded-2xl mt-6">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Add Student
                </Text>

                <TextInput
                  mode="outlined"
                  label="Admission No"
                  placeholder="Admission number"
                  value={admissionNo}
                  onChangeText={setAdmissionNo}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Student No"
                  placeholder="Student number"
                  value={studentNo}
                  onChangeText={setStudentNo}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Student Name"
                  placeholder="Full name"
                  value={name}
                  onChangeText={setName}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Date of Birth"
                  placeholder="YYYY-MM-DD"
                  value={dob}
                  onChangeText={setDob}
                  className="mb-3"
                />

                <Text variant="labelLarge" className="mb-2">
                  Gender
                </Text>
                <View className="flex-row flex-wrap gap-2 mb-4">
                  {(['Male', 'Female'] as Gender[]).map((option) => (
                    <Chip
                      key={option}
                      selected={gender === option}
                      onPress={() => setGender(option)}
                      className="mr-1"
                    >
                      {option}
                    </Chip>
                  ))}
                </View>

                <Button
                  mode="contained"
                  onPress={handleAdd}
                  loading={isCreating}
                  disabled={isCreating || !classId}
                  className="rounded-xl"
                >
                  {isCreating ? 'Adding...' : 'Add Student'}
                </Button>
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <View className="flex-row items-center justify-between mb-3">
                  <Text variant="titleMedium" className="font-semibold">
                    Roster
                  </Text>
                  <Text variant="labelMedium" className="text-slate-500">
                    {students.length} students
                  </Text>
                </View>
                {students.length === 0 ? (
                  <Text variant="bodyMedium" className="text-slate-400">
                    No students added yet.
                  </Text>
                ) : (
                  students.map((student, index) => (
                    <View key={student.id} className="flex-row mb-3">
                      <Text className="w-6 text-slate-400 font-semibold">
                        {index + 1}.
                      </Text>
                      <View className="flex-1">
                        <Text variant="bodyLarge" className="font-semibold">
                          {student.name}
                        </Text>
                        <Text variant="bodySmall" className="text-slate-500">
                          Adm #{student.admissionNo} - Student #{student.studentNo} - {student.gender}
                        </Text>
                        <Text variant="bodySmall" className="text-slate-500">
                          DOB: {student.dateOfBirth}
                        </Text>
                      </View>
                    </View>
                  ))
                )}
              </View>
            </Card>

            <Button
              mode="outlined"
              onPress={() => router.push('/attendance')}
              className="mt-4 rounded-xl"
            >
              Go to Monthly Attendance
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
