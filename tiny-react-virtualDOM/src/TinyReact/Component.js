import diff from './diff'

export default class Component {
  constructor(props) {
    this.props = props
  }
  setState(state) {
    this.state = Object.assign({}, this.state, state)
    // 通过调用 render 方法获取最新的 Virtual DOM
    let virtualDOM = this.render()

    // 获取页面中正在显示的 DOM 对象 通过它可以获取其对象的 Virtual DOM 对象
    let oldDOM = this.getDOM()

    // 获取真实 DOM 对象父级容器对象
    let container = oldDOM.parentNode
    // 比对
    diff(virtualDOM, container, oldDOM)
  }
  // 保存 DOM 对象的方法
  setDOM(dom) {
    this._dom = dom
  }
  // 获取 DOM 对象的方法
  getDOM() {
    return this._dom
  }
  updateProps(props) {
    this.props = props
  }
   // 生命周期函数
   componentWillMount() {}
   componentDidMount() {}
   componentWillReceiveProps(nextProps) {}
   shouldComponentUpdate(nextProps, nextState) {
     return nextProps != this.props || nextState != this.state
   }
   componentWillUpdate(nextProps, nextState) {}
   componentDidUpdate(prevProps, preState) {}
   componentWillUnmount() {}
}
