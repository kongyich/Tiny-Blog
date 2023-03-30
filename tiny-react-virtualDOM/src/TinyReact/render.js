import diff from './diff'

export default function render(virtualDOM, container, oldDom = null) {
  diff(virtualDOM, container, oldDom)
}
