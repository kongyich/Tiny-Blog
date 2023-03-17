import { isPlainObj } from './utils'

export function transformRequest(data: any) {
  if (isPlainObj(data)) return JSON.stringify(data)
  return data
}

export function transformResponse(data: any) {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (error) {
      // do something...
    }
  }
  return data
}
