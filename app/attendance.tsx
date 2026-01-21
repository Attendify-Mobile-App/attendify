import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useAttendance } from '@/context/attendance-context';
import {
  advanceDate,
  countPresentTotals,
  filterMarksForMonth,
  filterMarksForWeek,
  formatDate,
  getGenderCount,
  getMonthKey,
  getMonthlyStudentTotal,
  getStatusForDate,
  getWeekIndex,
  monthLabels,
} from '@/utils/attendance';

export default function AttendanceScreen() {
  const router = useRouter();
  const { students, marks, toggleAttendance } = useAttendance();
  const [selectedDate, setSelectedDate] = useState(() => new Date());

  const dateLabel = formatDate(selectedDate);
  const monthKey = getMonthKey(selectedDate);
  const monthLabel = monthLabels[selectedDate.getMonth()];
  const weekIndex = getWeekIndex(selectedDate);

  const dailyMarks = useMemo(
    () => marks.filter((mark) => mark.date === dateLabel),
    [marks, dateLabel],
  );
  const dailyTotals = countPresentTotals(students, dailyMarks);

  const weeklyTotals = countPresentTotals(
    students,
    filterMarksForWeek(marks, monthKey, weekIndex),
  );
  const monthlyMarks = filterMarksForMonth(marks, monthKey);
  const monthlyTotals = countPresentTotals(students, monthlyMarks);

  const daysTracked = new Set(monthlyMarks.map((mark) => mark.date)).size;
  const averageBoys = daysTracked ? (monthlyTotals.boys / daysTracked).toFixed(1) : '0';
  const averageGirls = daysTracked ? (monthlyTotals.girls / daysTracked).toFixed(1) : '0';

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Monthly Attendance</Text>
      <Text style={styles.subtitle}>{monthLabel}</Text>

      <View style={styles.dateCard}>
        <View style={styles.dateControls}>
          <Pressable style={styles.smallButton} onPress={() => setSelectedDate(advanceDate(selectedDate, -1))}>
            <Text style={styles.smallButtonText}>Prev</Text>
          </Pressable>
          <Text style={styles.dateLabel}>{dateLabel}</Text>
          <Pressable style={styles.smallButton} onPress={() => setSelectedDate(advanceDate(selectedDate, 1))}>
            <Text style={styles.smallButtonText}>Next</Text>
          </Pressable>
        </View>
        <Text style={styles.metaText}>Week {weekIndex} of {monthLabel}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Mark Attendance</Text>
        {students.length === 0 ? (
          <Text style={styles.empty}>Add students to start marking attendance.</Text>
        ) : (
          students.map((student, index) => {
            const status = getStatusForDate(marks, student.id, dateLabel);
            return (
              <View key={student.id} style={styles.studentRow}>
                <View style={styles.studentInfo}>
                  <Text style={styles.studentName}>{index + 1}. {student.name}</Text>
                  <Text style={styles.studentMeta}>Adm #{student.admissionNo} • {student.gender}</Text>
                </View>
                <Pressable
                  style={[styles.attendanceToggle, status === 'P' ? styles.present : styles.absent]}
                  onPress={() => toggleAttendance(student.id, dateLabel)}>
                  <Text style={styles.attendanceText}>{status === 'P' ? 'Present' : 'Absent'}</Text>
                </Pressable>
              </View>
            );
          })
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Daily Totals</Text>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Boys: {dailyTotals.boys}</Text>
          <Text style={styles.totalLabel}>Girls: {dailyTotals.girls}</Text>
          <Text style={styles.totalLabel}>Total: {dailyTotals.total}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Weekly Totals (Week {weekIndex})</Text>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Boys: {weeklyTotals.boys}</Text>
          <Text style={styles.totalLabel}>Girls: {weeklyTotals.girls}</Text>
          <Text style={styles.totalLabel}>Total: {weeklyTotals.total}</Text>
        </View>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Monthly Totals</Text>
        <View style={styles.totalsRow}>
          <Text style={styles.totalLabel}>Boys: {monthlyTotals.boys}</Text>
          <Text style={styles.totalLabel}>Girls: {monthlyTotals.girls}</Text>
          <Text style={styles.totalLabel}>Total: {monthlyTotals.total}</Text>
        </View>
        <Text style={styles.metaText}>Total days tracked: {daysTracked}</Text>
        <Text style={styles.metaText}>Average boys attendance: {averageBoys}</Text>
        <Text style={styles.metaText}>Average girls attendance: {averageGirls}</Text>
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Student Totals for {monthLabel}</Text>
        {students.length === 0 ? (
          <Text style={styles.empty}>No student totals yet.</Text>
        ) : (
          students.map((student) => (
            <View key={student.id} style={styles.studentTotalRow}>
              <Text style={styles.studentName}>{student.name}</Text>
              <Text style={styles.totalBadge}>
                {getMonthlyStudentTotal(marks, student.id, monthKey)} days present
              </Text>
            </View>
          ))
        )}
      </View>

      <View style={styles.sectionCard}>
        <Text style={styles.sectionTitle}>Class Snapshot</Text>
        <Text style={styles.metaText}>Total Boys: {getGenderCount(students, 'Male')}</Text>
        <Text style={styles.metaText}>Total Girls: {getGenderCount(students, 'Female')}</Text>
      </View>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/year-total')}>
        <Text style={styles.secondaryButtonText}>View Year Totals</Text>
      </Pressable>
      <Pressable style={styles.secondaryButton} onPress={() => router.push('/summary')}>
        <Text style={styles.secondaryButtonText}>View Full Summary</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#f5f7fb',
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#4a5568',
    marginBottom: 12,
  },
  dateCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  dateControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  dateLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  smallButton: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  smallButtonText: {
    color: '#2563eb',
    fontWeight: '600',
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  empty: {
    color: '#94a3b8',
  },
  studentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  studentInfo: {
    flex: 1,
    marginRight: 12,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '600',
  },
  studentMeta: {
    fontSize: 12,
    color: '#64748b',
  },
  attendanceToggle: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  present: {
    backgroundColor: '#16a34a',
  },
  absent: {
    backgroundColor: '#f97316',
  },
  attendanceText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  totalsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  totalLabel: {
    fontWeight: '600',
    color: '#1e293b',
  },
  metaText: {
    fontSize: 13,
    color: '#64748b',
    marginTop: 4,
  },
  studentTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  totalBadge: {
    backgroundColor: '#e0f2fe',
    color: '#0369a1',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    fontSize: 12,
    fontWeight: '600',
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
