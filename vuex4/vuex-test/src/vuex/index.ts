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
  constructor(options: StoreOptions<S>) {
    this.moduleCollection = new ModuleCollection<S>(options)
  }

  install(app: App) {
    app.provide(injectKey, this)
  }

  test() {
    return 'is a test'
  }
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
}

class ModuleCollection<R> {
  root: ModuleWrapper<any, R>
  constructor(rawRootModule: Module<any, R>) {
    this.root = new ModuleWrapper(rawRootModule)
  }
  register() { }
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

type Getter<S, R> = (state: S, getters: any, rootState: R, rootGetters: any) => any

export { }
