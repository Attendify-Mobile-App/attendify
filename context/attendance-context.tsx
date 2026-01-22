import React, { createContext, useContext, useMemo, useState } from 'react';
import type { SchoolClass } from '@/types/attendance';

export type AttendanceContextValue = {
  selectedClass: SchoolClass | null;
  setSelectedClass: (nextClass: SchoolClass | null) => void;
};

const AttendanceContext = createContext<AttendanceContextValue | undefined>(undefined);

export function AttendanceProvider({ children }: { children: React.ReactNode }) {
  const [selectedClass, setSelectedClass] = useState<SchoolClass | null>(null);

  const value = useMemo<AttendanceContextValue>(
    () => ({
      selectedClass,
      setSelectedClass,
    }),
    [selectedClass],
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
