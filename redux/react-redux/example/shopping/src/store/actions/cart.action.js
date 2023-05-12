import { createAction } from 'redux-actions';

export const addProductToCart = createAction('addProductToCart')

export const addProductToLocalCart = createAction('addProductToLocalCart')

// 获取购物车数据
export const loadCarts = createAction('loadCarts')
// 本地保存数据
export const saveCarts = createAction('saveCarts')
