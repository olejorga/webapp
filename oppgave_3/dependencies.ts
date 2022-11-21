import DemoController from './features/demo/demo.controller'
import DayRepository from './features/day/day.repository'
import DayService from './features/day/day.service'
import EmployeeController from './features/employee/employee.controller'
import EmployeeRepository from './features/employee/employee.repository'
import EmployeeService from './features/employee/employee.service'

export const repositories = {
  employee: new EmployeeRepository(),
  day: new DayRepository(),
}

export const services = {
  employee: new EmployeeService(repositories.employee),
  day: new DayService(repositories.day),
}

export const controllers = {
  demo: new DemoController(null, null, null, null),
  employee: new EmployeeController(services.employee),
}
