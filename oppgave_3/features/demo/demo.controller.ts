import { NextApiRequest, NextApiResponse } from 'next'
import { Result } from '../../types/result'
import exampleData from '../../data/lunch.json'
import { Alteration, Day, Employee, Week } from '../../types/model'

export default class DemoController {
  constructor(
    private readonly employeeService: null,
    private readonly weekService: null,
    private readonly dayService: null,
    private readonly alterationService: null
  ) {}

  async seedExampleData(
    req: NextApiRequest,
    res: NextApiResponse<Result<null>>
  ) {
    // TODO: Add algorithm to parse example data.

    res.status(200).json({ status: 200, data: null })
  }
}
