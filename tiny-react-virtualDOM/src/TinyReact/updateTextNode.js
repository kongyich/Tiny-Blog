export default function updateTextNode(newVirtualDOM, oldVirtualDOM, oldDOM) {
  if(newVirtualDOM.props.textContent !== oldVirtualDOM.props.textContent) {
    oldDOM.textContent = newVirtualDOM.props.textContent
  }
  oldVirtualDOM._virtualDOM = newVirtualDOM
}
