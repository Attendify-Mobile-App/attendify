import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAttendance } from '@/context/attendance-context';
import { countPresentTotals, filterMarksForMonth, monthLabels } from '@/utils/attendance';

const buildMonthKey = (year: number, monthIndex: number) => `${year}-${monthIndex}`;

export default function SummaryScreen() {
  const { selectedClass, students, marks } = useAttendance();
  const year = new Date().getFullYear();

  const monthlySummaries = monthLabels.map((label, index) => {
    const monthMarks = filterMarksForMonth(marks, buildMonthKey(year, index));
    const totals = countPresentTotals(students, monthMarks);
    return {
      label,
      totals,
    };
  });

  const yearlyTotals = monthlySummaries.reduce(
    (acc, summary) => {
      acc.boys += summary.totals.boys;
      acc.girls += summary.totals.girls;
      acc.total += summary.totals.total;
      return acc;
    },
    { boys: 0, girls: 0, total: 0 },
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Full Summary Report</Text>
      <Text style={styles.subtitle}>
        {selectedClass
          ? `${selectedClass.schoolName} • ${selectedClass.className}-${selectedClass.division} (${selectedClass.year})`
          : 'No class selected yet.'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Class Overview</Text>
        <Text style={styles.metaText}>Total Students: {students.length}</Text>
        <Text style={styles.metaText}>Total Boys: {students.filter((s) => s.gender === 'Male').length}</Text>
        <Text style={styles.metaText}>Total Girls: {students.filter((s) => s.gender === 'Female').length}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Monthly Attendance Summary</Text>
        {monthlySummaries.map((summary) => (
          <View key={summary.label} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>{summary.label}</Text>
            <Text style={styles.summaryValue}>Boys: {summary.totals.boys}</Text>
            <Text style={styles.summaryValue}>Girls: {summary.totals.girls}</Text>
            <Text style={styles.summaryValue}>Total: {summary.totals.total}</Text>
          </View>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Year Totals</Text>
        <Text style={styles.metaText}>Boys Attendance: {yearlyTotals.boys}</Text>
        <Text style={styles.metaText}>Girls Attendance: {yearlyTotals.girls}</Text>
        <Text style={styles.metaText}>Overall Attendance: {yearlyTotals.total}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Next Steps</Text>
        <Text style={styles.metaText}>• Connect to SQLite/Firebase for persistence.</Text>
        <Text style={styles.metaText}>• Export this report to PDF once data is ready.</Text>
        <Text style={styles.metaText}>• Add edit/delete for students and marks.</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#1a202c',
    shadowOpacity: 0.06,
    shadowRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
    marginBottom: 4,
  },
  summaryRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    paddingVertical: 10,
  },
  summaryLabel: {
    fontWeight: '700',
    marginBottom: 4,
  },
  summaryValue: {
    color: '#4a5568',
    fontSize: 13,
  },
});
