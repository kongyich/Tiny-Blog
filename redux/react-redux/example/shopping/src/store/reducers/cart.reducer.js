import { handleActions as createReducer } from 'redux-actions'
import { addProductToLocalCart, saveCarts, deleteProductFromLocalCart, changeLocalProductNumber} from '../actions/cart.action'

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

function handleDeleteProductFromLocalCart(state, action) {
  const newState = JSON.parse(JSON.stringify(state))

  const index = newState.findIndex(item => item.id === action.payload)

  newState.splice(index, 1)
  return newState
}

function handleChangeLocalProductNumber(state, action) {
  const newState = JSON.parse(JSON.stringify(state))

  const product = newState.find(item => item.id === action.payload.id)

  product.count = action.payload.count
  return newState
}


const handleSaveCarts = (state, action) => action.payload

export default createReducer({
  [addProductToLocalCart]: handleAddProductToLocalCart,
  [saveCarts]: handleSaveCarts,
  [deleteProductFromLocalCart]: handleDeleteProductFromLocalCart,
  [changeLocalProductNumber]: handleChangeLocalProductNumber
}, initialState)
