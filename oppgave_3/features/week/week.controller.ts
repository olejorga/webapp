import { NextApiRequest, NextApiResponse } from 'next'
import { Result, Week } from '../../types'
import WeekService from './week.service'

export default class WeekController {
  constructor(private readonly service: WeekService) {}

  async createWeek(req: NextApiRequest, res: NextApiResponse<Result<Week>>) {
    const week: Week = req.body
    res.json(await this.service.createWeek(week))
  }

  async getWeeks(req: NextApiRequest, res: NextApiResponse<Result<Week[]>>) {
    const result = await this.service.getWeek()
    return res.status(result.status).json(result)
  }

  async findWeekById(req: NextApiRequest, res: NextApiResponse<Result<Week>>) {
    const { id } = req.query
    if (id) {
      const result = await this.service.findWeekById(id as string)
      return res.status(result.status).json(result)
    } else {
      return res.status(400).json({ status: 400, message: 'Missing id.' })
    }
  }

  async period(req: NextApiRequest, res: NextApiResponse<Result<Week[]>>) {
    const { start, end } = req.query
    if (start && end) {
      const result = await this.service.getWeeksByPeriod(
        start as unknown as number,
        end as unknown as number
      )
      return res.status(result.status).json(result)
    } else {
      return res.status(400).json({ status: 400, message: 'Missing period' })
    }
  }
}
