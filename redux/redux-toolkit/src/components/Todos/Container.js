import TodoFooter from "./Footer"
import TodoHeader from "./Header"
import TodoMain from "./Main"
import TodoApp from "./TodoApp"

function Container() {
  return (
    <TodoApp>
      <TodoHeader />
      <TodoMain />
      <TodoFooter />
    </TodoApp>
  )
}

export default Container
