import { state, IState } from './state'
import { RootState } from '@/store/rootState'
import { Module } from '@/vuex/index';

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
  actions: {
    handlerNavList({ commit }) {
      setTimeout(() => {
        const navList = ['a', 'b', 'c']
        commit('modifyNavList', navList)
      }, 600)
    }
  }
}
