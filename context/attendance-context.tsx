import React, { createContext, useContext, useMemo, useState } from 'react';

export type SchoolClass = {
  id: string;
  schoolName: string;
  year: string;
  className: string;
  division: string;
};

export type Gender = 'Male' | 'Female';

export type Student = {
  id: string;
  admissionNo: string;
  studentNo: string;
  name: string;
  dob: string;
  gender: Gender;
};

export type AttendanceStatus = 'P' | 'A';

export type AttendanceMark = {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
};

export type AttendanceContextValue = {
  selectedClass: SchoolClass | null;
  students: Student[];
  marks: AttendanceMark[];
  setSelectedClass: (nextClass: SchoolClass) => void;
  addStudent: (student: Omit<Student, 'id'>) => void;
  toggleAttendance: (studentId: string, date: string) => void;
  getAttendanceStatus: (studentId: string, date: string) => AttendanceStatus;
};

const AttendanceContext = createContext<AttendanceContextValue | undefined>(undefined);

const createId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [marks, setMarks] = useState<AttendanceMark[]>([]);

  const addStudent = (student: Omit<Student, 'id'>) => {
    setStudents((prev) => [...prev, { ...student, id: createId() }]);
  };

  const toggleAttendance = (studentId: string, date: string) => {
    setMarks((prev) => {
      const existing = prev.find((mark) => mark.studentId === studentId && mark.date === date);
      if (!existing) {
        return [...prev, { id: createId(), studentId, date, status: 'P' }];
      }

      return prev.map((mark) =>
        mark.id === existing.id
          ? { ...mark, status: mark.status === 'P' ? 'A' : 'P' }
          : mark,
      );
    });
  };

  const getAttendanceStatus = (studentId: string, date: string): AttendanceStatus => {
    const mark = marks.find((entry) => entry.studentId === studentId && entry.date === date);
    return mark?.status ?? 'A';
  };

  const value = useMemo<AttendanceContextValue>(
    () => ({
      selectedClass,
      students,
      marks,
      setSelectedClass,
      addStudent,
      toggleAttendance,
      getAttendanceStatus,
    }),
    [selectedClass, students, marks],
  );

  return <AttendanceContext.Provider value={value}>{children}</AttendanceContext.Provider>;
}

export function useAttendance() {
  const context = useContext(AttendanceContext);
  if (!context) {
    throw new Error('useAttendance must be used within AttendanceProvider');
  }
  return context;
}
