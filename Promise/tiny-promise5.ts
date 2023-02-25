import { FulFillType, RejectType, ExecutorType, PROMISESTATUS } from './actionsTypes'
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

  _reject(error: any) {
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

  then(resolveInThen: FulFillType, rejectinThen: RejectType) {
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
          if (!isFunction(resolveInThen)) {
            resolveNext(error)
          } else {
            let res = resolveInThen(error);
            if (isPromise(resolveInThen)) {
              res.then(resolveNext, rejectNext)
            } else {
              resolveNext(res)
            }
          }
        } catch (error) {
          rejectNext(error)
        }
        let res = rejectinThen(error);
        rejectNext(res)
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

  catch(onRejected: any) {
    return this.then(() => { }, onRejected)
  }

  static resolve(value: any) {
    if (isPromise(value)) return value
    return new TinyPromise(resolve => resolve(value))
  }

  static reject(error: any) {
    return new TinyPromise((resolve, reject) => reject(error))
  }

  static all(list: any[]) {
    let values: any[] = []
    let count = 0
    return new TinyPromise((resolve, reject) => {
      for (let [k, v] of list.entries()) {
        this.resolve(v).then((res) => {
          values[k] = res
          count++
          if (count === list.length) return resolve(values)
        }, (err) => {
          reject(err)
        })
      }
    })
  }

  static race(list: any[]) {
    return new TinyPromise((resolve, reject) => {
      for (let p of list) {
        this.resolve(p).then((res) => {
          resolve(res)
        }, (err) => {
          reject(err)
        })
      }
    })
  }
}


let p1 = function () {
  return new TinyPromise((resolve) => {
    resolve('p1')
  })
}

let p2 = function () {
  return new TinyPromise((resolve) => {
    setTimeout(() => {
      resolve('p2')
    }, 2000)
  })
}

let p3 = function () {
  return new TinyPromise((resolve) => {
    setTimeout(() => {
      resolve('p3')
    }, 1000)
  })
}

let list = [
  p1(),
  p2(),
  p3()
]

TinyPromise.all(list).then((val) => {
  console.log('Success', val)
}, err => { })
