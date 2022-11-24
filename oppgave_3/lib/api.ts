import { Result } from '../types/result'

export default function api<Data>(endpoint: string) {
  const get = () => request()

  const post = (body: object) =>
    request({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

  const put = (body: object) =>
    request({
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })

  const request = async (options?: RequestInit) => {
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

  return { get, post, put }
}
