

function createStore(reducer, preloadedState) {

  if(typeof reducer !== 'function') throw new Error('reducer必须是函数')
  // 当前存储的状态
  let state = preloadedState
  // 订阅者列表
  let listeners = []
  // 获取状态
  function getState() {
    return state
  }

  // 触发action
  function dispatch(action) {
    // 判断action是否为对象？
    if(!isPlanObject(action)) throw new Error('action必须为对象')

    // 判断对象是否具有type属性
    if(typeof action.type === 'undefined')  throw new Error('action必须存在type属性')

    state = reducer(state, action)

    for(let i = 0; i < listeners.length; i++) {
      // 获取订阅者
      const listener = listeners[i]
      // 调用订阅者
      listener()
    }
  }


  // 订阅状态
  function subscribe(listener) {
    listeners.push(listener)
  }

  return {
    getState,
    dispatch,
    subscribe
  }
}


function isPlanObject(obj) {
  if(typeof obj !== 'object' || obj === null) return false

  let proto = obj

  while(Object.getPrototypeOf(proto) != null) {
    proto = Object.getPrototypeOf(proto)
  }

  return Object.getPrototypeOf(obj) === proto
}
