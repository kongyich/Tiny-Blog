import axios from '../../src/index'

// get
axios({
  method: 'get',
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})

// array
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
})

// object
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
})

// Date
const date = new Date()

axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
})

// 特殊字符
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$, '
  }
})

// null / undefined
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
})

// #哈希
axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'bar'
  }
})

// catch
axios({
  method: 'get',
  url: '/base/get?foo=bar',
  params: {
    bar: 'baz'
  }
})
