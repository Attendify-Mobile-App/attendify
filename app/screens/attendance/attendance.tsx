import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { AttendanceMarkingCard } from '@/components/attendance/attendance-marking-card';
import { AttendanceMonthlyStudentTotalsCard } from '@/components/attendance/attendance-monthly-student-totals-card';
import { AttendanceQuickActions } from '@/components/attendance/attendance-quick-actions';
import { AttendanceTotalsCard } from '@/components/attendance/attendance-totals-card';
import { ClassSnapshotCard } from '@/components/attendance/class-snapshot-card';
import { DateNavigationCard } from '@/components/attendance/date-navigation-card';

import { useAttendanceScreenLogic } from './use-attendance';

export default function AttendanceScreen() {
  const {
    selectedClass,
    students,
    marks,
    backgroundColor,
    textColor,
    buttonBorderColor,
    dateLabel,
    monthLabel,
    monthKey,
    weekIndex,
    dailyTotals,
    weeklyTotals,
    monthlyTotals,
    daysTracked,
    averageBoys,
    averageGirls,
    presentColor,
    presentTextColor,
    absentColor,
    absentTextColor,
    getStatusForDate,
    goToPreviousDate,
    goToNextDate,
    handleToggle,
    goToYearTotals,
    goToSummary,
  } = useAttendanceScreenLogic();

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
          <View className="flex-1 px-6 py-8 pt-20">
            <View>
              <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                Monthly Attendance
              </Text>
              <Text variant="bodyMedium" className="mt-2" style={{ color: textColor, opacity: 0.7 }}>
                {monthLabel}
              </Text>
            </View>

            <DateNavigationCard
              dateLabel={dateLabel}
              monthLabel={monthLabel}
              weekIndex={weekIndex}
              buttonBorderColor={buttonBorderColor}
              onPrevious={goToPreviousDate}
              onNext={goToNextDate}
            />

            <AttendanceMarkingCard
              selectedClassExists={Boolean(selectedClass)}
              students={students}
              marks={marks}
              dateLabel={dateLabel}
              presentColor={presentColor}
              presentTextColor={presentTextColor}
              absentColor={absentColor}
              absentTextColor={absentTextColor}
              buttonBorderColor={buttonBorderColor}
              onToggle={(studentId) => {
                void handleToggle(studentId);
              }}
              getStatusForDate={getStatusForDate}
            />

            <AttendanceTotalsCard
              title="Daily Totals"
              boys={dailyTotals.boys}
              girls={dailyTotals.girls}
              total={dailyTotals.total}
            />

            <AttendanceTotalsCard
              title={`Weekly Totals (Week ${weekIndex})`}
              boys={weeklyTotals.boys}
              girls={weeklyTotals.girls}
              total={weeklyTotals.total}
            />

            <AttendanceTotalsCard
              title="Monthly Totals"
              boys={monthlyTotals.boys}
              girls={monthlyTotals.girls}
              total={monthlyTotals.total}
              footerLines={[
                `Total days tracked: ${daysTracked}`,
                `Average boys attendance: ${averageBoys}`,
                `Average girls attendance: ${averageGirls}`,
              ]}
            />

            <AttendanceMonthlyStudentTotalsCard
              monthLabel={monthLabel}
              monthKey={monthKey}
              students={students}
              marks={marks}
            />

            <ClassSnapshotCard students={students} />

            <AttendanceQuickActions
              buttonBorderColor={buttonBorderColor}
              onViewYearTotals={goToYearTotals}
              onViewSummary={goToSummary}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
