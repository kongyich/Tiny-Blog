type FulFillType<T = any> = (resolveValue: T) => any
type RejectType = (rejectValue: any) => any

type ExecutorType<T> = (resolve: FulFillType, reject: RejectType) => any

enum PROMISESTATUS {
  PENDING = 0,
  FULFILLED,
  REJECTED
}

export { FulFillType, RejectType, ExecutorType, PROMISESTATUS }
