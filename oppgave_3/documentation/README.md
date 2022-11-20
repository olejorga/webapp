```
🚧 WIP: Coffee break.
```

# Model

## Employee

```ts
type Employee = {
  id: string
  name: string
  rules: string
  days: Day[] // Use prisma include.
}
```

## Day

```ts
type Day = {
  id: string
  name: string
  employee: Employee  // Use prisma include.
  employeeId: string
  week: Week  // Use prisma include.
  weekId: string
  alteration?: Alteration  // Use prisma include.
  alterationId?: string
}
```

## Week

```ts
type Week = {
  id: string
  number: number
  days: Day[]  // Use prisma include.
}
```

## Alteration

```ts
type Alteration = {
  id: string
  day: Day // Use prisma include.
  dayId: string
  employee: Employee // Use prisma include.
  employeeId: string
}
```

## Options

```ts
type Options = {
  vacations: number[] // Array of week numbers.
  yearSize: number // Number of weeks in a year.
  workDays: number // Number of work days per week.
  batchSize: number // ...
  maxOccurrences: number // ...
  days: string[] // Array of names of days.
}
```

# Resources

## Response

```ts
// The standard response returned from all endpoints.
// Will always be data or an error.
// Generic "T" is the type of data expected.
type Response<T> = Data<T> | Error

type Data<T> = { data: T }
type Error = { error: string }
```

## Employee 

```
👉 /api/employees

GET:
  200: Data<Employee[]>
  500: Error

  PARAMS:
    ?search={phrase} Employees with names containing phrase.

POST:
  201: Data<Employee>
  400: Error
  500: Error
  
  BODY: Employee
```

Includes each day a employee is responsible for.

```
👉 /api/employees/{id}

GET:
  200: Data<Employee>
  404: Error
  500: Error

PUT:
  200: Data<Employee>
  400: Error
  404: Error
  500: Error
  
  BODY: Employee
```

## Week

Includes days and the employee assigned to each day.

```
👉 /api/weeks

GET:
  200: Data<Week[]>
  500: Error

  PARAMS:
    ?start={number} All weeks from week nr (incl).
    ?end={number} All weeks until week nr (incl).
    ?format=excel Download lunch plan as an excel file.
```

```
👉 /api/weeks/{number}

GET:
  200: Data<Week>
  404: Error
  500: Error
```

## Alteration

```
👉 /api/alterations

POST:
  201: Data<Alteration>
  400: Error
  500: Error
  
  BODY: Alteration
```

## Demo

Populates the database with example data.

```
👉 /api/demo

GET:
  200: Data<null>
  500: Error
```

## Custom

Generates a luch list based on a configuration.

```
👉 /api/custom

POST:
  201: Data<null>
  400: Error
  500: Error
  
  BODY: Options
```

# Pages

## Home

```
👉 /

This page is the entry point.

- Can navigate to weeks overview (👉 /weeks).
- Can navigate to employee overview (👉 /employees).

- Can generate a lunch plan based on demo data. (3.2)
- Can download lunch plan as an excel file. (3.5)
- Can generate a new lunch plan. (3.6)
```

## Week
```
👉 /weeks

This page is an overview of all weeks.

- Each week can be expanded to see idividual days.
  - Shows who is responsible for lunch each day.
- Filter weeks (↪️ /weeks?start={number}&end={number}).
- Can go to an individual week (👉 /weeks/{number}).
```

```
👉 /weeks/{number}

This page is an overview of a individual week.

- Shows an overview of all days within that week.
- Shows who is responsible for lunch each day.

```

## Employee
```
👉 /employees

This page is an overview of all employees.

- Can go to an individual employee (👉 /employee/{id}).
- Can search for employee (↪️ /employees?search={phrase}).
```

```
👉 /employees/{id}

This page is an overview of an individual employee.

- Shows an overview of days the employee is responsible for.
- Can choose to edit employee (👉 /employee/{id}/edit).
```

```
👉 /employees/{id}/update

This page is for editing an employee.

- When done, the user is redirected (↪️ /employee/{id}).
```

```
👉 /employees/create

This page is for creating a new employee.

- When done, the user is redirected (↪️ /employee/{id}).
```

## Alteration

```
👉 /alterations/create

This page is for creating a new alteration.
```
