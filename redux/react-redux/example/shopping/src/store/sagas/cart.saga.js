import { takeEvery, put } from 'redux-saga/effects'
import { addProductToCart, addProductToLocalCart, loadCarts, saveCarts } from '../actions/cart.action'
import axios from 'axios'


function* handleAddProductToCart(action) {
  const { data } = yield axios.post('http://localhost:3005/cart/add', {
    gid: action.payload
  })
  yield put(addProductToLocalCart(data))
}


function* handleLoadCarts() {
  const { data } = yield axios.get('http://localhost:3005/cart')

  yield put(saveCarts(data))
}

export default function* productSaga() {
  // 加载商品列表数据
  yield takeEvery(addProductToCart, handleAddProductToCart)

  yield takeEvery(loadCarts, handleLoadCarts)
}
