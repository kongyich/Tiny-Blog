import TinyReact from "./TinyReact"

const root = document.getElementById("root")

class DemoRef extends TinyReact.Component {
  handle() {
    let value = this.input.value
    console.log(value)
    console.log(this.alert)
  }
  componentDidMount() {
    console.log("componentDidMount")
  }
  render() {
    return (
      <div>
        <input type="text" ref={input => (this.input = input)} />
        <button onClick={this.handle.bind(this)}>按钮</button>
        <Alert ref={alert => (this.alert = alert)} />
      </div>
    )
  }
}

// class DemoRef extends TinyReact.Component {
//   handle() {
//     let value = this.input.value
//     console.log(value)
//   }
//   render() {
//     return (
//       <div>
//         <input type="text" ref={input => (this.input = input)} />
//         <button onClick={this.handle.bind(this)}>按钮</button>
//       </div>
//     )
//   }
// }
class Alert extends TinyReact.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: "default title"
    }
    // 更改 handleChange 方法中的 this 指向 让 this 指向类实例对象
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange() {
    // 调用父类中的 setState 方法更改状态
    this.setState({
      title: "changed title"
    })
  }
  render() {
    return (
      <div>
        <h2>{this.state.title}</h2>
        <p>{this.props.message}</p>
        <button onClick={this.handleChange}>change title</button>
      </div>
    )
  }
}

// const oldVirtualDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2>(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>原始h3</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>这是一段内容</span>
//     <button onClick={() => alert("你好")}>点击我</button>
//     <h3>这个将会被删除</h3>
//     2, 3
//   </div>
// )


// const newVirtualDOM = (
//   <div className="container">
//     <h1>你好 Tiny React</h1>
//     <h2>new up! up!! up!!!(编码必杀技)</h2>
//     <div>
//       嵌套1 <div>嵌套 1.1</div>
//     </div>
//     <h3>(观察: 这个将会被改变h3)</h3>
//     {2 == 1 && <div>如果2和1相等渲染当前内容</div>}
//     {2 == 2 && <div>2</div>}
//     <span>改变了</span>
//     <button onClick={() => alert("你好!!!")}>点击我</button>
//     <h3>这个将会被删除</h3>
//     2, 3
//   </div>
// )

// TinyReact.render(oldVirtualDOM, root)

// setTimeout(() => {
//   TinyReact.render(newVirtualDOM, root) 
// }, 3000)


 // console.log(TinyReact.render(virtualDOM, document.querySelector('#root')))
//  const Heart = () => <span>&hearts;</span>

// TinyReact.render(<Heart />, document.querySelector('#root'))


// class Alert extends TinyReact.Component {
//   constructor(props) {
//     super(props)
//   }
//   render() {
//     return <div>
//       <span>{this.props.name}</span>
//       <span>{this.props.age}</span>
//     </div>
//   }
// }
TinyReact.render(<DemoRef />, root)
