

function createStore(reducer, preloadedState) {
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
