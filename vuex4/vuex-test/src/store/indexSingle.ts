import { createStore } from '../vuex/indexSingle'

export default createStore({
  state: {
    navList: ['这是一个测试', 'ok']
  },
  getters: {
    showNavList(state) {
      return state.navList
    }
  },
  mutations: {
    modifyNavList(state, navList) {
      return state.navList = navList
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
})
