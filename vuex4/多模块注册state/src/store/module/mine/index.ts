import { state, IState } from './state'
import { RootState } from '@/store/rootState'
import { Module } from '@/vuex/index';
import { foodModule } from '@/store/module/food'

export const mineModule: Module<IState, RootState> = {
  namespaced: true,
  state,
  getters: {
    showNavList(state) {
      return state.typeList
    }
  },
  mutations: {
    modifyNavList(state, navList) {
      return state.typeList = navList
    }
  },
  modules: {
    foodModule: foodModule
  },
  actions: {
    handlerNavList({ commit }) {
      setTimeout(() => {
        const navList = ['a', 'b', 'c']
        commit('modifyNavList', navList)
      }, 600)
    }
  }
}
