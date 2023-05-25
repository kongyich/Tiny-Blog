import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit'

export const TODOS_FEATURE_KEY = 'todos'

const todosAdapter = createEntityAdapter()

const loadTodos = createAsyncThunk('todos.loadTodos', (payload) => axios.get(payload).then(res => res.data))

const { reducer: TodosReducer, actions } = createSlice({
  name: TODOS_FEATURE_KEY,
  initialState: todosAdapter.getInitialState(),
  reducers: {
    setTodos: todosAdapter.addMany,
    // setTodos: (state, action) => {
    //   // action.payload.forEach(todo => {
    //   //   state.push(todo)
    //   // })
    //   todosAdapter.addMany(state, action.payload)
    // },
    addTodo: {
      reducer: todosAdapter.addOne,
      // reducer: (state, action) => {
      //   // state.push(action.payload)
      //   todosAdapter.addOne(state, action.payload)
      // },
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
    [loadTodos.pending]: (state, action) => {},
    [loadTodos.fulfilled]: todosAdapter.addMany
    // [loadTodos.fulfilled]: (state, action) => {
    //   todosAdapter.addMany(state, action.payload)
    //   // action.payload.forEach(todo => state.push(todo))
    // }
  }
})

export const { addTodo, setTodos } = actions
export default TodosReducer
