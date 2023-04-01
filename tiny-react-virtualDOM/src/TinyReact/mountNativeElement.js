import createDOMElement from './createDOMElement'

export default function mountNativeElement(virtualDOM, container) {
  const newDom = createDOMElement(virtualDOM)
  container.appendChild(newDom)
  newDom._virtualDOM = virtualDOM
}
