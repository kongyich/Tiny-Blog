import mountElement from './mountElement'
import updateElementNode from './updateElementNode'
import updateTextNode from './updateTextNode'
import createElement from './createElement'

export default function diff(newVirtualDOM, container, oldDOM) {
const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
if(!oldDOM) {
  mountElement(newVirtualDOM, container)
} else if(oldVirtualDOM.type !== newVirtualDOM.type && typeof newVirtualDOM.type !== 'function') {
  const newElement = createElement(virtualDOM)
  oldDOM.parentNode.replaceChild(newElement, oldDOM)
} else if(oldVirtualDOM && oldVirtualDOM.type === newVirtualDOM.type) {
    if(newVirtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 其他节点
      updateElementNode(oldDOM, newVirtualDOM, oldVirtualDOM)
    }

    newVirtualDOM.children.forEach((item, index) => {
      diff(item, oldDOM, oldDOM.childNodes[index])
    })
  }
}
