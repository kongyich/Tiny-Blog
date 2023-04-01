import diff from './diff'

export default function render(virtualDOM, container, oldDom = container.firstChild) {
  diff(virtualDOM, container, oldDom)
}
