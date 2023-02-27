import TinyPromise from "./tiny-promise5"

// 自定义守卫实现 isPromise 方法
// export const isObject = (val: unknown): val is Record<any, any> =>
//   val !== null && typeof val === 'object'

export const isFunction = (val: unknown): val is Function =>
  typeof val === 'function'

export const isPromise = <T = any>(val: any): val is TinyPromise<T> => {
  return val instanceof TinyPromise
}
