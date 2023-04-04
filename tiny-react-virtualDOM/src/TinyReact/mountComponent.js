import { isFunction } from "./isFunction";
import isFunctionComponent from "./isFunctionComponent";
import mountNativeElement from "./mountNativeElement";

export default function mountComponent(virtualDOM, container, oldDOM) {
  let nextVirtualDOM, component = null;
  if(isFunctionComponent(virtualDOM)) {
    // 函数组件
    nextVirtualDOM = buildFunctionComponent(virtualDOM)
  } else {
    // 类组件
    nextVirtualDOM = buildClassComponent(virtualDOM)
    // 获取组件实例对象
    component = nextVirtualDOM.component
  }

  if (component) {
    // 判断组件实例对象身上是否有 props 属性 props 属性中是否有 ref 属性
   if (component.props && component.props.ref) {
     // 调用 ref 方法并传递组件实例对象
     component.props.ref(component)
   }
   component.componentDidMount()
 }

  if(isFunction(nextVirtualDOM)) {
    mountComponent(nextVirtualDOM, container, oldDOM)
  } else {
    mountNativeElement(nextVirtualDOM, container, oldDOM)
  }
}

function buildFunctionComponent(virtualDOM) {
  return virtualDOM && virtualDOM.type(virtualDOM.props || {})
}

function buildClassComponent(virtualDOM) {
  const component = new virtualDOM.type(virtualDOM.props || {})
  const nextVirtualDOM = component.render()
  nextVirtualDOM.component = component
  return nextVirtualDOM 
}
