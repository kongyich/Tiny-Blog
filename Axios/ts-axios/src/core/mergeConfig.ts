
import { AxiosRequestConfig } from '../types/index';
import { isPlainObj } from '../helpers/utils';


const strats = Object.create(null)
export default function mergeConfig(config1: AxiosRequestConfig, config2: AxiosRequestConfig): AxiosRequestConfig {
  if (!config2) config2 = {}

  const config = Object.create(null)

  for (let key in config2) {
    mergeField(key)
  }

  for (let key in config1) {
    if (!config2[key]) {
      mergeField(key)
    }
  }

  function mergeField(key: string) {
    const strat = strats[key] || defaultStrat
    config[key] = strat(config1[key], config2[key])
  }

  return config
}

function defaultStrat(val1: any, val2: any) {
  return typeof val2 !== 'undefined' ? val2 : val1
}

function fromVal2Strat(val1: any, val2: any) {
  if (typeof val2 !== 'undefined') {
    return val2
  }
}

const stratKeysFromVal2 = ['url', 'params', 'data']

stratKeysFromVal2.forEach(key => {
  strats[key] = fromVal2Strat
})

function deepMergeStrat(val1: any, val2: any) {
  if (isPlainObj(val2)) {
    deepMerge(val1, val2)
  } else if (typeof val2 !== 'undefined') {
    return val2
  } else if (isPlainObj(val1)) {
    deepMerge(val1)
  } else if (typeof val1 !== 'undefined') {
    return val1
  }
}

const stratKeysDeepMerge = ['headers']

stratKeysDeepMerge.forEach(key => {
  strats[key] = deepMergeStrat
})

export function deepMerge(...args: any[]) {
  const res = Object.create(null)
  args.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPlainObj(val)) {
          if (isPlainObj(res[key])) {
            res[key] = deepMerge(res[key], val)
          } else {
            res[key] = deepMerge({}, val)
          }
        } else {
          res[key] = val
        }
      })
    }
  })
  return res
}
