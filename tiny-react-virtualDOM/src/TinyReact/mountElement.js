import mountNativeElement from './mountNativeElement'
import {isFunction} from './isFunction'
import mountComponent from './mountComponent'

export default function mountElement(virtualDOM, container) {
  if(isFunction(virtualDOM)) {
    mountComponent(virtualDOM, container)
  } else {
    mountNativeElement(virtualDOM, container)
  }
}
