import { App, inject } from 'vue'

const injectKey = "store"

export function useStore<S>(): TinyStore<S> {
  return inject(injectKey)
}

export function createStore<S>(options: StoreOptions<S>) {
  return new TinyStore<S>(options)
}

class TinyStore<S = any> {
  constructor(options: StoreOptions<S>) { }

  install(app: App) {
    app.provide(injectKey, this)
  }
}

interface StoreOptions<S> {
  state?: S,
  getters?: GetterTree<S, S>,
  mutations?: MutationTree<S>,
  actions?: ActionTree<S, S>
}

interface ModuleTree<R> {
  [key: string]: Module<any, R>
}

interface Module<S, R> {
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
