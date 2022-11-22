import DemoController from './features/demo/demo.controller'
import DayRepository from './features/day/day.repository'
import DayService from './features/day/day.service'
import EmployeeController from './features/employee/employee.controller'
import EmployeeRepository from './features/employee/employee.repository'
import EmployeeService from './features/employee/employee.service'
import WeekRepository from './features/week/week.repository'
import WeekService from './features/week/week.service'
import WeekController from './features/week/week.controller'
import AlterationRepository from './features/Alteration/alteration.repository'
import AlterationService from './features/Alteration/alteration.service'
import AlterationController from './features/Alteration/alteration.controller'

export const repositories = {
  employee: new EmployeeRepository(),
  day: new DayRepository(),
  week: new WeekRepository(),
  alteration: new AlterationRepository(),
}

export const services = {
  employee: new EmployeeService(repositories.employee),
  day: new DayService(repositories.day),
  week: new WeekService(repositories.week),
  alteration: new AlterationService(repositories.alteration),
}

export const controllers = {
  demo: new DemoController(
    repositories.employee,
    repositories.week,
    repositories.day,
    repositories.alteration
  ),
  employee: new EmployeeController(services.employee),
  week: new WeekController(services.week),
  alteration: new AlterationController(services.alteration),
}
