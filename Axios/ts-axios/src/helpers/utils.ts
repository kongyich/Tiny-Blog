const toString = Object.prototype.toString

function judgment(val: any): string {
  if (typeof val !== 'object') return typeof val
  return toString
    .call(val)
    .slice(8, -1)
    .toLowerCase()
}

export const isDate = (val: any): val is Date => 'date' === judgment(val)

export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

export const isPlainObj = (val: any): val is Object => judgment(val) === 'object'

export const extend = function <T, U>(to: T, from: U): T & U {
  for (const key in from) {
    (to as T & U)[key] = from[key] as any
  }
  return (to as T & U)
}
