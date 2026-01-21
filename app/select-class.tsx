import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useRouter } from 'expo-router';

import { useAttendance } from '@/context/attendance-context';

export default function SelectClassScreen() {
  const router = useRouter();
  const { setSelectedClass } = useAttendance();
  const [schoolName, setSchoolName] = useState('');
  const [year, setYear] = useState('');
  const [className, setClassName] = useState('');
  const [division, setDivision] = useState('');

  const handleContinue = () => {
    setSelectedClass({
      id: `${Date.now()}`,
      schoolName,
      year,
      className,
      division,
    });
    router.push('/students');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Class Selection</Text>
      <Text style={styles.subtitle}>Set the context for attendance records.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>School Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Sunshine Public School"
          value={schoolName}
          onChangeText={setSchoolName}
        />

        <Text style={styles.label}>Year</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 2024-2025"
          value={year}
          onChangeText={setYear}
        />

        <Text style={styles.label}>Class</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 6"
          value={className}
          onChangeText={setClassName}
        />

        <Text style={styles.label}>Division</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. A"
          value={division}
          onChangeText={setDivision}
        />

        <Pressable style={styles.primaryButton} onPress={handleContinue}>
          <Text style={styles.primaryButtonText}>Continue</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#1a202c',
    shadowOpacity: 0.08,
    shadowRadius: 12,
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
});
