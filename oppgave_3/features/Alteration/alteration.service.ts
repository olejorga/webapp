import { Alteration } from '../../types/model'
import { ResultAsync } from '../../types/result'
import AlterationRepository from './alteration.repository'

export default class AlterationService {
  constructor(private readonly repository: AlterationRepository) {}

  async createAlteration(alteration: Alteration): ResultAsync<Alteration> {
    return this.repository.create(alteration)
  }

  async getAlterations(): ResultAsync<Alteration[]> {
    return this.repository.read()
  }
}
