import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container, oldDOM) {

  if(oldDOM) {
    unmount(oldDOM)
  }
  
  const newDom = createDOMElement(virtualDOM)
  if (oldDOM) {
    container.insertBefore(newElement, oldDOM)
  } else {
    // 将转换之后的DOM对象放置在页面中
    container.appendChild(newElement)
  }
  // 获取组件实例对象
  const component = virtualDOM.component
  // 如果组件实例对象存在
  if (component) {
    // 保存 DOM 对象
    component.setDOM(newDom)
  }
  newDom._virtualDOM = virtualDOM
}

// unmount.js
function unmount(node) {
  node.remove()
}
