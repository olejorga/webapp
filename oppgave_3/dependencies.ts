import DemoController from './features/demo/demo.controller'
import EmployeeController from './features/employee/employee.controller'
import EmployeeRepository from './features/employee/employee.repository'
import EmployeeService from './features/employee/employee.service'

export const repositories = {
  employee: new EmployeeRepository(),
}

export const services = {
  employee: new EmployeeService(repositories.employee),
}

export const controllers = {
  demo: new DemoController(null, null, null, null),
  employee: new EmployeeController(services.employee),
}
