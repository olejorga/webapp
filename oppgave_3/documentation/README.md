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
}
```

## Day

```ts
type Day = {
  id: string
  name: string
  employee: Employee
  employeeId: string
  week: Week
  weekId: string
}
```

## Week

```ts
type Week = {
  id: string
  number: number
}
```

## Alteration

```ts
type Alteration = {
  id: string
  day: Day
  dayId: string
  employee: Employee
  employeeId: string
}
```

## Lunch

```ts
type Lunch = {
  weeks: {
    lunches: {
      [week: string]: {
        [day: string]: Employee
      }
    }
    alterations?: {
      [day: string]: Employee
    }
  }
}
```

## Options

```ts
type Options = {
  vacations: number[],
  yearSize: number,
  workDays: number,
  batchSize: number,
  maxOccurrences: number,
  days: string[]
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

```
👉 /api/employees/{id}

PUT:
  200: Data<Employee>
  400: Error
  404: Error
  500: Error
  
  BODY: Employee
```

## Day

```
👉 /api/days

GET:
  200: Data<Day[]>
  500: Error

  PARAMS:
    ?employee={id} Days employee is responsible for lunch. 
```

## Week

```
👉 /api/weeks

GET:
  200: Data<Week[]>
  500: Error

  PARAMS:
    ?start={number} All weeks from week nr (incl).
    ?end={number} All weeks until week nr (incl).
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

## Lunch

```
👉 /api/lunch

GET:
  200: Data<Lunch>
  500: Error

  PARAMS:
    ?format=excel Download lunch plan as an excel file.

POST:
  201: Data<Lunch>
  400: Error
  500: Error
  
  BODY: Options
```

## Demo

```
👉 /api/demo

GET:
  200: Data<{ message: "Database seeded with example data." }>
  500: Error
```

# Pages

## Home

```
👉 /

- Overview over all weeks.
  - Each week can be expanded to se idividual days.
- Can generate a new lunch plan. (3.6)
- Can search for an employee.
- Can download lunch plan as an excel file. (3.5)
- Filter weeks by an interval.
```

## Alteration

```
👉 /alteration

- Can create a new alteration.
```

## Employee

```
👉 /employee

- Can create a new employee.
