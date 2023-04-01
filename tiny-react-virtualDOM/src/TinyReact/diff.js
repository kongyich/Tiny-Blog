import mountElement from './mountElement'

export default function diff(newVirtualDOM, container, oldDOM) {
  if(!oldDOM) {
    mountElement(virtualDOM, container)
  } else {
    const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
    if(oldVirtualDOM && oldVirtualDOM.type === newVirtualDOM.type) {
      if(newVirtualDOM.type === 'text') {
        // 文本节点
        updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM)
      } else {
        // 其他节点
        
      }
    }
  }
}


function updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM) {
  if(newVirtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = newVirtualDOM.props.textContent
  }
  oldVirtualDOM._virtualDOM = newVirtualDOM
}
