// TODO: Her er det bugs

import type { NextApiRequest, NextApiResponse } from 'next'

// Added import statement
import { countries } from '../../data'

type Response = {
  success: boolean,
  data: Country
}

type Country = {
  name: string
  iso2: string
  iso3: string
  unicodeFlag: string
} | null

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const country = countries[Math.floor(Math.random() * countries.length)]
  // Added 200 return status
  if(req.method === 'GET') {
    if(country){
      return res.status(200).json({success: true, data: country})
    }
    return res.status(404).json({ success: false, data: null })
  }
}
