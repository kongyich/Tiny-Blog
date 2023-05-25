import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const TODOS_FEATURE_KEY = 'todos'

const loadTodos = createAsyncThunk('todos.loadTodos', (payload) => axios.get(payload).then(res => res.data))

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: [],
  reducers: {
    setTodos: (state, action) => {
      action.payload.forEach(todo => {
        state.push(todo)
      })
    },
    // addTodo: (state, action) => {
    //   state.push(action.payload)
    // },
    addTodo: {
      reducer: (state, action) => {
        state.push(action.payload)
      },
      prepare: todo => {
        return { 
          payload: {
            id: Math.random(),
            ...todo
          } 
        }
      }
    }
  },
  extraReducers: {
    [loadTodos.pending]: (state, action) => {}
    [loadTodos.fulfilled]: (state, action) => {
      action.payload.forEach(todo => state.push(todo))
    }
  }
})

export const { addTodo, setTodos } = actions
export default TodosReducer
