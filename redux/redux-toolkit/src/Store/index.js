import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit"
import TodosReducer, { TODOS_FEATURE_KEY } from "./todos.slice"
import logger from 'redux-logger'

export default configureStore({
  reducer: {
    [TODOS_FEATURE_KEY]: TodosReducer
  },
  devTools: process.env.NODE_ENV !== "production",
  middleware: [...getDefaultMiddleware(), logger]
})
