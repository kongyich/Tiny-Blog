import { handleActions as createReducer } from 'redux-actions'
import { saveProducts } from '../actions/product.action'

const initialState = []

const handleSaveProducts = (state, action) => action.payload

export default createReducer({
  [saveProducts]: handleSaveProducts
}, initialState)
