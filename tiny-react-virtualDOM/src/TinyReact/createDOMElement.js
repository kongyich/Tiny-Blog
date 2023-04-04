import mountElement from "./mountElement"
import updateElementNode from './updateElementNode'

export default function createDOMElement(virtualDOM) {
  let newElement = null
  
  

  if(virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent) 
  } else {
     // 创建元素节点
    newElement = document.createElement(virtualDOM.type) 
    // 为元素设置属性
    updateElementNode(newElement, virtualDOM)
  }

  if (virtualDOM.props && virtualDOM.props.ref) {
    virtualDOM.props.ref(newElement)
  }

  virtualDOM.children.forEach(ele=>{
    mountElement(ele, newElement)
  })

 

  return newElement
}
