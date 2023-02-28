import { Resolve, Reject, ExecutorType, PROMISESTATUS } from './actionsTypes'

export default class TinyPromise<T = any> {
  private _status = PROMISESTATUS.PENDING
  private _value: any

  constructor(executor: ExecutorType<T>) {
    try {
      executor(this._resolve.bind(this), this._reject.bind(this))
    } catch (error) {
      this._reject(error)
    }
  }

  _resolve(resolveValue: any) {
    this._status = PROMISESTATUS.FULFILLED
    this._value = resolveValue
  }
  _reject(error: any) {
    this._status = PROMISESTATUS.REJECTED
    this._value = error
  }

  public then(resolveInThen: Resolve, rejectinThen: Reject) {
    const {
      _value,
      _status
    } = this

    if(_status === PROMISESTATUS.FULFILLED) {
      resolveInThen(_value)
    }

    if(_status === PROMISESTATUS.REJECTED) {
      rejectinThen(_value)
    }
  }
}

let p = new TinyPromise((res) => {
  res('haha')
}).then((val)=>{
  console.log(val, 'valll');
}, () => {})

export {}
