import mountElement from "./mountElement"
import updateComponent from './updateComponent'

export default function diffComponent(newVirtualDOM, oldComponent, oldDOM, container) {
  // 判断要更新的组件和未更新的组件是否是同一个组件
  if(isSameComponent(newVirtualDOM, oldComponent)) {
    // 同一个组件
    updateComponent(newVirtualDOM, oldComponent, oldDOM, container)
  } else {
    // 不同
    mountElement(newVirtualDOM, container, oldDOM)
  }
}

function isSameComponent(virtualDOM, component) {
  return component && virtualDOM.type === component.constructor
}
