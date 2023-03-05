import { createStore } from '@/vuex/index'
import { mineModule, homeModule, } from './module'
import { RootState } from './rootState'

export default createStore<RootState>({
  modules: {
    mineModule: mineModule,
    homeModule: homeModule
  }
})
