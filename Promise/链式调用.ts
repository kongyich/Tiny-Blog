import { ExecutorType, PROMISESTATUS, onFulfilled } from './actionsTypes'
import { isFunction, isPromise } from './utils'

export default class TinyPromise<T = any> {
  private _status = PROMISESTATUS.PENDING
  private _value: any
  private _fulfilledQueues: Function[] = []
  private _rejectedQueues: Function[] = []

  constructor(executor: ExecutorType<T>) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  _resolve(resolveValue: any) {

    if(this._status !== PROMISESTATUS.PENDING) return
    const runFulfilled = (value: any) => {
      let cb;
      while(cb = this._fulfilledQueues.shift()) {
        cb(value)
      }
    }

    this._value = resolveValue
    this._status = PROMISESTATUS.FULFILLED
    runFulfilled(resolveValue)
  }
  _reject(error: any) {

    this._status = PROMISESTATUS.REJECTED
    this._value = error
    let cb;
    while (cb = this._rejectedQueues.shift()) {
      cb(error)
    }
  }

  then(resolveInThen?: any, rejectinThen?: any) {
    const {
      _value,
      _status
    } = this
    return new TinyPromise((resolveNext, rejectNext) => {

      const fulfilled = (val: any) => {
        try {
          if (!isFunction(resolveInThen)) {
            resolveNext(val)
          } else {
            let res = resolveInThen(val);
            if (isPromise(res)) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (error) {
          rejectNext(error)
        }
      }

      const rejected = (error: any) => {
        try {
          if (!isFunction(rejectinThen)) {
            rejectNext(error)
          } else {
            let res = rejectinThen(error);
            if (isPromise(res)) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (error) {
          rejectNext(error)
        }
      }

      switch(_status) {
        case PROMISESTATUS.PENDING:
          this._fulfilledQueues.push(fulfilled)
          this._rejectedQueues.push(rejected)
        break
        case PROMISESTATUS.FULFILLED:
          fulfilled(_value)
        break
        case PROMISESTATUS.REJECTED:
          rejected(_value)
        break
      }
    })
  }
}

// let p1 = new TinyPromise((res) => {
//   setTimeout(() => {
//     res('第一个异步Promise')
//   }, 1000)
// }).then((val: any)=>{
//   console.log(val, '第一个then');
  
//   return new TinyPromise((res, rej) => {
//     setTimeout(() => {
//       res('第二个异步Promise')
//     }, 1000)
//   })
// }, () => {}).then((val: any)=>{
//   console.log(val, '第二个then');
// }, () => {})

new TinyPromise((reslove) => {
  reslove('hello')
})
  .then()
  .then()
  .then()
  .then((res: any) => {
    console.log(res) // 'hello'
  })

export {}
