export type SchoolClass = {
  id: string;
  schoolName: string;
  academicYear: string;
  className: string;
  division: string;
};

export type Gender = 'Male' | 'Female';

export type Student = {
  id: string;
  admissionNo: string;
  studentNo: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  classId: string;
};

export type AttendanceStatus = 'P' | 'A';

export type AttendanceMark = {
  id: string;
  studentId: string;
  date: string;
  status: AttendanceStatus;
};
