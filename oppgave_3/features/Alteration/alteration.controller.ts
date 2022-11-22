import { NextApiRequest, NextApiResponse } from 'next'
import { Alteration } from '../../types/model'
import { Result } from '../../types/result'
import AlterationService from './alteration.service'

export default class AlterationController {
  constructor(private readonly service: AlterationService) {}

  async createAlteration(
    req: NextApiRequest,
    res: NextApiResponse<Result<Alteration>>
  ) {
    const alteration: Alteration = req.body
    const result = await this.service.createAlteration(alteration)
    return res.status(result.status).json(result)
  }

  async getAlterations(
    req: NextApiRequest,
    res: NextApiResponse<Result<Alteration[]>>
  ) {
    const result = await this.service.getAlterations()
    return res.status(result.status).json(result)
  }
}
