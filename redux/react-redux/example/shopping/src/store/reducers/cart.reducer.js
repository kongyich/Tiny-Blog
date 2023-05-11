import { handleActions as createReducer } from 'redux-actions'
import { addProductToLocalCart } from '../actions/cart.action'

const initialState = []

function handleAddProductToLocalCart(state, action) {
 // 1. 添加的商品没在购物车中，直接添加
 // 2. 如果已经存在，数量 +1

 const newState = JSON.parse(JSON.stringify(state))
 const product = newState.find(item => item.id === action.payload.id)
 if(product) {
  product.count = product.count + 1
 } else {
  newState.push(action.payload)
 }

 return newState
}

export default createReducer({
  [addProductToLocalCart]: handleAddProductToLocalCart
}, initialState)
