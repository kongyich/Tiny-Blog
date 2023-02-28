import { Resolve, Reject, ExecutorType, onFulfilled, onRejected, PROMISESTATUS } from './actionsTypes'
import { isFunction, isPromise } from './utils'

export default class TinyPromise<T = any> {
  public _status: PROMISESTATUS = PROMISESTATUS.PENDING
  public _value!: T | PromiseLike<T>
  private _fulfilledQueues: Resolve[] = []
  private _rejectedQueues: Reject[] = []

  constructor(executor: ExecutorType<T>) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  private _resolve: Resolve<T> = (resolveValue) => {
    const run = () => {
      if (this._status !== PROMISESTATUS.PENDING) return

      const runFulfilled = (value: any) => {
        let cb;
        while (cb = this._fulfilledQueues.shift()) {
          cb(value)
        }
      }

      const runRejected = (error: any) => {
        let cb
        while (cb = this._rejectedQueues.shift()) {
          cb(error)
        }
      }

      if (isPromise(resolveValue)) {
        resolveValue.then((val) => {
          this._value = val
          this._status = PROMISESTATUS.FULFILLED
          runFulfilled(val)
        }, (err) => {
          this._value = err
          this._status = PROMISESTATUS.REJECTED
          runRejected(err)
        })
      } else {
        this._value = resolveValue
        this._status = PROMISESTATUS.FULFILLED
        runFulfilled(resolveValue)
      }
    }
    setTimeout(run, 0);
  }

  private _reject: Reject = (error) => {
    if (this._status !== PROMISESTATUS.PENDING) return

    const run = () => {
      this._status = PROMISESTATUS.REJECTED
      this._value = error
      let cb;
      while (cb = this._rejectedQueues.shift()) {
        cb(error)
      }
    }
    setTimeout(run, 0)
  }

  public then<TRes1 = T, TRes2 = never>(resolveInThen?: onFulfilled<T, TRes1>, rejectinThen?: onRejected<TRes2>):
    TinyPromise<TRes1 | TRes2> {
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

      switch (_status) {
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

  catch<TRes>(onRejected: onRejected<TRes>): TinyPromise<T | TRes> {
    return this.then(null, onRejected)
  }

  static resolve<T>(value: T | PromiseLike<T>): TinyPromise<T> {
    if (isPromise(value)) {
      return value;
    }

    return new TinyPromise(resolve => {
      resolve(value);
    });
  }

  static reject<T = never>(error: any): TinyPromise<T> {
    return new TinyPromise((resolve, reject) => reject(error))
  }

  static all<T>(list: T[]): TinyPromise<T[]> {
    let values: any[] = []
    let count = 0
    return new TinyPromise((resolve, reject) => {
      for (let [k, v] of list.entries()) {
        this.resolve(v).then((res: any) => {
          values[k] = res
          count++
          if (count === list.length) return resolve(values)
        }, (err: any) => {
          reject(err)
        })
      }
    })
  }

  static race<T>(list: T[]): TinyPromise<T extends PromiseLike<infer U> ? U : T> {
    return new TinyPromise((resolve, reject) => {
      for (let p of list) {
        this.resolve(p).then((res: any) => {
          resolve(res)
        }, (err: any) => {
          reject(err)
        })
      }
    })
  }
}

let p = new TinyPromise((res) => {
  setTimeout(() => {
    let t = new TinyPromise((res2, rej2) => {
      res2('异步1')
    })
    res(t)
  }, 1000)
}).then((val:any) => {
  console.log(val, '1');

  return new TinyPromise((res, rej) => {
    setTimeout(() => {
      res('异步2')
    }, 1000)
  })
}, () => { }).then((val: any) => {
  console.log(val, '2');
}, () => { })

export {}

// let p = new TinyPromise((res) => {
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
