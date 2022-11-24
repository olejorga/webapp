import { Result } from '../types/result'

export default async function api<Data>(
  endpoint: string,
  options?: RequestInit
): Promise<Result<Data>> {
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API + endpoint,
      options
    )
    const result: Result<Data> = await response.json()

    return result
  } catch (error) {
    return {
      status: 500,
      error: (error as Error).message,
    }
  }
}
