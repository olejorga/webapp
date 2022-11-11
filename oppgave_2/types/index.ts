export type Data = { status: true; data: Record<string, unknown> }
export type Error = { status: false; error: string }

export type Result = Data | Error


export type Student = {
    id: string,
    name: string,
    gender: string,
    age: number,
    group: string
}

export type Students = {
    students: Student[]
    studyGroup: string
}

export type Category = {
    count: {
      _all: number
    },
    value: string
  }