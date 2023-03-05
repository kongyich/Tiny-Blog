import { App, inject } from 'vue'

const injectKey = "store"

export function useStore<S>(): TinyStore<S> {
  return inject(injectKey) as any
}

export function createStore<S>(options: StoreOptions<S>) {
  return new TinyStore<S>(options)
}

class TinyStore<S = any> {
  moduleCollection: ModuleCollection<S>
  mutations: Record<string, any> = {}
  actions: Record<string, any> = {}
  getters: GetterTree<any, S> = {}
  commit: Commit
  dispatch: Dispatch
  constructor(options: StoreOptions<S>) {
    this.moduleCollection = new ModuleCollection<S>(options)

    // eslint-disable-next-line
    const store = this
    // eslint-disable-next-line
    const ref = this
    const commit = ref.commit_
    const dispatch = ref.dispatch_
    this.commit = function boundCommit(type: string, payload: any) {
      commit.call(store, type, payload)
    }
    this.dispatch = function boundDispatch(type: string, payload: any) {
      dispatch.call(store, type, payload)
    }

    // 注册state模块
    const rootState = this.moduleCollection.root.state
    installModule(store, rootState, [], this.moduleCollection.root)
    console.log('注册完成', rootState)
  }

  install(app: App) {
    app.provide(injectKey, this)
  }

  test() {
    return 'is a test'
  }

  commit_(type: string, payload: any) {
    if (!this.mutations[type]) throw new Error('[vuex] unknown mutations type: ' + type)
    this.mutations[type](payload)
  }

  dispatch_(type: string, payload: any) {
    if (!this.actions[type]) throw new Error('[vuex] unknown actions type: ' + type)
    this.actions[type](payload)
  }
}

// 模块注册 getter actions mutations
function installModule<R>(store: TinyStore<R>, rootState_: R, path: string[], module: ModuleWrapper<any, R>) {
  const isRoot = !path.length

  const nameSpace = store.moduleCollection.getNameSpace(path)
  console.log('nameSpace', nameSpace)
  // 如果不是根模块
  if (!isRoot) {
    // 1. 拿到父级的state
    const parentState: any = getParentState(rootState_, path.slice(0, -1))
    // 2. 拿到当前模块的state和当前模块名合成一个对象，加到父级的state上
    parentState[path[path.length - 1]] = module.state
  }

  module.forEachChild((child, key) => {
    installModule(store, rootState_, path.concat(key), child)
  })

  module.forEachGetter((getter, key) => {
    const nameSpaceType = nameSpace + key
    // store.getters[nameSpaceType] = getter
    Object.defineProperty(store.getters, nameSpaceType, {
      get() {
        return getter(module.state)
      }
    })
  })
}

function getParentState<R>(rootState: R, path: string[]) {
  return path.reduce((state, key) => {
    return (state as any)[key]
  }, rootState)
}

class ModuleWrapper<S, R> {
  children: Record<string, ModuleWrapper<any, R>> = {}
  rawModule: Module<any, R>
  state: S
  namespaced: boolean
  constructor(rawModule_: Module<any, R>) {
    this.rawModule = rawModule_
    this.state = rawModule_.state || Object.create(null)
    this.namespaced = rawModule_.namespaced || false
  }
  addChild(key: string, moduleWrapper: ModuleWrapper<any, R>) {
    this.children[key] = moduleWrapper
  }
  getChild(key: string) {
    return this.children[key]
  }
  forEachChild(fn: ChildMdleWraperToKey<R>) {
    Object.keys(this.children).forEach(key => {
      fn(this.children[key], key)
    })
  }
  forEachGetter(fn: GetterToKey<R>) {
    if (this.rawModule.getters) {
      Object.keys(this.rawModule.getters).forEach(key => {
        fn(this.rawModule.getters![key], key)
      })
    }
  }
}

type GetterToKey<R> = (getter: Getter<any, R>, key: string) => any
type ChildMdleWraperToKey<R> = (moduleWrapper: ModuleWrapper<any, R>, key: string) => void

class ModuleCollection<R> {
  root!: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    // this.root = new ModuleWrapper(rawRootModule)
    // this.register([], this.root)
    this.register([], rawRootModule)
  }
  register(path: string[], rawModule: Module<any, R>) {
    // if (rawModule.rawModule.modules) {
    //   const modulesKeys = Object.keys(rawModule.rawModule.modules)
    //   modulesKeys.forEach(key => {
    //     rawModule.addChild(key, new ModuleWrapper(rawModule.rawModule.modules![key]))
    //   })
    // }

    // const childKeys = Object.keys(rawModule.children)
    // if (childKeys.length !== 0) {
    //   childKeys.forEach(ele => {
    //     this.register([], rawModule.children[ele])
    //   })
    // }

    const newModule = new ModuleWrapper(rawModule)
    if (path.length === 0) {
      this.root = newModule
    } else {
      // 添加子模块 - > 父模块 children
      // 获取父级的moduleWrapper对象
      const parentModule: ModuleWrapper<any, R> = this.get(path.slice(0, -1))
      // 添加到父级模块的children
      parentModule.addChild(path[path.length - 1], newModule)
    }

    if (rawModule.modules) {
      const { modules: sonModules } = rawModule
      // Object.keys(sonModules).forEach(moduleName => {
      //   this.register(path.concat(moduleName), sonModules[moduleName])
      // })
      Util.forEachValue(sonModules, (key: string, modules: Module<any, R>) => {
        this.register(path.concat(key), modules)
      })
    }
  }
  // rootmodule foodModule detailModule
  // ['food', 'detail']
  get(path: string[]) {
    const module = this.root
    return path.reduce((moduleWrapper: ModuleWrapper<AnalyserNode, R>, key: string) => {
      console.log(key, 'key')
      return moduleWrapper.getChild(key)
    }, module)
  }

  getNameSpace(path: string[]) {
    let moduleWrapper = this.root
    return path.reduce((nameSpace, key) => {
      moduleWrapper = moduleWrapper.getChild(key)
      return nameSpace + (moduleWrapper.namespaced ? key + '/' : '')
    }, '')
  }
}

class Util {
  static forEachValue(obj: Record<string, any>, fn: (...args: any) => void) {
    Object.keys(obj).forEach(key => {
      fn(key, obj[key])
    })
  }
}

interface StoreOptions<S> {
  state?: S,
  getters?: GetterTree<S, S>,
  mutations?: MutationTree<S>,
  actions?: ActionTree<S, S>,
  modules?: ModuleTree<S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}

export interface Module<S, R> {
  namespaced?: boolean,
  state?: S,
  getters?: GetterTree<S, R>,
  mutations?: MutationTree<S>,
  actions?: ActionTree<S, R>,
  modules?: ModuleTree<R>
}

// ActionTree
interface ActionTree<S, R> {
  [K: string]: Action<S, R>
}

// MutationTree
interface MutationTree<S> {
  [K: string]: Mutation<S>
}

// GetterTree
interface GetterTree<S, R> {
  [K: string]: Getter<S, R>
}

interface ActionContext<S, R> {
  dispatch: Dispatch,
  commit: Commit,
  state: S
}

type Dispatch = (type: string, payload: any) => any
type Commit = (type: string, payload: any) => any

type Action<S, R> = (context: ActionContext<S, R>, payload?: any) => any

type Mutation<S> = (state: S, payload?: any) => void

// type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any
type Getter<S, R> = (state: S) => any

export { }
