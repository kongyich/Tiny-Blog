import { Module } from "@/vuex"
import { RootState } from '@/store/rootState'

interface IState {
  [key: string]: number[]
}

export const foodModule: Module<IState, RootState> = {
  namespaced: true,
  state: {
    foodList: [1, 2, 3]
  },
  getters: {
    getFoodList(state) {
      return state.foodList
    }
  },
  mutations: {
    modifyNavList(state, navList) {
      return state.foodList = navList
    }
  },
  actions: {
    handlerNavList({ commit }) {
      setTimeout(() => {
        const navList = [4, 5, 6]
        commit('modifyNavList', navList)
      }, 600)
    }
  }
}
