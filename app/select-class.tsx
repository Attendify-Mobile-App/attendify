import { useMemo, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Button, Card, Chip, Text, TextInput } from '@/components/ui/paper';
import { useAttendance } from '@/context/attendance-context';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateClassMutation, useGetClassesQuery } from '@/store/api/classApi';
import type { SchoolClass } from '@/types/attendance';

export default function SelectClassScreen() {
  const router = useRouter();
  const { setSelectedClass } = useAttendance();
  const [filterSchoolName, setFilterSchoolName] = useState('');
  const [filterYear, setFilterYear] = useState('');
  const [filterClassName, setFilterClassName] = useState('');
  const [filterDivision, setFilterDivision] = useState('');
  const [selectedClassId, setSelectedClassId] = useState<string | null>(null);
  const [schoolName, setSchoolName] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [className, setClassName] = useState('');
  const [division, setDivision] = useState('');
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const { data: classes = [], isLoading } = useGetClassesQuery({
    schoolName: filterSchoolName || undefined,
    academicYear: filterYear || undefined,
    className: filterClassName || undefined,
    division: filterDivision || undefined,
  });
  const [createClass, { isLoading: isCreating }] = useCreateClassMutation();

  const selectedClass = useMemo(
    () => classes.find((item) => item.id === selectedClassId) ?? null,
    [classes, selectedClassId],
  );

  const distinctValues = useMemo(() => {
    const schoolNames = new Set<string>();
    const years = new Set<string>();
    const classNames = new Set<string>();
    const divisions = new Set<string>();

    classes.forEach((item) => {
      schoolNames.add(item.schoolName);
      years.add(item.academicYear);
      classNames.add(item.className);
      divisions.add(item.division);
    });

    return {
      schoolNames: Array.from(schoolNames),
      years: Array.from(years),
      classNames: Array.from(classNames),
      divisions: Array.from(divisions),
    };
  }, [classes]);

  const handleContinue = () => {
    if (!selectedClass) {
      return;
    }
    setSelectedClass(selectedClass);
    router.push('/students');
  };

  const handleCreateClass = async () => {
    if (!schoolName || !academicYear || !className || !division) {
      return;
    }
    const created = await createClass({
      schoolName,
      academicYear,
      className,
      division,
    }).unwrap();

    setSchoolName('');
    setAcademicYear('');
    setClassName('');
    setDivision('');
    setFilterSchoolName(created.schoolName);
    setFilterYear(created.academicYear);
    setFilterClassName(created.className);
    setFilterDivision(created.division);
    setSelectedClassId(created.id);
    setSelectedClass(created);
  };

  const handleSelect = (item: SchoolClass) => {
    setSelectedClassId(item.id);
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
          <View className="flex-1 px-6 py-8 justify-center">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Class Selection
              </Text>
              <Text
                variant="bodyMedium"
                className="mt-2"
                style={{ color: textColor, opacity: 0.7 }}
              >
                Set the context for attendance records.
              </Text>
            </View>

            <Card className="rounded-2xl mt-6">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Filters
                </Text>
                <TextInput
                  mode="outlined"
                  label="School Name"
                  placeholder="Filter by school name"
                  value={filterSchoolName}
                  onChangeText={setFilterSchoolName}
                  className="mb-3"
                />
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {distinctValues.schoolNames.map((value) => (
                    <Chip
                      key={value}
                      selected={filterSchoolName === value}
                      onPress={() => setFilterSchoolName(value)}
                      className="mr-1"
                    >
                      {value}
                    </Chip>
                  ))}
                </View>

                <TextInput
                  mode="outlined"
                  label="Academic Year"
                  placeholder="Filter by academic year"
                  value={filterYear}
                  onChangeText={setFilterYear}
                  className="mb-3"
                />
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {distinctValues.years.map((value) => (
                    <Chip
                      key={value}
                      selected={filterYear === value}
                      onPress={() => setFilterYear(value)}
                      className="mr-1"
                    >
                      {value}
                    </Chip>
                  ))}
                </View>

                <TextInput
                  mode="outlined"
                  label="Class"
                  placeholder="Filter by class"
                  value={filterClassName}
                  onChangeText={setFilterClassName}
                  className="mb-3"
                />
                <View className="flex-row flex-wrap gap-2 mb-3">
                  {distinctValues.classNames.map((value) => (
                    <Chip
                      key={value}
                      selected={filterClassName === value}
                      onPress={() => setFilterClassName(value)}
                      className="mr-1"
                    >
                      {value}
                    </Chip>
                  ))}
                </View>

                <TextInput
                  mode="outlined"
                  label="Division"
                  placeholder="Filter by division"
                  value={filterDivision}
                  onChangeText={setFilterDivision}
                  className="mb-3"
                />
                <View className="flex-row flex-wrap gap-2 mb-2">
                  {distinctValues.divisions.map((value) => (
                    <Chip
                      key={value}
                      selected={filterDivision === value}
                      onPress={() => setFilterDivision(value)}
                      className="mr-1"
                    >
                      {value}
                    </Chip>
                  ))}
                </View>
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Existing Classes
                </Text>
                {isLoading ? (
                  <Text variant="bodyMedium" className="text-slate-400">
                    Loading classes...
                  </Text>
                ) : classes.length === 0 ? (
                  <Text variant="bodyMedium" className="text-slate-400">
                    No classes found. Create one below.
                  </Text>
                ) : (
                  classes.map((item) => (
                    <Button
                      key={item.id}
                      mode={selectedClassId === item.id ? 'contained' : 'outlined'}
                      onPress={() => handleSelect(item)}
                      className="rounded-xl mb-2"
                    >
                      {item.schoolName} • {item.className}-{item.division} ({item.academicYear})
                    </Button>
                  ))
                )}
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Create New Class
                </Text>
                <TextInput
                  mode="outlined"
                  label="School Name"
                  placeholder="e.g. Sunshine Public School"
                  value={schoolName}
                  onChangeText={setSchoolName}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Academic Year"
                  placeholder="e.g. 2024-2025"
                  value={academicYear}
                  onChangeText={setAcademicYear}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Class"
                  placeholder="e.g. 6"
                  value={className}
                  onChangeText={setClassName}
                  className="mb-3"
                />

                <TextInput
                  mode="outlined"
                  label="Division"
                  placeholder="e.g. A"
                  value={division}
                  onChangeText={setDivision}
                  className="mb-4"
                />

                <Button
                  mode="contained"
                  onPress={handleCreateClass}
                  loading={isCreating}
                  disabled={isCreating}
                  className="rounded-xl"
                >
                  {isCreating ? 'Creating...' : 'Create Class'}
                </Button>
              </View>
            </Card>

            <Button
              mode="contained"
              onPress={handleContinue}
              disabled={!selectedClass}
              className="rounded-xl mt-4"
            >
              Continue with Selected Class
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
