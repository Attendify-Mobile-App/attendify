import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';

import { Button, Card, FAB, Text } from '@/components/ui/paper';
import { useThemeColor } from '@/hooks/use-theme-color';
import { ADD_NEW_CLASS_SCREEN } from '@/constants/navigation/path';
import { useSelectClass } from './useSelect-class';
import { ClassSelectionFilterModal } from '@/components/class/class-selection-filter-model';

export default function SelectClassScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const fabBackgroundColor = useThemeColor({}, 'tint');
  const fabIconColor = useThemeColor({dark: '#000000', light: '#FFFFFF'}, 'text');
  const buttonBorderColor = useThemeColor({ dark: '#37C8C3', light: '#37C8C3' }, 'tint');


  const [filterModalVisible, setFilterModalVisible] = useState(false);

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

  const filterSummary = useMemo(() => {
    const parts = [];
    if (filterSchoolName) parts.push(filterSchoolName);
    if (filterYear) parts.push(filterYear);
    if (filterClassName) parts.push(filterClassName);
    if (filterDivision) parts.push(filterDivision);
    return parts.length ? parts.join(' • ') : 'No filters applied';
  }, [filterSchoolName, filterYear, filterClassName, filterDivision]);

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
                <Text variant="titleMedium" className="font-semibold">
                  Filters
                </Text>
                <Text variant="bodySmall" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                  {filterSummary}
                </Text>
                <Button
                  mode="outlined"
                  onPress={() => setFilterModalVisible(true)}
                  className="rounded-xl mt-4 border-dashed"
                  style={{ borderColor: buttonBorderColor }}
                >
                  Filter Classes
                </Button>
              </View>
            </Card>

            <Card className="rounded-2xl mt-4">
              <View className="p-5">
                <Text variant="titleMedium" className="font-semibold mb-3">
                  Existing Classes
                </Text>
                {isLoadingClasses ? (
                  <Text variant="bodyMedium" style={{ color: textColor, opacity: 0.7 }}>
                    Loading classes...
                  </Text>
                ) : classes.length === 0 ? (
                  <Text variant="bodyMedium" style={{ color: textColor, opacity: 0.7 }}>
                    No classes found. Tap + to create one.
                  </Text>
                ) : (
                  classes.map((item) => (
                    <Button
                      key={item.id}
                      mode={selectedClassId === item.id ? 'contained' : 'outlined'}
                      style={{ borderColor: buttonBorderColor, marginBottom: 8 }}
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
              style={{ borderColor: buttonBorderColor }}
            >
              Continue with Selected Class
            </Button>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>

      <FAB
        icon="plus"
        onPress={() => router.push(ADD_NEW_CLASS_SCREEN)}
        style={{
          position: 'absolute',
          right: 16,
          bottom: insets.bottom + 16,
          backgroundColor: fabBackgroundColor,
        }}
        color={fabIconColor}
      />

      <ClassSelectionFilterModal
        visible={filterModalVisible}
        onDismiss={() => setFilterModalVisible(false)}
        filterSchoolName={filterSchoolName}
        setFilterSchoolName={setFilterSchoolName}
        filterYear={filterYear}
        setFilterYear={setFilterYear}
        filterClassName={filterClassName}
        setFilterClassName={setFilterClassName}
        filterDivision={filterDivision}
        setFilterDivision={setFilterDivision}
        distinctValues={distinctValues}
      />
    </SafeAreaProvider>
  );
}
