import { useState } from 'react';
import { View } from 'react-native';
import { useRouter } from 'expo-router';

import { Button, Card, Text, TextInput } from '@/components/ui/paper';
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
    <View className="flex-1 bg-slate-50 px-6 pt-6">
      <Text variant="headlineSmall" className="font-semibold">
        Class Selection
      </Text>
      <Text variant="bodyMedium" className="text-slate-500 mt-1 mb-4">
        Set the context for attendance records.
      </Text>

      <Card className="rounded-2xl">
        <View className="p-5">
          <TextInput
            mode="outlined"
            label="School Name"
            placeholder="e.g. Sunshine Public School"
            value={schoolName}
            onChangeText={setSchoolName}
            className="mb-3"
          />

          <TextInput
            mode="outlined"
            label="Year"
            placeholder="e.g. 2024-2025"
            value={year}
            onChangeText={setYear}
            className="mb-3"
          />

          <TextInput
            mode="outlined"
            label="Class"
            placeholder="e.g. 6"
            value={className}
            onChangeText={setClassName}
            className="mb-3"
          />

          <TextInput
            mode="outlined"
            label="Division"
            placeholder="e.g. A"
            value={division}
            onChangeText={setDivision}
            className="mb-4"
          />

          <Button mode="contained" onPress={handleContinue} className="rounded-xl">
            Continue
          </Button>
        </View>
      </Card>
    </View>
  );
}
