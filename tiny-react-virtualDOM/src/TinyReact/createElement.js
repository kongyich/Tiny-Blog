export default function createElement(type, props, ...children) {
  const childElements = [].concat(children).reduce((res, cur) => {
    if(cur !== true && cur !== false && cur !== null) {
      if(cur instanceof Object) {
        res.push(cur)
      } else {
        res.push(createElement('text', { textContent: cur }))
      }
    }
    return res
  }, [])
  return {
    type,
    props: Object.assign({ children: childElements }, props),
    children: childElements
  }
} 
