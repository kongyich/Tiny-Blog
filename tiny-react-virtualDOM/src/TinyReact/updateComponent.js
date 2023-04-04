import diff from './diff'

export default function updateComponent(virtualDOM, oldComponent, oldDOM, container) {
   // 生命周期函数
   oldComponent.componentWillReceiveProps(virtualDOM.props)
   if (
     // 调用 shouldComponentUpdate 生命周期函数判断是否要执行更新操作
     oldComponent.shouldComponentUpdate(virtualDOM.props)
   ) {
     // 将未更新的 props 保存一份
     let prevProps = oldComponent.props
     // 生命周期函数
     oldComponent.componentWillUpdate(virtualDOM.props)
     // 更新组件的 props 属性 updateProps 方法定义在 Component 类型
     oldComponent.updateProps(virtualDOM.props)
     // 因为组件的 props 已经更新 所以调用 render 方法获取最新的 Virtual DOM
     const nextVirtualDOM = oldComponent.render()
     // 将组件实例对象挂载到 Virtual DOM 身上
     nextVirtualDOM.component = oldComponent
     // 调用diff方法更新视图
     diff(nextVirtualDOM, container, oldDOM)
     // 生命周期函数
     oldComponent.componentDidUpdate(prevProps)
   }
}
