import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useAttendance } from '@/context/attendance-context';
import { getMonthKey, getMonthlyStudentTotal, monthLabels } from '@/utils/attendance';

const buildMonthKeys = () => {
  const year = new Date().getFullYear();
  return monthLabels.map((_, index) => `${year}-${index}`);
};

export default function YearTotalScreen() {
  const { students, marks } = useAttendance();
  const monthKeys = buildMonthKeys();

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal>
      <View>
        <Text style={styles.title}>Year Totals</Text>
        <View style={styles.headerRow}>
          <Text style={[styles.cell, styles.nameCell]}>Student</Text>
          {monthLabels.map((label) => (
            <Text key={label} style={styles.cell}>
              {label.slice(0, 3)}
            </Text>
          ))}
          <Text style={styles.cell}>Total</Text>
        </View>
        {students.length === 0 ? (
          <Text style={styles.empty}>No students added yet.</Text>
        ) : (
          students.map((student) => {
            const monthlyTotals = monthKeys.map((monthKey) =>
              getMonthlyStudentTotal(marks, student.id, monthKey),
            );
            const yearTotal = monthlyTotals.reduce((sum, total) => sum + total, 0);

            return (
              <View key={student.id} style={styles.dataRow}>
                <Text style={[styles.cell, styles.nameCell]}>{student.name}</Text>
                {monthlyTotals.map((total, index) => (
                  <Text key={`${student.id}-${index}`} style={styles.cell}>
                    {total}
                  </Text>
                ))}
                <Text style={[styles.cell, styles.totalCell]}>{yearTotal}</Text>
              </View>
            );
          })
        )}
        <Text style={styles.helper}>Totals use the current year and saved attendance marks.</Text>
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
    marginBottom: 16,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#e2e8f0',
    paddingVertical: 8,
  },
  dataRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  cell: {
    width: 72,
    padding: 8,
    textAlign: 'center',
    fontSize: 12,
  },
  nameCell: {
    width: 160,
    textAlign: 'left',
    fontWeight: '600',
  },
  totalCell: {
    fontWeight: '700',
  },
  empty: {
    padding: 12,
    color: '#94a3b8',
  },
  helper: {
    marginTop: 12,
    color: '#64748b',
    fontSize: 12,
  },
});
