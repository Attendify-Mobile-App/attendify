import { useState } from 'react';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native';
import { TextInput as PaperTextInput } from 'react-native-paper';
import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';

import { Button, Text, TextInput } from '@/components/ui/paper';
import { SELECT_CLASS_SCREEN } from '@/constants/navigation/path';
import { useThemeColor } from '@/hooks/use-theme-color';
import { useCreateClassMutation } from '@/store/api/classApi';

export default function AddNewClassScreen() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const backgroundColor = useThemeColor({}, 'background');
    const textColor = useThemeColor({}, 'text');
    const tintColor = useThemeColor({}, 'tint');

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
                        <View className='px-5'>
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

                        <View className="mt-8">
                                <Text variant="titleMedium" className="font-semibold mb-3">
                                    Class Details
                                </Text>

                                <TextInput
                                    mode="outlined"
                                    label="School Name"
                                    placeholder="e.g. Sunshine Public School"
                                    value={schoolName}
                                    onChangeText={setSchoolName}
                                    left={<PaperTextInput.Icon icon="school" />}
                                    className="mb-4"
                                    outlineStyle={{ borderRadius: 12 }}
                                />

                                <TextInput
                                    mode="outlined"
                                    label="Academic Year"
                                    placeholder="2024"
                                    value={academicYear}
                                    onChangeText={setAcademicYear}
                                    left={<PaperTextInput.Icon icon="calendar" />}
                                    className="mb-4"
                                    outlineStyle={{ borderRadius: 12 }}
                                />
                                <View className='flex-row justify-between items-center gap-2'>
                                    <TextInput
                                        mode="outlined"
                                        label="Class"
                                        placeholder="e.g. 6"
                                        value={className}
                                        onChangeText={setClassName}
                                        left={<PaperTextInput.Icon icon="book-open-page-variant" />}
                                        className="mb-4 flex-1"
                                        outlineStyle={{ borderRadius: 12 }}
                                    />

                                    <TextInput
                                        mode="outlined"
                                        label="Division"
                                        placeholder="e.g. A"
                                        value={division}
                                        onChangeText={setDivision}
                                        left={<PaperTextInput.Icon icon="shape-outline" />}
                                        className="mb-4 flex-1"
                                        outlineStyle={{ borderRadius: 12 }}
                                    />
                                </View>

                                <View className='flex-row justify-between items-center gap-2'>
                                    <Button
                                        mode="contained"
                                        onPress={handleCreateClass}
                                        loading={isCreating}
                                        disabled={isCreating}
                                        className="rounded-xl flex-1"
                                        contentStyle={{ paddingVertical: 8 }}
                                        buttonColor={tintColor}
                                    >
                                        {isCreating ? 'Creating...' : 'Create'}
                                    </Button>

                                    <Button
                                        mode="outlined"
                                        onPress={() => router.back()}
                                        disabled={isCreating}
                                        className="rounded-xl flex-1"
                                        contentStyle={{ paddingVertical: 8 }}
                                        textColor={tintColor}
                                    >
                                        Cancel
                                    </Button>
                                </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
        </SafeAreaProvider>
    );
}

