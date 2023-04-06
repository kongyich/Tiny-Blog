import mountElement from './mountElement'
import updateElementNode from './updateElementNode'
import updateTextNode from './updateTextNode'
import createElement from './createElement'
import unmount from './unmount'

export default function diff(newVirtualDOM, container, oldDOM) {
const oldVirtualDOM = oldDOM && oldDOM._virtualDOM
const oldComponent = oldVirtualDOM && oldVirtualDOM.component
if(!oldDOM) {
  mountElement(newVirtualDOM, container)
} else if(oldVirtualDOM.type !== newVirtualDOM.type && typeof newVirtualDOM.type !== 'function') {
  const newElement = createElement(virtualDOM)
  oldDOM.parentNode.replaceChild(newElement, oldDOM)
} else if(typeof newVirtualDOM.type === 'function') {
  // 更新的是组件
  diffComponent(newVirtualDOM, oldComponent, oldDOM, container)
} else if(oldVirtualDOM && oldVirtualDOM.type === newVirtualDOM.type) {
    if(newVirtualDOM.type === 'text') {
      // 文本节点
      updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM)
    } else {
      // 其他节点
      updateElementNode(oldDOM, newVirtualDOM, oldVirtualDOM)
    }


    let keyedElements = {}

    for(let i = 0; i < oldDOM.childNodes.length; i++) {
      let domElement = oldDOM.childNodes[i]
      if (domElement.nodeType === 1) {
        let key = domElement.getAttribute("key")
        if (key) {
          keyedElements[key] = domElement
        }
      }
    }

    let hasNoKey = Object.keys(keyedElements).length === 0

    if(hasNoKey) {
      newVirtualDOM.children.forEach((item, index) => {
        diff(item, oldDOM, oldDOM.childNodes[index])
      })
    } else {
      newVirtualDOM.children.forEach((child, index) => {
        const key = chils.props.key

        if(key) {
          let domElement = keyedElements[key]
          if(domElement) {
            if(oldDOM.childNodes[index] && oldDOM.childNodes[index] !== domElement) {
              oldDOM.insertBefore(domElement, oldDOM.childNodes[index])
            }
          }
        } else {
          mountElement(child, oldDOM, oldDOM.childNodes[index])
        }
      })
    }

    let oldChildNodes = oldDOM.childNodes
    if(oldChildNodes.length > newVirtualDOM.children.length) {
      if(hasNoKey) {
        for(let i = oldChildNodes.length - 1; i > newVirtualDOM.children.length - 1; i--) {
          oldDOM.removeChild(oldChildNodes[i])
        }
      } else {
        for(let i = 0; i < oldChildNodes.length; i++) {
          const oldChild = oldChildNodes[i]
          const oldChildKey = oldChild._virtualDOM.props.key 
          let found = false
          
          for(let n = 0; n < newVirtualDOM.children.length; n++) {
            if(oldChildKey === newVirtualDOM.children[n].props.key) {
              found = true
              break
            }
          }
          if (!found) {
            unmount(oldChild)
            i--
          }
        }
      }
      
    }
  }
}
