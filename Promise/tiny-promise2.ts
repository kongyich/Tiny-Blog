import { FulFillType, RejectType, ExecutorType, PROMISESTATUS } from './actionsTypes'

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
    // this._status = PROMISESTATUS.FULFILLED
    // this._value = resolveValue
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
    // this._status = PROMISESTATUS.REJECTED
    // this._value = error

    this._status = PROMISESTATUS.REJECTED
    this._value = error
    let cb;
    while (cb = this._rejectedQueues.shift()) {
      cb(error)
    }
  }

  then(resolveInThen: FulFillType, rejectinThen: RejectType) {
    const {
      _value,
      _status
    } = this
    return new TinyPromise((resolveNext, rejectNext) => {

      const fulfilled = (val: any) => {
        let res = resolveInThen(val);
        resolveNext(res)
      }

      const rejected = (error: any) => {
        let res = rejectinThen(error);
        rejectNext(res)
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

      // if(_status === PROMISESTATUS.FULFILLED) {
      //   let result = resolveInThen(_value)
      //   resolve(result)
      // }

      // if(_status === PROMISESTATUS.REJECTED) {
      //   let result = rejectinThen(_value)
      //   resolve(result)
      // }
    })
  }
}


let p = new TinyPromise((res) => {
  setTimeout(() => {
    res('p')
  }, 1000);
}).then((val)=>{
  console.log(val, '1');
  return val
}, () => {}).then((val)=>{
  console.log(val, '2');
}, () => {})
