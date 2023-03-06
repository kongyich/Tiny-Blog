import { state, IState } from './state'
import { RootState } from '@/store/rootState'
import { Module } from '@/vuex/index';

export const homeModule: Module<IState, RootState> = {
  namespaced: true,
  state,
  getters: {
    showNavList(state) {
      return state.homeList
    }
  },
  mutations: {
    modifyHomeList(state, newList) {
      return state.homeList = newList
    }
  },
  actions: {
    handlerNavList({ commit }) {
      setTimeout(() => {
        const navList = ['a', 'b', 'c']
        commit('modifyHomeList', navList)
      }, 600)
    }
  }
}
