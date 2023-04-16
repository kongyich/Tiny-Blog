
export default function updateElementNode(element, virtualDOM, oldVirtualDOM = {}) {
  const newProps = virtualDOM.props || {}
  const oldProps = oldVirtualDOM.props || {}

  Object.keys(newProps).forEach(key=>{
    const newValue = newProps[key]
    const oldValue = oldProps[key] 

    // key 为 children 不处理
    if(key === 'children') return

    if(newValue !== oldValue) {
      // 事件
      if (key.slice(0, 2) === "on") {
        const eventName = key.slice(2).toLowerCase()
        element.addEventListener(eventName, newValue)

        // 删除原有的事件的事件处理函数
        if (oldValue) {
          element.removeEventListener(eventName, oldValue)
        }
      } else if(key === 'value' || key === 'checked') {
        // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
        element[key] = value
      } else if(key === 'className') {
        // className
        element.setAttribute('class', newValue)
      } else {
        element.setAttribute(key, newValue) 
      }
    }
    
  })

  Object.keys(oldProps).forEach(key => {
    const oldValue = oldProps[key]

    if(!newProps[key]) {
      if(key.slice(0, 2) === 'on') {
        const eventName = key.slice(2).toLowerCase()
        element.removeEventListener(eventName, oldValue)
      } else {
        if(key !== 'children') {
          element.removeAttribute(key)
        }
      }
    }
  })
}
