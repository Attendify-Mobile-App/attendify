import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Text } from '@/components/ui/paper';
import { SummaryClassOverviewCard } from '@/components/summary/summary-class-overview-card';
import { SummaryClassSelector } from '@/components/summary/summary-class-selector';
import { SummaryExportCard } from '@/components/summary/summary-export-card';
import { SummaryMonthlyTotalCard } from '@/components/summary/summary-monthly-total-card';
import { SummaryWeeklySummaryCard } from '@/components/summary/summary-weekly-summary-card';
import { SummaryYearTotalsCard } from '@/components/summary/summary-year-totals-card';

import { getAverage, toPercent, useSummaryLogic } from './use-summary';

export default function SummaryScreen() {
  const {
    year,
    selectedClass,
    classes,
    students,
    backgroundColor,
    textColor,
    tintColor,
    cardAccentColor,
    mutedTextColor,
    isClassMenuOpen,
    selectedMonthIndex,
    selectedMonthLabel,
    monthLabels,
    selectedMonthSummary,
    selectedMonthAverages,
    studentGenderCounts,
    weeklySummary,
    monthPeakTotal,
    yearlyTotals,
    yearlyAverages,
    yearTrackedDays,
    setSelectedMonthIndex,
    toggleClassMenu,
    handleSelectClass,
    handleExport,
  } = useSummaryLogic();

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
                Full Summary Report
              </Text>

              <SummaryClassSelector
                selectedClass={selectedClass}
                classes={classes}
                isOpen={isClassMenuOpen}
                textColor={textColor}
                tintColor={tintColor}
                cardAccentColor={cardAccentColor}
                mutedTextColor={mutedTextColor}
                onToggle={toggleClassMenu}
                onSelectClass={(schoolClass) => handleSelectClass(schoolClass.id)}
              />
            </View>

            <SummaryClassOverviewCard
              year={year}
              selectedMonthLabel={selectedMonthLabel}
              totalStudents={students.length}
              boys={studentGenderCounts.boys}
              girls={studentGenderCounts.girls}
              mutedTextColor={mutedTextColor}
            />

            <SummaryMonthlyTotalCard
              selectedMonthLabel={selectedMonthLabel}
              selectedMonthIndex={selectedMonthIndex}
              monthLabels={monthLabels}
              monthTotals={selectedMonthSummary?.totals ?? { boys: 0, girls: 0, total: 0 }}
              trackedDays={selectedMonthSummary?.uniqueDays ?? 0}
              averages={selectedMonthAverages}
              textColor={textColor}
              mutedTextColor={mutedTextColor}
              tintColor={tintColor}
              cardAccentColor={cardAccentColor}
              onSelectMonth={setSelectedMonthIndex}
            />

            <SummaryWeeklySummaryCard
              selectedMonthLabel={selectedMonthLabel}
              weeklySummary={weeklySummary}
              monthPeakTotal={monthPeakTotal}
              textColor={textColor}
              mutedTextColor={mutedTextColor}
              tintColor={tintColor}
              toPercent={toPercent}
              getAverage={getAverage}
            />

            <SummaryYearTotalsCard
              totals={yearlyTotals}
              trackedDays={yearTrackedDays}
              averages={yearlyAverages}
              mutedTextColor={mutedTextColor}
            />

            <SummaryExportCard
              textColor={textColor}
              tintColor={tintColor}
              cardAccentColor={cardAccentColor}
              mutedTextColor={mutedTextColor}
              onExport={() => {
                void handleExport();
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaProvider>
  );
}
