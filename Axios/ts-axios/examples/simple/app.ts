import axios from '../../src/index'
import { METHODSTYPE } from '../../src/types'

axios({
  method: METHODSTYPE.GET,
  url: '/simple/get',
  params: {
    a: 1,
    b: 2
  }
})
