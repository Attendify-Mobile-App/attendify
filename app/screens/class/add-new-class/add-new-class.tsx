import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Card, Text, TextInput } from '@/components/ui/paper';
import { SELECT_CLASS_SCREEN } from '@/constants/navigation/path';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateClassMutation } from '@/store/api/classApi';

export default function AddNewClassScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');

    const [schoolName, setSchoolName] = useState('');
    const [academicYear, setAcademicYear] = useState('');
    const [className, setClassName] = useState('');
    const [division, setDivision] = useState('');
    const [createClass, { isLoading: isCreating }] = useCreateClassMutation();

    const handleCreateClass = async () => {
        if (!schoolName || !academicYear || !className || !division) {
            return;
        }

        const created = await createClass({
            schoolName,
            academicYear,
            className,
            division,
        }).unwrap();

        router.replace({
            pathname: SELECT_CLASS_SCREEN,
            params: {
                schoolName: created.schoolName,
                academicYear: created.academicYear,
                className: created.className,
                division: created.division,
                selectedClassId: created.id,
            },
        });
    };

    return (
        <SafeAreaProvider className="flex-1" style={{ backgroundColor }}>
            <ScrollView
                className="flex-1"
                contentContainerStyle={{ flexGrow: 1, backgroundColor, paddingBottom: insets.bottom + 24 }}
                showsVerticalScrollIndicator={false}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                    className="flex-1"
                >
                    <View className="flex-1 px-6 py-8 justify-center">
                        <View>
                            <Text variant="headlineMedium" className="font-semibold" style={{ color: textColor }}>
                                Create Class
                            </Text>
                            <Text
                                variant="bodyMedium"
                                className="mt-2"
                                style={{ color: textColor, opacity: 0.7 }}
                            >
                                Add a new class to start marking attendance.
                            </Text>
                        </View>

                        <View className="rounded-2xl mt-6">
                            <View className="p-5">
                                <Text variant="titleMedium" className="font-semibold mb-3">
                                    Class Details
                                </Text>

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
                                    label="Academic Year"
                                    placeholder="2024"
                                    value={academicYear}
                                    onChangeText={setAcademicYear}
                                    className="mb-3"
                                />
                                <View className='flex-row justify-between items-center gap-2'>
                                    <TextInput
                                        mode="outlined"
                                        label="Class"
                                        placeholder="e.g. 6"
                                        value={className}
                                        onChangeText={setClassName}
                                        className="mb-3 flex-1"
                                    />

                                    <TextInput
                                        mode="outlined"
                                        label="Division"
                                        placeholder="e.g. A"
                                        value={division}
                                        onChangeText={setDivision}
                                        className="mb-4 flex-1"
                                    />
                                </View>

                                <View className='flex-row justify-between items-center gap-2'>
                                    <Button
                                        mode="contained"
                                        onPress={handleCreateClass}
                                        loading={isCreating}
                                        disabled={isCreating}
                                        className="rounded-xl flex-1"
                                    >
                                        {isCreating ? 'Creating...' : 'Create'}
                                    </Button>

                                    <Button
                                        mode="outlined"
                                        onPress={() => router.back()}
                                        disabled={isCreating}
                                        className="rounded-xl flex-1"
                                    >
                                        Cancel
                                    </Button>
                                </View>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaProvider>
    );
}

