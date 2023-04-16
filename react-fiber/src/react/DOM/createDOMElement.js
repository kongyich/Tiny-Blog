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
  return newElement
}
