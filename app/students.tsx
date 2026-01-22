import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, Chip, Text, TextInput } from '@/components/ui/paper';
import { Gender, useAttendance } from '@/context/attendance-context';

export default function StudentsScreen() {
  const router = useRouter();
  const { selectedClass, students, addStudent } = useAttendance();
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');

  const handleAdd = () => {
    if (!name || !admissionNo || !studentNo || !dob) {
      return;
    }

    addStudent({
      admissionNo,
      studentNo,
      name,
      dob,
      gender,
    });

    setAdmissionNo('');
    setStudentNo('');
    setName('');
    setDob('');
  };

  return (
    <ScrollView contentContainerClassName="bg-slate-50 px-6 pt-6 pb-10">
      <Text variant="headlineSmall" className="font-semibold">
        Student List
      </Text>
      <Text variant="bodyMedium" className="text-slate-500 mt-1 mb-4">
        {selectedClass
          ? `${selectedClass.schoolName} - ${selectedClass.className}-${selectedClass.division} (${selectedClass.year})`
          : 'Select a class to begin.'}
      </Text>

      <Card className="rounded-2xl">
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

          <Button mode="contained" onPress={handleAdd} className="rounded-xl">
            Add Student
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
                    DOB: {student.dob}
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
    </ScrollView>
  );
}
