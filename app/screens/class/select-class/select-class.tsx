import { useRouter } from 'expo-router';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMemo, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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
  const [showClassActions, setShowClassActions] = useState(false);

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
    handleEditClass,
    handleDeleteClass,
    handleContinue,
    deletingClassId,
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
                <View className="flex-row items-center justify-between mb-3">
                  <Text variant="titleMedium" className="font-semibold">
                    Existing Classes
                  </Text>
                  <TouchableOpacity
                    onPress={() => setShowClassActions((prev) => !prev)}
                    className="h-9 w-9 rounded-xl items-center justify-center border"
                    style={{ borderColor: buttonBorderColor }}
                  >
                    <MaterialCommunityIcons
                      name={showClassActions ? 'close' : 'cog-outline'}
                      size={17}
                      color={buttonBorderColor}
                    />
                  </TouchableOpacity>
                </View>
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
                    <View key={item.id} className="mb-2">
                      <View className="flex-row items-center">
                        <View className={showClassActions ? 'flex-1 mr-2' : 'flex-1'}>
                          <Button
                            mode={selectedClassId === item.id ? 'contained' : 'outlined'}
                            style={{ borderColor: buttonBorderColor }}
                            onPress={() => handleSelect(item)}
                            className="rounded-xl"
                          >
                            {item.schoolName} • {item.className}-{item.division} ({item.academicYear})
                          </Button>
                        </View>
                        {showClassActions ? (
                          <View className="flex-row items-center">
                            <TouchableOpacity
                              onPress={() => handleEditClass(item)}
                              className="h-8 w-8 rounded-lg items-center justify-center mr-2 border"
                              style={{ borderColor: buttonBorderColor }}
                            >
                              <MaterialCommunityIcons name="pencil-outline" size={16} color={textColor} />
                            </TouchableOpacity>
                            <TouchableOpacity
                              disabled={deletingClassId === item.id}
                              onPress={() =>
                                Alert.alert(
                                  'Delete class?',
                                  `This will remove ${item.className}-${item.division} and related data.`,
                                  [
                                    { text: 'Cancel', style: 'cancel' },
                                    {
                                      text: 'Delete',
                                      style: 'destructive',
                                      onPress: () => {
                                        void handleDeleteClass(item);
                                      },
                                    },
                                  ],
                                )
                              }
                              className="h-8 w-8 rounded-lg items-center justify-center border"
                              style={{ borderColor: '#DC2626' }}
                            >
                              <MaterialCommunityIcons
                                name={deletingClassId === item.id ? 'loading' : 'trash-can-outline'}
                                size={16}
                                color="#DC2626"
                              />
                            </TouchableOpacity>
                          </View>
                        ) : null}
                      </View>
                    </View>
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
