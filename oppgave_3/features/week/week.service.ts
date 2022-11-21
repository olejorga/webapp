import { Result, ResultAsync, Week } from '../../types'
import WeekRepository from './week.repository'

export default class WeekService {
  constructor(private readonly repository: WeekRepository) {}

  async createWeek(week: Week): ResultAsync<Week> {
    return this.repository.create(week)
  }

  async getWeek(): ResultAsync<Week[]> {
    return this.repository.read()
  }

  async findWeekById(id: string): ResultAsync<Week> {
    return this.repository.find(id)
  }

  async getWeeksByPeriod(start: number, end: number): ResultAsync<Week[]> {
    return this.repository.period(start, end)
  }
}
