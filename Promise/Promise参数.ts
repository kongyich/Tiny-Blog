import { ExecutorType, PROMISESTATUS } from './actionsTypes'
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

  then(resolveInThen: any, rejectinThen: any) {
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
}

let p = new TinyPromise((res) => {
  setTimeout(() => {
    let t = new TinyPromise((res2, rej2) => {
      res2('res2-p')
    })
    res(t)
  }, 1000)
}).then((val:any) => {
  console.log(val, '1');

  return new TinyPromise((res, rej) => {
    setTimeout(() => {
      res('async p2')
    }, 1000)
  })
}, () => { }).then((val: any) => {
  console.log(val, '2');
}, () => { })

export {}
