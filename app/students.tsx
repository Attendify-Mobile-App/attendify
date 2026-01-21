import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { Gender, useAttendance } from '@/context/attendance-context';

export default function StudentsScreen() {
  const router = useRouter();
  const { selectedClass, students, addStudent } = useAttendance();
  const [admissionNo, setAdmissionNo] = useState('');
  const [studentNo, setStudentNo] = useState('');
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [gender, setGender] = useState<Gender>('Male');

  const handleAdd = () => {
    if (!name || !admissionNo || !studentNo || !dob) {
      return;
    }

    addStudent({
      admissionNo,
      studentNo,
      name,
      dob,
      gender,
    });

    setAdmissionNo('');
    setStudentNo('');
    setName('');
    setDob('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Student List</Text>
      <Text style={styles.subtitle}>
        {selectedClass
          ? `${selectedClass.schoolName} • ${selectedClass.className}-${selectedClass.division} (${selectedClass.year})`
          : 'Select a class to begin.'}
      </Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Add Student</Text>

        <Text style={styles.label}>Admission No</Text>
        <TextInput
          style={styles.input}
          placeholder="Admission number"
          value={admissionNo}
          onChangeText={setAdmissionNo}
        />

        <Text style={styles.label}>Student No</Text>
        <TextInput
          style={styles.input}
          placeholder="Student number"
          value={studentNo}
          onChangeText={setStudentNo}
        />

        <Text style={styles.label}>Student Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          value={name}
          onChangeText={setName}
        />

        <Text style={styles.label}>Date of Birth</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={dob}
          onChangeText={setDob}
        />

        <Text style={styles.label}>Gender</Text>
        <View style={styles.genderRow}>
          {(['Male', 'Female'] as Gender[]).map((option) => (
            <Pressable
              key={option}
              style={[styles.genderChip, gender === option && styles.genderChipActive]}
              onPress={() => setGender(option)}>
              <Text
                style={[
                  styles.genderChipText,
                  gender === option && styles.genderChipTextActive,
                ]}>
                {option}
              </Text>
            </Pressable>
          ))}
        </View>

        <Pressable style={styles.primaryButton} onPress={handleAdd}>
          <Text style={styles.primaryButtonText}>Add Student</Text>
        </Pressable>
      </View>

      <View style={styles.listCard}>
        <View style={styles.listHeader}>
          <Text style={styles.sectionTitle}>Roster</Text>
          <Text style={styles.count}>{students.length} students</Text>
        </View>
        {students.length === 0 ? (
          <Text style={styles.empty}>No students added yet.</Text>
        ) : (
          students.map((student, index) => (
            <View key={student.id} style={styles.studentRow}>
              <Text style={styles.studentIndex}>{index + 1}.</Text>
              <View style={styles.studentInfo}>
                <Text style={styles.studentName}>{student.name}</Text>
                <Text style={styles.studentMeta}>
                  Adm #{student.admissionNo} • Student #{student.studentNo} • {student.gender}
                </Text>
                <Text style={styles.studentMeta}>DOB: {student.dob}</Text>
              </View>
            </View>
          ))
        )}
      </View>

      <Pressable style={styles.secondaryButton} onPress={() => router.push('/attendance')}>
        <Text style={styles.secondaryButtonText}>Go to Monthly Attendance</Text>
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
    fontSize: 14,
    color: '#4a5568',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#1a202c',
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  input: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#f8fafc',
  },
  genderRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  genderChip: {
    borderWidth: 1,
    borderColor: '#cbd5f5',
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 6,
  },
  genderChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  genderChipText: {
    color: '#1e293b',
    fontWeight: '600',
  },
  genderChipTextActive: {
    color: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  listCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  count: {
    fontSize: 12,
    color: '#4a5568',
  },
  empty: {
    color: '#94a3b8',
  },
  studentRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  studentIndex: {
    width: 24,
    fontWeight: '700',
    color: '#64748b',
  },
  studentInfo: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: '600',
  },
  studentMeta: {
    color: '#64748b',
    fontSize: 12,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: '#2563eb',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: '#2563eb',
    fontWeight: '700',
  },
});
