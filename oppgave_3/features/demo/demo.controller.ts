import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import exampleData from '../../data/lunch.json'
import { Alteration, Day, Employee, Week } from '../../types/model'
import EmployeeRepository from '../employee/employee.repository'
import WeekRepository from '../week/week.repository'
import DayRepository from '../day/day.repository'
import AlterationRepository from '../Alteration/alteration.repository'

export default class DemoController {
  constructor(
    private readonly employeeService: EmployeeRepository,
    private readonly weekService: WeekRepository,
    private readonly dayService: DayRepository,
    private readonly alterationService: AlterationRepository
  ) {}

  async seedExampleData(
    req: NextApiRequest,
    res: NextApiResponse<Result<null>>
  ) {
    // TODO: Add algorithm to parse example data.

    res.status(200).json({ status: 200, data: null })
  }
}
