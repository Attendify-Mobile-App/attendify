import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';

import { useAttendance } from '@/context/attendance-context';
import { useGetClassesQuery } from '@/store/api/classApi';
import type { SchoolClass } from '@/types/attendance';

type UseSelectClassResult = {
	filterSchoolName: string;
	setFilterSchoolName: (value: string) => void;
	filterYear: string;
	setFilterYear: (value: string) => void;
	filterClassName: string;
	setFilterClassName: (value: string) => void;
	filterDivision: string;
	setFilterDivision: (value: string) => void;
	selectedClassId: string | null;
	setSelectedClassId: (value: string | null) => void;

	classes: SchoolClass[];
	isLoadingClasses: boolean;

	selectedClass: SchoolClass | null;
	distinctValues: {
		schoolNames: string[];
		years: string[];
		classNames: string[];
		divisions: string[];
	};

	handleSelect: (item: SchoolClass) => void;
	handleContinue: () => void;
};

export function useSelectClass(): UseSelectClassResult {
	const params = useLocalSearchParams<{
		schoolName?: string;
		academicYear?: string;
		className?: string;
		division?: string;
		selectedClassId?: string;
	}>();

	const router = useRouter();
	const { setSelectedClass } = useAttendance();

	const [filterSchoolName, setFilterSchoolName] = useState('');
	const [filterYear, setFilterYear] = useState('');
	const [filterClassName, setFilterClassName] = useState('');
	const [filterDivision, setFilterDivision] = useState('');
	const [selectedClassId, setSelectedClassId] = useState<string | null>(null);

	const isHydratedFromParamsRef = useRef(false);
	useEffect(() => {
		if (isHydratedFromParamsRef.current) {
			return;
		}

		const initialSchoolName = typeof params.schoolName === 'string' ? params.schoolName : '';
		const initialAcademicYear = typeof params.academicYear === 'string' ? params.academicYear : '';
		const initialClassName = typeof params.className === 'string' ? params.className : '';
		const initialDivision = typeof params.division === 'string' ? params.division : '';
		const initialSelectedClassId =
			typeof params.selectedClassId === 'string' ? params.selectedClassId : '';

		if (
			!initialSchoolName &&
			!initialAcademicYear &&
			!initialClassName &&
			!initialDivision &&
			!initialSelectedClassId
		) {
			return;
		}

		setFilterSchoolName(initialSchoolName);
		setFilterYear(initialAcademicYear);
		setFilterClassName(initialClassName);
		setFilterDivision(initialDivision);
		setSelectedClassId(initialSelectedClassId || null);
		isHydratedFromParamsRef.current = true;
	}, [params]);

	const { data: classes = [], isLoading: isLoadingClasses } = useGetClassesQuery({
		schoolName: filterSchoolName || undefined,
		academicYear: filterYear || undefined,
		className: filterClassName || undefined,
		division: filterDivision || undefined,
	});

	const selectedClass = useMemo(
		() => classes.find((item) => item.id === selectedClassId) ?? null,
		[classes, selectedClassId],
	);

	const distinctValues = useMemo(() => {
		const schoolNames = new Set<string>();
		const years = new Set<string>();
		const classNames = new Set<string>();
		const divisions = new Set<string>();

		classes.forEach((item) => {
			schoolNames.add(item.schoolName);
			years.add(item.academicYear);
			classNames.add(item.className);
			divisions.add(item.division);
		});

		return {
			schoolNames: Array.from(schoolNames),
			years: Array.from(years),
			classNames: Array.from(classNames),
			divisions: Array.from(divisions),
		};
	}, [classes]);

	const handleSelect = (item: SchoolClass) => {
		setSelectedClassId(item.id);
	};

	const handleContinue = () => {
		if (!selectedClass) {
			return;
		}
		setSelectedClass(selectedClass);
		router.push('/students');
	};

	return {
		filterSchoolName,
		setFilterSchoolName,
		filterYear,
		setFilterYear,
		filterClassName,
		setFilterClassName,
		filterDivision,
		setFilterDivision,
		selectedClassId,
		setSelectedClassId,

		classes,
		isLoadingClasses,

		selectedClass,
		distinctValues,

		handleSelect,
		handleContinue,
	};
}

