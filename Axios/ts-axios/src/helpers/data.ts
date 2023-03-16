import { isPlainObj } from "./utils";

export function transformRequest(data: any) {
  if (isPlainObj(data)) return JSON.stringify(data)
  return data
}
