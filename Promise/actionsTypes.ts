
type Resolve<T = any> = (resolveValue: T | PromiseLike<T>) => void
type Reject = (rejectValue: any) => void

type ExecutorType<T> = (resolve: Resolve<T>, reject: Reject) => void

// 非函数 / 返回值/promise
type onFulfilled<T, TRes1> = ((value: T) => TRes1 | PromiseLike<TRes1>) | undefined | null
type onRejected<TRes2> = ((err: any) => TRes2 | PromiseLike<TRes2>) | undefined | null

enum PROMISESTATUS {
  PENDING = 'pending',
  FULFILLED = 'fulfilled',
  REJECTED = 'rejected'
}

export { Resolve, Reject, ExecutorType, onFulfilled, onRejected, PROMISESTATUS }
