import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { YearTotalTableCard } from '@/components/year-total/year-total-table-card';

import { useYearTotalLogic } from './use-year-total';

export default function YearTotalScreen() {
  const { selectedClass, students, marks, monthKeys, backgroundColor, textColor } = useYearTotalLogic();

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
                Year Totals
              </Text>
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                {selectedClass
                  ? `${selectedClass.schoolName} - ${selectedClass.className}-${selectedClass.division} (${selectedClass.academicYear})`
                  : 'No class selected yet.'}
              </Text>
            </View>

            <YearTotalTableCard students={students} marks={marks} monthKeys={monthKeys} />

            <Text variant="bodySmall" className="text-slate-500 mt-3">
              Totals use the current year and saved attendance marks.
            </Text>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
