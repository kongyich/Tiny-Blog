import React, { render } from './react'

const root = document.getElementById('root')
const jsx = (
  <div>
    <p>hello react</p>
  </div>
)

render(jsx, root)
console.log(jsx);
