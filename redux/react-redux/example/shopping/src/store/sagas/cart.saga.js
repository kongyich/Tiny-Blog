import { takeEvery, put } from 'redux-saga/effects'
import { addProductToCart, addProductToLocalCart } from '../actions/cart.action'
import axios from 'axios'


function* handleAddProductToCart(action) {
  const { data } = yield axios.post('http://localhost:3005/cart/add', {
    gid: action.payload
  })

  console.log(data, 'data')

  yield put(addProductToLocalCart(data))
}

export default function* productSaga() {
  // 加载商品列表数据
  yield takeEvery(addProductToCart, handleAddProductToCart)
}
