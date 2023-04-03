import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
  const newDom = createDOMElement(virtualDOM)
  container.appendChild(newDom)
  // 获取组件实例对象
  const component = virtualDOM.component
  // 如果组件实例对象存在
  if (component) {
    // 保存 DOM 对象
    component.setDOM(newDom)
  }
  newDom._virtualDOM = virtualDOM
}
