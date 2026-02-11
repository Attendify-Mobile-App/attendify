import { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, View } from 'react-native';
import DateTimePicker, { type DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Chip, Text, TextInput } from '@/components/ui/paper';
import type { Gender } from '@/types/attendance';

import { useAddNewStudent } from './use-add-new-student';

export default function AddNewStudentScreen() {
  const [showDobPicker, setShowDobPicker] = useState(false);
  const [selectedDobDate, setSelectedDobDate] = useState(new Date());
  const insets = useSafeAreaInsets();
  const {
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
    isEditMode,
    handleAdd,
    handleCancel,
  } = useAddNewStudent();

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, '0');
    const day = `${date.getDate()}`.padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleDobChange = (event: DateTimePickerEvent, date?: Date) => {
    if (Platform.OS === 'android') {
      setShowDobPicker(false);
    }

    if (event.type === 'set' && date) {
      setSelectedDobDate(date);
      setDob(formatDate(date));
    }
  };

  useEffect(() => {
    if (!dob) {
      return;
    }
    const parsed = new Date(dob);
    if (!Number.isNaN(parsed.getTime())) {
      setSelectedDobDate(parsed);
    }
  }, [dob]);

  return (
    <SafeAreaProvider className="flex-1" style={{ backgroundColor }}>
      <ScrollView
        className="flex-1"
        contentContainerStyle={{ flexGrow: 1, backgroundColor, paddingBottom: insets.bottom }}
        showsVerticalScrollIndicator={false}
      >
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          className="flex-1"
        >
          <View className="flex-1 px-6 py-8 justify-center">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                {isEditMode ? 'Edit Student' : 'Add Student'}
              </Text>
              <Text
                variant="bodyMedium"
                className="mt-2"
                style={{ color: textColor, opacity: 0.7 }}
              >
                {selectedClass
                  ? `${selectedClass.schoolName} - ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
                  : 'Select a class before adding a student.'}
              </Text>
            </View>

            <View className="mt-8">
              <Text variant="titleMedium" className="font-semibold mb-3">
                Student Details
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

              <Pressable onPress={() => setShowDobPicker(true)}>
                <View pointerEvents="none">
                  <TextInput
                    mode="outlined"
                    label="Date of Birth"
                    placeholder="Select date"
                    value={dob}
                    editable={false}
                    className="mb-3"
                  />
                </View>
              </Pressable>

              {showDobPicker ? (
                <DateTimePicker
                  value={selectedDobDate}
                  mode="date"
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  maximumDate={new Date()}
                  onChange={handleDobChange}
                />
              ) : null}

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

              <View className="flex-row justify-between items-center gap-2 mt-2">
                <Button
                  mode="contained"
                  onPress={handleAdd}
                  loading={isCreating}
                  disabled={isCreating || !classId}
                  className="rounded-xl flex-1"
                  contentStyle={{ paddingVertical: 8 }}
                  buttonColor={tintColor}
                  style={{ borderColor: buttonBorderColor }}
                >
                  {isCreating ? (isEditMode ? 'Saving...' : 'Adding...') : (isEditMode ? 'Save Student' : 'Add Student')}
                </Button>

                <Button
                  mode="outlined"
                  onPress={handleCancel}
                  disabled={isCreating}
                  className="rounded-xl flex-1"
                  contentStyle={{ paddingVertical: 8 }}
                  textColor={tintColor}
                  style={{ borderColor: buttonBorderColor }}
                >
                  Cancel
                </Button>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
