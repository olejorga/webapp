import { Day } from '../../types/model'
import { ResultAsync } from '../../types/result'
import DayRepository from './day.repository'

export default class DayService {
  constructor(private readonly repository: DayRepository) {}

  async createDay(day: Day): ResultAsync<Day> {
    return this.repository.create(day)
  }

  async getDays(): ResultAsync<Day[]> {
    return this.repository.read()
  }

  async findDayById(id: string): ResultAsync<Day> {
    return this.repository.find(id)
  }
}
