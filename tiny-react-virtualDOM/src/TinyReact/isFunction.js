// Virtual DOM 是否为函数类型
export function isFunction(virtualDOM) {
  return virtualDOM && typeof virtualDOM.type === "function"
}
