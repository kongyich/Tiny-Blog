import mountElement from "./mountElement"


export default function createDOMElement(virtualDOM) {
  let newElement = null

  if(virtualDOM.type === 'text') {
    newElement = document.createTextNode(virtualDOM.props.textContent) 
  } else {
     // 创建元素节点
    newElement = document.createElement(virtualDOM.type) 
  }

  virtualDOM.children.forEach(ele=>{
    mountElement(ele, newElement)
  })

  return newElement
}
