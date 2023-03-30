import mountElement from './mountElement'

export default function diff(virtualDOM, container, oldDom) {
  if(!oldDom) {
    mountElement(virtualDOM, container)
  }
}
