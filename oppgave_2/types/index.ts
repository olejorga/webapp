export type Student = {
  id: string;
  name: string;
  gender: string;
  age: number;
  group: string;
};

export type Grouping = {
  key: keyof Student;
  value: unknown;
  students: Student[];
};

export type Data = {
  type: 'students' | 'grouped';
  records: Student[] | Grouping[];
};

export type Error = {
  error: string;
};

export type Result = Data | Error;
