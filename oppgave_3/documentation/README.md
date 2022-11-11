# Oppgave 3.1

## Ressurser

## Datamodeller

- Employee

  - Id _string_
  - Navn _string_
  - rules _string?_

- Day

  - Id _string_
  - name _string_
  - EmployeeId _string_
  - WeekId _string_

- Week

  - Id _string_
  - WeekNumber _number_

- Lunch (Kombinasjonen av Employee+Dag kan benyttes)

- Alteration (Overskrivelse for dag)
  - Id _string_
  - DayId _string_
  - EmployeeId _string_
    - Id til Employee som erstatter lunsjen denne dagen

---

### Employee

- **Create**
  - Success
    - Statuskode: 201
    - Respons: Employee
  - Error:
    - Statuskode: 400
    - Respons: null
- **Read**
  - Success
    - Statuskode: 200
    - Respons: Employee
  - Error:
    - Statuskode: 404
    - Respons: null
- **Update**
  - Success
    - Statuskode: 200
    - Respons: Employee
  - Error:
    - Statuskode: 400
    - Respons: null
- **Delete?**
  - Success
    - Statuskode: 204
    - Respons: null
  - Error:
    - Statuskode: 400
    - Respons: null

### Day

- Read
  - Success
    - Statuskode: 200
    - Respons: Day
  - Error:
    - Statuskode: 404
    - Respons: null
- Update
  - Success
    - Statuskode: 200
    - Respons: Employee
  - Error:
    - Statuskode: 400
    - Respons: null

### Week

- Read
  - Success
    - Statuskode: 200
    - Respons: Week
  - Error:
    - Statuskode: 404
    - Respons: null
- Create
  - Success
    - Statuskode: 201
    - Respons: Week
  - Error:
    - Statuskode: 400
    - Respons: null
- Update
  - Success
    - Statuskode: 200
    - Respons: Week
  - Error:
    - Statuskode: 400
    - Respons: null

### Lunch

- All informasjon hentes fra andre ressurser

---

### Endepunkt

#### Employee

    - /api/Employee
      - Henter listen av alle ansatte
    - /api/Employee/{id}
      - Henter ansatt med {id} og viser dagene denne personen har lunsj

#### Day

    -  /api/Day/{Employeeid}
      - Henter alle dager til en ansatt

#### Week

    - /api/Week
      - Henter listen over alle uker.
    - /api/Week/{id}
      - Henter uken med {id}

### Sider

#### Homepage

- Viser en oversikt over alle uker der man kan se utvidet informasjon om en ukes dager og hvilken ansatt som har ansvar for lunsj den dagen.
- Skal kunne generere ny lunsj liste (oppgave 3.6)
- Skal kunne søke etter ansatt
- Skal kunne laste ned lunsjlisten i Excel-format. (3.5)
- Velge en periode som skal vises (f.eks. uke 2-6)

#### Alteration

- Opprette en endring for en spesifikk dag.

#### Employee

- Se alle dager en ansatt har ansvaret for.

#### Ny Employee

- Opprette en ny Employee.
