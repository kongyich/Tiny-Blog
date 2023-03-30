
export default function updateElementNode(element, virtualDOM) {
  const props = virtualDOM.props

  Object.keys(props).forEach(key=>{
    const value = props[key]
    // key 为 children 不处理
    if(key === 'children') return
    // 事件
    if (key.slice(0, 2) === "on") {
      const eventName = key.slice(2).toLowerCase()
      element.addEventListener(eventName, value)
    } else if(key === 'value' || key === 'checked') {
      // 如果属性名称是 value 或者 checked 需要通过 [] 的形式添加
      element[key] = value
    } else if(key === 'className') {
      // className
      element.setAttribute('class', value)
    } else {
      element.setAttribute(key, value) 
    }
  })
}
