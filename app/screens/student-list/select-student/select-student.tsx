import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, FAB, Text } from '@/components/ui/paper';

import { useSelectStudent } from './use-select-student';

export default function StudentsScreen() {
  const insets = useSafeAreaInsets();
  const {
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
  } = useSelectStudent();

  return (
    <SafeAreaProvider className="flex-1" style={{ backgroundColor }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, backgroundColor, paddingBottom: insets.bottom + 96 }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 px-6 pt-20">
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
              onPress={navigateToAttendance}
              className="mt-4 rounded-xl"
              style={{ borderColor: buttonBorderColor }}
            >
              Go to Monthly Attendance
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <FAB
        icon="plus"
        onPress={navigateToAddStudent}
        disabled={!classId}
        style={{
          position: 'absolute',
          right: 16,
          bottom: insets.bottom + 16,
          backgroundColor: fabBackgroundColor,
        }}
        color={fabIconColor}
      />
    </SafeAreaProvider>
  );
}
