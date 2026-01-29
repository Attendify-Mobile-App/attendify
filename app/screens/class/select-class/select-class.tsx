import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Chip, FAB, Text, TextInput } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ADD_NEW_CLASS_SCREEN } from '@/constants/navigation/path';
import { useSelectClass } from './useSelect-class';

export default function SelectClassScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');

  const {
    filterSchoolName,
    setFilterSchoolName,
    filterYear,
    setFilterYear,
    filterClassName,
    setFilterClassName,
    filterDivision,
    setFilterDivision,
    selectedClassId,

    classes,
    isLoadingClasses,
    selectedClass,
    distinctValues,

    handleSelect,
    handleContinue,
  } = useSelectClass();

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
          <View className="flex-1 px-6 py-12 justify-center">
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
                {isLoadingClasses ? (
                  <Text variant="bodyMedium" className="text-slate-400">
                    Loading classes...
                  </Text>
                ) : classes.length === 0 ? (
                  <Text variant="bodyMedium" className="text-slate-400">
                    No classes found. Tap + to create one.
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

      <FAB
        icon="plus"
        onPress={() => router.push(ADD_NEW_CLASS_SCREEN)}
        style={{ position: 'absolute', right: 16, bottom: insets.bottom + 16 }}
      />
    </SafeAreaProvider>
  );
}
